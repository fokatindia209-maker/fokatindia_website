import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Loader2,
  Briefcase
} from "lucide-react";


const API = import.meta.env.VITE_API_URL;
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
    imageUrl: "",
    serviceCode: "",
    serviceType: "",
    slug: "",
    featured: true,
    active: true,
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post(
        `${API}/restful/v1/api/services`,
        {
          categoryId: Number(form.categoryId),
          name: form.name,
          description: form.description,
          price: Number(form.price),
          discountedPrice: Number(form.discountedPrice),
          durationMinutes: Number(form.durationMinutes),
          imageUrl: form.imageUrl,
          serviceCode: form.serviceCode,
          featured: form.featured,
          active: form.active,
          serviceType: form.serviceType,
          slug: form.slug,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

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
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-xl">
              <Briefcase className="w-7 h-7 text-blue-600" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Create Service
              </h1>
              <p className="text-sm text-gray-500">
                Add new service (Full API supported)
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="categoryId"
            placeholder="Category ID"
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          <input
            name="name"
            placeholder="Service Name"
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              name="price"
              type="number"
              placeholder="Price"
              onChange={handleChange}
              className="border p-3 rounded-xl"
            />

            <input
              name="discountedPrice"
              type="number"
              placeholder="Discount Price"
              onChange={handleChange}
              className="border p-3 rounded-xl"
            />
          </div>

          <input
            name="durationMinutes"
            type="number"
            placeholder="Duration (minutes)"
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          <input
            name="imageUrl"
            placeholder="Image URL"
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          <input
            name="serviceCode"
            placeholder="Service Code (HC001)"
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          <input
            name="serviceType"
            placeholder="Service Type (HOME_CLEANING)"
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          <input
            name="slug"
            placeholder="Slug"
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          {/* CHECKBOXES */}
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
              />
              Featured
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="active"
                checked={form.active}
                onChange={handleChange}
              />
              Active
            </label>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
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