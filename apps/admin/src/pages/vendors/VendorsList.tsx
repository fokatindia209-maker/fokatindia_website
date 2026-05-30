import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const API = import.meta.env.VITE_API_URL;

interface Vendor {
  vendorId: number;
  userId: number;
  businessName: string;
  gstNumber: string;
  address: string;
  city: string;
  serviceArea: string;
  kycStatus: string;
  rating: number;
}

export default function VendorList() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);

  const navigate = useNavigate();

  // ======================
  // FETCH
  // ======================
  const fetchVendors = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API}/restful/v1/api/vendors`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setVendors(res.data.data || []);
    } catch (err) {
      console.error("Error fetching vendors", err);
      setVendors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  // ======================
  // DELETE
  // ======================
  const deleteVendor = async (id: number) => {
    if (!confirm("Delete this vendor?")) return;

    try {
      setActionLoadingId(id);

      await axios.delete(
        `${API}/restful/v1/api/vendors/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      await fetchVendors();
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoadingId(null);
    }
  };

  // ======================
  // DEACTIVATE
  // ======================
  const deactivateVendor = async (id: number) => {
    try {
      setActionLoadingId(id);

      await axios.put(
        `${API}/restful/v1/api/vendors/${id}/deactivate`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      await fetchVendors();
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">

      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Vendors</h1>

        <button
          onClick={() => navigate("/vendors/create")}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          + Create Vendor
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full text-sm">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Business</th>
              <th className="p-3 text-left">City</th>
              <th className="p-3 text-left">Service Area</th>
              <th className="p-3 text-left">KYC</th>
              <th className="p-3 text-left">Rating</th>
              <th className="p-3 text-left">Actions</th>
            </tr>

            {/* 🔥 LOADER ROW UNDER HEADER */}
            {loading && (
              <tr>
                <td colSpan={7} className="p-4">
                  <div className="flex items-center justify-center gap-2 text-gray-600">
                    <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                    Loading vendors...
                  </div>
                </td>
              </tr>
            )}
          </thead>

          <tbody>

            {/* EMPTY STATE */}
            {!loading && vendors.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">
                  No vendors found
                </td>
              </tr>
            )}

            {/* DATA */}
            {!loading &&
              vendors.map((vendor) => (
                <tr key={vendor.vendorId} className="border-t">

                  <td className="p-3">{vendor.vendorId}</td>

                  <td className="p-3">{vendor.businessName}</td>

                  <td className="p-3">{vendor.city}</td>

                  <td className="p-3">{vendor.serviceArea}</td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        vendor.kycStatus === "APPROVED"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {vendor.kycStatus}
                    </span>
                  </td>

                  <td className="p-3">{vendor.rating}</td>

                  <td className="p-3 flex gap-2">

                    <button
                      onClick={() =>
                        navigate(`/vendors/${vendor.vendorId}`)
                      }
                      className="px-3 py-1 bg-blue-500 text-white rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deactivateVendor(vendor.vendorId)}
                      disabled={actionLoadingId === vendor.vendorId}
                      className="px-3 py-1 bg-yellow-500 text-white rounded disabled:opacity-50"
                    >
                      {actionLoadingId === vendor.vendorId
                        ? "Loading..."
                        : "Deactivate"}
                    </button>

                    <button
                      onClick={() => deleteVendor(vendor.vendorId)}
                      disabled={actionLoadingId === vendor.vendorId}
                      className="px-3 py-1 bg-red-500 text-white rounded disabled:opacity-50"
                    >
                      {actionLoadingId === vendor.vendorId
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

// interface Vendor {
//   vendorId: number;
//   userId: number;
//   businessName: string;
//   gstNumber: string;
//   address: string;
//   city: string;
//   serviceArea: string;
//   kycStatus: string;
//   rating: number;
// }

// export default function VendorList() {
//   const [vendors, setVendors] = useState<Vendor[]>([]);
//   const [loading, setLoading] = useState(true);

//   const navigate = useNavigate();

//   const fetchVendors = async () => {
//     try {
//       setLoading(true);

//       const res = await axios.get(
//         `${API}/restful/v1/api/vendors`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem(
//               "token"
//             )}`,
//           },
//         }
//       );

//       setVendors(res.data.data || []);
//     } catch (err) {
//       console.error("Error fetching vendors", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchVendors();
//   }, []);

//   const deleteVendor = async (id: number) => {
//     if (!confirm("Delete this vendor?")) return;

//     try {
//       await axios.delete(
//         `${API}/restful/v1/api/vendors/${id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem(
//               "token"
//             )}`,
//           },
//         }
//       );

//       fetchVendors();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const deactivateVendor = async (id: number) => {
//     try {
//       await axios.put(
//         `${API}/restful/v1/api/vendors/${id}/deactivate`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem(
//               "token"
//             )}`,
//           },
//         }
//       );

//       fetchVendors();
//     } catch (err) {
//       console.error(err);
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
//     <div className="min-h-screen bg-gray-100 py-12">
//       <div className="flex justify-between mb-6">
//         <h1 className="text-2xl font-bold">
//           Vendors
//         </h1>

//         <button
//           onClick={() => navigate("/vendors/create")}
//           className="px-4 py-2 bg-blue-600 text-white rounded"
//         >
//           + Create Vendor
//         </button>
//       </div>

//       <div className="overflow-x-auto bg-white rounded shadow">
//         <table className="w-full text-sm">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-3 text-left">ID</th>
//               <th className="p-3 text-left">Business</th>
//               <th className="p-3 text-left">City</th>
//               <th className="p-3 text-left">
//                 Service Area
//               </th>
//               <th className="p-3 text-left">KYC</th>
//               <th className="p-3 text-left">
//                 Rating
//               </th>
//               <th className="p-3 text-left">
//                 Actions
//               </th>
//             </tr>
//           </thead>

//           <tbody>
//             {vendors.map((vendor) => (
//               <tr
//                 key={vendor.vendorId}
//                 className="border-t"
//               >
//                 <td className="p-3">
//                   {vendor.vendorId}
//                 </td>

//                 <td className="p-3">
//                   {vendor.businessName}
//                 </td>

//                 <td className="p-3">
//                   {vendor.city}
//                 </td>

//                 <td className="p-3">
//                   {vendor.serviceArea}
//                 </td>

//                 <td className="p-3">
//                   <span
//                     className={`px-2 py-1 rounded text-xs ${
//                       vendor.kycStatus === "APPROVED"
//                         ? "bg-green-100 text-green-600"
//                         : "bg-yellow-100 text-yellow-600"
//                     }`}
//                   >
//                     {vendor.kycStatus}
//                   </span>
//                 </td>

//                 <td className="p-3">
//                   {vendor.rating}
//                 </td>

//                 <td className="p-3 flex gap-2">
//                   <button
//                     onClick={() =>
//                       navigate(
//                         `/vendors/${vendor.vendorId}`
//                       )
//                     }
//                     className="px-3 py-1 bg-blue-500 text-white rounded"
//                   >
//                     View/Edit
//                   </button>

//                   <button
//                     onClick={() =>
//                       deactivateVendor(
//                         vendor.vendorId
//                       )
//                     }
//                     className="px-3 py-1 bg-yellow-500 text-white rounded"
//                   >
//                     Deactivate
//                   </button>

//                   <button
//                     onClick={() =>
//                       deleteVendor(
//                         vendor.vendorId
//                       )
//                     }
//                     className="px-3 py-1 bg-red-500 text-white rounded"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}

//             {vendors.length === 0 && (
//               <tr>
//                 <td
//                   colSpan={7}
//                   className="text-center py-6 text-gray-500"
//                 >
//                   No vendors found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
