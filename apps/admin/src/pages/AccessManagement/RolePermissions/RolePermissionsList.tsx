// ============================================
// RolePermissionsList.tsx
// FULL TABLE UI - ROLE PERMISSIONS (EDIT + DELETE)
// ============================================

import { useEffect, useMemo, useState } from "react";
import api from "../../../api/axios";
import {
  Shield,
  KeyRound,
  Search,
  Trash2,
  Pencil,
  Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface RolePermission {
  id: number;
  roleId: number;
  permissionId: number;
}

export default function RolePermissionsList() {
  const [data, setData] = useState<RolePermission[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // FETCH
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/restful/v1/api/role-permissions`);
      setData(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // DELETE
  const remove = async (id: number) => {
    if (!confirm("Remove this mapping?")) return;

    try {
      await api.delete(`/restful/v1/api/role-permissions/${id}`);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  // SEARCH
  const filtered = useMemo(() => {
    return data.filter(
      (item) =>
        item.roleId.toString().includes(search) ||
        item.permissionId.toString().includes(search)
    );
  }, [data, search]);

  return (
    <div className="py-12">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Role Permissions
          </h1>
          <p className="text-sm text-gray-500">
            Manage role ↔ permission mapping
          </p>
        </div>

        <button
          onClick={() => navigate("/role-permissions/assign")}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
        >
          <Plus size={18} /> Assign
        </button>
      </div>

      {/* SEARCH */}
      <div className="mb-5">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            className="w-full border p-3 pl-10 rounded-xl focus:ring-2 focus:ring-blue-500"
            placeholder="Search by role or permission..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-center py-10 text-gray-500">
          Loading role permissions...
        </div>
      )}

      {/* MOBILE CARDS */}
      {!loading && (
        <div className="md:hidden space-y-3">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl p-6 text-center text-gray-500">No Data Found</div>
          ) : filtered.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow p-4 space-y-2">
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-1"><Shield size={14} className="text-blue-600" /><span className="font-medium">Role {item.roleId}</span></div>
                <span className="text-gray-300">·</span>
                <div className="flex items-center gap-1"><KeyRound size={14} className="text-gray-500" /><span>Permission {item.permissionId}</span></div>
              </div>
              <p className="text-xs text-gray-400">ID: #{item.id}</p>
              <div className="flex gap-2 pt-1">
                <button onClick={() => navigate(`/role-permissions/edit/${item.id}`)} className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded text-sm"><Pencil size={12} /> Edit</button>
                <button onClick={() => remove(item.id)} className="flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded text-sm"><Trash2 size={12} /> Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* DESKTOP TABLE */}
      {!loading && (
        <div className="hidden md:block bg-white shadow-lg rounded-2xl overflow-hidden">

          <table className="w-full text-sm">

            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Role</th>
                <th className="p-4 text-left">Permission</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((item) => (
                <tr
                  key={item.id}
                  className="border-t hover:bg-gray-50 transition"
                >

                  {/* ID */}
                  <td className="p-4 font-medium text-gray-700">
                    #{item.id}
                  </td>

                  {/* ROLE */}
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Shield size={15} className="text-blue-600" />
                      <span className="font-medium">
                        Role {item.roleId}
                      </span>
                    </div>
                  </td>

                  {/* PERMISSION */}
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <KeyRound size={15} className="text-gray-500" />
                      Permission {item.permissionId}
                    </div>
                  </td>

                  {/* ACTIONS */}
                  <td className="p-4 flex gap-2">

                    {/* EDIT */}
                    <button
                      onClick={() =>
                        navigate(`/role-permissions/edit/${item.id}`)
                      }
                      className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-lg hover:bg-yellow-200"
                    >
                      <Pencil size={14} />
                      Edit
                    </button>

                    {/* DELETE */}
                    <button
                      onClick={() => remove(item.id)}
                      className="flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-lg hover:bg-red-200"
                    >
                      <Trash2 size={14} />
                      Remove
                    </button>

                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>
      )}

      {/* EMPTY - desktop only */}
      {!loading && filtered.length === 0 && (
        <div className="hidden md:block bg-white shadow rounded-2xl p-10 text-center mt-6">
          <Shield size={50} className="mx-auto text-gray-300" />
          <h2 className="mt-3 text-lg font-semibold text-gray-700">No Data Found</h2>
          <p className="text-gray-500 text-sm">
            Assign permissions to roles to see records
          </p>
        </div>
      )}

    </div>
  );
}
