import UserLayout from "../components/UserLayout";
import { Bell } from "lucide-react";

export default function Notifications() {
  const notifications = [
    { id: 1, title: "Booking Confirmed", desc: "Your AC service is confirmed" },
    { id: 2, title: "Vendor Assigned", desc: "Technician will arrive soon" },
    { id: 3, title: "Payment Received", desc: "₹499 successfully paid" },
  ];

  return (
    <UserLayout>
      <div className="space-y-6">

        <h1 className="text-2xl font-bold">
          Notifications
        </h1>

        <div className="space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              className="bg-white p-4 rounded-xl shadow flex gap-3"
            >
              <Bell className="text-blue-600" />

              <div>
                <h3 className="font-semibold">
                  {n.title}
                </h3>
                <p className="text-gray-500 text-sm">
                  {n.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </UserLayout>
  );
}