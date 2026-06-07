import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Loader2, Eye, UserX } from "lucide-react";
import PartnerLayout from "../../../components/PartnerLayout";

const API = import.meta.env.VITE_API_URL;

interface SubVendor {
  userId: number;
  subVendorId: number;
  vendorId: number;
  specialization: string;
  experienceYears: number;
  availabilityStatus: string;
  rating: number;
  createdAt: string;
}

export default function VendorSubVendorList() {
  const [subVendors, setSubVendors] = useState<SubVendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);

  const navigate = useNavigate();

  const fetchSubVendors = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API}/restful/v1/api/vendor/subvendors`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setSubVendors(res.data.data || []);
    } catch (error) {
      console.error(error);
      setSubVendors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubVendors();
  }, []);

  const deactivateSubVendor = async (id: number) => {
    try {
      setActionLoadingId(id);

      await axios.put(
        `${API}/restful/v1/api/subvendors/${id}/deactivate`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      fetchSubVendors();
    } catch (error) {
      console.error(error);
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
        <PartnerLayout>
    <div className="p-4 space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">
            My Sub Vendors
          </h1>
          <p className="text-gray-500">
            Manage your workers and teams
          </p>
        </div>

        <button
          onClick={() => navigate("/vendor/subvendors/create")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
        >
          + Add Sub Vendor
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">

            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Specialization</th>
                <th className="p-4 text-left">Experience</th>
                <th className="p-4 text-left">Rating</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Joined</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>

              {loading && (
                <tr>
                  <td colSpan={7} className="p-8 text-center">
                    <div className="flex justify-center items-center gap-2">
                      <Loader2 className="animate-spin h-5 w-5 text-blue-600" />
                      Loading Sub Vendors...
                    </div>
                  </td>
                </tr>
              )}

              {!loading && subVendors.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center p-8 text-gray-500"
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
                    <td className="p-4">
                      #{subVendor.subVendorId}
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
                          subVendor.availabilityStatus === "AVAILABLE"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {subVendor.availabilityStatus}
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
                          className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg"
                        >
                          <Eye size={16} />
                          View
                        </button>

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
                          className="flex items-center gap-1 px-3 py-2 bg-yellow-500 text-white rounded-lg disabled:opacity-50"
                        >
                          <UserX size={16} />

                          {actionLoadingId ===
                          subVendor.subVendorId
                            ? "Loading..."
                            : "Deactivate"}
                        </button>

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