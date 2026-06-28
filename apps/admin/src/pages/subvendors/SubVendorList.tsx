import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

interface SubVendor {
  userId: number;
  subVendorId: number;
  vendorId: number;

  specialization: string;
  experienceYears: number;
  availabilityStatus: string;
  rating: number;
  createdAt: string;

  name: string;
  email: string;
  phone: string;
  status: string;

  latitude: number;
  longitude: number;
  serviceRadiusKm: number;
  distanceKm: number;
}

export default function SubVendorList() {
  const [subVendors, setSubVendors] = useState<SubVendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);

  const navigate = useNavigate();

  // =======================
  // FETCH
  // =======================
  const fetchSubVendors = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/restful/v1/api/subvendors`);

      setSubVendors(res.data.data || []);
    } catch (err) {
      console.error(err);
      setSubVendors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubVendors();
  }, []);

  // =======================
  // DELETE
  // =======================
  const deleteSubVendor = async (id: number) => {
    if (!confirm("Delete this sub vendor?")) return;

    try {
      setActionLoadingId(id);

      await api.delete(`/restful/v1/api/subvendors/${id}`);

      await fetchSubVendors();
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoadingId(null);
    }
  };

  // =======================
  // DEACTIVATE
  // =======================
  const deactivateSubVendor = async (id: number) => {
    try {
      setActionLoadingId(id);

      await api.put(`/restful/v1/api/subvendors/${id}/deactivate`, {});

      await fetchSubVendors();
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Sub Vendors
        </h1>

        <button
          onClick={() => navigate("/subvendors/create")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          + Create SubVendor
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">

        <table className="min-w-[2200px] w-full text-sm">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">SubVendor ID</th>
              <th className="p-3 text-left">User ID</th>
              <th className="p-3 text-left">Vendor ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">User Status</th>
              <th className="p-3 text-left">Specialization</th>
              <th className="p-3 text-left">Experience</th>
              <th className="p-3 text-left">Rating</th>
              <th className="p-3 text-left">Availability</th>
              <th className="p-3 text-left">Latitude</th>
              <th className="p-3 text-left">Longitude</th>
              <th className="p-3 text-left">Radius KM</th>
              <th className="p-3 text-left">Distance KM</th>
              <th className="p-3 text-left">Created At</th>
              <th className="p-3 text-left">Actions</th>
            </tr>

            {loading && (
              <tr>
                <td colSpan={17} className="p-6">
                  <div className="flex justify-center items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                    Loading sub vendors...
                  </div>
                </td>
              </tr>
            )}
          </thead>

          <tbody>

            {!loading && subVendors.length === 0 && (
              <tr>
                <td
                  colSpan={17}
                  className="text-center py-8 text-gray-500"
                >
                  No sub vendors found
                </td>
              </tr>
            )}

            {!loading &&
              subVendors.map((c) => (
                <tr
                  key={c.subVendorId}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-3">
                    {c.subVendorId}
                  </td>

                  <td className="p-3">
                    {c.userId}
                  </td>

                  <td className="p-3">
                    {c.vendorId}
                  </td>

                  <td className="p-3 font-medium">
                    {c.name || "-"}
                  </td>

                  <td className="p-3">
                    {c.email || "-"}
                  </td>

                  <td className="p-3">
                    {c.phone || "-"}
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        c.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {c.status || "-"}
                    </span>
                  </td>

                  <td className="p-3">
                    {c.specialization}
                  </td>

                  <td className="p-3">
                    {c.experienceYears} yrs
                  </td>

                  <td className="p-3">
                    ⭐ {c.rating}
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        c.availabilityStatus === "AVAILABLE"
                          ? "bg-green-100 text-green-700"
                          : c.availabilityStatus === "BUSY"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {c.availabilityStatus}
                    </span>
                  </td>

                  <td className="p-3">
                    {c.latitude ?? "-"}
                  </td>

                  <td className="p-3">
                    {c.longitude ?? "-"}
                  </td>

                  <td className="p-3">
                    {c.serviceRadiusKm ?? "-"} KM
                  </td>

                  <td className="p-3">
                    {c.distanceKm
                      ? `${c.distanceKm.toFixed(2)} KM`
                      : "-"}
                  </td>

                  <td className="p-3">
                    {new Date(
                      c.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-3">
                    <div className="flex gap-2">

                      <button
                        onClick={() =>
                          navigate(
                            `/subvendors/edit/${c.subVendorId}`
                          )
                        }
                        className="px-3 py-1 bg-blue-500 text-white rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          deactivateSubVendor(
                            c.subVendorId
                          )
                        }
                        disabled={
                          actionLoadingId === c.subVendorId
                        }
                        className="px-3 py-1 bg-yellow-500 text-white rounded disabled:opacity-50"
                      >
                        {actionLoadingId === c.subVendorId
                          ? "Loading..."
                          : "Deactivate"}
                      </button>

                      <button
                        onClick={() =>
                          deleteSubVendor(
                            c.subVendorId
                          )
                        }
                        disabled={
                          actionLoadingId === c.subVendorId
                        }
                        className="px-3 py-1 bg-red-500 text-white rounded disabled:opacity-50"
                      >
                        {actionLoadingId === c.subVendorId
                          ? "Deleting..."
                          : "Delete"}
                      </button>

                    </div>
                  </td>
                </tr>
              ))}

          </tbody>
        </table>
      </div>
    </div>
  );
}
