// ============================================
// AssignRolePermissions.tsx
// CREATE ROLE PERMISSION SCREEN
// ============================================

import { useEffect, useState } from "react";
import axios from "axios";
import {
  ShieldCheck,
  KeyRound,
  Save,
  Loader2,
  ArrowLeft,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

interface Role {
  roleId: number;
  name: string;
  description: string
}

interface Permission {
  permissionId: number;
  name: string;
  description:string;
}

export default function AssignRolePermissions() {
  const navigate = useNavigate();

  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);

  const [roleId, setRoleId] = useState("");
  const [permissionId, setPermissionId] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ============================================
  // FETCH ROLES
  // ============================================
  const fetchRoles = async () => {
    try {
      const res = await axios.get(
        `${API}/restful/v1/api/roles`
      );

      setRoles(res.data.data || []);
    } catch (error) {
      console.error("Roles fetch error", error);
    }
  };

  // ============================================
  // FETCH PERMISSIONS
  // ============================================
  const fetchPermissions = async () => {
    try {
      const res = await axios.get(
        `${API}/restful/v1/api/permissions`
      );

      setPermissions(res.data.data || []);
    } catch (error) {
      console.error("Permissions fetch error", error);
    }
  };

  useEffect(() => {
    fetchRoles();
    fetchPermissions();
  }, []);

  // ============================================
  // ASSIGN PERMISSION
  // ============================================
  const handleAssign = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const payload = {
        roleId: Number(roleId),
        permissionId: Number(permissionId),
      };

      const res = await axios.post(
        `${API}/restful/v1/api/role-permissions`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setMessage(
        res.data.message ||
          "Permission assigned successfully"
      );

      setRoleId("");
      setPermissionId("");
    } catch (error: any) {
      console.error(error);

      setMessage(
        error?.response?.data?.message ||
          "Failed to assign permission"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-36 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-xl">
              <ShieldCheck className="w-7 h-7 text-blue-600" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Assign Role Permission
              </h1>

              <p className="text-gray-500 text-sm">
                Connect permissions with roles
              </p>
            </div>
          </div>

          {/* BACK BUTTON */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleAssign} className="space-y-6">
          {/* ROLE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Role
            </label>

            <div className="relative">
              <ShieldCheck className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />

              <select
                value={roleId}
                onChange={(e) => setRoleId(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Choose Role</option>

                {roles.map((role) => (
                  <option key={role.roleId} value={role.roleId}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* PERMISSION */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Permission
            </label>

            <div className="relative">
              <KeyRound className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />

              <select
                value={permissionId}
                onChange={(e) =>
                  setPermissionId(e.target.value)
                }
                required
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Choose Permission</option>

                {permissions.map((permission) => (
                  <option
                    key={permission.permissionId}
                    value={permission.permissionId}
                  >
                    {permission.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Assigning...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Assign Permission
              </>
            )}
          </button>

          {/* MESSAGE */}
          {message && (
            <div className="bg-gray-100 border border-gray-200 rounded-xl p-4 text-sm text-gray-700">
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}