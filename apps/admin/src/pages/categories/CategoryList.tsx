import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        `${API}/restful/v1/api/categories`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setCategories(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ============================================
  // DELETE CATEGORY
  // ============================================
  const deleteCategory = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmDelete) return;

    try {
      setLoadingId(id);

      await axios.delete(
        `${API}/restful/v1/api/categories/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Category deleted successfully");

      // refresh list
      fetchCategories();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="py-12">

      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Categories</h1>

        <button
          onClick={() => navigate("/categories/create")}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          + Create Category
        </button>
      </div>

      <div className="bg-white shadow rounded overflow-x-auto">

        <table className="w-full text-sm">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Slug</th>
              <th className="p-3 text-left">Display Order</th>
              <th className="p-3 text-left">Image URL</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((c) => (
              <tr key={c.id} className="border-t">

                <td className="p-3">{c.id}</td>
                <td className="p-3 font-semibold">{c.name}</td>
                <td className="p-3">{c.description}</td>
                <td className="p-3">{c.slug}</td>
                <td className="p-3">{c.displayOrder}</td>

                <td className="p-3">
                  <a
                    href={c.imageUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline"
                  >
                    View Image
                  </a>
                </td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      c.active
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {c.active ? "ACTIVE" : "INACTIVE"}
                  </span>
                </td>

                {/* ACTIONS */}
                <td className="p-3 flex gap-2">

                  <button
                    onClick={() => navigate(`/categories/edit/${c.id}`)}
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    View/Edit
                  </button>


                  {/* DELETE BUTTON */}
                  <button
                    onClick={() => deleteCategory(c.id)}
                    disabled={loadingId === c.id}
                    className="px-3 py-1 bg-red-600 text-white rounded disabled:opacity-50"
                  >
                    {loadingId === c.id ? "Deleting..." : "Delete"}
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