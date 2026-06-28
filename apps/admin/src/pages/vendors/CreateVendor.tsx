import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Building2 } from "lucide-react";

export default function CreateVendor() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    businessName: "",
    gstNumber: "",
    address: "",
    city: "",
    serviceArea: "",
    kycStatus: "PENDING",
    rating: 0,
  });

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // Step 1: Create user account — vendor profile is auto-created with minimal defaults
      const userRes = await api.post(`/restful/v1/api/users/admin/vendors`, {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });

      const vendorId = userRes.data?.data?.vendorId;

      // Step 2: Update the auto-created vendor profile with the full business details
      if (vendorId) {
        await api.put(`/restful/v1/api/vendors/${vendorId}`, {
          businessName: form.businessName,
          gstNumber: form.gstNumber,
          address: form.address,
          city: form.city,
          serviceArea: form.serviceArea,
        });
      }

      alert("Vendor created successfully");
      navigate("/vendors");
    } catch (err) {
      console.error(err);
      alert("Failed to create vendor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8">

        <button
          onClick={() => navigate("/vendors")}
          className="flex items-center gap-2 text-gray-600 hover:text-black mb-6"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-100 p-3 rounded-xl">
            <Building2 className="text-blue-600" />
          </div>

          <div>
            <h1 className="text-2xl font-bold">Create Vendor</h1>
            <p className="text-sm text-gray-500">
              Register new service provider
            </p>
          </div>
        </div>

        <p className="text-sm font-semibold text-gray-700 mb-3">User Account</p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            name="name"
            placeholder="Full Name"
            className="border rounded-xl p-3 col-span-2"
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email"
            className="border rounded-xl p-3"
            onChange={handleChange}
          />

          <input
            name="phone"
            placeholder="Phone"
            className="border rounded-xl p-3"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border rounded-xl p-3 col-span-2"
            onChange={handleChange}
          />
        </div>

        <p className="text-sm font-semibold text-gray-700 mb-3">Vendor Profile</p>

        <div className="grid grid-cols-2 gap-4">
          <input
            name="businessName"
            placeholder="Business Name"
            className="border rounded-xl p-3 col-span-2"
            onChange={handleChange}
          />

          <input
            name="gstNumber"
            placeholder="GST Number"
            className="border rounded-xl p-3"
            onChange={handleChange}
          />

          <input
            name="city"
            placeholder="City"
            className="border rounded-xl p-3"
            onChange={handleChange}
          />

          <input
            name="serviceArea"
            placeholder="Service Area"
            className="border rounded-xl p-3 col-span-2"
            onChange={handleChange}
          />

          <textarea
            name="address"
            placeholder="Address"
            className="border rounded-xl p-3 col-span-2"
            onChange={handleChange}
          />

          <select
            name="kycStatus"
            className="border rounded-xl p-3 col-span-2"
            onChange={handleChange}
            value={form.kycStatus}
          >
            <option value="PENDING">PENDING</option>
            <option value="APPROVED">APPROVED</option>
            <option value="REJECTED">REJECTED</option>
          </select>

          <input
            name="rating"
            type="number"
            placeholder="Rating"
            className="border rounded-xl p-3 col-span-2"
            onChange={handleChange}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
        >
          {loading ? "Creating..." : "Create Vendor"}
        </button>

      </div>
    </div>
  );
}
