import { useParams, useNavigate } from "react-router-dom";
import UserLayout from "../components/UserLayout";
import { useEffect, useState } from "react";
import { Calendar, CheckCircle, Clock, XCircle, MapPin, CreditCard, Loader } from "lucide-react";
import api from "../api/axios";

interface Booking {
  id: number;
  bookingCode: string;
  bookingDate: string;
  bookingTime: string;
  bookingStatus: string;
  paymentStatus: string;
  amount: number;
  discountAmount: number;
  finalAmount: number;
  notes: string;
}

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/bookings/${id}`)
      .then((res) => setBooking(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const StatusBadge = ({ status }: { status: string }) => {
    const s = status?.toUpperCase();
    if (s === "COMPLETED")
      return <span className="flex items-center gap-2 text-green-600"><CheckCircle size={18} /> Completed</span>;
    if (s === "PENDING" || s === "CONFIRMED")
      return <span className="flex items-center gap-2 text-yellow-600"><Clock size={18} /> {status}</span>;
    if (s === "IN_PROGRESS")
      return <span className="flex items-center gap-2 text-blue-600"><Clock size={18} /> In Progress</span>;
    return <span className="flex items-center gap-2 text-red-600"><XCircle size={18} /> {status}</span>;
  };

  if (loading) {
    return (
      <UserLayout>
        <div className="flex justify-center py-20">
          <Loader className="animate-spin text-blue-500" />
        </div>
      </UserLayout>
    );
  }

  if (!booking) {
    return (
      <UserLayout>
        <div className="text-center text-gray-500 py-10">Booking not found</div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="max-w-3xl mx-auto py-4 px-4">
        <div className="bg-white rounded-xl shadow p-6">

          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold">Booking #{booking.bookingCode}</h1>
              <p className="text-gray-400 text-sm">ID: {booking.id}</p>
            </div>
            <StatusBadge status={booking.bookingStatus} />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Booking Details</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  {booking.bookingDate} at {booking.bookingTime}
                </div>
                {booking.notes && (
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    {booking.notes}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <CreditCard size={16} />
                  Payment: {booking.paymentStatus}
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Price Summary</h3>
              <div className="border rounded-lg p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Service Cost</span>
                  <span>₹{booking.amount?.toFixed(2)}</span>
                </div>
                {booking.discountAmount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{booking.discountAmount?.toFixed(2)}</span>
                  </div>
                )}
                <hr />
                <div className="flex justify-between font-bold text-base">
                  <span>Total</span>
                  <span>₹{booking.finalAmount?.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-3 flex-wrap">
            {booking.bookingStatus === "COMPLETED" && (
              <button
                onClick={() => navigate(`/reviews/${booking.id}`)}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
              >
                Write Review
              </button>
            )}
            <button
              onClick={() => navigate("/order_history")}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Back to Orders
            </button>
          </div>

        </div>
      </div>
    </UserLayout>
  );
}
