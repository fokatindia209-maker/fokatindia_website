import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Users, Shield, ArrowLeft, UserPlus, Save } from "lucide-react";

const API = import.meta.env.VITE_API_URL;

export default function AssignUserRole() {
  const navigate = useNavigate();

  const [users, setUsers] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    userId: "",
    roleId: "",
  });

  // FETCH USERS
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API}/restful/v1/api/users`,
         {
          headers: {
            "Content-Type": "application/json",
             Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUsers(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  // FETCH ROLES
  const fetchRoles = async () => {
    try {
      const res = await axios.get(`${API}/restful/v1/api/roles`);
      setRoles(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  // SUBMIT
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);
      await axios.post(
        `${API}/restful/v1/api/user-roles`,
        form,
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Role assigned successfully");
      navigate("/user-roles");
    } catch (err) {
      console.error(err);
      alert("Failed to assign role");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 px-4">

      {/* BACK */}
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
              <UserPlus size={24} />
            </div>

            <div>
              <h2 className="text-xl font-bold">
                Assign Role to User
              </h2>
              <p className="text-sm text-blue-100">
                Map users with system roles
              </p>
            </div>

          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">

          {/* USER SELECT */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Select User
            </label>

            <div className="relative mt-2">
              <Users size={18} className="absolute left-3 top-3 text-gray-400" />

              <select
                className="w-full border rounded-xl pl-10 pr-3 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={(e) =>
                  setForm({ ...form, userId: e.target.value })
                }
              >
                <option value="">Choose User</option>
                {users.map((u: any) => (
                  <option key={u.userId} value={u.userId}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* ROLE SELECT */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Select Role
            </label>

            <div className="relative mt-2">
              <Shield size={18} className="absolute left-3 top-3 text-gray-400" />

              <select
                className="w-full border rounded-xl pl-10 pr-3 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={(e) =>
                  setForm({ ...form, roleId: e.target.value })
                }
              >
                <option value="">Choose Role</option>
                {roles.map((r: any) => (
                  <option key={r.roleId} value={r.roleId}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition disabled:opacity-50"
          >
            <Save size={18} />
            {loading ? "Assigning..." : "Assign Role"}
          </button>

        </form>
      </div>
    </div>
  );
}