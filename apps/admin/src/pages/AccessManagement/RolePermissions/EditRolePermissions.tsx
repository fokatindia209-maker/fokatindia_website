// ============================================
// EditRolePermissions.tsx
// UPDATE ROLE PERMISSION SCREEN
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

import { useNavigate, useParams } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

interface Role {
  id: number;
  name: string;
}

interface Permission {
  id: number;
  name: string;
}

export default function EditRolePermissions() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<
    Permission[]
  >([]);

  const [roleId, setRoleId] = useState("");
  const [permissionId, setPermissionId] = useState("");

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

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
      console.error(error);
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
      console.error(error);
    }
  };

  // ============================================
  // FETCH SINGLE ROLE PERMISSION
  // ============================================
  const fetchRolePermission = async () => {
    try {
      const res = await axios.get(
        `${API}/restful/v1/api/role-permissions/${id}`
      );

      const data = res.data.data;

      setRoleId(String(data.roleId));
      setPermissionId(String(data.permissionId));
    } catch (error) {
      console.error(error);
      setMessage("Failed to fetch role permission");
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
    fetchPermissions();
    fetchRolePermission();
  }, []);

  // ============================================
  // UPDATE ROLE PERMISSION
  // ============================================
  const handleUpdate = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const payload = {
        roleId: Number(roleId),
        permissionId: Number(permissionId),
      };

      const res = await axios.put(
        `${API}/restful/v1/api/role-permissions/${id}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setMessage(
        res.data.message ||
          "Role permission updated successfully"
      );
    } catch (error: any) {
      console.error(error);

      setMessage(
        error?.response?.data?.message ||
          "Failed to update role permission"
      );
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // LOADER
  // ============================================
  if (pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-28 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-xl">
              <ShieldCheck className="w-7 h-7 text-blue-600" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Edit Role Permission
              </h1>

              <p className="text-gray-500 text-sm">
                Update assigned permission
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/role-permissions")}
            className="flex items-center gap-2 border px-4 py-2 rounded-xl hover:bg-gray-100"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleUpdate}
          className="space-y-6"
        >
          {/* ROLE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Role
            </label>

            <div className="relative">
              <ShieldCheck className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />

              <select
                value={roleId}
                onChange={(e) =>
                  setRoleId(e.target.value)
                }
                required
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">
                  Choose Role
                </option>

                {roles.map((role) => (
                  <option
                    key={role.id}
                    value={role.id}
                  >
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
                <option value="">
                  Choose Permission
                </option>

                {permissions.map((permission) => (
                  <option
                    key={permission.id}
                    value={permission.id}
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
                Updating...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Update Permission
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