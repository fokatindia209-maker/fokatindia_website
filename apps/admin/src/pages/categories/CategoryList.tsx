import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const API = import.meta.env.VITE_API_URL;

interface Category {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  displayOrder: number;
  active: boolean;
  slug: string;
}

export default function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API}/restful/v1/api/categories`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setCategories(res.data.data || []);
    } catch (err) {
      console.error(err);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const deleteCategory = async (id: number) => {
    if (!confirm("Delete this category?")) return;

    try {
      setDeletingId(id);

      await axios.delete(
        `${API}/restful/v1/api/categories/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      await fetchCategories();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="py-10 px-4">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Categories
        </h1>

        <button
          onClick={() => navigate("/categories/create")}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl"
        >
          + Create Category
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">

            {/* HEADER ROW */}
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-left">Slug</th>
                <th className="p-3 text-left">Order</th>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>

              {/* 🔥 LOADER ROW (UNDER HEADER) */}
              {loading && (
                <tr>
                  <td colSpan={8} className="p-4">
                    <div className="flex items-center justify-center gap-2 text-gray-600">
                      <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                      Loading categories...
                    </div>
                  </td>
                </tr>
              )}
            </thead>

            <tbody>

              {/* EMPTY STATE */}
              {!loading && categories.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-10 text-gray-500">
                    No categories found
                  </td>
                </tr>
              )}

              {/* DATA ROWS */}
              {!loading &&
                categories.map((c) => (
                  <tr
                    key={c.id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="p-3">{c.id}</td>
                    <td className="p-3 font-semibold">{c.name}</td>
                    <td className="p-3">{c.description}</td>
                    <td className="p-3">{c.slug}</td>
                    <td className="p-3">{c.displayOrder}</td>

                    <td className="p-3">
                      {c.imageUrl ? (
                        <img
                          src={c.imageUrl}
                          onClick={() =>
                            window.open(c.imageUrl, "_blank")
                          }
                          className="w-10 h-10 rounded cursor-pointer hover:scale-105 transition"
                        />
                      ) : (
                        "-"
                      )}
                    </td>

                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          c.active
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {c.active ? "ACTIVE" : "INACTIVE"}
                      </span>
                    </td>

                    <td className="p-3 flex gap-2">
                      <button
                        onClick={() =>
                          navigate(`/categories/edit/${c.id}`)
                        }
                        className="px-3 py-1 bg-blue-500 text-white rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteCategory(c.id)}
                        disabled={deletingId === c.id}
                        className="px-3 py-1 bg-red-600 text-white rounded disabled:opacity-50"
                      >
                        {deletingId === c.id ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const API = import.meta.env.VITE_API_URL;

// interface Category {
//   id: number;
//   name: string;
//   description: string;
//   imageUrl: string;
//   displayOrder: number;
//   active: boolean;
//   slug: string;
// }

// export default function CategoryList() {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [loadingId, setLoadingId] = useState<number | null>(null);

//   const navigate = useNavigate();

//   const fetchCategories = async () => {
//     try {
//       setLoading(true);

//       const res = await axios.get(
//         `${API}/restful/v1/api/categories`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       setCategories(res.data.data || []);
//     } catch (err) {
//       console.error(err);
//       setCategories([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const deleteCategory = async (id: number) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this category?"
//     );

//     if (!confirmDelete) return;

//     try {
//       setLoadingId(id);

//       await axios.delete(
//         `${API}/restful/v1/api/categories/${id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       alert("Category deleted successfully");

//       await fetchCategories();
//     } catch (err) {
//       console.error(err);
//       alert("Delete failed");
//     } finally {
//       setLoadingId(null);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-[60vh]">
//         <div className="flex flex-col items-center gap-4">
//           <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
//           <p className="text-gray-600 font-medium">
//             Loading categories...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="py-12">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Categories</h1>

//         <button
//           onClick={() => navigate("/categories/create")}
//           className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
//         >
//           + Create Category
//         </button>
//       </div>

//       <div className="bg-white shadow rounded-lg overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="p-3 text-left">ID</th>
//                 <th className="p-3 text-left">Name</th>
//                 <th className="p-3 text-left">Description</th>
//                 <th className="p-3 text-left">Slug</th>
//                 <th className="p-3 text-left">Display Order</th>
//                 <th className="p-3 text-left">Image</th>
//                 <th className="p-3 text-left">Status</th>
//                 <th className="p-3 text-left">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {categories.length === 0 ? (
//                 <tr>
//                   <td
//                     colSpan={8}
//                     className="text-center py-10 text-gray-500"
//                   >
//                     No categories found
//                   </td>
//                 </tr>
//               ) : (
//                 categories.map((c) => (
//                   <tr
//                     key={c.id}
//                     className="border-t hover:bg-gray-50"
//                   >
//                     <td className="p-3">{c.id}</td>

//                     <td className="p-3 font-semibold">
//                       {c.name}
//                     </td>

//                     <td className="p-3">
//                       {c.description}
//                     </td>

//                     <td className="p-3">{c.slug}</td>

//                     <td className="p-3">
//                       {c.displayOrder}
//                     </td>

//                     <td className="p-3">
//                       {c.imageUrl ? (
//                         <a
//                           href={c.imageUrl}
//                           target="_blank"
//                           rel="noreferrer"
//                           className="text-blue-600 underline"
//                         >
//                           View Image
//                         </a>
//                       ) : (
//                         "-"
//                       )}
//                     </td>

//                     <td className="p-3">
//                       <span
//                         className={`px-2 py-1 rounded text-xs font-medium ${
//                           c.active
//                             ? "bg-green-100 text-green-700"
//                             : "bg-red-100 text-red-700"
//                         }`}
//                       >
//                         {c.active ? "ACTIVE" : "INACTIVE"}
//                       </span>
//                     </td>

//                     <td className="p-3">
//                       <div className="flex gap-2">
//                         <button
//                           onClick={() =>
//                             navigate(`/categories/edit/${c.id}`)
//                           }
//                           className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded"
//                         >
//                           View/Edit
//                         </button>

//                         <button
//                           onClick={() => deleteCategory(c.id)}
//                           disabled={loadingId === c.id}
//                           className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
//                         >
//                           {loadingId === c.id
//                             ? "Deleting..."
//                             : "Delete"}
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }