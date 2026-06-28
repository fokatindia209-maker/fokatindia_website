import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState<any>({
    name: "",
    email: "",
    phone: "",
    status: "",
  });

  // ================= FETCH USER =================
  const fetchUser = async () => {
    try {
      const res = await api.get(`/restful/v1/api/users/${userId}`);

      setForm(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  // ================= HANDLE INPUT =================
  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ================= UPDATE USER =================
  const handleUpdate = async () => {
    try {
      await api.put(`/restful/v1/api/users/${userId}`, form);

      alert("User updated successfully");
      navigate(`/users`);
    } catch (err) {
      console.error(err);
    }
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-lg font-semibold">Loading user...</div>
      </div>
    );
  }

  // ================= UI =================
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-8">

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/users")}
          className="mb-4 text-gray-600 hover:text-black font-medium"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold text-center mb-6">
          Edit User
        </h1>

        <input
          name="name"
          value={form.name}
          placeholder="Name"
          className="w-full border rounded-lg p-3 mb-4 focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
        />

        <input
          name="email"
          value={form.email}
          placeholder="Email"
          className="w-full border rounded-lg p-3 mb-4 focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
        />

        <input
          name="phone"
          value={form.phone}
          placeholder="Phone"
          className="w-full border rounded-lg p-3 mb-4 focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
        />

        <select
          name="status"
          value={form.status}
          className="w-full border rounded-lg p-3 mb-6 focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
        >
          <option value="ACTIVE">ACTIVE</option>
          <option value="INACTIVE">DEACTIVE</option>
        </select>

        <button
          onClick={handleUpdate}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Update User
        </button>

      </div>
    </div>
  );
}
