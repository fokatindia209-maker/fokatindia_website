import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

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
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API}/restful/v1/api/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // IMPORTANT FIX
      setUsers(res.data.data);

    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateStatus = async (
    id: number,
    status: string
  ) => {

    await axios.put(
      `${API}/${id}/status`,
      { status },
      {
        headers: {
          Authorization:
            `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    fetchUsers();
  };

  const deleteUser = async (id: number) => {

    if (!confirm("Delete this user?")) return;

    await axios.delete(`${API}/${id}`, {
      headers: {
        Authorization:
          `Bearer ${localStorage.getItem("token")}`,
      },
    });

    fetchUsers();
  };

  return (
    <div className="py-12">

      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">
          Users
        </h1>

        <button
          onClick={() => navigate("/users/create")}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          + Create User
        </button>
      </div>

      <div className="bg-white shadow rounded overflow-x-auto">

        <table className="w-full text-sm">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Invitation Code </th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.userId}
                className="border-t"
              >
                <td className="p-3">
                  {user.userId}
                </td>

                <td className="p-3">
                  {user.name}
                </td>

                <td className="p-3">
                  {user.email}
                </td>

                <td className="p-3">
                  {user.phone}
                </td>

                <td className="p-3">
                  {user.invitationCode || "-"}
                </td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      user.status === "ACTIVE"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>

                <td className="p-3 flex gap-2">

                  <button
                    onClick={() =>
                      navigate(`/users/${user.userId}`)
                    }
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                  >
                  View/Edit
                  </button>

                  {user.status === "ACTIVE" ? (
                    <button
                      onClick={() =>
                        updateStatus(
                          user.userId,
                          "INACTIVE"
                        )
                      }
                      className="px-3 py-1 bg-yellow-500 text-white rounded"
                    >
                      Deactivate
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        updateStatus(
                          user.userId,
                          "ACTIVE"
                        )
                      }
                      className="px-3 py-1 bg-green-500 text-white rounded"
                    >
                      Activate
                    </button>
                  )}

                  <button
                    onClick={() =>
                      deleteUser(user.userId)
                    }
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>

                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}
