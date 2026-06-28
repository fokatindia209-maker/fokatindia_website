import { useEffect, useState } from "react";
import {
  DollarSign,
  Users,
  CalendarCheck,
  Star,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { useSelector } from "react-redux";

import PartnerLayout from "../../../components/PartnerLayout";
import StatCard from "../../../components/StatCard";
import type { RootState } from "../../../store/store";
import { getVendorDashboardStats } from "../../../services/vendorDashboardService";
import type {
  VendorDashboardData,
  VendorRecentBookingItem,
  VendorTopSubVendorItem,
  VendorRecentReviewItem,
} from "../../../types/vendorDashboard";

// ─── helpers ────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

function bookingStatusColor(status: string) {
  switch (status?.toUpperCase()) {
    case "SUCCESS":    return "bg-green-100 text-green-700";
    case "PENDING":    return "bg-yellow-100 text-yellow-700";
    case "CANCELLED":  return "bg-red-100 text-red-700";
    case "CONFIRMED":  return "bg-blue-100 text-blue-700";
    default:           return "bg-gray-100 text-gray-600";
  }
}

function availabilityColor(status: string) {
  switch (status?.toUpperCase()) {
    case "AVAILABLE":  return "bg-green-100 text-green-700";
    case "BUSY":       return "bg-orange-100 text-orange-700";
    case "INACTIVE":   return "bg-gray-100 text-gray-500";
    default:           return "bg-gray-100 text-gray-500";
  }
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={13}
          className={s <= Math.round(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
        />
      ))}
    </div>
  );
}

// ─── skeleton ────────────────────────────────────────────────────────────────

function DashboardSkeleton() {
  return (
    <div className="p-4 space-y-6 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-64 mb-2" />
      <div className="h-4 bg-gray-100 rounded w-48 mb-6" />
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 h-36" />
        ))}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 h-80" />
        <div className="bg-white rounded-2xl p-6 h-80" />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 h-72" />
        <div className="bg-white rounded-2xl p-6 h-72" />
      </div>
    </div>
  );
}

// ─── main component ──────────────────────────────────────────────────────────

