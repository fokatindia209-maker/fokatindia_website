// ===============================
// Dashboard.tsx
// USE WITH AppLayout/AdminLayout
// ===============================

import { useEffect, useState } from "react";

import {
  DollarSign,
  Users,
  CalendarCheck,
  Clock3,
  Star,
  AlertCircle,
} from "lucide-react";

import Footer from "../../components/Footer";
import { getDashboardStats } from "../../services/dashboardService";
import type {
  AdminDashboardData,
  RecentBookingItem,
  TopVendorItem,
} from "../../types/dashboard";

export default function Dashboard() {
  const [data, setData] = useState<AdminDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getDashboardStats()
      .then(setData)
      .catch(() => setError("Failed to load dashboard data."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <DashboardSkeleton />;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3 text-red-500">
          <AlertCircle className="w-6 h-6" />
          <p className="text-lg font-medium">{error}</p>
        </div>
      </div>
    );
  }

  const stats = data!;

  // Normalize monthly stats for the bar chart (max height 280px)
  const counts = stats.monthlyBookingStats.map((s) => s.count);
  const maxCount = Math.max(...counts, 1);
  const chartBars: { month: string; height: number }[] =
    stats.monthlyBookingStats.map((s) => ({
      month: s.month,
      height: Math.round((s.count / maxCount) * 280),
    }));

  return (
    <div className="min-h-screen flex flex-col py-12">
      {/* MAIN */}
      <main className="flex-1">
        {/* WELCOME */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome Back, Admin!
          </h1>

          <p className="text-gray-500 mt-1">
            Here's the latest overview of your platform.
          </p>
        </div>

        {/* TOP CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          <StatCard
            title="Total Bookings"
            value={stats.totalBookings.toLocaleString()}
            sub={`${stats.pendingBookings} pending`}
            icon={<CalendarCheck />}
            color="text-blue-600"
            bg="bg-blue-100"
          />

          <StatCard
            title="Total Revenue"
            value={`₹${stats.totalRevenue.toLocaleString("en-IN", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}`}
            sub="From paid bookings"
            icon={<DollarSign />}
            color="text-green-600"
            bg="bg-green-100"
          />

          <StatCard
            title="Total Vendors"
            value={stats.totalVendors.toLocaleString()}
            sub={`${stats.pendingKycVendors} pending KYC`}
            icon={<Users />}
            color="text-cyan-600"
            bg="bg-cyan-100"
          />

          <StatCard
            title="Total Users"
            value={stats.totalUsers.toLocaleString()}
            sub="Registered users"
            icon={<Clock3 />}
            color="text-purple-600"
            bg="bg-purple-100"
          />
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
          {/* BOOKING STATS CHART */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Booking Statistics
              </h2>

              <span className="text-sm text-gray-400">Last 6 months</span>
            </div>

            {chartBars.length > 0 ? (
              <div className="h-72 flex items-end gap-4">
                {chartBars.map((bar, index) => (
                  <div
                    key={index}
                    className="flex-1 flex flex-col items-center gap-2"
                  >
                    <div
                      className="w-full bg-blue-500 rounded-t-xl transition-all duration-500"
                      style={{ height: `${bar.height}px` }}
                    />
                    <span className="text-xs text-gray-400 text-center leading-tight">
                      {bar.month}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-72 flex items-center justify-center text-gray-400">
                No booking data yet
              </div>
            )}
          </div>

          {/* RECENT BOOKINGS */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Recent Bookings
              </h2>

              <span className="text-sm text-gray-400">Latest 5</span>
            </div>

            {stats.recentBookings.length > 0 ? (
              <div className="space-y-5">
                {stats.recentBookings.map((booking) => (
                  <BookingItem key={booking.id} booking={booking} />
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center py-10">
                No bookings found
              </p>
            )}
          </div>
        </div>

        {/* BOTTOM */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
          {/* TOP VENDORS */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-5">Top Vendors</h2>

            {stats.topVendors.length > 0 ? (
              <div className="space-y-4">
                {stats.topVendors.map((vendor) => (
                  <VendorItem key={vendor.vendorId} vendor={vendor} />
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center py-10">
                No vendors found
              </p>
            )}
          </div>

          {/* PLATFORM SUMMARY */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-5">Platform Summary</h2>

            <div className="space-y-4">
              <SummaryRow
                label="Total Users"
                value={stats.totalUsers.toLocaleString()}
                color="text-purple-600"
              />
              <SummaryRow
                label="Total Vendors"
                value={stats.totalVendors.toLocaleString()}
                color="text-cyan-600"
              />
              <SummaryRow
                label="Total Bookings"
                value={stats.totalBookings.toLocaleString()}
                color="text-blue-600"
              />
              <SummaryRow
                label="Pending Bookings"
                value={stats.pendingBookings.toLocaleString()}
                color="text-orange-500"
              />
              <SummaryRow
                label="Pending KYC Vendors"
                value={stats.pendingKycVendors.toLocaleString()}
                color="text-red-500"
              />
              <SummaryRow
                label="Total Revenue (Paid)"
                value={`₹${stats.totalRevenue.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`}
                color="text-green-600"
              />
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

// =======================================
// SKELETON LOADER
// =======================================

function DashboardSkeleton() {
  return (
    <div className="min-h-screen flex flex-col py-12 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-72 mb-2" />
      <div className="h-4 bg-gray-100 rounded w-48 mb-8" />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm p-6 h-36" />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6 h-80" />
        <div className="bg-white rounded-2xl shadow-sm p-6 h-80" />
      </div>
    </div>
  );
}

// =======================================
// STAT CARD
// =======================================

interface StatCardProps {
  title: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
  color: string;
  bg: string;
}

function StatCard({ title, value, sub, icon, color, bg }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div
        className={`
          w-14 h-14 rounded-2xl
          flex items-center justify-center
          ${bg} ${color}
        `}
      >
        {icon}
      </div>

      <p className="text-gray-500 mt-4">{title}</p>

      <h2 className="text-4xl font-bold mt-2">{value}</h2>

      <p className={`mt-2 text-sm ${color}`}>{sub}</p>
    </div>
  );
}

// =======================================
// BOOKING ITEM
// =======================================

function BookingItem({ booking }: { booking: RecentBookingItem }) {
  const statusColor =
    booking.bookingStatus === "COMPLETED"
      ? "bg-green-100 text-green-700"
      : booking.bookingStatus === "CANCELLED"
      ? "bg-red-100 text-red-600"
      : "bg-yellow-100 text-yellow-700";

  return (
    <div className="flex items-center justify-between border-b pb-4">
      <div className="flex items-center gap-4">
        <img
          src="https://i.pravatar.cc/50"
          alt="user"
          className="w-12 h-12 rounded-full"
        />

        <div>
          <h3 className="font-semibold text-gray-800">{booking.userName}</h3>
          <p className="text-xs text-gray-400">{booking.bookingCode}</p>
          <p className="text-sm text-gray-500">{booking.bookingDate}</p>
        </div>
      </div>

      <div className="text-right">
        <p className="font-semibold text-green-600">
          ₹{booking.finalAmount.toLocaleString("en-IN")}
        </p>
        <span className={`mt-1 inline-block px-3 py-1 rounded-xl text-xs ${statusColor}`}>
          {booking.bookingStatus}
        </span>
      </div>
    </div>
  );
}

// =======================================
// VENDOR ITEM
// =======================================

function VendorItem({ vendor }: { vendor: TopVendorItem }) {
  const kycColor =
    vendor.kycStatus === "VERIFIED"
      ? "bg-green-100 text-green-700"
      : vendor.kycStatus === "REJECTED"
      ? "bg-red-100 text-red-600"
      : "bg-yellow-100 text-yellow-700";

  return (
    <div className="flex items-center justify-between border-b pb-4">
      <div className="flex items-center gap-4">
        <img
          src="https://i.pravatar.cc/50"
          alt="vendor"
          className="w-12 h-12 rounded-full"
        />

        <div>
          <h3 className="font-semibold">{vendor.businessName}</h3>

          <div className="flex items-center gap-1 mt-1">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            <span className="text-sm text-gray-500">
              {vendor.rating.toFixed(1)}
            </span>
          </div>
        </div>
      </div>

      <span className={`px-4 py-2 rounded-xl text-sm ${kycColor}`}>
        {vendor.kycStatus}
      </span>
    </div>
  );
}

// =======================================
// SUMMARY ROW
// =======================================

interface SummaryRowProps {
  label: string;
  value: string;
  color: string;
}

function SummaryRow({ label, value, color }: SummaryRowProps) {
  return (
    <div className="flex items-center justify-between border-b pb-3">
      <span className="text-gray-600">{label}</span>
      <span className={`font-bold text-lg ${color}`}>{value}</span>
    </div>
  );
}
