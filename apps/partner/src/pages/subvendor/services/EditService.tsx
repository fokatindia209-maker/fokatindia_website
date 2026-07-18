import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import PartnerLayout from "../../../components/PartnerLayout";
import api from "../../../api/axios";

interface Category {
  id: number;
  name: string;
}

interface ServiceData {
  id: number;
  categoryId: number;
  categoryName: string;
  name: string;
  description: string;
  price: number;
  discountedPrice: number;
  durationMinutes: number;
  imageUrl: string;
  featured: boolean;
  active: boolean;
  serviceType: string;
}

export default function EditService() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    categoryId: "",
    name: "",
    description: "",
    price: "",
    discountedPrice: "",
    durationMinutes: "",
    serviceType: "HOME",
    featured: false,
    active: true,
    slug: "",
  });

  useEffect(() => {
    Promise.all([
      api.get("/restful/v1/api/categories"),
      api.get(`/restful/v1/api/services/${id}`),
    ])
      .then(([catRes, svcRes]) => {
        setCategories(catRes.data?.data || []);
        const s: ServiceData = svcRes.data?.data;
        if (s) {
          setForm({
            categoryId: String(s.categoryId),
            name: s.name || "",
            description: s.description || "",
            price: String(s.price),
            discountedPrice: String(s.discountedPrice),
            durationMinutes: String(s.durationMinutes),
            serviceType: s.serviceType || "HOME",
            featured: s.featured ?? false,
            active: s.active ?? true,
            slug: "",
          });
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await api.put(`/restful/v1/api/services/${id}`, {
        categoryId: Number(form.categoryId),
        name: form.name,
        description: form.description,
        price: Number(form.price),
        discountedPrice: Number(form.discountedPrice),
        durationMinutes: Number(form.durationMinutes),
        serviceType: form.serviceType,
        featured: form.featured,
        active: form.active,
        slug: form.slug || undefined,
      });
      alert("Service updated successfully!");
      navigate("/subvendor/services");
    } catch (err) {
      console.error(err);
      alert("Failed to update service.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <PartnerLayout role="SUB_VENDOR">
        <div className="flex items-center justify-center py-20 gap-2 text-gray-600">
          <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
          Loading service...
        </div>
      </PartnerLayout>
    );
  }

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
            <h1 className="text-2xl font-bold">Edit Service</h1>
            <p className="text-gray-500 text-sm">Update service details</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

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
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm">Featured</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={(e) => setForm({ ...form, active: e.target.checked })}
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
              {submitting ? "Saving..." : "Save Changes"}
            </button>
          </div>

        </form>
      </div>
    </PartnerLayout>
  );
}