export default function VendorDashboard() {
  const user = useSelector((state: RootState) => state.auth.user);

  const [data, setData] = useState<VendorDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user") || "{}");
    const vendorId: number | undefined = user?.vendorId ?? stored?.vendorId;
    if (!vendorId) {
      setError("Vendor ID not found. Please log in again.");
      setLoading(false);
      return;
    }

    getVendorDashboardStats(vendorId)
      .then(setData)
      .catch(() => setError("Failed to load dashboard data."))
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) {
    return (
      <PartnerLayout role="VENDOR">
        <DashboardSkeleton />
      </PartnerLayout>
    );
  }

  if (error || !data) {
    return (
      <PartnerLayout role="VENDOR">
        <div className="flex flex-col items-center justify-center h-72 gap-3 text-red-500">
          <AlertCircle size={40} />
          <p className="text-lg font-medium">{error ?? "No data available."}</p>
        </div>
      </PartnerLayout>
    );
  }

  // normalise bar chart heights
  const maxCount = Math.max(...(data.monthlyBookingStats.map((s) => s.count) || [1]), 1);

  const storedName = JSON.parse(localStorage.getItem("user") || "{}").name ?? user?.name ?? "Vendor";

  return (
    <PartnerLayout role="VENDOR">
      <div className="p-4 space-y-6">

        {/* HEADER */}
        <div className="mb-2">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome Back, {storedName} 👋
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your bookings, sub-vendors and earnings.
          </p>
        </div>

        {/* STAT CARDS */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard
            title="Total Bookings"
            value={data.totalBookings.toString()}
            sub={`${data.activeJobs} Active`}
            icon={<CalendarCheck />}
            color="text-blue-600"
            bg="bg-blue-100"
          />
          <StatCard
            title="Total Earnings"
            value={fmt(data.totalEarnings)}
            sub="From completed bookings"
            icon={<DollarSign />}
            color="text-green-600"
            bg="bg-green-100"
          />
          <StatCard
            title="Sub-Vendors"
            value={data.totalSubVendors.toString()}
            sub="Registered workers"
            icon={<Users />}
            color="text-purple-600"
            bg="bg-purple-100"
          />
          <StatCard
            title="Avg Rating"
            value={data.averageRating.toFixed(1) + " ⭐"}
            sub={`${data.completedJobs} jobs completed`}
            icon={<Star />}
            color="text-orange-600"
            bg="bg-orange-100"
          />
        </div>

        {/* CHART + RECENT BOOKINGS */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {/* MONTHLY BOOKING CHART */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-1">Booking Statistics</h2>
            <p className="text-sm text-gray-400 mb-6">Last 6 months</p>

            {data.monthlyBookingStats.length === 0 ? (
              <div className="h-64 flex items-center justify-center text-gray-400">
                <p>No booking data yet</p>
              </div>
            ) : (
              <div className="h-64 flex items-end gap-3">
                {data.monthlyBookingStats.map((stat) => {
                  const height = Math.max((stat.count / maxCount) * 220, 8);
                  return (
                    <div key={stat.month} className="flex-1 flex flex-col items-center gap-2">
                      <span className="text-xs font-semibold text-blue-600">{stat.count}</span>
                      <div
                        className="w-full bg-blue-500 rounded-t-xl transition-all duration-500"
                        style={{ height: `${height}px` }}
                      />
                      <span className="text-xs text-gray-500 text-center leading-tight">{stat.month}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* RECENT BOOKINGS */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-5">Recent Bookings</h2>

            {data.recentBookings.length === 0 ? (
              <p className="text-gray-400 text-sm">No bookings yet.</p>
            ) : (
              <div className="space-y-3">
                {data.recentBookings.map((b: VendorRecentBookingItem) => (
                  <div
                    key={b.id}
                    className="flex items-center justify-between py-3 border-b last:border-0"
                  >
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{b.userName ?? "Customer"}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{b.bookingCode} · {b.bookingDate}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${bookingStatusColor(b.bookingStatus)}`}>
                        {b.bookingStatus}
                      </span>
                      <span className="text-xs font-semibold text-gray-700">{fmt(b.finalAmount)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* TOP SUB-VENDORS + RECENT REVIEWS */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {/* TOP SUB-VENDORS */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-5">Top Sub-Vendors</h2>

            {data.topSubVendors.length === 0 ? (
              <p className="text-gray-400 text-sm">No sub-vendors registered yet.</p>
            ) : (
              <div className="space-y-3">
                {data.topSubVendors.map((sv: VendorTopSubVendorItem) => (
                  <div
                    key={sv.subVendorId}
                    className="flex items-center justify-between py-3 border-b last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-sm">
                        {sv.name?.[0]?.toUpperCase() ?? "?"}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">{sv.name}</p>
                        <p className="text-xs text-gray-400">{sv.specialization ?? "General"} · {sv.totalJobs} jobs</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${availabilityColor(sv.availabilityStatus)}`}>
                        {sv.availabilityStatus ?? "—"}
                      </span>
                      <Stars rating={sv.rating ?? 0} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RECENT REVIEWS */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-5">Recent Reviews</h2>

            {data.recentReviews.length === 0 ? (
              <p className="text-gray-400 text-sm">No reviews yet.</p>
            ) : (
              <div className="space-y-4">
                {data.recentReviews.map((r: VendorRecentReviewItem) => (
                  <div key={r.id} className="flex gap-3 pb-4 border-b last:border-0">
                    <div className="w-9 h-9 shrink-0 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
                      {r.userName?.[0]?.toUpperCase() ?? "?"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <p className="font-semibold text-gray-800 text-sm">{r.userName ?? "Customer"}</p>
                        <Stars rating={r.rating} />
                      </div>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{r.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* PERFORMANCE SUMMARY */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Bookings",    value: data.totalBookings },
            { label: "Completed Jobs",    value: data.completedJobs },
            { label: "Cancelled Jobs",    value: data.cancelledJobs },
            { label: "Active Jobs",       value: data.activeJobs },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-1">
              <p className="text-gray-500 text-sm">{label}</p>
              <div className="flex items-center gap-2 mt-1">
                <TrendingUp size={16} className="text-blue-400" />
                <h2 className="text-3xl font-bold text-gray-800">{value}</h2>
              </div>
            </div>
          ))}
        </div>

      </div>
    </PartnerLayout>
  );
}
