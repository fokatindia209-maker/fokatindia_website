import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  Tags,
  Save,
  ArrowLeft,
  Loader2,
} from "lucide-react";

interface Category {
  id: number;
  name: string;
  description: string;
  imageUrl?: string;
  displayOrder?: number;
  active?: boolean;
  slug?: string;
}

export default function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<Category>({
    id: 0,
    name: "",
    description: "",
    imageUrl: "",
    displayOrder: 0,
    active: true,
    slug: "",
  });

  // ============================================
  // FETCH CATEGORY
  // ============================================
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);

        const res = await api.get(`/restful/v1/api/categories/${id}`);

        setForm(res.data.data || res.data);
      } catch (err) {
        console.error("Error fetching category", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  // ============================================
  // UPDATE CATEGORY
  // ============================================
  const handleUpdate = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("displayOrder", String(form.displayOrder ?? 0));
      formData.append("slug", form.slug ?? "");
      formData.append("active", form.active ? "true" : "false");

      await api.post(`/restful/v1/api/categories/update/${id}`, formData);

      alert("Category updated successfully");
      navigate("/categories");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 px-4 bg-gray-100 min-h-screen">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate("/categories")}
        className="flex items-center gap-2 text-gray-600 hover:text-black mb-6"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      {/* CARD */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Tags size={24} />
            </div>

            <div>
              <h2 className="text-xl font-bold">
                Edit Category
              </h2>
              <p className="text-sm text-purple-100">
                Update category details
              </p>
            </div>
          </div>
        </div>

        {/* FORM */}
        <div className="p-6 grid grid-cols-2 gap-4">

          {/* NAME */}
          <input
            placeholder="Category Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="border p-3 rounded-xl col-span-2"
          />

          {/* SLUG */}
          <input
            placeholder="Slug"
            value={form.slug}
            onChange={(e) =>
              setForm({ ...form, slug: e.target.value })
            }
            className="border p-3 rounded-xl col-span-2"
          />

          {/* DISPLAY ORDER */}
          <input
            placeholder="Display Order"
            type="number"
            value={form.displayOrder}
            onChange={(e) =>
              setForm({
                ...form,
                displayOrder: Number(e.target.value),
              })
            }
            className="border p-3 rounded-xl"
          />

          {/* ACTIVE */}
          <select
            value={form.active ? "true" : "false"}
            onChange={(e) =>
              setForm({
                ...form,
                active: e.target.value === "true",
              })
            }
            className="border p-3 rounded-xl"
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>

          {/* DESCRIPTION */}
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
            className="border p-3 rounded-xl col-span-2"
          />

          {/* BUTTON */}
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="col-span-2 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Update Category
              </>
            )}
          </button>

        </div>
      </div>
    </div>
  );
}
