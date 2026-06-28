import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

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

      const res = await api.get(`/restful/v1/api/categories`);

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

      await api.delete(`/restful/v1/api/categories/${id}`);

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

      {/* MOBILE CARDS */}
      <div className="md:hidden space-y-3">
        {loading && (
          <div className="bg-white rounded-xl p-6 text-center text-gray-500">
            <Loader2 className="w-5 h-5 animate-spin text-blue-600 mx-auto mb-2" />
            Loading categories...
          </div>
        )}
        {!loading && categories.length === 0 && (
          <div className="bg-white rounded-xl p-6 text-center text-gray-500">No categories found</div>
        )}
        {!loading && categories.map((c) => (
          <div key={c.id} className="bg-white rounded-xl shadow p-4 space-y-2">
            <div className="flex items-center gap-3">
              {c.imageUrl ? (
                <img src={c.imageUrl} className="w-12 h-12 rounded-lg object-cover cursor-pointer" onClick={() => window.open(c.imageUrl, "_blank")} />
              ) : (
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-xs">No img</div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-800 truncate">{c.name}</span>
                  <span className={`ml-2 px-2 py-1 rounded text-xs shrink-0 ${c.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{c.active ? "ACTIVE" : "INACTIVE"}</span>
                </div>
                <p className="text-xs text-gray-400 truncate">{c.slug} · Order {c.displayOrder}</p>
              </div>
            </div>
            <div className="flex gap-2 pt-1">
              <button onClick={() => navigate(`/categories/edit/${c.id}`)} className="px-3 py-1 bg-blue-500 text-white rounded text-sm">Edit</button>
              <button onClick={() => deleteCategory(c.id)} disabled={deletingId === c.id} className="px-3 py-1 bg-red-600 text-white rounded text-sm disabled:opacity-50">
                {deletingId === c.id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block bg-white shadow rounded-xl overflow-hidden">
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
