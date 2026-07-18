import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, Loader2 } from "lucide-react";
import PartnerLayout from "../../../components/PartnerLayout";
import api from "../../../api/axios";

interface Category {
  id: number;
  name: string;
}

export default function AddService() {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const [form, setForm] = useState({
    categoryId: "",
    name: "",
    description: "",
    price: "",
    discountedPrice: "",
    durationMinutes: "",
    serviceType: "HOME",
    featured: "false",
    active: "true",
    slug: "",
  });

  useEffect(() => {
    api
      .get("/restful/v1/api/categories")
      .then((res) => setCategories(res.data?.data || []))
      .catch(() => setCategories([]));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];

    if (!form.categoryId || !form.name || !form.price || !form.discountedPrice || !form.durationMinutes) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setSubmitting(true);
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      const fd = new FormData();
      fd.append("categoryId", form.categoryId);
      fd.append("name", form.name);
      fd.append("description", form.description);
      fd.append("price", form.price);
      fd.append("discountedPrice", form.discountedPrice);
      fd.append("durationMinutes", form.durationMinutes);
      fd.append("serviceType", form.serviceType);
      fd.append("featured", form.featured);
      fd.append("active", form.active);
      if (form.slug) fd.append("slug", form.slug);
      if (file) fd.append("file", file);
      if (user.subVendorId) fd.append("subVendorId", String(user.subVendorId));

      await api.post("/restful/v1/api/services", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Service created successfully!");
      navigate("/subvendor/services");
    } catch (err) {
      console.error(err);
      alert("Failed to create service. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PartnerLayout role="SUB_VENDOR">
      <div className="p-4 max-w-2xl mx-auto">

        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate("/subvendor/services")}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold">Add New Service</h1>
            <p className="text-gray-500 text-sm">Fill in the details to create a service</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Image Upload */}
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Service Image
            </label>
            <div
              onClick={() => fileRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition"
            >
              {preview ? (
                <img src={preview} className="w-32 h-32 object-cover rounded-lg" />
              ) : (
                <>
                  <Upload size={32} className="text-gray-400 mb-2" />
                  <p className="text-gray-500 text-sm">Click to upload image</p>
                </>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {/* Basic Info */}
          <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
            <h2 className="font-semibold text-gray-800">Basic Information</h2>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="categoryId"
                value={form.categoryId}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Service Name <span className="text-red-500">*</span>
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="e.g. Deep Home Cleaning"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                placeholder="Describe your service..."
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Slug (URL identifier)
              </label>
              <input
                name="slug"
                value={form.slug}
                onChange={handleChange}
                placeholder="e.g. deep-home-cleaning"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
            <h2 className="font-semibold text-gray-800">Pricing & Duration</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Price (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.price}
                  onChange={handleChange}
                  required
                  placeholder="0.00"
                  className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Discounted Price (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  name="discountedPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.discountedPrice}
                  onChange={handleChange}
                  required
                  placeholder="0.00"
                  className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Duration (minutes) <span className="text-red-500">*</span>
              </label>
              <input
                name="durationMinutes"
                type="number"
                min="1"
                value={form.durationMinutes}
                onChange={handleChange}
                required
                placeholder="60"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Settings */}
          <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
            <h2 className="font-semibold text-gray-800">Settings</h2>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Service Type
              </label>
              <select
                name="serviceType"
                value={form.serviceType}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="HOME">Home</option>
                <option value="OFFICE">Office</option>
                <option value="COMMERCIAL">Commercial</option>
              </select>
            </div>

            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.featured === "true"}
                  onChange={(e) =>
                    setForm({ ...form, featured: e.target.checked ? "true" : "false" })
                  }
                  className="w-4 h-4"
                />
                <span className="text-sm">Featured</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.active === "true"}
                  onChange={(e) =>
                    setForm({ ...form, active: e.target.checked ? "true" : "false" })
                  }
                  className="w-4 h-4"
                />
                <span className="text-sm">Active</span>
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate("/subvendor/services")}
              className="flex-1 border border-gray-300 py-3 rounded-xl hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {submitting && <Loader2 size={16} className="animate-spin" />}
              {submitting ? "Creating..." : "Create Service"}
            </button>
          </div>

        </form>
      </div>
    </PartnerLayout>
  );
}
