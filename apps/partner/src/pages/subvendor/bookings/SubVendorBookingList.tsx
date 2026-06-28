import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Loader2,
  CalendarCheck,
  Clock,
  IndianRupee,
} from "lucide-react";
import PartnerLayout from "../../../components/PartnerLayout";
import api from "../../../api/axios";

interface Booking {
  id: number;
  bookingCode: string;
  bookingDate: string;
  bookingTime: string;
  finalAmount: number;
  bookingStatus: string;
  paymentStatus: string;
  createdAt: string;
}

export default function SubVendorBookingList() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const res = await api.get(
        `/restful/v1/api/bookings/subVendor/${user.subVendorId}`
      );
      setBookings(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <PartnerLayout role="SUB_VENDOR">
      {/* HEADER */}
      <div className="p-4 space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          My Bookings
        </h1>

        <p className="text-gray-500 mt-1">
          Manage all customer bookings
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <CalendarCheck className="text-blue-600 mb-3" />
          <p className="text-gray-500">Total Bookings</p>
          <h2 className="text-3xl font-bold">
            {bookings.length}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5">
          <Clock className="text-orange-500 mb-3" />
          <p className="text-gray-500">Pending Jobs</p>
          <h2 className="text-3xl font-bold">
            {
              bookings.filter(
                (b) => b.bookingStatus === "PENDING"
              ).length
            }
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5">
          <IndianRupee className="text-green-600 mb-3" />
          <p className="text-gray-500">Revenue</p>
          <h2 className="text-3xl font-bold">
            ₹
            {bookings.reduce(
              (sum, b) => sum + b.finalAmount,
              0
            )}
          </h2>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 text-left">Code</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Time</th>
                <th className="p-4 text-left">Amount</th>
                <th className="p-4 text-left">Booking</th>
                <th className="p-4 text-left">Payment</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td colSpan={7} className="p-8 text-center">
                    <div className="flex justify-center items-center gap-2">
                      <Loader2 className="animate-spin h-5 w-5 text-blue-600" />
                      Loading bookings...
                    </div>
                  </td>
                </tr>
              )}

              {!loading &&
                bookings.map((b) => (
                  <tr
                    key={b.id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-4 font-medium">
                      {b.bookingCode}
                    </td>

                    <td className="p-4">
                      {b.bookingDate}
                    </td>

                    <td className="p-4">
                      {b.bookingTime}
                    </td>

                    <td className="p-4 font-semibold">
                      ₹{b.finalAmount}
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${b.bookingStatus === "COMPLETED"
                            ? "bg-green-100 text-green-700"
                            : b.bookingStatus === "CONFIRMED"
                              ? "bg-blue-100 text-blue-700"
                              : b.bookingStatus === "PENDING"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                          }`}
                      >
                        {b.bookingStatus}
                      </span>
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${b.paymentStatus === "PAID"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                          }`}
                      >
                        {b.paymentStatus}
                      </span>
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() =>
                          navigate(
                            `/subvendor/bookings/${b.id}`
                          )
                        }
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}

              {!loading && bookings.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="p-8 text-center text-gray-500"
                  >
                    No bookings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
</div>
    </PartnerLayout >
  );
}