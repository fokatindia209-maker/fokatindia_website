import UserLayout from "../components/UserLayout";
import { Calendar, CheckCircle, Clock, XCircle } from "lucide-react";

export default function OrderHistory() {
  const orders = [
    {
      id: 1,
      service: "Deep Home Cleaning",
      date: "2026-06-01",
      status: "completed",
      price: 499,
    },
    {
      id: 2,
      service: "AC Repair Service",
      date: "2026-05-28",
      status: "pending",
      price: 799,
    },
    {
      id: 3,
      service: "Bathroom Cleaning",
      date: "2026-05-20",
      status: "cancelled",
      price: 299,
    },
  ];

  const getStatusUI = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <span className="flex items-center gap-1 text-green-600 text-sm">
            <CheckCircle size={16} /> Completed
          </span>
        );

      case "pending":
        return (
          <span className="flex items-center gap-1 text-yellow-600 text-sm">
            <Clock size={16} /> Pending
          </span>
        );

      case "cancelled":
        return (
          <span className="flex items-center gap-1 text-red-600 text-sm">
            <XCircle size={16} /> Cancelled
          </span>
        );

      default:
        return null;
    }
  };

  return (
    <UserLayout>
      <div className="max-w-3xl mx-auto space-y-6">

        {/* HEADER */}
        <h1 className="text-2xl font-bold">
          Order History
        </h1>

        {/* ORDERS LIST */}
        <div className="space-y-4">

          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-5 rounded-xl shadow hover:shadow-md transition"
            >

              {/* TOP */}
              <div className="flex justify-between items-start">

                <div>
                  <h2 className="font-semibold text-lg">
                    {order.service}
                  </h2>

                  <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                    <Calendar size={14} />
                    {order.date}
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-bold text-green-600">
                    ₹{order.price}
                  </p>

                  {getStatusUI(order.status)}
                </div>

              </div>

              {/* ACTIONS */}
              <div className="flex gap-3 mt-4">

                <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  View Details
                </button>

                {order.status === "completed" && (
                  <button className="px-3 py-1 text-sm border rounded-lg hover:bg-gray-100">
                    Rebook
                  </button>
                )}

              </div>

            </div>
          ))}

        </div>

        {/* EMPTY STATE (optional) */}
        {orders.length === 0 && (
          <div className="text-center text-gray-500 py-10">
            No orders found 😢
          </div>
        )}

      </div>
    </UserLayout>
  );
}