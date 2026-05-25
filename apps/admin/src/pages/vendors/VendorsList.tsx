import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

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
  const navigate = useNavigate();

  const fetchVendors = async () => {
    try {
      const res = await axios.get(`${API}/restful/v1/api/vendors`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setVendors(res.data.data); // ✅ FIXED
    } catch (err) {
      console.error("Error fetching vendors", err);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const deleteVendor = async (id: number) => {
    if (!confirm("Delete this vendor?")) return;

    await axios.delete(`${API}/restful/v1/api/vendors/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    fetchVendors();
  };

  const deactivateVendor = async (id: number) => {
    await axios.put(
      `${API}/restful/v1/api/vendors/${id}/deactivate`,
      {},
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );

    fetchVendors();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">

      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Vendors</h1>

        <button
          onClick={() => navigate("/vendors/create")}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          + Create Vendor
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">

        <table className="w-full text-sm">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Business</th>
              <th className="p-3 text-left">City</th>
              <th className="p-3 text-left">Service Area</th>
              <th className="p-3 text-left">KYC</th>
              <th className="p-3 text-left">Rating</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {vendors.map((vendor) => (
              <tr key={vendor.vendorId} className="border-t">

                <td className="p-3">{vendor.vendorId}</td>

                <td className="p-3">{vendor.businessName}</td>

                <td className="p-3">{vendor.city}</td>

                <td className="p-3">{vendor.serviceArea}</td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      vendor.kycStatus === "APPROVED"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {vendor.kycStatus}
                  </span>
                </td>

                <td className="p-3">{vendor.rating}</td>

                <td className="p-3 flex gap-2">

                  <button
                    onClick={() => navigate(`/vendors/${vendor.vendorId}`)}
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    View/Edit
                  </button>

                  <button
                    onClick={() => deactivateVendor(vendor.vendorId)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded"
                  >
                    Deactivate
                  </button>

                  <button
                    onClick={() => deleteVendor(vendor.vendorId)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>

                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>
  );
}