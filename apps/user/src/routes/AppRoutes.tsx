import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Categories from "../pages/Categories";
import Services from "../pages/Services";
import ServiceDetail from "../pages/ServiceDetail";
import Booking from "../pages/Bookings";
import Notifications from "../pages/Notifications";
import Payment from "../pages/Payment";
import OrderHistory from "../pages/OrderHistory";
import SubVendors from "../pages/SubVendor";
import SubVendorDetails from "../pages/SubVendorDetails";
import OrderDetails from "../pages/OrderDetails";
import Settings from "../pages/Settings";
import ProfileDetails from "../pages/ProfileDetails";
import Addresses from "../pages/Addresses";
import ContactUs from "../pages/ContactUs";
import Help from "../pages/Help";
import ContentPage from "../pages/ContentPage";
import Language from "../pages/Language";
import ShareApp from "../pages/ShareApp";


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

            <Route path="/settings" element={<Settings />} />
            <Route path="/order_history" element={<OrderHistory />} />
            <Route path="/subvendors/:id" element={<SubVendors />} />
            <Route path="/subvendor/:id" element={<SubVendorDetails />} />
            <Route path="/order-details/:id" element={<OrderDetails />} />
            <Route path="/profile/details" element={<ProfileDetails />} />
            <Route path="/addresses" element={<Addresses />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/help" element={<Help />} />

            <Route
                path="/privacy-policy"
                element={<ContentPage title="Privacy Policy" />}
            />

            <Route
                path="/terms-conditions"
                element={<ContentPage title="Terms & Conditions" />}
            />

            <Route
                path="/refund-policy"
                element={<ContentPage title="Refund Policy" />}
            />

            <Route
                path="/cancellation-policy"
                element={<ContentPage title="Cancellation Policy" />}
            />

            <Route
                path="/about-us"
                element={<ContentPage title="About Us" />}
            />

            <Route path="/language" element={<Language />} />
            <Route path="/share-app" element={<ShareApp />} />
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