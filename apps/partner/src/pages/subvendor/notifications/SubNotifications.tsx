import { useEffect, useState } from "react";
import { Bell, Loader2, CheckCheck } from "lucide-react";
import PartnerLayout from "../../../components/PartnerLayout";
import api from "../../../api/axios";

interface Notification {
  id: number;
  userId: number;
  title: string;
  message: string;
  type: string;
  readStatus: boolean;
  active: boolean;
  createdAt: string;
}

export default function SubNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [markingId, setMarkingId] = useState<number | null>(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await api.get("/restful/v1/api/notifications/");
      setNotifications(res.data?.data || []);
    } catch (err) {
      console.error(err);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: number) => {
    try {
      setMarkingId(id);
      await api.put(`/restful/v1/api/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, readStatus: true } : n))
      );
    } catch (err) {
      console.error(err);
    } finally {
      setMarkingId(null);
    }
  };

  const unreadCount = notifications.filter((n) => !n.readStatus).length;

  return (
    <PartnerLayout role="SUB_VENDOR">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Notifications</h1>
            {unreadCount > 0 && (
              <p className="text-sm text-blue-600 mt-1">{unreadCount} unread</p>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-10 gap-2 text-gray-600">
            <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
            Loading notifications...
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No notifications yet
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`bg-white shadow rounded-xl p-4 flex items-start gap-3 ${
                  !n.readStatus ? "border-l-4 border-blue-500" : ""
                }`}
              >
                <div
                  className={`mt-1 p-2 rounded-full flex-shrink-0 ${
                    !n.readStatus ? "bg-blue-100" : "bg-gray-100"
                  }`}
                >
                  <Bell
                    size={16}
                    className={!n.readStatus ? "text-blue-600" : "text-gray-400"}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p
                      className={`font-medium truncate ${
                        !n.readStatus ? "text-gray-900" : "text-gray-500"
                      }`}
                    >
                      {n.title}
                    </p>
                    <span className="text-xs text-gray-400 flex-shrink-0">
                      {new Date(n.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-0.5">{n.message}</p>
                  {n.type && (
                    <span className="inline-block mt-1 text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
                      {n.type}
                    </span>
                  )}
                </div>

                {!n.readStatus && (
                  <button
                    onClick={() => markAsRead(n.id)}
                    disabled={markingId === n.id}
                    className="flex-shrink-0 flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 disabled:opacity-50"
                  >
                    <CheckCheck size={14} />
                    {markingId === n.id ? "..." : "Mark read"}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </PartnerLayout>
  );
}
