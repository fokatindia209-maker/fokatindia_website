import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const API = import.meta.env.VITE_API_URL;

interface SubVendor {
  userId: number;
  subVendorId: number;
  vendorId: number;
  specialization: string;
  experienceYears: number;
  availabilityStatus: string;
  rating: number;
  createdAt: string;
}

export default function SubVendorList() {
  const [subVendors, setSubVendors] = useState<SubVendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);

  const navigate = useNavigate();

  const fetchSubVendors = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API}/restful/v1/api/subvendors`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setSubVendors(res.data.data || []);
    } catch (err) {
      console.error(err);
      setSubVendors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubVendors();
  }, []);

  // =======================
  // DELETE
  // =======================
  const deleteSubVendor = async (id: number) => {
    if (!confirm("Delete this subVendor?")) return;

    try {
      setActionLoadingId(id);

      await axios.delete(
        `${API}/restful/v1/api/subvendors/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      await fetchSubVendors();
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoadingId(null);
    }
  };

  // =======================
  // DEACTIVATE
  // =======================
  const deactivateSubVendor = async (id: number) => {
    try {
      setActionLoadingId(id);

      await axios.put(
        `${API}/restful/v1/api/subvendors/${id}/deactivate`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      await fetchSubVendors();
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <div className="py-12 px-4">

      {/* HEADER */}
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Sub Vendors</h1>

        <button
          onClick={() => navigate("/subvendors/create")}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          + Create SubVendor
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full text-sm">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">SubVendor ID</th>
              <th className="p-3 text-left">Vendor ID</th>
              <th className="p-3 text-left">Specialization</th>
              <th className="p-3 text-left">Experience</th>
              <th className="p-3 text-left">Rating</th>
              <th className="p-3 text-left">Availability</th>
              <th className="p-3 text-left">Created At</th>
              <th className="p-3 text-left">Actions</th>
            </tr>

            {/* 🔥 LOADER ROW UNDER HEADER */}
            {loading && (
              <tr>
                <td colSpan={8} className="p-4">
                  <div className="flex items-center justify-center gap-2 text-gray-600">
                    <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                    Loading sub vendors...
                  </div>
                </td>
              </tr>
            )}
          </thead>

          <tbody>

            {/* EMPTY STATE */}
            {!loading && subVendors.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-6 text-gray-500">
                  No sub vendors found
                </td>
              </tr>
            )}

            {/* DATA */}
            {!loading &&
              subVendors.map((c) => (
                <tr key={c.subVendorId} className="border-t">

                  <td className="p-3">{c.subVendorId}</td>
                  <td className="p-3">{c.vendorId}</td>
                  <td className="p-3">{c.specialization}</td>
                  <td className="p-3">{c.experienceYears} yrs</td>
                  <td className="p-3">{c.rating} ⭐</td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        c.availabilityStatus === "AVAILABLE"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {c.availabilityStatus}
                    </span>
                  </td>

                  <td className="p-3">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-3 flex gap-2">

                    <button
                      onClick={() =>
                        navigate(`/subvendors/edit/${c.subVendorId}`)
                      }
                      className="px-3 py-1 bg-blue-500 text-white rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deactivateSubVendor(c.subVendorId)}
                      disabled={actionLoadingId === c.subVendorId}
                      className="px-3 py-1 bg-yellow-500 text-white rounded disabled:opacity-50"
                    >
                      {actionLoadingId === c.subVendorId
                        ? "Loading..."
                        : "Deactivate"}
                    </button>

                    <button
                      onClick={() => deleteSubVendor(c.subVendorId)}
                      disabled={actionLoadingId === c.subVendorId}
                      className="px-3 py-1 bg-red-500 text-white rounded disabled:opacity-50"
                    >
                      {actionLoadingId === c.subVendorId
                        ? "Deleting..."
                        : "Delete"}
                    </button>

                  </td>
                </tr>
              ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const API = import.meta.env.VITE_API_URL;

// interface SubVendor {
//   userId: number;
//   subVendorId: number;
//   vendorId: number;
//   specialization: string;
//   experienceYears: number;
//   availabilityStatus: string;
//   rating: number;
//   createdAt: string;
// }

// export default function SubVendorList() {
//   const [subVendors, setSubVendors] = useState<SubVendor[]>([]);
//   const [loading, setLoading] = useState(true);

//   const navigate = useNavigate();

//   const fetchSubVendors = async () => {
//     try {
//       setLoading(true);

//       const res = await axios.get(
//         `${API}/restful/v1/api/subvendors`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem(
//               "token"
//             )}`,
//           },
//         }
//       );

//       setSubVendors(res.data.data || []);
//     } catch (err) {
//       console.error("Error fetching subVendors", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSubVendors();
//   }, []);

//   const deleteSubVendor = async (id: number) => {
//     if (!confirm("Delete this subVendor?")) return;

//     try {
//       setLoading(true);

//       await axios.delete(
//         `${API}/${id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem(
//               "token"
//             )}`,
//           },
//         }
//       );

//       await fetchSubVendors();
//     } catch (err) {
//       console.error("Error deleting subVendor", err);
//       setLoading(false);
//     }
//   };

//   const deactivateSubVendor = async (id: number) => {
//     try {
//       setLoading(true);

//       await axios.put(
//         `${API}/${id}/deactivate`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem(
//               "token"
//             )}`,
//           },
//         }
//       );

//       await fetchSubVendors();
//     } catch (err) {
//       console.error("Error deactivating subVendor", err);
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-96">
//         <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="py-12">
//       <div className="flex justify-between mb-4">
//         <h1 className="text-2xl font-bold">
//           Sub Vendors
//         </h1>

//         <button
//           onClick={() =>
//             navigate("/subvendors/create")
//           }
//           className="px-4 py-2 bg-blue-600 text-white rounded"
//         >
//           + Create SubVendor
//         </button>
//       </div>

//       <div className="overflow-x-auto bg-white rounded shadow">
//         <table className="w-full text-sm">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-3 text-left">
//                 SubVendor ID
//               </th>
//               <th className="p-3 text-left">
//                 Vendor ID
//               </th>
//               <th className="p-3 text-left">
//                 Specialization
//               </th>
//               <th className="p-3 text-left">
//                 Experience
//               </th>
//               <th className="p-3 text-left">
//                 Rating
//               </th>
//               <th className="p-3 text-left">
//                 Availability
//               </th>
//               <th className="p-3 text-left">
//                 Created At
//               </th>
//               <th className="p-3 text-left">
//                 Actions
//               </th>
//             </tr>
//           </thead>

//           <tbody>
//             {subVendors.map((c) => (
//               <tr
//                 key={c.subVendorId}
//                 className="border-t"
//               >
//                 <td className="p-3">
//                   {c.subVendorId}
//                 </td>

//                 <td className="p-3">
//                   {c.vendorId}
//                 </td>

//                 <td className="p-3">
//                   {c.specialization}
//                 </td>

//                 <td className="p-3">
//                   {c.experienceYears} yrs
//                 </td>

//                 <td className="p-3">
//                   {c.rating} ⭐
//                 </td>

//                 <td className="p-3">
//                   <span
//                     className={`px-2 py-1 rounded text-xs ${
//                       c.availabilityStatus ===
//                       "AVAILABLE"
//                         ? "bg-green-100 text-green-600"
//                         : "bg-red-100 text-red-600"
//                     }`}
//                   >
//                     {c.availabilityStatus}
//                   </span>
//                 </td>

//                 <td className="p-3">
//                   {new Date(
//                     c.createdAt
//                   ).toLocaleDateString()}
//                 </td>

//                 <td className="p-3 flex gap-2">
//                   <button
//                     onClick={() =>
//                       navigate(
//                         `/subvendors/edit/${c.subVendorId}`
//                       )
//                     }
//                     className="px-3 py-1 bg-blue-500 text-white rounded"
//                   >
//                     View/Edit
//                   </button>

//                   <button
//                     onClick={() =>
//                       deactivateSubVendor(
//                         c.subVendorId
//                       )
//                     }
//                     className="px-3 py-1 bg-yellow-500 text-white rounded"
//                   >
//                     Deactivate
//                   </button>

//                   <button
//                     onClick={() =>
//                       deleteSubVendor(
//                         c.subVendorId
//                       )
//                     }
//                     className="px-3 py-1 bg-red-500 text-white rounded"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}

//             {subVendors.length === 0 && (
//               <tr>
//                 <td
//                   colSpan={8}
//                   className="text-center py-6 text-gray-500"
//                 >
//                   No sub vendors found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }