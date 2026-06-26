import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Eye, UserX, Plus } from "lucide-react";
import PartnerLayout from "../../../components/PartnerLayout";
import api from "../../../api/axios";

interface SubVendor {
  userId: number;
  subVendorId: number;
  vendorId: number;

  name: string;
  email: string;
  phone: string;

  specialization: string;
  experienceYears: number;

  rating: number;

  availabilityStatus: string;
  status: string;

  latitude: number;
  longitude: number;
  serviceRadiusKm: number;

  createdAt: string;
}

export default function VendorSubVendorList() {
  const navigate = useNavigate();

  const [subVendors, setSubVendors] = useState<SubVendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);

  const fetchSubVendors = async () => {
    try {
      setLoading(true);

      // Change endpoint if needed
      const user = JSON.parse(localStorage.getItem("user") || "{}");


      const response = await api.get(
        `/restful/v1/api/subvendors/vendor/${user.vendorId}`
      );

      setSubVendors(response.data?.data || []);
    } catch (error) {
      console.error("Failed to fetch sub vendors:", error);
      setSubVendors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubVendors();
  }, []);

  const deactivateSubVendor = async (subVendorId: number) => {
    const confirmDeactivate = window.confirm(
      "Are you sure you want to deactivate this sub vendor?"
    );

    if (!confirmDeactivate) return;

    try {
      setActionLoadingId(subVendorId);

      await api.put(
        `/restful/v1/api/subvendors/${subVendorId}/deactivate`
      );

      await fetchSubVendors();
    } catch (error) {
      console.error("Deactivate failed:", error);
      alert("Failed to deactivate sub vendor");
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <PartnerLayout role="VENDOR">
      <div className="p-6 space-y-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">
              My Sub Vendors
            </h1>

            <p className="text-gray-500 mt-1">
              Manage your workers and service teams
            </p>
          </div>

          <button
            onClick={() =>
              navigate("/vendor/subvendors/create")
            }
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
          >
            <Plus size={18} />
            Add Sub Vendor
          </button>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">

              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-4 text-left">ID</th>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Phone</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Specialization</th>
                  <th className="p-4 text-left">Experience</th>
                  <th className="p-4 text-left">Rating</th>
                  <th className="p-4 text-left">Availability</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Joined</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>

                {loading && (
                  <tr>
                    <td
                      colSpan={11}
                      className="p-10 text-center"
                    >
                      <div className="flex items-center justify-center gap-3">
                        <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                        Loading Sub Vendors...
                      </div>
                    </td>
                  </tr>
                )}

                {!loading && subVendors.length === 0 && (
                  <tr>
                    <td
                      colSpan={11}
                      className="p-10 text-center text-gray-500"
                    >
                      No Sub Vendors Found
                    </td>
                  </tr>
                )}

                {!loading &&
                  subVendors.map((subVendor) => (
                    <tr
                      key={subVendor.subVendorId}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="p-4 font-medium">
                        #{subVendor.subVendorId}
                      </td>

                      <td className="p-4">
                        {subVendor.name}
                      </td>

                      <td className="p-4">
                        {subVendor.phone}
                      </td>

                      <td className="p-4">
                        {subVendor.email}
                      </td>

                      <td className="p-4">
                        {subVendor.specialization}
                      </td>

                      <td className="p-4">
                        {subVendor.experienceYears} Years
                      </td>

                      <td className="p-4">
                        ⭐ {subVendor.rating}
                      </td>

                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            subVendor.availabilityStatus ===
                            "AVAILABLE"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {subVendor.availabilityStatus}
                        </span>
                      </td>

                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            subVendor.status === "ACTIVE"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {subVendor.status}
                        </span>
                      </td>

                      <td className="p-4">
                        {new Date(
                          subVendor.createdAt
                        ).toLocaleDateString()}
                      </td>

                      <td className="p-4">
                        <div className="flex gap-2">

                          <button
                            onClick={() =>
                              navigate(
                                `/vendor/subvendors/${subVendor.subVendorId}`
                              )
                            }
                            className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                          >
                            <Eye size={16} />
                            View
                          </button>

                          {subVendor.status === "ACTIVE" && (
                            <button
                              disabled={
                                actionLoadingId ===
                                subVendor.subVendorId
                              }
                              onClick={() =>
                                deactivateSubVendor(
                                  subVendor.subVendorId
                                )
                              }
                              className="flex items-center gap-2 px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg disabled:opacity-50"
                            >
                              <UserX size={16} />

                              {actionLoadingId ===
                              subVendor.subVendorId
                                ? "Loading..."
                                : "Deactivate"}
                            </button>
                          )}

                        </div>
                      </td>
                    </tr>
                  ))}

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PartnerLayout>
  );
}