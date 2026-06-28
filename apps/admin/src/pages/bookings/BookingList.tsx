import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

interface Booking {
  id: number;
  bookingCode: string;

  userId: number;
  vendorId: number;
  subVendorId: number;

  categoryId: number;
  serviceId: number;
  addressId: number;

  bookingDate: string;
  bookingTime: string;

  amount: number;
  discountAmount: number;
  finalAmount: number;

  paymentStatus: string;
  bookingStatus: string;

  notes: string;
  otp: string;

  active: boolean;

  createdAt: string;
  updatedAt: string;
}

export default function BookingList() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/restful/v1/api/bookings`);

      setBookings(res.data.data || []);
    } catch (err) {
      console.error("Error fetching bookings", err);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Bookings
        </h1>

        <button
          onClick={() => navigate("/bookings/create")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          + Create Booking
        </button>
      </div>

      {/* MOBILE CARDS */}
      <div className="md:hidden space-y-3">
        {loading && (
          <div className="bg-white rounded-xl p-6 text-center text-gray-500">
            <Loader2 className="w-5 h-5 animate-spin text-blue-600 mx-auto mb-2" />
            Loading bookings...
          </div>
        )}
        {!loading && bookings.length === 0 && (
          <div className="bg-white rounded-xl p-6 text-center text-gray-500">No bookings found</div>
        )}
        {!loading && bookings.map((b) => (
          <div key={b.id} className="bg-white rounded-xl shadow p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-800">{b.bookingCode}</span>
              <span className={`px-2 py-1 rounded text-xs ${b.bookingStatus === "PENDING" ? "bg-yellow-100 text-yellow-700" : b.bookingStatus === "CONFIRMED" ? "bg-blue-100 text-blue-700" : b.bookingStatus === "COMPLETED" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{b.bookingStatus}</span>
            </div>
            <p className="text-sm text-gray-500">{b.bookingDate} {b.bookingTime}</p>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-green-600 font-bold">₹{b.finalAmount}</span>
              <span className={`px-2 py-1 rounded text-xs ${b.paymentStatus === "PAID" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{b.paymentStatus}</span>
            </div>
            <p className="text-xs text-gray-400">User: {b.userId} · Vendor: {b.vendorId}</p>
            <div className="pt-1">
              <button onClick={() => navigate(`/bookings/edit/${b.id}`)} className="px-3 py-1 bg-blue-500 text-white rounded text-sm">View/Edit</button>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow">

        <table className="min-w-[2600px] w-full text-sm">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Code</th>

              <th className="p-3 text-left">User ID</th>
              <th className="p-3 text-left">Vendor ID</th>
              <th className="p-3 text-left">SubVendor ID</th>

              <th className="p-3 text-left">Category ID</th>
              <th className="p-3 text-left">Service ID</th>
              <th className="p-3 text-left">Address ID</th>

              <th className="p-3 text-left">Booking Date</th>
              <th className="p-3 text-left">Booking Time</th>

              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Discount</th>
              <th className="p-3 text-left">Final Amount</th>

              <th className="p-3 text-left">Booking Status</th>
              <th className="p-3 text-left">Payment Status</th>

              <th className="p-3 text-left">OTP</th>
              <th className="p-3 text-left">Active</th>

              <th className="p-3 text-left">Created At</th>
              <th className="p-3 text-left">Updated At</th>

              <th className="p-3 text-left">Notes</th>

              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>

            {/* LOADING */}
            {loading && (
              <tr>
                <td colSpan={21} className="p-8">
                  <div className="flex items-center justify-center gap-2 text-blue-600">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Loading bookings...
                  </div>
                </td>
              </tr>
            )}

            {/* DATA */}
            {!loading &&
              bookings.map((b) => (
                <tr
                  key={b.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-3">{b.id}</td>

                  <td className="p-3 font-medium">
                    {b.bookingCode}
                  </td>

                  <td className="p-3">{b.userId}</td>

                  <td className="p-3">{b.vendorId}</td>

                  <td className="p-3">
                    {b.subVendorId}
                  </td>

                  <td className="p-3">
                    {b.categoryId}
                  </td>

                  <td className="p-3">
                    {b.serviceId}
                  </td>

                  <td className="p-3">
                    {b.addressId}
                  </td>

                  <td className="p-3">
                    {b.bookingDate}
                  </td>

                  <td className="p-3">
                    {b.bookingTime}
                  </td>

                  <td className="p-3">
                    ₹{b.amount}
                  </td>

                  <td className="p-3 text-red-600 font-medium">
                    ₹{b.discountAmount}
                  </td>

                  <td className="p-3 text-green-600 font-bold">
                    ₹{b.finalAmount}
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        b.bookingStatus === "PENDING"
                          ? "bg-yellow-100 text-yellow-700"
                          : b.bookingStatus === "CONFIRMED"
                          ? "bg-blue-100 text-blue-700"
                          : b.bookingStatus === "COMPLETED"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {b.bookingStatus}
                    </span>
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        b.paymentStatus === "PAID"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {b.paymentStatus}
                    </span>
                  </td>

                  <td className="p-3">
                    {b.otp || "-"}
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        b.active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {b.active ? "YES" : "NO"}
                    </span>
                  </td>

                  <td className="p-3 whitespace-nowrap">
                    {b.createdAt
                      ? new Date(
                          b.createdAt
                        ).toLocaleString()
                      : "-"}
                  </td>

                  <td className="p-3 whitespace-nowrap">
                    {b.updatedAt
                      ? new Date(
                          b.updatedAt
                        ).toLocaleString()
                      : "-"}
                  </td>

                  <td className="p-3 max-w-xs">
                    <div className="truncate">
                      {b.notes || "-"}
                    </div>
                  </td>

                  <td className="p-3">
                    <button
                      onClick={() =>
                        navigate(
                          `/bookings/edit/${b.id}`
                        )
                      }
                      className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded"
                    >
                      View/Edit
                    </button>
                  </td>
                </tr>
              ))}

            {/* EMPTY */}
            {!loading && bookings.length === 0 && (
              <tr>
                <td
                  colSpan={21}
                  className="text-center py-8 text-gray-500"
                >
                  No bookings found
                </td>
              </tr>
            )}

          </tbody>
        </table>
      </div>
    </div>
  );
}