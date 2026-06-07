import { Bell } from "lucide-react";
import PartnerLayout from "../../../components/PartnerLayout";

export default function Notifications() {
  const notifications = [
    "New booking received",
    "Payment received ₹1500",
    "Customer left a review",
    "Job completed",
  ];

  return (
        <PartnerLayout>
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Notifications
      </h1>

      <div className="space-y-4">
        {notifications.map((n, i) => (
          <div
            key={i}
            className="bg-white shadow rounded-xl p-4 flex items-center gap-3"
          >
            <Bell size={18} />
            {n}
          </div>
        ))}
      </div>
    </div>
    </PartnerLayout>
  );
}