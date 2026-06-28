// ============================================
// CreateRole.tsx
// PROFESSIONAL ROLE CREATE SCREEN
// ============================================

import { useState } from "react";
import api from "../../../api/axios";
import { useNavigate } from "react-router-dom";
import { Shield, Save, ArrowLeft } from "lucide-react";

export default function CreateRole() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  // ==========================
  // HANDLE INPUT
  // ==========================
  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================
  // SUBMIT ROLE
  // ==========================
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post(`/restful/v1/api/roles`, form);

      alert("Role created successfully");

      navigate("/roles");
    } catch (err: any) {
      alert(
        err?.response?.data?.message || "Failed to create role"
      );
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
            <h1 className="text-xl font-bold flex items-center gap-2 text-gray-800">
              <Shield size={20} />
              Create Role
            </h1>
            <p className="text-sm text-gray-500">
              Add new system role
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

          {/* ROLE NAME */}
          <div>
            <label className="text-sm font-medium">
              Role Name
            </label>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. ADMIN, USER, VENDOR"
              className="w-full border p-3 rounded-xl mt-1 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="text-sm font-medium">
              Description
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Role description"
              className="w-full border p-3 rounded-xl mt-1 focus:ring-2 focus:ring-blue-500"
              rows={4}
              required
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700"
          >
            <Save size={18} />
            {loading ? "Creating..." : "Create Role"}
          </button>

        </form>
      </div>
    </div>
  );
}
