import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

interface Vendor {
  vendorId: number;
  userId: number;
  businessName: string;
  gstNumber: string;
  address: string;
  city: string;
  serviceArea: string;
  kycStatus: string;
  rating: number;
}

export default function VendorList() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);

  const navigate = useNavigate();

  // ======================
  // FETCH VENDORS
  // ======================
  const fetchVendors = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/restful/v1/api/vendors`);

      setVendors(res.data.data || []);
    } catch (error) {
      console.error("Error fetching vendors", error);
      setVendors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  // ======================
  // DELETE
  // ======================
  const deleteVendor = async (id: number) => {
    if (!window.confirm("Delete this vendor?")) return;

    try {
      setActionLoadingId(id);

      await api.delete(`/restful/v1/api/vendors/${id}`);

      fetchVendors();
    } catch (error) {
      console.error(error);
    } finally {
      setActionLoadingId(null);
    }
  };

  // ======================
  // DEACTIVATE
  // ======================
  const deactivateVendor = async (id: number) => {
    try {
      setActionLoadingId(id);

      await api.put(`/restful/v1/api/vendors/${id}/deactivate`, {});

      fetchVendors();
    } catch (error) {
      console.error(error);
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Vendors
        </h1>

        <button
          onClick={() => navigate("/vendors/create")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          + Create Vendor
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">

        <table className="min-w-[1400px] w-full text-sm">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Vendor ID</th>
              <th className="p-4 text-left">User ID</th>
              <th className="p-4 text-left">Business Name</th>
              <th className="p-4 text-left">GST Number</th>
              <th className="p-4 text-left">Address</th>
              <th className="p-4 text-left">City</th>
              <th className="p-4 text-left">Service Area</th>
              <th className="p-4 text-left">KYC Status</th>
              <th className="p-4 text-left">Rating</th>
              <th className="p-4 text-left">Actions</th>
            </tr>

            {loading && (
              <tr>
                <td colSpan={10} className="py-8">
                  <div className="flex justify-center items-center gap-2">
                    <Loader2 className="animate-spin w-5 h-5 text-blue-600" />
                    <span>Loading vendors...</span>
                  </div>
                </td>
              </tr>
            )}
          </thead>

          <tbody>

            {!loading && vendors.length === 0 && (
              <tr>
                <td
                  colSpan={10}
                  className="text-center py-10 text-gray-500"
                >
                  No vendors found
                </td>
              </tr>
            )}

            {!loading &&
              vendors.map((vendor) => (
                <tr
                  key={vendor.vendorId}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-4">
                    {vendor.vendorId}
                  </td>

                  <td className="p-4">
                    {vendor.userId}
                  </td>

                  <td className="p-4 font-medium">
                    {vendor.businessName}
                  </td>

                  <td className="p-4">
                    {vendor.gstNumber || "-"}
                  </td>

                  <td className="p-4 max-w-xs">
                    {vendor.address}
                  </td>

                  <td className="p-4">
                    {vendor.city}
                  </td>

                  <td className="p-4">
                    {vendor.serviceArea}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        vendor.kycStatus === "APPROVED"
                          ? "bg-green-100 text-green-700"
                          : vendor.kycStatus === "REJECTED"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {vendor.kycStatus}
                    </span>
                  </td>

                  <td className="p-4">
                    ⭐ {vendor.rating ?? 0}
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2">

                      <button
                        onClick={() =>
                          navigate(
                            `/vendors/${vendor.vendorId}`
                          )
                        }
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          deactivateVendor(
                            vendor.vendorId
                          )
                        }
                        disabled={
                          actionLoadingId === vendor.vendorId
                        }
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded disabled:opacity-50"
                      >
                        {actionLoadingId === vendor.vendorId
                          ? "Loading..."
                          : "Deactivate"}
                      </button>

                      <button
                        onClick={() =>
                          deleteVendor(
                            vendor.vendorId
                          )
                        }
                        disabled={
                          actionLoadingId === vendor.vendorId
                        }
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded disabled:opacity-50"
                      >
                        {actionLoadingId === vendor.vendorId
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
