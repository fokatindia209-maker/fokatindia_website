import { useEffect, useState } from "react";
import {
  DollarSign,
  CalendarCheck,
  Clock3,
  Star,
  AlertCircle,
  XCircle,
  CheckCircle2,
  Activity,
} from "lucide-react";
import { useSelector } from "react-redux";
import PartnerLayout from "../../../components/PartnerLayout";
import StatCard from "../../../components/StatCard";
import type { RootState } from "../../../store/store";
import api from "../../../api/axios";

interface RecentBooking {
  id: number;
  bookingCode: string;
  userName: string;
  bookingStatus: string;
  paymentStatus: string;
  finalAmount: number;
  subVendorAmount: number;
  bookingDate: string;
}

interface RecentReview {
  id: number;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface MonthlyBookingStat {
  month: string;
  count: number;
}

interface DashboardData {
  totalBookings: number;
  totalEarnings: number;
  activeJobs: number;
  completedJobs: number;
  cancelledJobs: number;
  averageRating: number;
  totalReviews: number;
  monthlyBookingStats: MonthlyBookingStat[];
  recentBookings: RecentBooking[];
  recentReviews: RecentReview[];
}

function fmt(n: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

const statusStyle: Record<string, string> = {
  SUCCESS: "bg-green-100 text-green-700",
  COMPLETED: "bg-green-100 text-green-700",
  PENDING: "bg-yellow-100 text-yellow-700",
  CONFIRMED: "bg-blue-100 text-blue-700",
  CANCELLED: "bg-red-100 text-red-700",
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusStyle[status?.toUpperCase()] ?? "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  );
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
    </div>
  );
}

export default function SubVendorDashboard() {
  const user = useSelector((state: RootState) => state.auth.user);

  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user") || "{}");
    const subVendorId: number | undefined = user?.subVendorId ?? stored?.subVendorId;

    if (!subVendorId) {
      setError("Sub-Vendor ID not found. Please log in again.");
      setLoading(false);
      return;
    }

    api
      .get(`/restful/v1/api/subvendor/dashboard/${subVendorId}`)
      .then((res) => setData(res.data?.data ?? null))
      .catch(() => setError("Failed to load dashboard data."))
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) {
    return (
      <PartnerLayout role="SUB_VENDOR">
        <DashboardSkeleton />
      </PartnerLayout>
    );
  }

  if (error || !data) {
    return (
      <PartnerLayout role="SUB_VENDOR">
        <div className="flex flex-col items-center justify-center h-72 gap-3 text-red-500">
          <AlertCircle size={40} />
          <p className="text-lg font-medium">{error ?? "No data found."}</p>
        </div>
      </PartnerLayout>
    );
  }

  const stored = JSON.parse(localStorage.getItem("user") || "{}");
  const displayName = stored.name ?? user?.name ?? "Sub-Vendor";

  return (
    <PartnerLayout role="SUB_VENDOR">
      <div className="p-4 space-y-6">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back, {displayName} 👋</h1>
          <p className="text-gray-500 mt-1">Track your bookings, earnings and reviews.</p>
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
            title="Completed Jobs"
            value={data.completedJobs.toString()}
            sub={`${data.cancelledJobs} Cancelled`}
            icon={<Clock3 />}
            color="text-purple-600"
            bg="bg-purple-100"
          />
          <StatCard
            title="Avg Rating"
            value={data.averageRating.toFixed(1) + " ⭐"}
            sub={`${data.totalReviews} reviews`}
            icon={<Star />}
            color="text-orange-600"
            bg="bg-orange-100"
          />
        </div>

        {/* RECENT BOOKINGS + REVIEWS */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {/* RECENT BOOKINGS */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-5">Recent Bookings</h2>
            {data.recentBookings.length === 0 ? (
              <p className="text-gray-400 text-sm">No bookings yet.</p>
            ) : (
              <div className="space-y-3">
                {data.recentBookings.map((b) => (
                  <div key={b.id} className="flex items-start justify-between py-3 border-b last:border-0 gap-3">
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-800 text-sm truncate">{b.bookingCode}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{b.userName} · {b.bookingDate}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <StatusBadge status={b.bookingStatus} />
                      <span className="text-xs font-semibold text-green-600">{fmt(b.subVendorAmount)}</span>
                      <span className="text-xs text-gray-400">Total: {fmt(b.finalAmount)}</span>
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
                {data.recentReviews.map((r) => (
                  <div key={r.id} className="flex gap-3 pb-4 border-b last:border-0">
                    <div className="w-9 h-9 shrink-0 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm uppercase">
                      {r.userName?.charAt(0) ?? "#"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <p className="font-semibold text-gray-800 text-sm">{r.userName}</p>
                        <Stars rating={r.rating} />
                      </div>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {r.comment || "No comment"}
                      </p>
                      <p className="text-xs text-gray-300 mt-1">
                        {new Date(r.createdAt).toLocaleDateString("en-IN")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* MONTHLY STATS (if any) */}
        {data.monthlyBookingStats.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-5">Monthly Bookings (Last 6 Months)</h2>
            <div className="flex items-end gap-3 h-32">
              {data.monthlyBookingStats.map((s) => {
                const max = Math.max(...data.monthlyBookingStats.map((x) => x.count), 1);
                const pct = (s.count / max) * 100;
                return (
                  <div key={s.month} className="flex flex-col items-center flex-1 gap-1">
                    <span className="text-xs font-semibold text-gray-600">{s.count}</span>
                    <div
                      className="w-full bg-blue-500 rounded-t-md transition-all"
                      style={{ height: `${pct}%`, minHeight: "4px" }}
                    />
                    <span className="text-xs text-gray-400 text-center leading-tight">{s.month}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* PERFORMANCE SUMMARY */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Bookings", value: data.totalBookings, icon: <CalendarCheck size={18} />, color: "text-blue-500" },
            { label: "Completed Jobs", value: data.completedJobs, icon: <CheckCircle2 size={18} />, color: "text-green-500" },
            { label: "Cancelled Jobs", value: data.cancelledJobs, icon: <XCircle size={18} />, color: "text-red-500" },
            { label: "Active Jobs", value: data.activeJobs, icon: <Activity size={18} />, color: "text-yellow-500" },
          ].map(({ label, value, icon, color }) => (
            <div key={label} className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-1">
              <p className="text-gray-500 text-sm">{label}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className={color}>{icon}</span>
                <h2 className="text-3xl font-bold text-gray-800">{value}</h2>
              </div>
            </div>
          ))}
        </div>

      </div>
    </PartnerLayout>
  );
}
