import {
  DollarSign,
  Users,
  CalendarCheck,
  Clock3
} from "lucide-react";

import PartnerLayout from "../../../components/PartnerLayout";
import StatCard from "../../../components/StatCard";
import BookingItem from "../../../components/BookingItem";
import WorkerItem from "../../../components/WorkerItem";
import ReviewItem from "../../../components/ReviewItem";
import PerformanceCard from "../../../components/PerformanceCard";

export default function SubVendorDashboard() {
  return (
    <PartnerLayout>
      {/* HEADER */}
      <div className="p-4 space-y-6">

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome Back, Vendor 👋
          </h1>

          <p className="text-gray-500 mt-1">
            Manage your bookings, sub-vendors and earnings.
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

          <StatCard
            title="Total Bookings"
            value="256"
            sub="+18 This Month"
            icon={<CalendarCheck />}
            color="text-blue-600"
            bg="bg-blue-100"
          />

          <StatCard
            title="Vendor Earnings"
            value="AED 8,450"
            sub="+AED 1,250"
            icon={<DollarSign />}
            color="text-green-600"
            bg="bg-green-100"
          />

          <StatCard
            title="Sub Vendors"
            value="12"
            sub="8 Active Workers"
            icon={<Users />}
            color="text-purple-600"
            bg="bg-purple-100"
          />

          <StatCard
            title="Active Jobs"
            value="24"
            sub="Currently Running"
            icon={<Clock3 />}
            color="text-orange-600"
            bg="bg-orange-100"
          />
        </div>

        {/* CHART + BOOKINGS */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">

          {/* BOOKING STATS */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Booking Statistics
            </h2>

            <div className="h-72 flex items-end gap-3">
              {[100, 160, 220, 300, 350, 270].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-blue-500 rounded-t-xl"
                  style={{ height: `${h}px` }}
                />
              ))}
            </div>
          </div>

          {/* RECENT BOOKINGS */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-6">Recent Bookings</h2>

            <div className="space-y-5">
              <BookingItem customer="Ahmed Ali" service="Home Cleaning" time="10:00 AM" />
              <BookingItem customer="John Smith" service="Deep Cleaning" time="01:30 PM" />
              <BookingItem customer="Mohammed" service="Sofa Cleaning" time="03:00 PM" />
              <BookingItem customer="Ali Hassan" service="Kitchen Cleaning" time="05:00 PM" />
            </div>
          </div>
        </div>

        {/* SUBVENDORS + REVIEWS */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-5">Top Sub Vendors</h2>

            <div className="space-y-4">
              <WorkerItem name="Hassan" jobs="120 Jobs" status="Active" />
              <WorkerItem name="Rahul" jobs="95 Jobs" status="Active" />
              <WorkerItem name="Aman" jobs="82 Jobs" status="Busy" />
              <WorkerItem name="Arjun" jobs="75 Jobs" status="Available" />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-5">Recent Reviews</h2>

            <ReviewItem name="Ahmed" review="Excellent cleaning service." />
            <ReviewItem name="Ali" review="Worker arrived on time." />
            <ReviewItem name="John" review="Very professional staff." />
          </div>
        </div>

        {/* PERFORMANCE */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-6">

          <PerformanceCard title="Completed Jobs" value="180" />
          <PerformanceCard title="Cancelled Jobs" value="8" />
          <PerformanceCard title="Average Rating" value="4.8 ⭐" />
          <PerformanceCard title="Customer Satisfaction" value="95%" />

        </div>
      </div>
    </PartnerLayout>
  );
}
