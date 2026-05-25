import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Building2 } from "lucide-react";

const API = import.meta.env.VITE_API_URL;

export default function CreateVendor() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<any[]>([]);

  const [form, setForm] = useState({
    userId: "",
    businessName: "",
    gstNumber: "",
    address: "",
    city: "",
    serviceArea: "",
    kycStatus: "PENDING",
    rating: 0,
  });

  // ================= FETCH USERS =================
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          `${API}/restful/v1/api/users`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setUsers(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  // ================= HANDLE =================
  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ================= SUBMIT =================
  const handleSubmit = async () => {
    try {
      setLoading(true);

      await axios.post(
        `${API}/restful/v1/api/vendors`,
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

      alert("Vendor created successfully");
      navigate("/vendors");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">

      {/* CARD */}
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8">

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/vendors")}
          className="flex items-center gap-2 text-gray-600 hover:text-black mb-6"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* HEADER */}
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

        {/* USER DROPDOWN */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">User</label>

          <select
            name="userId"
            className="w-full border rounded-xl p-3 mt-1"
            onChange={handleChange}
            value={form.userId}
          >
            <option value="">Select User</option>
            {users.map((u: any) => (
              <option key={u.userId} value={u.userId}>
                {u.name} ({u.email})
              </option>
            ))}
          </select>
        </div>

        {/* INPUTS */}
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

          {/* KYC */}
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

        {/* BUTTON */}
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