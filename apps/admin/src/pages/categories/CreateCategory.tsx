import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import {
  Tag,
  ArrowLeft,
  Loader2,
  UploadCloud
} from "lucide-react";

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

  const handleChange = (e: any) => {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      Object.entries(form).forEach(([k, v]) =>
        data.append(k, String(v))
      );

      if (file) data.append("image", file);

      const res = await api.post(`/restful/v1/api/categories/create`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(res.data.message);
      navigate("/categories");
    } catch (err: any) {
      alert(err?.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center py-12">

      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Tag /> Create Category
            </h1>
            <p className="text-sm opacity-80">
              Add new service category
            </p>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="bg-white/20 hover:bg-white/30 p-2 rounded-lg"
          >
            <ArrowLeft />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          {/* NAME */}
          <input
            name="name"
            placeholder="Category Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />

          {/* DESCRIPTION */}
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl min-h-[100px] focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />

          {/* SLUG + ORDER */}
          <div className="grid grid-cols-2 gap-4">
            <input
              name="slug"
              placeholder="Slug"
              value={form.slug}
              onChange={handleChange}
              className="border p-3 rounded-xl"
              required
            />

            <input
              type="number"
              name="displayOrder"
              value={form.displayOrder}
              onChange={handleChange}
              className="border p-3 rounded-xl"
            />
          </div>

          {/* FILE UPLOAD DROPZONE */}
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer">

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFile(e.target.files?.[0] || null)
              }
              className="hidden"
              id="fileInput"
              required
            />

            <label htmlFor="fileInput" className="cursor-pointer">
              <UploadCloud className="mx-auto text-blue-500 w-10 h-10" />
              <p className="mt-2 font-medium">
                Click to upload image
              </p>
              <p className="text-xs text-gray-500">
                PNG, JPG, JPEG
              </p>
            </label>

            {/* PREVIEW */}
            {file && (
              <div className="mt-4">
                <img
                  src={URL.createObjectURL(file)}
                  className="w-32 h-32 object-cover rounded-xl mx-auto border"
                />
                <p className="text-xs mt-2 text-gray-500">
                  {file.name}
                </p>
              </div>
            )}
          </div>

          {/* SUBMIT */}
          <button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl flex justify-center gap-2 font-semibold"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Tag />
                Create Category
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}