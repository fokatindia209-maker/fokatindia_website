import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Categories from "../pages/Categories";
import Services from "../pages/Services";
import ServiceDetail from "../pages/ServiceDetail";
import Booking from "../pages/Bookings";
import Notifications from "../pages/Notifications";
import Profile from "../pages/Profile";
import Payment from "../pages/Payment";
import OrderHistory from "../pages/OrderHistory";
import SubVendors from "../pages/SubVendor";
import SubVendorDetails from "../pages/SubVendorDetails";

// (future-ready pages)
// import Bookings from "../pages/Bookings";
// import Notifications from "../pages/Notifications";
// import Profile from "../pages/Profile";
// import ServiceDetail from "../pages/ServiceDetail";

export default function AppRoutes() {
    return (
        <Routes>

            {/* ================= ROOT ================= */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* ================= USER FLOW ================= */}
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/categories" element={<Categories />} />

            {/* category filter supported */}
            <Route path="/service/:id" element={<Services />} />
            <Route path="/serviceDetails/:id" element={<ServiceDetail />} />


            <Route path="/booking/:id" element={<Booking />} />
            <Route path="/payment/:id" element={<Payment />} />

            <Route path="/notifications" element={<Notifications />} />

            <Route path="/profile" element={<Profile />} />
            <Route path="/order_history" element={<OrderHistory />} />
            <Route path="/subvendors/:id" element={<SubVendors />} />
            <Route path="/subvendor/:id" element={<SubVendorDetails />} />
            {/* ================= 404 fallback ================= */}
            <Route
                path="*"
                element={
                    <div className="p-10 text-center text-gray-500">
                        Page Not Found
                    </div>
                }
            />

        </Routes>
    );
}