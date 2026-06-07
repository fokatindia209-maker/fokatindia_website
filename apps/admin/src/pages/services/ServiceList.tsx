import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const API = import.meta.env.VITE_API_URL;

interface Service {
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
  rating: number;
  totalBookings: number;
  serviceType: string;
  createdAt: string;
}

export default function ServiceList() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchServices = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API}/restful/v1/api/services`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setServices(res.data.data || []);
    } catch (err) {
      console.error("Error fetching services", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const deleteService = async (id: number) => {
    if (!confirm("Delete this service?")) return;

    await axios.delete(`${API}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    fetchServices();
  };

  const deactivateService = async (id: number) => {
    await axios.put(
      `${API}/${id}/deactivate`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    fetchServices();
  };

  return (
    <div className="py-12">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Services</h1>

        <button
          onClick={() => navigate("/services/create")}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          + Create Service
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full text-sm">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Discount</th>
              <th className="p-3 text-left">Duration</th>
              <th className="p-3 text-left">Rating</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {/* ✅ LOADER ROW (below header) */}
            {loading && (
              <tr>
                <td colSpan={11} className="p-6">
                  <div className="flex items-center justify-center gap-2 text-blue-600">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Loading services...
                  </div>
                </td>
              </tr>
            )}

            {/* DATA ROWS */}
            {!loading &&
              services.map((s) => (
                <tr key={s.id} className="border-t">

                  <td className="p-3">{s.id}</td>
                  <td className="p-3 font-medium">{s.name}</td>
                  <td className="p-3">{s.categoryName}</td>
                  <td className="p-3">{s.serviceType}</td>
                  <td className="p-3">₹{s.price}</td>

                  <td className="p-3">
                    <button
                      onClick={() => window.open(s.imageUrl, "_blank")}
                      className="text-blue-600 underline"
                    >
                      View Image
                    </button>
                  </td>

                  <td className="p-3 text-green-600 font-semibold">
                    ₹{s.discountedPrice}
                  </td>

                  <td className="p-3">{s.durationMinutes} min</td>
                  <td className="p-3">{s.rating} ⭐</td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        s.active
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {s.active ? "ACTIVE" : "INACTIVE"}
                    </span>
                  </td>

                  <td className="p-3 flex gap-2">

                    <button
                      onClick={() => navigate(`/services/edit/${s.id}`)}
                      className="px-3 py-1 bg-blue-500 text-white rounded"
                    >
                      View/Edit
                    </button>

                    <button
                      onClick={() => deactivateService(s.id)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded"
                    >
                      Deactivate
                    </button>

                    <button
                      onClick={() => deleteService(s.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>

                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* EMPTY STATE */}
        {!loading && services.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No services found
          </div>
        )}
      </div>
    </div>
  );
}
