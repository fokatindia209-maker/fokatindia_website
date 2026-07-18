import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Tag, ArrowLeft, Loader2, UploadCloud } from "lucide-react";
import api from "../../../api/axios";
import PartnerLayout from "../../../components/PartnerLayout";

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
  const [fetching, setFetching] = useState(true);
  const [file, setFile] = useState<File | null>(null);

  const [form, setForm] = useState<Category>({
    id: 0,
    name: "",
    description: "",
    imageUrl: "",
    displayOrder: 0,
    active: true,
    slug: "",
  });

  useEffect(() => {
    api
      .get(`/restful/v1/api/categories/${id}`)
      .then((res) => setForm(res.data?.data ?? res.data))
      .catch(() => alert("Failed to load category."))
      .finally(() => setFetching(false));
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("description", form.description);
      fd.append("displayOrder", String(form.displayOrder ?? 0));
      fd.append("slug", form.slug ?? "");
      fd.append("active", form.active ? "true" : "false");
      if (file) fd.append("file", file);

      await api.post(`/restful/v1/api/categories/update/${id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Category updated successfully!");
      navigate("/vendor/categories");
    } catch (err) {
      console.error(err);
      alert("Failed to update category.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <PartnerLayout role="VENDOR">
        <div className="flex items-center justify-center py-20 gap-2 text-gray-600">
          <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
          Loading category...
        </div>
      </PartnerLayout>
    );
  }

  return (
    <PartnerLayout role="VENDOR">
      <div className="p-4 max-w-2xl mx-auto">

        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate("/vendor/categories")}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Tag size={22} /> Edit Category
            </h1>
            <p className="text-gray-500 text-sm">Update category details</p>
          </div>
        </div>

        <form onSubmit={handleUpdate} className="space-y-5">
          <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
            <input
              placeholder="Category Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                placeholder="Slug"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="number"
                placeholder="Display Order"
                value={form.displayOrder}
                onChange={(e) =>
                  setForm({ ...form, displayOrder: Number(e.target.value) })
                }
                className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <select
              value={form.active ? "true" : "false"}
              onChange={(e) => setForm({ ...form, active: e.target.value === "true" })}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-5">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Category Image
            </label>
            <div
              onClick={() => document.getElementById("categoryFile")?.click()}
              className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition"
            >
              {file ? (
                <img
                  src={URL.createObjectURL(file)}
                  className="w-32 h-32 object-cover rounded-lg"
                />
              ) : form.imageUrl ? (
                <img
                  src={form.imageUrl}
                  className="w-32 h-32 object-cover rounded-lg"
                />
              ) : (
                <>
                  <UploadCloud size={32} className="text-gray-400 mb-2" />
                  <p className="text-gray-500 text-sm">Click to upload a new image</p>
                </>
              )}
            </div>
            <input
              id="categoryFile"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate("/vendor/categories")}
              className="flex-1 border border-gray-300 py-3 rounded-xl hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              {loading ? "Updating..." : "Update Category"}
            </button>
          </div>
        </form>
      </div>
    </PartnerLayout>
  );
}
