// ============================================
// PermissionsList.tsx
// FULL CRUD LIST SCREEN
// ============================================

import { useEffect, useMemo, useState } from "react";
import api from "../../../api/axios";
import { Shield, Search, Plus, KeyRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Permission {
  permissionId: number;
  name: string;
  description: string;
}

export default function PermissionsList() {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // FETCH ALL
  const fetchPermissions = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/restful/v1/api/permissions`);

      setPermissions(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  // DELETE
  const deletePermission = async (id: number) => {
    if (!confirm("Delete this permission?")) return;

    try {
      await api.delete(`/restful/v1/api/permissions/${id}`);

      fetchPermissions();
    } catch (err) {
      console.error(err);
    }
  };

  // SEARCH
  const filtered = useMemo(() => {
    return permissions.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
    );
  }, [permissions, search]);

  // GROUP
  const grouped = useMemo(() => {
    return filtered.reduce((acc: any, item) => {
      const key = item.name.split("_")[0];
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {});
  }, [filtered]);

  return (
    <div className="py-12">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Permissions</h1>
          <p className="text-gray-500 text-sm">Manage system permissions</p>
        </div>

        <button
          onClick={() => navigate("/permissions/create")}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl"
        >
          <Plus size={18} /> Create
        </button>
      </div>

      {/* SEARCH */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            className="w-full border p-3 pl-10 rounded-xl"
            placeholder="Search permissions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* LOADING */}
      {loading && <p>Loading...</p>}

      {/* TABLE */}
      {!loading &&
        Object.entries(grouped).map(([module, items]: any) => (
          <div key={module} className="mb-6 bg-white shadow rounded-xl">

            <div className="p-4 border-b font-bold flex items-center gap-2">
              <Shield size={18} /> {module}
            </div>

            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">ID</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Description</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {items.map((p: Permission) => (
                  <tr key={p.permissionId} className="border-t">

                    <td className="p-3">{p.permissionId}</td>

                    <td className="p-3 flex items-center gap-2">
                      <KeyRound size={14} /> {p.name}
                    </td>

                    <td className="p-3">{p.description}</td>

                    <td className="p-3 flex gap-2">

                      <button
                        onClick={() =>
                          navigate(`/permissions/edit/${p.permissionId}`)
                        }
                        className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deletePermission(p.permissionId)}
                        className="bg-red-100 text-red-700 px-3 py-1 rounded"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
    </div>
  );
}
