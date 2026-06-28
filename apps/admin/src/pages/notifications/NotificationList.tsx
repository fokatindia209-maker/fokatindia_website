import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

interface Notification {
  id: number;
  userId: number;
  title: string;
  message: string;
  type: string;
  readStatus: boolean;
  createdAt: string;
}

export default function NotificationList() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/restful/v1/api/notifications`);

      setNotifications(res.data?.data || []);
    } catch (err) {
      console.error(err);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const deleteNotification = async (id: number) => {
    if (!confirm("Are you sure you want to delete this notification?")) return;

    try {
      await api.delete(`/restful/v1/api/notifications/${id}`);

      fetchNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  const markAsRead = async (id: number) => {
    try {
      await api.put(`/restful/v1/api/notifications/${id}/read`, {});

      fetchNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Notifications</h1>

        <div className="flex gap-2">
          <button
            onClick={fetchNotifications}
            className="px-4 py-2 bg-black text-white rounded"
          >
            Refresh
          </button>

          <button
            onClick={() => navigate("/notifications/send")}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            + Create
          </button>
        </div>
      </div>

      {/* MOBILE CARDS */}
      <div className="md:hidden space-y-3">
        {loading && (
          <div className="bg-white rounded-xl p-6 text-center text-gray-500">
            <Loader2 className="w-5 h-5 animate-spin text-blue-600 mx-auto mb-2" />
            Loading notifications...
          </div>
        )}
        {!loading && notifications.length === 0 && (
          <div className="bg-white rounded-xl p-6 text-center text-gray-500">No notifications found</div>
        )}
        {!loading && notifications.map((n) => (
          <div key={n.id} className="bg-white rounded-xl shadow p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-800 truncate">{n.title}</span>
              <span className={`ml-2 px-2 py-1 rounded text-xs shrink-0 ${n.readStatus ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{n.readStatus ? "READ" : "UNREAD"}</span>
            </div>
            <p className="text-sm text-gray-500 line-clamp-2">{n.message}</p>
            <p className="text-xs text-gray-400">User: {n.userId} · {n.type} · {new Date(n.createdAt).toLocaleString()}</p>
            <div className="flex flex-wrap gap-2 pt-1">
              <button onClick={() => navigate(`/notifications/edit/${n.id}`)} className="px-3 py-1 bg-green-600 text-white rounded text-sm">View/Edit</button>
              {!n.readStatus && (
                <button onClick={() => markAsRead(n.id)} className="px-3 py-1 bg-blue-600 text-white rounded text-sm">Mark Read</button>
              )}
              <button onClick={() => deleteNotification(n.id)} className="px-3 py-1 bg-red-600 text-white rounded text-sm">Delete</button>
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
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Message</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Created</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>

            {loading && (
              <tr>
                <td colSpan={8} className="p-6">
                  <div className="flex items-center justify-center gap-2 text-blue-600">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Loading notifications...
                  </div>
                </td>
              </tr>
            )}

            {!loading &&
              notifications.map((n) => (
                <tr key={n.id} className="border-t">

                  <td className="p-3">{n.id}</td>
                  <td className="p-3">{n.userId}</td>
                  <td className="p-3 font-medium">{n.title}</td>
                  <td className="p-3">{n.message}</td>
                  <td className="p-3">{n.type}</td>

                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs ${n.readStatus ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {n.readStatus ? "READ" : "UNREAD"}
                    </span>
                  </td>

                  <td className="p-3">
                    {new Date(n.createdAt).toLocaleString()}
                  </td>

                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => navigate(`/notifications/edit/${n.id}`)}
                      className="px-3 py-1 bg-green-600 text-white rounded"
                    >
                      View/Edit
                    </button>

                    {!n.readStatus && (
                      <button
                        onClick={() => markAsRead(n.id)}
                        className="px-3 py-1 bg-blue-600 text-white rounded"
                      >
                        Mark Read
                      </button>
                    )}

                    <button
                      onClick={() => deleteNotification(n.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))}

            {!loading && notifications.length === 0 && (
              <tr>
                <td colSpan={8} className="p-6 text-center text-gray-500">
                  No notifications found
                </td>
              </tr>
            )}

          </tbody>
        </table>
      </div>
    </div>
  );
}
