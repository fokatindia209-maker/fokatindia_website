import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

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
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // ================= FETCH =================
  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API}/restful/v1/api/notifications`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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

  // ================= DELETE =================
  const deleteNotification = async (id: number) => {
    if (!confirm("Are you sure you want to delete this notification?")) return;

    try {
      await axios.delete(
        `${API}/restful/v1/api/notifications/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  // ================= MARK AS READ =================
  const markAsRead = async (id: number) => {
    try {
      await axios.put(
        `${API}/restful/v1/api/notifications/${id}/read`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  // ================= UI =================
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

      {/* LOADING */}
      {loading && <p className="text-gray-500">Loading...</p>}

      {/* LIST */}
      <div className="space-y-4">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`p-4 rounded shadow bg-white border-l-4 ${
              n.readStatus
                ? "border-gray-300"
                : "border-blue-500 bg-blue-50"
            }`}
          >
            {/* TOP */}
            <div className="flex justify-between">
              <div>
                <h2 className="font-semibold text-lg">{n.title}</h2>
                <p className="text-sm text-gray-600">{n.message}</p>
              </div>

              <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                {n.type}
              </span>
            </div>

            {/* FOOTER */}
            <div className="flex justify-between mt-3 text-xs text-gray-500">
              <span>User: {n.userId}</span>
              <span>{new Date(n.createdAt).toLocaleString()}</span>
              <span className={n.readStatus ? "text-green-600" : "text-red-500"}>
                {n.readStatus ? "READ" : "UNREAD"}
              </span>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => navigate(`/notifications/edit/${n.id}`)}
                className="px-3 py-1 text-xs bg-green-600 text-white rounded"
              >
                View / Edit
              </button>

              {!n.readStatus && (
                <button
                  onClick={() => markAsRead(n.id)}
                  className="px-3 py-1 text-xs bg-blue-600 text-white rounded"
                >
                  Mark Read
                </button>
              )}

              <button
                onClick={() => deleteNotification(n.id)}
                className="px-3 py-1 text-xs bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}