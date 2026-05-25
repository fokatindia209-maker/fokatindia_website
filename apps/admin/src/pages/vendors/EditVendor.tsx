import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

export default function EditVendor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState<any>({
    userId: "",
    businessName: "",
    gstNumber: "",
    address: "",
    city: "",
    serviceArea: "",
    kycStatus: "PENDING",
    rating: 0,
  });

  // ================= FETCH =================
  const fetchVendor = async () => {
    try {
      const res = await axios.get(
        `${API}/restful/v1/api/vendors/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setForm(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendor();
  }, [id]);

  // ================= HANDLE =================
  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ================= UPDATE =================
  const handleUpdate = async () => {
    try {
      await axios.put(
        `${API}/restful/v1/api/vendors/${id}`,
        {
          ...form,
          userId: Number(form.userId),
          rating: Number(form.rating),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Vendor updated successfully");
      navigate(`/vendors/${id}`);
    } catch (err) {
      console.error(err);
    }
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-lg font-semibold">Loading vendor...</div>
      </div>
    );
  }

  // ================= UI =================
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center px-4 py-10">

      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-8">

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/vendors")}
          className="mb-4 text-gray-600 hover:text-black font-medium"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold text-center mb-6">
          Edit Vendor
        </h1>

        {/* USER ID */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            User ID
          </label>
          <input
            name="userId"
            value={form.userId}
            className="w-full border rounded-lg p-3"
            onChange={handleChange}
          />
        </div>

        {/* BUSINESS NAME */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Business Name
          </label>
          <input
            name="businessName"
            value={form.businessName}
            className="w-full border rounded-lg p-3"
            onChange={handleChange}
          />
        </div>

        {/* GST */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            GST Number
          </label>
          <input
            name="gstNumber"
            value={form.gstNumber}
            className="w-full border rounded-lg p-3"
            onChange={handleChange}
          />
        </div>

        {/* CITY */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            name="city"
            value={form.city}
            className="w-full border rounded-lg p-3"
            onChange={handleChange}
          />
        </div>

        {/* SERVICE AREA */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Service Area
          </label>
          <input
            name="serviceArea"
            value={form.serviceArea}
            className="w-full border rounded-lg p-3"
            onChange={handleChange}
          />
        </div>

        {/* ADDRESS */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <textarea
            name="address"
            value={form.address}
            className="w-full border rounded-lg p-3"
            onChange={handleChange}
          />
        </div>

        {/* KYC STATUS */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            KYC Status
          </label>
          <select
            name="kycStatus"
            value={form.kycStatus}
            className="w-full border rounded-lg p-3"
            onChange={handleChange}
          >
            <option value="PENDING">PENDING</option>
            <option value="APPROVED">APPROVED</option>
            <option value="REJECTED">REJECTED</option>
          </select>
        </div>

        {/* RATING */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rating
          </label>
          <input
            name="rating"
            type="number"
            value={form.rating}
            className="w-full border rounded-lg p-3"
            onChange={handleChange}
          />
        </div>

        {/* BUTTON */}
        <button
          onClick={handleUpdate}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Update Vendor
        </button>

      </div>
    </div>
  );
}