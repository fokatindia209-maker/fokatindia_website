import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, Briefcase } from "lucide-react";

export default function CreateService() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    categoryId: "",
    name: "",
    description: "",
    price: "",
    discountedPrice: "",
    durationMinutes: "",
    serviceCode: "",
    serviceType: "",
    slug: "",
    featured: true,
    active: true,
  });

  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      // text fields
      data.append("categoryId", form.categoryId);
      data.append("name", form.name);
      data.append("description", form.description);
      data.append("price", form.price);
      data.append("discountedPrice", form.discountedPrice);
      data.append("durationMinutes", form.durationMinutes);
      data.append("serviceType", form.serviceType);
      data.append("slug", form.slug);
      data.append("featured", String(form.featured));
      data.append("active", String(form.active));

      if (form.serviceCode) {
        data.append("serviceCode", form.serviceCode);
      }

      // file (IMPORTANT)
      if (file) {
        data.append("file", file);
      }

      await api.post(`/restful/v1/api/services`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Service created successfully");
      navigate("/services");
    } catch (err) {
      console.error(err);
      alert("Failed to create service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8">

        {/* HEADER */}
        <div className="flex justify-between mb-6">
          <div className="flex items-center gap-3">
            <Briefcase className="text-blue-600" />
            <h1 className="text-2xl font-bold">Create Service</h1>
          </div>

          <button onClick={() => navigate(-1)}>
            <ArrowLeft />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <input name="categoryId" placeholder="Category ID" onChange={handleChange} className="border p-3 w-full rounded-xl" />

          <input name="name" placeholder="Service Name" onChange={handleChange} className="border p-3 w-full rounded-xl" />

          <textarea name="description" placeholder="Description" onChange={handleChange} className="border p-3 w-full rounded-xl" />

          <div className="grid grid-cols-2 gap-4">
            <input name="price" placeholder="Price" onChange={handleChange} className="border p-3 rounded-xl" />
            <input name="discountedPrice" placeholder="Discount Price" onChange={handleChange} className="border p-3 rounded-xl" />
          </div>

          <input name="durationMinutes" placeholder="Duration" onChange={handleChange} className="border p-3 w-full rounded-xl" />

          <input name="serviceType" placeholder="Service Type" onChange={handleChange} className="border p-3 w-full rounded-xl" />

          <input name="slug" placeholder="Slug" onChange={handleChange} className="border p-3 w-full rounded-xl" />

          <input name="serviceCode" placeholder="Service Code" onChange={handleChange} className="border p-3 w-full rounded-xl" />

          {/* FILE UPLOAD */}
          <div>
            <label className="block mb-2 font-medium">Service Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="border p-3 w-full rounded-xl"
              required
            />
          </div>

          {/* CHECKBOX */}
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
              Featured
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" name="active" checked={form.active} onChange={handleChange} />
              Active
            </label>
          </div>

          {/* SUBMIT */}
          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-xl flex justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" />
                Creating...
              </>
            ) : (
              "Create Service"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}