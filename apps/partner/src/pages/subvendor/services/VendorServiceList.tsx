import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import PartnerLayout from "../../../components/PartnerLayout";

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

export default function VendorServiceList() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchServices = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API}/restful/v1/vendor/services`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setServices(res.data.data || []);
    } catch (err) {
      console.error(err);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const toggleStatus = async (
    id: number,
    active: boolean
  ) => {
    try {
      await axios.put(
        `${API}/restful/v1/vendor/services/${id}/status`,
        {
          active: !active,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      fetchServices();
    } catch (err) {
      console.error(err);
    }
  };

  return (
        <PartnerLayout>
    <div className="py-10 px-4">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">
            My Services
          </h1>

          <p className="text-sm text-gray-500">
            Manage your cleaning services
          </p>
        </div>

        <button
          onClick={() => navigate("/vendor/services/create")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          + Add Service
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Service</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Offer Price</th>
              <th className="p-3 text-left">Duration</th>
              <th className="p-3 text-left">Bookings</th>
              <th className="p-3 text-left">Rating</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan={11} className="p-6">
                  <div className="flex justify-center items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                    Loading services...
                  </div>
                </td>
              </tr>
            )}

            {!loading &&
              services.map((s) => (
                <tr
                  key={s.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-3">{s.id}</td>

                  <td className="p-3">
                    {s.imageUrl ? (
                      <img
                        src={s.imageUrl}
                        alt={s.name}
                        className="w-12 h-12 rounded object-cover cursor-pointer"
                        onClick={() =>
                          window.open(
                            s.imageUrl,
                            "_blank"
                          )
                        }
                      />
                    ) : (
                      "-"
                    )}
                  </td>

                  <td className="p-3 font-medium">
                    {s.name}
                  </td>

                  <td className="p-3">
                    {s.categoryName}
                  </td>

                  <td className="p-3">
                    ₹{s.price}
                  </td>

                  <td className="p-3 text-green-600 font-semibold">
                    ₹{s.discountedPrice}
                  </td>

                  <td className="p-3">
                    {s.durationMinutes} min
                  </td>

                  <td className="p-3">
                    {s.totalBookings}
                  </td>

                  <td className="p-3">
                    ⭐ {s.rating}
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        s.active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {s.active
                        ? "ACTIVE"
                        : "INACTIVE"}
                    </span>
                  </td>

                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() =>
                        navigate(
                          `/vendor/services/edit/${s.id}`
                        )
                      }
                      className="px-3 py-1 bg-blue-600 text-white rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        toggleStatus(
                          s.id,
                          s.active
                        )
                      }
                      className={`px-3 py-1 rounded text-white ${
                        s.active
                          ? "bg-yellow-500"
                          : "bg-green-600"
                      }`}
                    >
                      {s.active
                        ? "Deactivate"
                        : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {!loading && services.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No services found
          </div>
        )}
      </div>
    </div>
    </PartnerLayout>
  );
}