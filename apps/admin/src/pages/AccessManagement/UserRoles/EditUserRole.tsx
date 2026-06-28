// ============================================
// EditUserRole.tsx
// PROFESSIONAL ADMIN UI
// ============================================

import { useEffect, useState } from "react";
import api from "../../../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import { Users, Shield, Save, ArrowLeft } from "lucide-react";

export default function EditUserRole() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    userId: "",
    roleId: "",
  });

  // ============================================
  // FETCH USER ROLE BY ID
  // ============================================
  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);

        const res = await api.get(`/restful/v1/api/user-roles/${id}`);

        setForm(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [id]);

  // ============================================
  // UPDATE
  // ============================================
  const handleUpdate = async () => {
    try {
      setLoading(true);

      await api.put(`/restful/v1/api/user-roles/${id}`, form);

      alert("User Role Updated Successfully");
      navigate("/user-roles");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 px-4">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate("/user-roles")}
        className="flex items-center gap-2 text-gray-600 hover:text-black mb-6"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      {/* CARD */}
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Users size={24} />
            </div>

            <div>
              <h2 className="text-xl font-bold">
                Edit User Role
              </h2>
              <p className="text-sm text-blue-100">
                Update role assignment for user
              </p>
            </div>
          </div>
        </div>

        {/* FORM */}
        <div className="p-6 space-y-5">

          {/* USER ID */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              User ID
            </label>

            <div className="relative mt-1">
              <Users
                size={18}
                className="absolute left-3 top-3 text-gray-400"
              />

              <input
                className="w-full border rounded-xl pl-10 pr-3 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                value={form.userId}
                onChange={(e) =>
                  setForm({ ...form, userId: e.target.value })
                }
                placeholder="Enter User ID"
              />
            </div>
          </div>

          {/* ROLE ID */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Role ID
            </label>

            <div className="relative mt-1">
              <Shield
                size={18}
                className="absolute left-3 top-3 text-gray-400"
              />

              <input
                className="w-full border rounded-xl pl-10 pr-3 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                value={form.roleId}
                onChange={(e) =>
                  setForm({ ...form, roleId: e.target.value })
                }
                placeholder="Enter Role ID"
              />
            </div>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition disabled:opacity-50"
          >
            <Save size={18} />
            {loading ? "Updating..." : "Update User Role"}
          </button>
        </div>
      </div>
    </div>
  );
}
