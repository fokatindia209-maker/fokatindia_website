import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tag, ArrowLeft, Loader2, UploadCloud } from "lucide-react";
import api from "../../../api/axios";
import PartnerLayout from "../../../components/PartnerLayout";

export default function CreateCategory() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    slug: "",
    displayOrder: 1,
    active: true,
  });

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert("Please upload a category image.");
      return;
    }

    try {
      setLoading(true);

      const user = JSON.parse(localStorage.getItem("user") || "{}");

      const data = new FormData();
      Object.entries(form).forEach(([k, v]) => data.append(k, String(v)));
      data.append("file", file);
      if (user.vendorId) data.append("vendorId", String(user.vendorId));

      await api.post("/restful/v1/api/categories/create", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Category created successfully!");
      navigate("/vendor/categories");
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to create category.");
    } finally {
      setLoading(false);
    }
  };

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
              <Tag size={22} /> Create Category
            </h1>
            <p className="text-gray-500 text-sm">Add a new service category</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
            <input
              name="name"
              placeholder="Category Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              required
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                name="slug"
                placeholder="Slug"
                value={form.slug}
                onChange={handleChange}
                required
                className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="number"
                name="displayOrder"
                value={form.displayOrder}
                onChange={handleChange}
                className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-5">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Category Image <span className="text-red-500">*</span>
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
              ) : (
                <>
                  <UploadCloud size={32} className="text-gray-400 mb-2" />
                  <p className="text-gray-500 text-sm">Click to upload image</p>
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
              {loading ? "Creating..." : "Create Category"}
            </button>
          </div>
        </form>
      </div>
    </PartnerLayout>
  );
}
