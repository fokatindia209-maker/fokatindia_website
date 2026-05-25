// ===============================
// Dashboard.tsx
// USE WITH AppLayout/AdminLayout
// ===============================

import {
  DollarSign,
  Users,
  CalendarCheck,
  Clock3,
} from "lucide-react";

import Footer from "../../components/Footer";

export default function Dashboard() {
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
            Here's the latest overview of your
            cleaning service.
          </p>
        </div>

        {/* TOP CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          <StatCard
            title="Total Bookings"
            value="1,250"
            sub="+12% This Month"
            icon={<CalendarCheck />}
            color="text-blue-600"
            bg="bg-blue-100"
          />

          <StatCard
            title="Earnings"
            value="$32,450"
            sub="+8% This Month"
            icon={<DollarSign />}
            color="text-green-600"
            bg="bg-green-100"
          />

          <StatCard
            title="Cleaners"
            value="45"
            sub="+3 New Cleaners"
            icon={<Users />}
            color="text-cyan-600"
            bg="bg-cyan-100"
          />

          <StatCard
            title="New Requests"
            value="78"
            sub="-5% This Week"
            icon={<Clock3 />}
            color="text-red-500"
            bg="bg-red-100"
          />
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
          {/* BOOKING STATS */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Booking Statistics
              </h2>

              <div className="flex gap-2">
                <div className="w-2 h-2 bg-gray-300 rounded-full" />
                <div className="w-2 h-2 bg-gray-300 rounded-full" />
                <div className="w-2 h-2 bg-gray-300 rounded-full" />
              </div>
            </div>

            {/* CHART */}
            <div className="h-72 flex items-end gap-4">
              {[120, 160, 210, 280, 350, 300].map(
                (height, index) => (
                  <div
                    key={index}
                    className="flex-1 bg-blue-500 rounded-t-xl"
                    style={{
                      height: `${height}px`,
                    }}
                  />
                )
              )}
            </div>
          </div>

          {/* UPCOMING BOOKINGS */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Upcoming Bookings
              </h2>

              <div className="flex gap-2">
                <div className="w-2 h-2 bg-gray-300 rounded-full" />
                <div className="w-2 h-2 bg-gray-300 rounded-full" />
                <div className="w-2 h-2 bg-gray-300 rounded-full" />
              </div>
            </div>

            <div className="space-y-5">
              <BookingItem
                name="Emily Johnson"
                service="House Cleaning"
                time="10:00 AM"
              />

              <BookingItem
                name="Michael Smith"
                service="Deep Cleaning"
                time="1:30 PM"
              />

              <BookingItem
                name="Laura Williams"
                service="Move-Out Cleaning"
                time="9:00 AM"
              />

              <BookingItem
                name="David Brown"
                service="Office Cleaning"
                time="2:00 PM"
              />
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
          {/* TOP CLEANERS */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-5">
              Top Cleaners
            </h2>

            <div className="space-y-4">
              <CleanerItem
                name="Sophie M."
                jobs="120 Jobs"
                status="Pending"
              />

              <CleanerItem
                name="Alex R."
                jobs="99 Jobs"
                status="Complete"
              />

              <CleanerItem
                name="Linda C."
                jobs="85 Jobs"
                status="Pending"
              />

              <CleanerItem
                name="James T."
                jobs="78 Jobs"
                status="In Progress"
              />
            </div>
          </div>

          {/* REVIEWS */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-5">
              Recent Reviews
            </h2>

            <div className="space-y-5">
              <ReviewItem
                name="John S."
                review="Great service! The cleaner was very thorough."
              />

              <ReviewItem
                name="Maria L."
                review="Very professional and punctual."
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

function StatCard({
  title,
  value,
  sub,
  icon,
  color,
  bg,
}: StatCardProps) {
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

      <p className="text-gray-500 mt-4">
        {title}
      </p>

      <h2 className="text-4xl font-bold mt-2">
        {value}
      </h2>

      <p className={`mt-2 text-sm ${color}`}>
        {sub}
      </p>
    </div>
  );
}

// =======================================
// BOOKING ITEM
// =======================================

interface BookingItemProps {
  name: string;
  service: string;
  time: string;
}

function BookingItem({
  name,
  service,
  time,
}: BookingItemProps) {
  return (
    <div className="flex items-center justify-between border-b pb-4">
      <div className="flex items-center gap-4">
        <img
          src="https://i.pravatar.cc/50"
          alt="user"
          className="w-12 h-12 rounded-full"
        />

        <div>
          <h3 className="font-semibold text-gray-800">
            {name}
          </h3>

          <p className="text-sm text-gray-500">
            {time}
          </p>
        </div>
      </div>

      <div className="text-right">
        <p className="font-medium text-blue-600">
          {service}
        </p>

        <button
          className="
            mt-2 bg-blue-500 hover:bg-blue-600
            text-white px-4 py-2 rounded-xl
            text-sm transition
          "
        >
          Assign Cleaner
        </button>
      </div>
    </div>
  );
}

// =======================================
// CLEANER ITEM
// =======================================

interface CleanerItemProps {
  name: string;
  jobs: string;
  status: string;
}

function CleanerItem({
  name,
  jobs,
  status,
}: CleanerItemProps) {
  return (
    <div className="flex items-center justify-between border-b pb-4">
      <div className="flex items-center gap-4">
        <img
          src="https://i.pravatar.cc/50"
          alt="cleaner"
          className="w-12 h-12 rounded-full"
        />

        <div>
          <h3 className="font-semibold">
            {name}
          </h3>

          <p className="text-sm text-gray-500">
            {jobs}
          </p>
        </div>
      </div>

      <span
        className="
          bg-green-100 text-green-700
          px-4 py-2 rounded-xl text-sm
        "
      >
        {status}
      </span>
    </div>
  );
}

// =======================================
// REVIEW ITEM
// =======================================

interface ReviewItemProps {
  name: string;
  review: string;
}

function ReviewItem({
  name,
  review,
}: ReviewItemProps) {
  return (
    <div className="border-b pb-4">
      <div className="flex items-center gap-4">
        <img
          src="https://i.pravatar.cc/50"
          alt="review"
          className="w-12 h-12 rounded-full"
        />

        <div>
          <h3 className="font-semibold">
            {name}
          </h3>

          <p className="text-gray-500 mt-1">
            {review}
          </p>
        </div>
      </div>
    </div>
  );
}
// // ===============================
// // Dashboard.tsx
// // SAME DESIGN LIKE IMAGE
// // ===============================

// import { useState } from "react";

// import {
//     DollarSign,
//     Users,
//     CalendarCheck,
//     Clock3,
// } from "lucide-react";

// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
// import Footer from "../components/Footer";

// export default function Dashboard() {

//     const [sidebarOpen, setSidebarOpen] =
//         useState(false);

//     return (

//         <div className="bg-[#f4f7fb] min-h-screen">

//             {/* SIDEBAR */}
//             <Sidebar
//                 sidebarOpen={sidebarOpen}
//                 setSidebarOpen={setSidebarOpen}
//             />

//             {/* RIGHT CONTENT */}
//             {/* <div className="flex-1 flex flex-col"> */}
//               <div className="ml-0 md:ml-64 flex flex-col">

//                 {/* NAVBAR */}
//                 <Navbar
//                     sidebarOpen={sidebarOpen}
//                     setSidebarOpen={setSidebarOpen}
//                 />

//                 {/* MAIN */}
//                 <main className="p-4 md:p-6 pt-24">

//                     {/* WELCOME */}
//                     <div className="mb-6">

//                         <h1 className="text-3xl pt-15 font-bold text-gray-800">
//                             Welcome Back, Admin!
//                         </h1>

//                         <p className="text-gray-500 mt-1">
//                             Here's the latest overview of your cleaning service.
//                         </p>

//                     </div>

//                     {/* TOP CARDS */}
//                     <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

//                         <StatCard
//                             title="Total Bookings"
//                             value="1,250"
//                             sub="+12% This Month"
//                             icon={<CalendarCheck />}
//                             color="text-blue-600"
//                             bg="bg-blue-100"
//                         />

//                         <StatCard
//                             title="Earnings"
//                             value="$32,450"
//                             sub="+8% This Month"
//                             icon={<DollarSign />}
//                             color="text-green-600"
//                             bg="bg-green-100"
//                         />

//                         <StatCard
//                             title="Cleaners"
//                             value="45"
//                             sub="+3 New Cleaners"
//                             icon={<Users />}
//                             color="text-cyan-600"
//                             bg="bg-cyan-100"
//                         />

//                         <StatCard
//                             title="New Requests"
//                             value="78"
//                             sub="-5% This Week"
//                             icon={<Clock3 />}
//                             color="text-red-500"
//                             bg="bg-red-100"
//                         />

//                     </div>

//                     {/* GRID */}
//                     <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">

//                         {/* BOOKING STATS */}
//                         <div className="bg-white rounded-2xl shadow-sm p-6">

//                             <div className="flex items-center justify-between mb-6">

//                                 <h2 className="text-xl font-bold text-gray-800">
//                                     Booking Statistics
//                                 </h2>

//                                 <div className="flex gap-2">

//                                     <div className="w-2 h-2 bg-gray-300 rounded-full" />
//                                     <div className="w-2 h-2 bg-gray-300 rounded-full" />
//                                     <div className="w-2 h-2 bg-gray-300 rounded-full" />

//                                 </div>

//                             </div>

//                             {/* FAKE CHART */}
//                             <div className="h-72 flex items-end gap-4">

//                                 {[120, 160, 210, 280, 350, 300].map(
//                                     (height, index) => (
//                                         <div
//                                             key={index}
//                                             className="flex-1 bg-blue-500 rounded-t-xl"
//                                             style={{
//                                                 height: `${height}px`,
//                                             }}
//                                         />
//                                     )
//                                 )}

//                             </div>

//                         </div>

//                         {/* UPCOMING BOOKINGS */}
//                         <div className="bg-white rounded-2xl shadow-sm p-6">

//                             <div className="flex items-center justify-between mb-6">

//                                 <h2 className="text-xl font-bold text-gray-800">
//                                     Upcoming Bookings
//                                 </h2>

//                                 <div className="flex gap-2">

//                                     <div className="w-2 h-2 bg-gray-300 rounded-full" />
//                                     <div className="w-2 h-2 bg-gray-300 rounded-full" />
//                                     <div className="w-2 h-2 bg-gray-300 rounded-full" />

//                                 </div>

//                             </div>

//                             <div className="space-y-5">

//                                 <BookingItem
//                                     name="Emily Johnson"
//                                     service="House Cleaning"
//                                     time="10:00 AM"
//                                 />

//                                 <BookingItem
//                                     name="Michael Smith"
//                                     service="Deep Cleaning"
//                                     time="1:30 PM"
//                                 />

//                                 <BookingItem
//                                     name="Laura Williams"
//                                     service="Move-Out Cleaning"
//                                     time="9:00 AM"
//                                 />

//                                 <BookingItem
//                                     name="David Brown"
//                                     service="Office Cleaning"
//                                     time="2:00 PM"
//                                 />

//                             </div>

//                         </div>

//                     </div>

//                     {/* BOTTOM */}
//                     <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">

//                         {/* TOP CLEANERS */}
//                         <div className="bg-white rounded-2xl shadow-sm p-6">

//                             <h2 className="text-xl font-bold mb-5">
//                                 Top Cleaners
//                             </h2>

//                             <div className="space-y-4">

//                                 <CleanerItem
//                                     name="Sophie M."
//                                     jobs="120 Jobs"
//                                     status="Pending"
//                                 />

//                                 <CleanerItem
//                                     name="Alex R."
//                                     jobs="99 Jobs"
//                                     status="Complete"
//                                 />

//                                 <CleanerItem
//                                     name="Linda C."
//                                     jobs="85 Jobs"
//                                     status="Pending"
//                                 />

//                                 <CleanerItem
//                                     name="James T."
//                                     jobs="78 Jobs"
//                                     status="In Progress"
//                                 />

//                             </div>

//                         </div>

//                         {/* REVIEWS */}
//                         <div className="bg-white rounded-2xl shadow-sm p-6">

//                             <h2 className="text-xl font-bold mb-5">
//                                 Recent Reviews
//                             </h2>

//                             <div className="space-y-5">

//                                 <ReviewItem
//                                     name="John S."
//                                     review="Great service! The cleaner was very thorough."
//                                 />

//                                 <ReviewItem
//                                     name="Maria L."
//                                     review="Very professional and punctual."
//                                 />

//                             </div>

//                         </div>

//                     </div>

//                 </main>

//                 {/* FOOTER */}
//                 <Footer />

//             </div>

//         </div>
//     );
// }

// // =======================================
// // STAT CARD
// // =======================================

// interface StatCardProps {
//     title: string;
//     value: string;
//     sub: string;
//     icon: React.ReactNode;
//     color: string;
//     bg: string;
// }

// function StatCard({
//     title,
//     value,
//     sub,
//     icon,
//     color,
//     bg,
// }: StatCardProps) {

//     return (

//         <div className="bg-white rounded-2xl shadow-sm p-6">

//             <div
//                 className={`
//           w-14 h-14 rounded-2xl
//           flex items-center justify-center
//           ${bg} ${color}
//         `}
//             >
//                 {icon}
//             </div>

//             <p className="text-gray-500 mt-4">
//                 {title}
//             </p>

//             <h2 className="text-4xl font-bold mt-2">
//                 {value}
//             </h2>

//             <p className={`mt-2 text-sm ${color}`}>
//                 {sub}
//             </p>

//         </div>
//     );
// }

// // =======================================
// // BOOKING ITEM
// // =======================================

// interface BookingItemProps {
//     name: string;
//     service: string;
//     time: string;
// }

// function BookingItem({
//     name,
//     service,
//     time,
// }: BookingItemProps) {

//     return (

//         <div className="flex items-center justify-between border-b pb-4">

//             <div className="flex items-center gap-4">

//                 <img
//                     src="https://i.pravatar.cc/50"
//                     alt="user"
//                     className="w-12 h-12 rounded-full"
//                 />

//                 <div>

//                     <h3 className="font-semibold text-gray-800">
//                         {name}
//                     </h3>

//                     <p className="text-sm text-gray-500">
//                         {time}
//                     </p>

//                 </div>

//             </div>

//             <div className="text-right">

//                 <p className="font-medium text-blue-600">
//                     {service}
//                 </p>

//                 <button
//                     className="
//             mt-2 bg-blue-500 hover:bg-blue-600
//             text-white px-4 py-2 rounded-xl
//             text-sm transition
//           "
//                 >
//                     Assign Cleaner
//                 </button>

//             </div>

//         </div>
//     );
// }

// // =======================================
// // CLEANER ITEM
// // =======================================

// interface CleanerItemProps {
//     name: string;
//     jobs: string;
//     status: string;
// }

// function CleanerItem({
//     name,
//     jobs,
//     status,
// }: CleanerItemProps) {

//     return (

//         <div className="flex items-center justify-between border-b pb-4">

//             <div className="flex items-center gap-4">

//                 <img
//                     src="https://i.pravatar.cc/50"
//                     alt="cleaner"
//                     className="w-12 h-12 rounded-full"
//                 />

//                 <div>

//                     <h3 className="font-semibold">
//                         {name}
//                     </h3>

//                     <p className="text-sm text-gray-500">
//                         {jobs}
//                     </p>

//                 </div>

//             </div>

//             <span
//                 className="
//           bg-green-100 text-green-700
//           px-4 py-2 rounded-xl text-sm
//         "
//             >
//                 {status}
//             </span>

//         </div>
//     );
// }

// // =======================================
// // REVIEW ITEM
// // =======================================

// interface ReviewItemProps {
//     name: string;
//     review: string;
// }

// function ReviewItem({
//     name,
//     review,
// }: ReviewItemProps) {

//     return (

//         <div className="border-b pb-4">

//             <div className="flex items-center gap-4">

//                 <img
//                     src="https://i.pravatar.cc/50"
//                     alt="review"
//                     className="w-12 h-12 rounded-full"
//                 />

//                 <div>

//                     <h3 className="font-semibold">
//                         {name}
//                     </h3>

//                     <p className="text-gray-500 mt-1">
//                         {review}
//                     </p>

//                 </div>

//             </div>

//         </div>
//     );
// }