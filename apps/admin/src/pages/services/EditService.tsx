import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  Briefcase,
  Save,
  ArrowLeft,
  Loader2,
} from "lucide-react";

interface Service {
  id: number;
  name: string;
  description?: string;
  price: number;
  discountedPrice?: number;
  durationMinutes: number;
  categoryId?: number;
  imageUrl?: string;
  serviceCode?: string;
  serviceType?: string;
  slug?: string;
  featured?: boolean;
  active?: boolean;
}

export default function EditService() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<Service>({
    id: 0,
    name: "",
    description: "",
    price: 0,
    discountedPrice: 0,
    durationMinutes: 0,
    categoryId: 0,
    imageUrl: "",
    serviceCode: "",
    serviceType: "",
    slug: "",
    featured: false,
    active: true,
  });

  // ============================================
  // FETCH SERVICE
  // ============================================
  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);

        const res = await api.get(`/restful/v1/api/services/${id}`);

        setForm(res.data.data || res.data);
      } catch (err) {
        console.error("Error fetching service", err);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  // ============================================
  // UPDATE SERVICE
  // ============================================
  const handleUpdate = async () => {
    try {
      setLoading(true);

      await api.put(`/restful/v1/api/services/${id}`, {
        ...form,
        price: Number(form.price),
        discountedPrice: Number(form.discountedPrice),
        durationMinutes: Number(form.durationMinutes),
        categoryId: Number(form.categoryId),
      });

      alert("Service updated successfully");
      navigate("/services");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 px-4 bg-gray-100 min-h-screen">

      {/* BACK */}
      <button
        onClick={() => navigate("/services")}
        className="flex items-center gap-2 text-gray-600 hover:text-black mb-6"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      {/* CARD */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Briefcase size={24} />
            </div>

            <div>
              <h2 className="text-xl font-bold">
                Edit Service
              </h2>
              <p className="text-sm text-blue-100">
                Update service details
              </p>
            </div>
          </div>
        </div>

        {/* FORM */}
        <div className="p-6 grid grid-cols-2 gap-4">

          <input
            placeholder="Service Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="border p-3 rounded-xl col-span-2"
          />

          <input
            placeholder="Category ID"
            value={form.categoryId}
            onChange={(e) =>
              setForm({ ...form, categoryId: Number(e.target.value) })
            }
            className="border p-3 rounded-xl"
          />

          <input
            placeholder="Price"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: Number(e.target.value) })
            }
            className="border p-3 rounded-xl"
          />

          <input
            placeholder="Discounted Price"
            value={form.discountedPrice}
            onChange={(e) =>
              setForm({ ...form, discountedPrice: Number(e.target.value) })
            }
            className="border p-3 rounded-xl"
          />

          <input
            placeholder="Duration Minutes"
            value={form.durationMinutes}
            onChange={(e) =>
              setForm({ ...form, durationMinutes: Number(e.target.value) })
            }
            className="border p-3 rounded-xl"
          />

          <input
            placeholder="Service Code"
            value={form.serviceCode}
            onChange={(e) =>
              setForm({ ...form, serviceCode: e.target.value })
            }
            className="border p-3 rounded-xl"
          />

          <input
            placeholder="Service Type"
            value={form.serviceType}
            onChange={(e) =>
              setForm({ ...form, serviceType: e.target.value })
            }
            className="border p-3 rounded-xl"
          />

          <input
            placeholder="Slug"
            value={form.slug}
            onChange={(e) =>
              setForm({ ...form, slug: e.target.value })
            }
            className="border p-3 rounded-xl"
          />

          <input
            placeholder="Image URL"
            value={form.imageUrl}
            onChange={(e) =>
              setForm({ ...form, imageUrl: e.target.value })
            }
            className="border p-3 rounded-xl col-span-2"
          />

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            className="border p-3 rounded-xl col-span-2"
          />

          {/* BUTTON */}
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Update Service
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}