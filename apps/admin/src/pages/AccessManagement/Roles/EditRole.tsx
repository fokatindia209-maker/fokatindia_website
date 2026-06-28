// ============================================
// EditRole.tsx
// ============================================

import { useEffect, useState } from "react";
import api from "../../../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, Shield } from "lucide-react";

export default function EditRole() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  // ============================================
  // GET ROLE BY ID
  // ============================================

  const fetchRole = async () => {
    try {
      const res = await api.get(`/restful/v1/api/roles/${id}`);

      setForm(res.data.data);
    } catch (err) {
      console.error("Failed to fetch role", err);
    }
  };

  useEffect(() => {
    fetchRole();
  }, [id]);

  // ============================================
  // HANDLE INPUT CHANGE
  // ============================================

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ============================================
  // UPDATE ROLE (PUT API)
  // ============================================

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.put(`/restful/v1/api/roles/${id}`, form);

      alert("Role updated successfully");

      navigate("/roles");
    } catch (err: any) {
      alert(err?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">

      <div className="w-full max-w-xl bg-white p-6 rounded-2xl shadow-lg">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Shield size={20} /> Edit Role
            </h1>
            <p className="text-sm text-gray-500">
              Update role details
            </p>
          </div>

          <button
            onClick={() => navigate("/roles")}
            className="p-2 rounded-xl hover:bg-gray-100"
          >
            <ArrowLeft />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="text-sm font-medium">Role Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-1"
              placeholder="Enter role name"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mt-1"
              placeholder="Enter description"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-xl flex items-center justify-center gap-2"
          >
            <Save size={18} />
            {loading ? "Updating..." : "Update Role"}
          </button>

        </form>

      </div>

    </div>
  );
}
