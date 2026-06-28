import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function EditBooking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [booking, setBooking] = useState<any>(null);

  const [bookingStatus, setBookingStatus] = useState("PENDING");
  const [paymentStatus, setPaymentStatus] = useState("PENDING");

  // ================= FETCH =================
  const fetchBooking = async () => {
    try {
      const res = await api.get(`/restful/v1/api/bookings/${id}`);

      const data = res.data.data || res.data;
      setBooking(data);
      setBookingStatus(data.bookingStatus || "PENDING");
      setPaymentStatus(data.paymentStatus || "PENDING");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooking();
  }, [id]);

  // ================= UPDATE =================
  const handleUpdate = async () => {
    try {
      await api.put(
        `/restful/v1/api/bookings/${id}/status`,
        null,
        {
          params: {
            bookingStatus,
            paymentStatus,
          },
        }
      );

      alert("Booking updated successfully");
      navigate("/bookings");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-lg font-semibold">Loading booking...</div>
      </div>
    );
  }

  // ================= UI =================
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center px-4 py-10">

      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-8">

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/bookings")}
          className="flex items-center gap-2 text-gray-600 hover:text-black mb-6"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <h1 className="text-3xl font-bold text-center mb-6">
          Edit Booking
        </h1>

        {/* READ-ONLY DETAILS */}
        {booking && (
          <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Booking ID</span>
              <span className="font-medium">{booking.id ?? id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">User ID</span>
              <span className="font-medium">{booking.userId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Vendor ID</span>
              <span className="font-medium">{booking.vendorId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Service ID</span>
              <span className="font-medium">{booking.serviceId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Date</span>
              <span className="font-medium">{booking.bookingDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Amount</span>
              <span className="font-medium">₹{booking.finalAmount ?? booking.amount}</span>
            </div>
          </div>
        )}

        {/* EDITABLE STATUS FIELDS */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Booking Status
          </label>
          <select
            value={bookingStatus}
            onChange={(e) => setBookingStatus(e.target.value)}
            className="w-full border rounded-lg p-3"
          >
            <option value="PENDING">PENDING</option>
            <option value="CONFIRMED">CONFIRMED</option>
            <option value="CANCELLED">CANCELLED</option>
            <option value="COMPLETED">COMPLETED</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Payment Status
          </label>
          <select
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
            className="w-full border rounded-lg p-3"
          >
            <option value="PENDING">PENDING</option>
            <option value="PAID">PAID</option>
            <option value="FAILED">FAILED</option>
          </select>
        </div>

        {/* UPDATE BUTTON */}
        <button
          onClick={handleUpdate}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Update Booking
        </button>

      </div>
    </div>
  );
}
