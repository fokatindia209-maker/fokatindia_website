import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import api from "../../../api/axios";
import PartnerLayout from "../../../components/PartnerLayout";

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

  // ================= FETCH =================
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const res = await api.get(`/restful/v1/api/categories/vendors/${user.vendorId}`);

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

  // ================= DELETE (OPTIMIZED) =================
  const deleteCategory = async (id: number) => {
    if (!confirm("Delete this category?")) return;

    try {
      setDeletingId(id);

      await api.delete(`/restful/v1/api/categories/${id}`);

      // 🔥 instant UI update (NO refetch needed)
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <PartnerLayout role="VENDOR">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Categories</h1>

        <button
          onClick={() => navigate("/vendor/categories/create")}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl"
        >
          + Create Category
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            {/* HEADER */}
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
            </thead>

            <tbody>
              {/* LOADING */}
              {loading && (
                <tr>
                  <td colSpan={8} className="p-6 text-center">
                    <div className="flex items-center justify-center gap-2 text-gray-600">
                      <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                      Loading categories...
                    </div>
                  </td>
                </tr>
              )}

              {/* EMPTY STATE */}
              {!loading && categories.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-10 text-gray-500">
                    No categories found
                  </td>
                </tr>
              )}

              {/* DATA */}
              {!loading &&
                categories.map((c) => (
                  <tr key={c.id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{c.id}</td>

                    <td className="p-3 font-semibold">{c.name}</td>

                    <td className="p-3">{c.description}</td>

                    <td className="p-3">{c.slug}</td>

                    <td className="p-3">{c.displayOrder}</td>

                    {/* IMAGE */}
                    <td className="p-3">
                      {c.imageUrl ? (
                        <img
                          src={c.imageUrl}
                          onClick={() => window.open(c.imageUrl, "_blank")}
                          className="w-10 h-10 rounded cursor-pointer hover:scale-105 transition"
                        />
                      ) : (
                        "-"
                      )}
                    </td>

                    {/* STATUS */}
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

                    {/* ACTIONS */}
                    <td className="p-3 flex gap-2">
                      <button
                        onClick={() => navigate(`/vendor/categories/edit/${c.id}`)}
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
    </PartnerLayout>
  );
}