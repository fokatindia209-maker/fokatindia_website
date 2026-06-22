import UserLayout from "../components/UserLayout";
import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../api/axios";

interface Props {
  title: string;
}

interface Notification {
  id: number;
  title: string;
  message: string;
  readStatus: boolean;
  createdAt: string;
  type: string;
}

export default function Notifications({ title }: Props) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const res = await api.get("/notifications");

      // API response: { data: [...], message, status }
      setNotifications(res.data.data);

    } catch (error) {
      console.error("Failed to fetch notifications", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserLayout>
      <div className="space-y-6 py-4 px-4">
        <h1 className="text-2xl font-bold mb-4">{title}</h1>

        {loading ? (
          <p className="text-gray-500">Loading notifications...</p>
        ) : (
          <div className="space-y-3">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`p-4 rounded-xl shadow flex gap-3 bg-white ${
                  n.readStatus ? "opacity-60" : ""
                }`}
              >
                <Bell className="text-blue-600" />

                <div>
                  <h3 className="font-semibold">{n.title}</h3>
                  <p className="text-gray-500 text-sm">{n.message}</p>
                  <span className="text-xs text-gray-400">
                    {new Date(n.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </UserLayout>
  );
}