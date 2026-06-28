import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import PartnerLayout from "../../../components/PartnerLayout";
import api from "../../../api/axios";

interface BookingDetail {
  id: number;
  bookingCode: string;
  userId: number;
  vendorId: number;
  serviceId: number;
  subVendorId: number;
  categoryId: number;
  addressId: number;
  bookingDate: string;
  bookingTime: string;
  finalAmount: number;
  bookingStatus: string;
  paymentStatus: string;
  notes: string;
  otp: string;
  active: boolean;
  createdAt: string;
  companyAmount: number;
  vendorAmount: number;
  subVendorAmount: number;
  earningsGenerated: boolean;
}

function Badge({ text, variant }: { text: string; variant: "green" | "blue" | "yellow" | "red" | "gray" }) {
  const map = {
    green: "bg-green-100 text-green-700",
    blue: "bg-blue-100 text-blue-700",
    yellow: "bg-yellow-100 text-yellow-700",
    red: "bg-red-100 text-red-700",
    gray: "bg-gray-100 text-gray-600",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${map[variant]}`}>
      {text}
    </span>
  );
}

function bookingBadge(status: string): "green" | "blue" | "yellow" | "red" | "gray" {
  switch (status?.toUpperCase()) {
    case "COMPLETED": case "SUCCESS": return "green";
    case "CONFIRMED": return "blue";
    case "PENDING": return "yellow";
    case "CANCELLED": return "red";
    default: return "gray";
  }
}

function paymentBadge(status: string): "green" | "red" | "yellow" | "gray" {
  switch (status?.toUpperCase()) {
    case "PAID": case "SUCCESS": return "green";
    case "PENDING": return "yellow";
    case "FAILED": return "red";
    default: return "gray";
  }
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between py-3 border-b last:border-0">
      <span className="text-gray-500 text-sm">{label}</span>
      <span className="font-medium text-sm text-right max-w-xs">{value || "—"}</span>
    </div>
  );
}

export default function SubVendorBookingDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [booking, setBooking] = useState<BookingDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    api
      .get(`/restful/v1/api/bookings/${id}`)
      .then((res) => setBooking(res.data?.data || null))
      .catch(() => setError("Failed to load booking details."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <PartnerLayout role="SUB_VENDOR">
        <div className="flex items-center justify-center py-20 gap-2 text-gray-600">
          <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
          Loading booking...
        </div>
      </PartnerLayout>
    );
  }

  if (error || !booking) {
    return (
      <PartnerLayout role="SUB_VENDOR">
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-red-500">
          <AlertCircle size={36} />
          <p>{error ?? "Booking not found."}</p>
          <button
            onClick={() => navigate("/subvendor/bookings")}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Back to Bookings
          </button>
        </div>
      </PartnerLayout>
    );
  }

  return (
    <PartnerLayout role="SUB_VENDOR">
      <div className="p-4 max-w-3xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/subvendor/bookings")}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold">Booking Details</h1>
            <p className="text-gray-500 text-sm">{booking.bookingCode}</p>
          </div>
        </div>

        {/* Status Badges */}
        <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Booking:</span>
            <Badge text={booking.bookingStatus} variant={bookingBadge(booking.bookingStatus)} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Payment:</span>
            <Badge text={booking.paymentStatus} variant={paymentBadge(booking.paymentStatus)} />
          </div>
        </div>

        {/* Booking Info */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h2 className="font-semibold text-gray-800 mb-3">Booking Information</h2>
          <InfoRow label="Booking Code" value={booking.bookingCode} />
          <InfoRow label="Date" value={booking.bookingDate} />
          <InfoRow label="Time" value={booking.bookingTime} />
          <InfoRow label="OTP" value={booking.otp} />
          <InfoRow label="Notes" value={booking.notes} />
          <InfoRow
            label="Created At"
            value={booking.createdAt ? new Date(booking.createdAt).toLocaleString() : "—"}
          />
        </div>

        {/* Financial Info */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h2 className="font-semibold text-gray-800 mb-3">Financial Information</h2>
          <InfoRow
            label="Total Amount"
            value={<span className="text-lg font-bold">₹{booking.finalAmount?.toLocaleString()}</span>}
          />
          <InfoRow
            label="Your Earnings"
            value={
              <span className="text-green-600 font-semibold">
                ₹{(booking.subVendorAmount || 0).toLocaleString()}
              </span>
            }
          />
          <InfoRow
            label="Earnings Generated"
            value={booking.earningsGenerated ? "Yes" : "Pending"}
          />
        </div>

      </div>
    </PartnerLayout>
  );
}
