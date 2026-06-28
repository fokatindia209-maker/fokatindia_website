import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

interface User {
  userId: number;
  name: string;
  email: string;
  phone: string;
  status: string;
  invitationCode?: string;
}

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/restful/v1/api/users`);

      setUsers(res.data.data || []);
    } catch (err) {
      console.error("Error fetching users", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateStatus = async (id: number, status: string) => {
    try {
      if (status === "INACTIVE") {
        await api.put(`/restful/v1/api/users/${id}/deactivate`);
      } else {
        await api.put(`/restful/v1/api/users/${id}/activate`);
      }

      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteUser = async (id: number) => {
    if (!confirm("Delete this user?")) return;

    try {
      await api.delete(`/restful/v1/api/users/${id}`);

      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="py-12">
      {/* HEADER */}
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Users</h1>

        <button
          onClick={() => navigate("/users/create")}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          + Create User
        </button>
      </div>

      {/* MOBILE CARDS */}
      <div className="md:hidden space-y-3">
        {loading && (
          <div className="bg-white rounded-xl p-6 text-center text-gray-500">
            <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            Loading users...
          </div>
        )}
        {!loading && users.length === 0 && (
          <div className="bg-white rounded-xl p-6 text-center text-gray-500">No users found</div>
        )}
        {!loading && users.map((user) => (
          <div key={user.userId} className="bg-white rounded-xl shadow p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-800">{user.name}</span>
              <span className={`px-2 py-1 rounded text-xs ${user.status === "ACTIVE" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>{user.status}</span>
            </div>
            <p className="text-sm text-gray-500">{user.email}</p>
            <p className="text-sm text-gray-500">{user.phone}</p>
            {user.invitationCode && <p className="text-xs text-gray-400">Code: {user.invitationCode}</p>}
            <div className="flex flex-wrap gap-2 pt-1">
              <button onClick={() => navigate(`/users/${user.userId}`)} className="px-3 py-1 bg-blue-500 text-white rounded text-sm">View/Edit</button>
              {user.status === "ACTIVE" ? (
                <button onClick={() => updateStatus(user.userId, "INACTIVE")} className="px-3 py-1 bg-yellow-500 text-white rounded text-sm">Deactivate</button>
              ) : (
                <button onClick={() => updateStatus(user.userId, "ACTIVE")} className="px-3 py-1 bg-green-500 text-white rounded text-sm">Activate</button>
              )}
              <button onClick={() => deleteUser(user.userId)} className="px-3 py-1 bg-red-500 text-white rounded text-sm">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block bg-white shadow rounded overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Invitation Code</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="py-6 text-center">
                  <div className="flex items-center justify-center gap-2 text-gray-500">
                    <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    Loading users...
                  </div>
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center p-6 text-gray-500">No users found</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.userId} className="border-t">
                  <td className="p-3">{user.userId}</td>
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.phone}</td>
                  <td className="p-3">{user.invitationCode || "-"}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs ${user.status === "ACTIVE" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>{user.status}</span>
                  </td>
                  <td className="p-3 flex gap-2">
                    <button onClick={() => navigate(`/users/${user.userId}`)} className="px-3 py-1 bg-blue-500 text-white rounded">View/Edit</button>
                    {user.status === "ACTIVE" ? (
                      <button onClick={() => updateStatus(user.userId, "INACTIVE")} className="px-3 py-1 bg-yellow-500 text-white rounded">Deactivate</button>
                    ) : (
                      <button onClick={() => updateStatus(user.userId, "ACTIVE")} className="px-3 py-1 bg-green-500 text-white rounded">Activate</button>
                    )}
                    <button onClick={() => deleteUser(user.userId)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
