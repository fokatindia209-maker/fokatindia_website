import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PartnerLayout from "../../../components/PartnerLayout";
import api from "../../../api/axios";

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
  taxPercentage: number;
  taxAmount: number;
  finalPrice: number;
}

export default function SubVendorServiceList() {
  const navigate = useNavigate();

  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

        const user = JSON.parse(localStorage.getItem("user") || "{}");

  const fetchServices = async () => {
    try {
      setLoading(true);

      const response = await api.get(
        `/restful/v1/api/services/subVendors/${user.subVendorId}`
      );

      console.log("Services Response:", response.data);

      setServices(response.data?.data || []);
    } catch (error) {
      console.error("Failed to load services", error);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const toggleStatus = async (
    serviceId: number,
    currentStatus: boolean
  ) => {
    try {
      await api.put(
        `/restful/v1/api/services/${serviceId}/status`,
        {
          active: !currentStatus,
        }
      );

      fetchServices();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PartnerLayout role="SUB_VENDOR">
      <div className="p-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">
              My Services
            </h1>

            <p className="text-gray-500 text-sm">
              Manage all vendor services
            </p>
          </div>

          <button
            onClick={() =>
              navigate("/vendor/services/create")
            }
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            + Add Service
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Service</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">
                  Discount Price
                </th>
                <th className="p-3 text-left">
                  Final Price
                </th>
                <th className="p-3 text-left">
                  Duration
                </th>
                <th className="p-3 text-left">
                  Bookings
                </th>
                <th className="p-3 text-left">
                  Rating
                </th>
                <th className="p-3 text-left">
                  Status
                </th>
                <th className="p-3 text-left">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td
                    colSpan={12}
                    className="text-center p-8"
                  >
                    <div className="flex justify-center items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Loading services...
                    </div>
                  </td>
                </tr>
              )}

              {!loading &&
                services.map((service) => (
                  <tr
                    key={service.id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="p-3">
                      {service.id}
                    </td>

                    <td className="p-3">
                      <img
                        src={service.imageUrl}
                        alt={service.name}
                        className="w-14 h-14 rounded-lg object-cover"
                      />
                    </td>

                    <td className="p-3 font-medium">
                      {service.name}
                    </td>

                    <td className="p-3">
                      {service.categoryName}
                    </td>

                    <td className="p-3">
                      ₹{service.price}
                    </td>

                    <td className="p-3 text-green-600 font-semibold">
                      ₹{service.discountedPrice}
                    </td>

                    <td className="p-3 text-blue-600 font-semibold">
                      ₹{service.finalPrice}
                    </td>

                    <td className="p-3">
                      {service.durationMinutes} min
                    </td>

                    <td className="p-3">
                      {service.totalBookings}
                    </td>

                    <td className="p-3">
                      ⭐ {service.rating}
                    </td>

                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          service.active
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {service.active
                          ? "ACTIVE"
                          : "INACTIVE"}
                      </span>
                    </td>

                    <td className="p-3 flex gap-2">
                      <button
                        onClick={() =>
                          navigate(
                            `/vendor/services/edit/${service.id}`
                          )
                        }
                        className="px-3 py-1 rounded bg-blue-600 text-white"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          toggleStatus(
                            service.id,
                            service.active
                          )
                        }
                        className={`px-3 py-1 rounded text-white ${
                          service.active
                            ? "bg-yellow-500"
                            : "bg-green-600"
                        }`}
                      >
                        {service.active
                          ? "Deactivate"
                          : "Activate"}
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {!loading &&
            services.length === 0 && (
              <div className="text-center py-10 text-gray-500">
                No services found
              </div>
            )}
        </div>
      </div>
    </PartnerLayout>
  );
}