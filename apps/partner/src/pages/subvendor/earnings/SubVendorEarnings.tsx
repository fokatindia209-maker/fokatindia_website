import {
  Wallet,
  IndianRupee,
  Calendar,
  TrendingUp,
} from "lucide-react";
import PartnerLayout from "../../../components/PartnerLayout";

export default function SubVendorEarnings() {
  return (

    <PartnerLayout role="SUB_VENDOR">

      <div className="p-4 space-y-6">

        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-bold">
            Earnings
          </h1>
          <p className="text-gray-500">
            Track your revenue and payouts
          </p>
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

          <div className="bg-white p-4 rounded-xl shadow">
            <div className="flex items-center gap-2 mb-2">
              <IndianRupee size={18} />
              <span className="text-sm text-gray-500">
                Total Earnings
              </span>
            </div>
            <h2 className="text-2xl font-bold">
              ₹1,25,000
            </h2>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={18} />
              <span className="text-sm text-gray-500">
                This Month
              </span>
            </div>
            <h2 className="text-2xl font-bold">
              ₹25,000
            </h2>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={18} />
              <span className="text-sm text-gray-500">
                This Week
              </span>
            </div>
            <h2 className="text-2xl font-bold">
              ₹6,500
            </h2>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <div className="flex items-center gap-2 mb-2">
              <Wallet size={18} />
              <span className="text-sm text-gray-500">
                Wallet Balance
              </span>
            </div>
            <h2 className="text-2xl font-bold">
              ₹12,500
            </h2>
          </div>

        </div>

        {/* BOOKING STATS */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold text-lg mb-4">
            Booking Statistics
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            <div className="border rounded-lg p-3">
              <p className="text-gray-500 text-sm">
                Total Bookings
              </p>
              <h3 className="text-xl font-bold">
                250
              </h3>
            </div>

            <div className="border rounded-lg p-3">
              <p className="text-gray-500 text-sm">
                Completed
              </p>
              <h3 className="text-xl font-bold text-green-600">
                220
              </h3>
            </div>

            <div className="border rounded-lg p-3">
              <p className="text-gray-500 text-sm">
                Pending
              </p>
              <h3 className="text-xl font-bold text-yellow-600">
                20
              </h3>
            </div>

            <div className="border rounded-lg p-3">
              <p className="text-gray-500 text-sm">
                Cancelled
              </p>
              <h3 className="text-xl font-bold text-red-600">
                10
              </h3>
            </div>

          </div>
        </div>

        {/* REVENUE BREAKDOWN */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold text-lg mb-4">
            Revenue Breakdown
          </h2>

          <div className="space-y-3">

            <div className="flex justify-between">
              <span>Gross Revenue</span>
              <span className="font-semibold">
                ₹1,50,000
              </span>
            </div>

            <div className="flex justify-between">
              <span>Platform Commission</span>
              <span className="font-semibold text-red-600">
                - ₹25,000
              </span>
            </div>

            <div className="border-t pt-3 flex justify-between">
              <span className="font-bold">
                Net Earnings
              </span>
              <span className="font-bold text-green-600">
                ₹1,25,000
              </span>
            </div>

          </div>
        </div>

        {/* TOP SERVICES */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold text-lg mb-4">
            Top Services
          </h2>

          <div className="space-y-3">

            <div className="flex justify-between">
              <span>Deep Cleaning</span>
              <span>₹35,000</span>
            </div>

            <div className="flex justify-between">
              <span>Sofa Cleaning</span>
              <span>₹20,000</span>
            </div>

            <div className="flex justify-between">
              <span>Kitchen Cleaning</span>
              <span>₹15,000</span>
            </div>

          </div>
        </div>

        {/* WITHDRAW SECTION */}
        <div className="bg-white rounded-xl shadow p-4">

          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-gray-500">
                Withdrawable Balance
              </p>
              <h2 className="text-2xl font-bold">
                ₹10,000
              </h2>
            </div>

            <button className="px-5 py-2 bg-blue-600 text-white rounded-lg">
              Withdraw
            </button>
          </div>

        </div>

        {/* RECENT TRANSACTIONS */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold text-lg mb-4">
            Recent Transactions
          </h2>

          <div className="space-y-3">

            <div className="flex justify-between border-b pb-2">
              <div>
                <p className="font-medium">
                  Booking #BK1024
                </p>
                <p className="text-sm text-gray-500">
                  Deep Cleaning
                </p>
              </div>

              <div className="text-right">
                <p className="font-semibold">
                  ₹1,500
                </p>
                <p className="text-green-600 text-sm">
                  Paid
                </p>
              </div>
            </div>

            <div className="flex justify-between border-b pb-2">
              <div>
                <p className="font-medium">
                  Booking #BK1025
                </p>
                <p className="text-sm text-gray-500">
                  Sofa Cleaning
                </p>
              </div>

              <div className="text-right">
                <p className="font-semibold">
                  ₹2,000
                </p>
                <p className="text-yellow-600 text-sm">
                  Pending
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </PartnerLayout>
  );
}