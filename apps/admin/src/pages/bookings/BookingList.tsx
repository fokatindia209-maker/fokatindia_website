import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const API = import.meta.env.VITE_API_URL;

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

      const res = await axios.get(
        `${API}/restful/v1/api/bookings`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

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

      {/* TABLE */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">

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