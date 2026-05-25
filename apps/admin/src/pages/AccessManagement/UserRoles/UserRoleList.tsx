// ============================================
// UserRolesList.tsx
// FULL CRUD TABLE SCREEN
// ============================================

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Users, Shield, Search, Plus, Trash2, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

interface UserRole {
  id: number;
  userId: number;
  roleId: number;
}

export default function UserRolesList() {
  const [data, setData] = useState<UserRole[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ============================================
  // FETCH ALL USER ROLES
  // ============================================
  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API}/restful/v1/api/user-roles`,
        {}
      );

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

  // ============================================
  // DELETE ROLE FROM USER
  // ============================================
  const removeRole = async (id: number) => {
    if (!confirm("Remove this user role?")) return;

    try {
      await axios.delete(
        `${API}/restful/v1/api/user-roles/${id}`,
        {}
      );

      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  // ============================================
  // SEARCH FILTER
  // ============================================
  const filtered = useMemo(() => {
    return data.filter(
      (u) =>
        u.userId.toString().includes(search) ||
        u.roleId.toString().includes(search)
    );
  }, [data, search]);

  return (
    <div className="py-12">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            User Roles
          </h1>
          <p className="text-gray-500 text-sm">
            Manage user role assignments
          </p>
        </div>

        <button
          onClick={() => navigate("/user-roles/create")}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl"
        >
          <Plus size={18} /> Assign Role
        </button>
      </div>

      {/* SEARCH */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />

          <input
            className="w-full border p-3 pl-10 rounded-xl"
            placeholder="Search by userId or roleId..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* LOADING */}
      {loading && <p>Loading...</p>}

      {/* TABLE */}
      {!loading && (
        <div className="bg-white shadow rounded-xl overflow-hidden">

          <table className="w-full text-sm">

            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">User</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-t hover:bg-gray-50">

                  {/* ID */}
                  <td className="p-3 font-medium text-gray-700">
                    {item.id}
                  </td>

                  {/* USER */}
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <Users size={14} className="text-gray-500" />
                      <span>User #{item.userId}</span>
                    </div>
                  </td>

                  {/* ROLE */}
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <Shield size={14} className="text-blue-500" />
                      <span>Role #{item.roleId}</span>
                    </div>
                  </td>

                  {/* ACTIONS */}
                  <td className="p-3 flex gap-2">

                    <button
                      onClick={() =>
                        navigate(`/user-roles/edit/${item.id}`)
                      }
                      className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded flex items-center gap-1"
                    >
                      <Pencil size={14} /> Edit
                    </button>

                    <button
                      onClick={() => removeRole(item.id)}
                      className="bg-red-100 text-red-700 px-3 py-1 rounded flex items-center gap-1"
                    >
                      <Trash2 size={14} /> Remove
                    </button>

                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}

      {/* EMPTY */}
      {!loading && filtered.length === 0 && (
        <div className="bg-white shadow rounded-xl p-10 text-center mt-6">
          <Users size={50} className="mx-auto text-gray-300" />
          <h2 className="mt-3 text-lg font-semibold text-gray-700">
            No User Roles Found
          </h2>
          <p className="text-gray-500 text-sm">
            Try assigning a role to a user
          </p>
        </div>
      )}
    </div>
  );
}