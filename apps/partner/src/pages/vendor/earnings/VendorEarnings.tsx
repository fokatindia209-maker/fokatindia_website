import { useEffect, useState } from "react";
import {
  Wallet,
  IndianRupee,
  Calendar,
  TrendingUp,
  Loader2,
} from "lucide-react";

import PartnerLayout from "../../../components/PartnerLayout";
import api from "../../../api/axios";

interface Booking {
  id: number;
  bookingCode: string;
  bookingDate: string;
  bookingTime: string;
  finalAmount: number;

  // IMPORTANT (from backend)
  vendorAmount: number;
  bookingStatus: string;
  paymentStatus: string;

  createdAt: string;
}

export default function VendorEarnings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      const res = await api.get(
        `/restful/v1/api/bookings/vendor/${user.vendorId}`
      );

      setBookings(res.data?.data || []);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // ===============================
  // FINAL FILTER (BACKEND MATCHED)
  // ===============================

  const paidBookings = bookings.filter(
    (b) =>
      b.bookingStatus === "SUCCESS" &&
      b.paymentStatus === "SUCCESS"
  );

  const totalBookings = bookings.length;

  const completedBookings = paidBookings.length;

  const pendingBookings = bookings.filter(
    (b) =>
      b.bookingStatus === "PENDING" ||
      b.paymentStatus === "PENDING"
  ).length;

  const cancelledBookings = bookings.filter(
    (b) => b.bookingStatus === "CANCELLED"
  ).length;

  // ===============================
  // EARNINGS (FROM BACKEND ONLY)
  // ===============================

  const totalEarnings = paidBookings.reduce(
    (sum, b) => sum + (b.vendorAmount || 0),
    0
  );

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const thisMonthEarnings = paidBookings
    .filter((b) => {
      const d = new Date(b.createdAt);
      return (
        d.getMonth() === currentMonth &&
        d.getFullYear() === currentYear
      );
    })
    .reduce(
      (sum, b) => sum + (b.vendorAmount || 0),
      0
    );

  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  const thisWeekEarnings = paidBookings
    .filter((b) => new Date(b.createdAt) >= weekAgo)
    .reduce(
      (sum, b) => sum + (b.vendorAmount || 0),
      0
    );

  const walletBalance = totalEarnings;

  return (
    <PartnerLayout role="VENDOR">
      <div className="p-4 space-y-6">

        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-bold">Earnings</h1>
          <p className="text-gray-500">
            Track your revenue and payouts
          </p>
        </div>

        {loading ? (
          <div className="bg-white rounded-xl shadow p-10 flex items-center justify-center gap-2">
            <Loader2 className="animate-spin h-5 w-5 text-blue-600" />
            Loading earnings...
          </div>
        ) : (
          <>
            {/* SUMMARY CARDS */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

              <Card
                icon={<IndianRupee size={18} />}
                label="Total Earnings"
                value={totalEarnings}
              />

              <Card
                icon={<Calendar size={18} />}
                label="This Month"
                value={thisMonthEarnings}
              />

              <Card
                icon={<TrendingUp size={18} />}
                label="This Week"
                value={thisWeekEarnings}
              />

              <Card
                icon={<Wallet size={18} />}
                label="Wallet Balance"
                value={walletBalance}
              />
            </div>

            {/* BOOKING STATS */}
            <div className="bg-white rounded-xl shadow p-4">
              <h2 className="font-semibold text-lg mb-4">
                Booking Statistics
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                <Stat label="Total" value={totalBookings} />
                <Stat label="Completed" value={completedBookings} color="text-green-600" />
                <Stat label="Pending" value={pendingBookings} color="text-yellow-600" />
                <Stat label="Cancelled" value={cancelledBookings} color="text-red-600" />

              </div>
            </div>

            {/* REVENUE BREAKDOWN */}
            <div className="bg-white rounded-xl shadow p-4">
              <h2 className="font-semibold text-lg mb-4">
                Revenue Breakdown
              </h2>

              <div className="space-y-3">

                <Row label="Gross Revenue" value={totalEarnings} />

                <Row label="Platform Commission (handled in backend)" value={0} />

                <div className="border-t pt-3 flex justify-between">
                  <span className="font-bold">Net Earnings</span>
                  <span className="font-bold text-green-600">
                    ₹{totalEarnings.toLocaleString()}
                  </span>
                </div>

              </div>
            </div>

            {/* WALLET */}
            <div className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
              <div>
                <p className="text-gray-500">Withdrawable Balance</p>
                <h2 className="text-2xl font-bold">
                  ₹{walletBalance.toLocaleString()}
                </h2>
              </div>

              <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Withdraw
              </button>
            </div>

            {/* TRANSACTIONS */}
            <div className="bg-white rounded-xl shadow p-4">
              <h2 className="font-semibold text-lg mb-4">
                Recent Transactions
              </h2>

              {paidBookings.length === 0 ? (
                <p className="text-gray-500">No transactions found</p>
              ) : (
                <div className="space-y-3">

                  {paidBookings
                    .sort(
                      (a, b) =>
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime()
                    )
                    .slice(0, 10)
                    .map((b) => (
                      <div
                        key={b.id}
                        className="flex justify-between border-b pb-3"
                      >
                        <div>
                          <p className="font-medium">{b.bookingCode}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(b.createdAt).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="font-semibold">
                            ₹{(b.vendorAmount || 0).toLocaleString()}
                          </p>
                          <p className="text-green-600 text-sm">
                            Paid
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

/* ===============================
   SMALL REUSABLE COMPONENTS
================================ */
function Card({ icon, label, value }: any) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-sm text-gray-500">{label}</span>
      </div>
      <h2 className="text-2xl font-bold">
        ₹{value.toLocaleString()}
      </h2>
    </div>
  );
}

function Stat({ label, value, color = "" }: any) {
  return (
    <div className="border rounded-lg p-3">
      <p className="text-gray-500 text-sm">{label}</p>
      <h3 className={`text-xl font-bold ${color}`}>
        {value}
      </h3>
    </div>
  );
}

function Row({ label, value }: any) {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span className="font-semibold">
        ₹{value.toLocaleString()}
      </span>
    </div>
  );
}
// import { useEffect, useState } from "react";
// import {
//   Wallet,
//   IndianRupee,
//   Calendar,
//   TrendingUp,
//   Loader2,
// } from "lucide-react";

// import PartnerLayout from "../../../components/PartnerLayout";
// import api from "../../../api/axios";

// interface Booking {
//   id: number;
//   bookingCode: string;
//   bookingDate: string;
//   bookingTime: string;
//   finalAmount: number;
//   bookingStatus: string;
//   paymentStatus: string;
//   createdAt: string;
// }

// export default function VendorEarnings() {
//   const [bookings, setBookings] = useState<Booking[]>([]);
//   const [loading, setLoading] = useState(true);

//   const fetchBookings = async () => {
//     try {
//       const user = JSON.parse(
//         localStorage.getItem("user") || "{}"
//       );

//       const res = await api.get(
//         `/restful/v1/api/bookings/vendor/${user.vendorId}`
//       );

//       setBookings(res.data?.data || []);
//     } catch (error) {
//       console.error("Failed to fetch bookings:", error);
//       setBookings([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   // ===============================
//   // CALCULATIONS
//   // ===============================

//   const paidCompletedBookings = bookings.filter(
//     (booking) =>
//       booking.bookingStatus === "COMPLETED" &&
//       booking.paymentStatus === "PAID"
//   );

//   const totalBookings = bookings.length;

//   const completedBookings = bookings.filter(
//     (booking) => booking.bookingStatus === "COMPLETED"
//   ).length;

//   const pendingBookings = bookings.filter(
//     (booking) => booking.bookingStatus === "PENDING"
//   ).length;

//   const cancelledBookings = bookings.filter(
//     (booking) =>
//       booking.bookingStatus === "CANCELLED"
//   ).length;

//   const totalEarnings = paidCompletedBookings.reduce(
//     (sum, booking) => sum + booking.finalAmount,
//     0
//   );

//   const currentMonth = new Date().getMonth();
//   const currentYear = new Date().getFullYear();

//   const thisMonthEarnings = paidCompletedBookings
//     .filter((booking) => {
//       const date = new Date(booking.createdAt);

//       return (
//         date.getMonth() === currentMonth &&
//         date.getFullYear() === currentYear
//       );
//     })
//     .reduce(
//       (sum, booking) => sum + booking.finalAmount,
//       0
//     );

//   const weekAgo = new Date();
//   weekAgo.setDate(weekAgo.getDate() - 7);

//   const thisWeekEarnings = paidCompletedBookings
//     .filter(
//       (booking) =>
//         new Date(booking.createdAt) >= weekAgo
//     )
//     .reduce(
//       (sum, booking) => sum + booking.finalAmount,
//       0
//     );

//   // Example commission calculation
//   const commissionRate = 0.1;

//   const platformCommission =
//     totalEarnings * commissionRate;

//   const netEarnings =
//     totalEarnings - platformCommission;

//   // Example wallet balance
//   const walletBalance = netEarnings;

//   return (
//     <PartnerLayout>
//       <div className="p-4 space-y-6">

//         {/* HEADER */}
//         <div>
//           <h1 className="text-2xl font-bold">
//             Earnings
//           </h1>

//           <p className="text-gray-500">
//             Track your revenue and payouts
//           </p>
//         </div>

//         {loading ? (
//           <div className="bg-white rounded-xl shadow p-10">
//             <div className="flex items-center justify-center gap-2">
//               <Loader2 className="animate-spin h-5 w-5 text-blue-600" />
//               Loading earnings...
//             </div>
//           </div>
//         ) : (
//           <>
//             {/* SUMMARY CARDS */}
//             <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

//               <div className="bg-white p-4 rounded-xl shadow">
//                 <div className="flex items-center gap-2 mb-2">
//                   <IndianRupee size={18} />
//                   <span className="text-sm text-gray-500">
//                     Total Earnings
//                   </span>
//                 </div>

//                 <h2 className="text-2xl font-bold">
//                   ₹{totalEarnings.toLocaleString()}
//                 </h2>
//               </div>

//               <div className="bg-white p-4 rounded-xl shadow">
//                 <div className="flex items-center gap-2 mb-2">
//                   <Calendar size={18} />
//                   <span className="text-sm text-gray-500">
//                     This Month
//                   </span>
//                 </div>

//                 <h2 className="text-2xl font-bold">
//                   ₹{thisMonthEarnings.toLocaleString()}
//                 </h2>
//               </div>

//               <div className="bg-white p-4 rounded-xl shadow">
//                 <div className="flex items-center gap-2 mb-2">
//                   <TrendingUp size={18} />
//                   <span className="text-sm text-gray-500">
//                     This Week
//                   </span>
//                 </div>

//                 <h2 className="text-2xl font-bold">
//                   ₹{thisWeekEarnings.toLocaleString()}
//                 </h2>
//               </div>

//               <div className="bg-white p-4 rounded-xl shadow">
//                 <div className="flex items-center gap-2 mb-2">
//                   <Wallet size={18} />
//                   <span className="text-sm text-gray-500">
//                     Wallet Balance
//                   </span>
//                 </div>

//                 <h2 className="text-2xl font-bold">
//                   ₹{walletBalance.toLocaleString()}
//                 </h2>
//               </div>

//             </div>

//             {/* BOOKING STATS */}
//             <div className="bg-white rounded-xl shadow p-4">
//               <h2 className="font-semibold text-lg mb-4">
//                 Booking Statistics
//               </h2>

//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

//                 <div className="border rounded-lg p-3">
//                   <p className="text-gray-500 text-sm">
//                     Total Bookings
//                   </p>

//                   <h3 className="text-xl font-bold">
//                     {totalBookings}
//                   </h3>
//                 </div>

//                 <div className="border rounded-lg p-3">
//                   <p className="text-gray-500 text-sm">
//                     Completed
//                   </p>

//                   <h3 className="text-xl font-bold text-green-600">
//                     {completedBookings}
//                   </h3>
//                 </div>

//                 <div className="border rounded-lg p-3">
//                   <p className="text-gray-500 text-sm">
//                     Pending
//                   </p>

//                   <h3 className="text-xl font-bold text-yellow-600">
//                     {pendingBookings}
//                   </h3>
//                 </div>

//                 <div className="border rounded-lg p-3">
//                   <p className="text-gray-500 text-sm">
//                     Cancelled
//                   </p>

//                   <h3 className="text-xl font-bold text-red-600">
//                     {cancelledBookings}
//                   </h3>
//                 </div>

//               </div>
//             </div>

//             {/* REVENUE BREAKDOWN */}
//             <div className="bg-white rounded-xl shadow p-4">
//               <h2 className="font-semibold text-lg mb-4">
//                 Revenue Breakdown
//               </h2>

//               <div className="space-y-3">

//                 <div className="flex justify-between">
//                   <span>Gross Revenue</span>

//                   <span className="font-semibold">
//                     ₹{totalEarnings.toLocaleString()}
//                   </span>
//                 </div>

//                 <div className="flex justify-between">
//                   <span>Platform Commission (10%)</span>

//                   <span className="font-semibold text-red-600">
//                     - ₹
//                     {platformCommission.toLocaleString()}
//                   </span>
//                 </div>

//                 <div className="border-t pt-3 flex justify-between">
//                   <span className="font-bold">
//                     Net Earnings
//                   </span>

//                   <span className="font-bold text-green-600">
//                     ₹{netEarnings.toLocaleString()}
//                   </span>
//                 </div>

//               </div>
//             </div>

//             {/* WITHDRAW SECTION */}
//             <div className="bg-white rounded-xl shadow p-4">

//               <div className="flex justify-between items-center">

//                 <div>
//                   <p className="text-gray-500">
//                     Withdrawable Balance
//                   </p>

//                   <h2 className="text-2xl font-bold">
//                     ₹{walletBalance.toLocaleString()}
//                   </h2>
//                 </div>

//                 <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
//                   Withdraw
//                 </button>

//               </div>

//             </div>

//             {/* RECENT TRANSACTIONS */}
//             <div className="bg-white rounded-xl shadow p-4">
//               <h2 className="font-semibold text-lg mb-4">
//                 Recent Transactions
//               </h2>

//               {paidCompletedBookings.length === 0 ? (
//                 <p className="text-gray-500">
//                   No transactions found
//                 </p>
//               ) : (
//                 <div className="space-y-3">

//                   {paidCompletedBookings
//                     .sort(
//                       (a, b) =>
//                         new Date(
//                           b.createdAt
//                         ).getTime() -
//                         new Date(
//                           a.createdAt
//                         ).getTime()
//                     )
//                     .slice(0, 10)
//                     .map((booking) => (
//                       <div
//                         key={booking.id}
//                         className="flex justify-between border-b pb-3"
//                       >
//                         <div>
//                           <p className="font-medium">
//                             {booking.bookingCode}
//                           </p>

//                           <p className="text-sm text-gray-500">
//                             {new Date(
//                               booking.createdAt
//                             ).toLocaleDateString()}
//                           </p>
//                         </div>

//                         <div className="text-right">
//                           <p className="font-semibold">
//                             ₹
//                             {booking.finalAmount.toLocaleString()}
//                           </p>

//                           <p className="text-green-600 text-sm">
//                             Paid
//                           </p>
//                         </div>
//                       </div>
//                     ))}

//                 </div>
//               )}
//             </div>
//           </>
//         )}
//       </div>
//     </PartnerLayout>
//   );
// }