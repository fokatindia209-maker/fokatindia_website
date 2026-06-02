import { useParams } from "react-router-dom";
import UserLayout from "../components/UserLayout";
import {
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  MapPin,
  Phone,
  CreditCard,
} from "lucide-react";

export default function OrderDetails() {
  const { id } = useParams();

  // API call later
  const order = {
    id,
    service: "Deep Home Cleaning",
    date: "2026-06-01",
    time: "10:00 AM",
    status: "completed",
    price: 499,
    address: "Dubai Silicon Oasis, Dubai",
    customerName: "John Doe",
    mobile: "+971500000000",
    paymentMethod: "Online Payment",
  };

  const getStatusUI = () => {
    switch (order.status) {
      case "completed":
        return (
          <span className="flex items-center gap-2 text-green-600">
            <CheckCircle size={18} />
            Completed
          </span>
        );

      case "pending":
        return (
          <span className="flex items-center gap-2 text-yellow-600">
            <Clock size={18} />
            Pending
          </span>
        );

      default:
        return (
          <span className="flex items-center gap-2 text-red-600">
            <XCircle size={18} />
            Cancelled
          </span>
        );
    }
  };

  return (
    <UserLayout>
      <div className="max-w-3xl mx-auto py-4 px-4">

        <div className="bg-white rounded-xl shadow p-6">

          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold">
                {order.service}
              </h1>

              <p className="text-gray-500">
                Order #{order.id}
              </p>
            </div>

            {getStatusUI()}
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <h3 className="font-semibold mb-3">
                Booking Details
              </h3>

              <div className="space-y-3 text-sm">

                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  {order.date} - {order.time}
                </div>

                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  {order.address}
                </div>

                <div className="flex items-center gap-2">
                  <Phone size={16} />
                  {order.mobile}
                </div>

                <div className="flex items-center gap-2">
                  <CreditCard size={16} />
                  {order.paymentMethod}
                </div>

              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">
                Price Summary
              </h3>

              <div className="border rounded-lg p-4">

                <div className="flex justify-between mb-2">
                  <span>Service Cost</span>
                  <span>₹499</span>
                </div>

                <div className="flex justify-between mb-2">
                  <span>Platform Fee</span>
                  <span>₹0</span>
                </div>

                <hr className="my-3" />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹499</span>
                </div>

              </div>
            </div>

          </div>

          <div className="mt-6 flex gap-3">

            {order.status === "completed" && (
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                Rebook Service
              </button>
            )}

            <button className="px-4 py-2 border rounded-lg">
              Download Invoice
            </button>

          </div>

        </div>

      </div>
    </UserLayout>
  );
}