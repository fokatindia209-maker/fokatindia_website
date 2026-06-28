import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Briefcase } from "lucide-react";

export default function CreateSubVendor() {
  const navigate = useNavigate();

  const [users, setUsers] = useState<any[]>([]);
  const [loadingVendor, setLoadingVendor] = useState(false);

  const [form, setForm] = useState({
    userId: "",
    vendorId: "",
    specialization: "",
    experienceYears: "",
    availabilityStatus: "AVAILABLE",
    rating: "",
  });

  // ================= FETCH USERS =================
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get(`/restful/v1/api/users`);

        setUsers(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  // ================= HANDLE CHANGE =================
  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // AUTO FETCH VENDOR ID BASED ON USER
    if (name === "userId" && value) {
      try {
        setLoadingVendor(true);

        const res = await api.get(`/restful/v1/api/vendors/users/${value}`);

        // ONLY AUTO-FILL IF EMPTY (prevents overwrite)
        setForm((prev) => ({
          ...prev,
          vendorId: prev.vendorId || res.data.data.vendorId,
        }));
      } catch (err) {
        setForm((prev) => ({
          ...prev,
          vendorId: "",
        }));
      } finally {
        setLoadingVendor(false);
      }
    }
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        userId: Number(form.userId),
        vendorId: Number(form.vendorId),
        specialization: form.specialization,
        experienceYears: Number(form.experienceYears),
        availabilityStatus: form.availabilityStatus,
        rating: Number(form.rating),
      };

      await api.post(`/restful/v1/api/subvendors`, payload);

      alert("SubVendor created successfully");
      navigate("/subvendors");
    } catch (err) {
      console.error(err);
      alert("Failed to create SubVendor");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">

        {/* BACK */}
        <button
          onClick={() => navigate("/subvendors")}
          className="flex items-center gap-2 text-gray-600 hover:text-black mb-6"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-100 p-3 rounded-xl">
            <Briefcase className="text-blue-600" />
          </div>

          <div>
            <h1 className="text-2xl font-bold">Create SubVendor</h1>
            <p className="text-sm text-gray-500">
              Assign technician to vendor
            </p>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* USER */}
          <select
            name="userId"
            value={form.userId}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          >
            <option value="">Select User</option>
            {users.map((u: any) => (
              <option key={u.userId} value={u.userId}>
                {u.name}
              </option>
            ))}
          </select>

          {/* VENDOR ID (EDITABLE) */}
          <input
            name="vendorId"
            value={form.vendorId}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
            placeholder="Vendor ID"
          />

          {loadingVendor && (
            <p className="text-sm text-blue-600">Fetching vendor...</p>
          )}

          <input
            name="specialization"
            placeholder="Specialization"
            value={form.specialization}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />

          <input
            name="experienceYears"
            placeholder="Experience Years"
            value={form.experienceYears}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />

          <select
            name="availabilityStatus"
            value={form.availabilityStatus}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          >
            <option value="AVAILABLE">AVAILABLE</option>
            <option value="UNAVAILABLE">UNAVAILABLE</option>
          </select>

          <input
            name="rating"
            placeholder="Rating"
            value={form.rating}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
          >
            Create SubVendor
          </button>
        </form>
      </div>
    </div>
  );
}
