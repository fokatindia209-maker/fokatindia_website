import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import PartnerLayout from "../../../components/PartnerLayout";
import api from "../../../api/axios";

interface Booking {
  id: number;
  bookingCode: string;
  bookingDate: string;
  bookingStatus: string;
  paymentStatus: string;
  finalAmount: number;
  subVendorAmount: number;
  serviceId: number;
  createdAt: string;
}

export default function SubReports() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const res = await api.get(
          `/restful/v1/api/bookings/subVendor/${user.subVendorId}`
        );
        setBookings(res.data?.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const completed = bookings.filter(
    (b) => b.bookingStatus === "COMPLETED" || b.bookingStatus === "SUCCESS"
  );
  const cancelled = bookings.filter((b) => b.bookingStatus === "CANCELLED");
  const pending = bookings.filter(
    (b) => b.bookingStatus === "PENDING" || b.bookingStatus === "CONFIRMED"
  );

  const totalRevenue = completed.reduce((s, b) => s + (b.finalAmount || 0), 0);
  const netEarnings = completed.reduce((s, b) => s + (b.subVendorAmount || 0), 0);

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const monthlyCompleted = completed.filter((b) => {
    const d = new Date(b.createdAt);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });
  const monthlyRevenue = monthlyCompleted.reduce(
    (s, b) => s + (b.subVendorAmount || 0),
    0
  );

  return (
    <PartnerLayout role="SUB_VENDOR">
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Reports</h1>

        {loading ? (
          <div className="flex items-center justify-center py-10 gap-2">
            <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
            Loading reports...
          </div>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-white shadow rounded-xl p-4">
                <h2 className="text-gray-500 text-sm">Total Revenue</h2>
                <p className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</p>
              </div>

              <div className="bg-white shadow rounded-xl p-4">
                <h2 className="text-gray-500 text-sm">Net Earnings</h2>
                <p className="text-2xl font-bold text-green-600">
                  ₹{netEarnings.toLocaleString()}
                </p>
              </div>

              <div className="bg-white shadow rounded-xl p-4">
                <h2 className="text-gray-500 text-sm">This Month</h2>
                <p className="text-2xl font-bold text-blue-600">
                  ₹{monthlyRevenue.toLocaleString()}
                </p>
              </div>

              <div className="bg-white shadow rounded-xl p-4">
                <h2 className="text-gray-500 text-sm">Total Bookings</h2>
                <p className="text-2xl font-bold">{bookings.length}</p>
              </div>
            </div>

            {/* Booking Breakdown */}
            <div className="bg-white rounded-xl shadow p-4">
              <h2 className="font-semibold mb-4">Booking Breakdown</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="border rounded-lg p-3 text-center">
                  <p className="text-gray-500 text-sm">Total</p>
                  <h3 className="text-xl font-bold">{bookings.length}</h3>
                </div>
                <div className="border rounded-lg p-3 text-center">
                  <p className="text-gray-500 text-sm">Completed</p>
                  <h3 className="text-xl font-bold text-green-600">{completed.length}</h3>
                </div>
                <div className="border rounded-lg p-3 text-center">
                  <p className="text-gray-500 text-sm">Pending</p>
                  <h3 className="text-xl font-bold text-yellow-600">{pending.length}</h3>
                </div>
                <div className="border rounded-lg p-3 text-center">
                  <p className="text-gray-500 text-sm">Cancelled</p>
                  <h3 className="text-xl font-bold text-red-600">{cancelled.length}</h3>
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-xl shadow p-4">
              <h2 className="font-semibold mb-4">Recent Completed Bookings</h2>
              {completed.length === 0 ? (
                <p className="text-gray-500">No completed bookings yet</p>
              ) : (
                <div className="space-y-3">
                  {[...completed]
                    .sort(
                      (a, b) =>
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime()
                    )
                    .slice(0, 10)
                    .map((b) => (
                      <div
                        key={b.id}
                        className="flex justify-between border-b pb-3 last:border-0"
                      >
                        <div>
                          <p className="font-medium">{b.bookingCode}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(b.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">
                            ₹{(b.subVendorAmount || 0).toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-400">
                            Total: ₹{(b.finalAmount || 0).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </PartnerLayout>
  );
}
