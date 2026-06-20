import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Categories from "../pages/Categories";
import Services from "../pages/Services";
import ServiceDetail from "../pages/ServiceDetail";
import Booking from "../pages/Bookings";
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

import Login from "../pages/Login";
import Register from "../pages/Register";           // ✅ ADD
import OtpLogin from "../pages/OtpLogin";           // ✅ ADD
import ForgotPassword from "../pages/ForgotPassword"; // ✅ ADD

import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>

      {/* ================= ROOT ================= */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* ================= PUBLIC ================= */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/service/:categoryId" element={<Services />} />
      <Route path="/serviceDetails/:id" element={<ServiceDetail />} />

      <Route path="/subvendors/:serviceId" element={<SubVendors />} />
      <Route path="/subvendor/:id" element={<SubVendorDetails />} />

      {/* ================= AUTH PAGES ================= */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/otp-login" element={<OtpLogin />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* ================= PROTECTED ================= */}
      <Route
        path="/booking/:id"
        element={
          <ProtectedRoute>
            <Booking />
          </ProtectedRoute>
        }
      />

      <Route
        path="/payment/:id"
        element={
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        }
      />

      <Route
        path="/order_history"
        element={
          <ProtectedRoute>
            <OrderHistory />
          </ProtectedRoute>
        }
      />

      <Route
        path="/order-details/:id"
        element={
          <ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/addresses"
        element={
          <ProtectedRoute>
            <Addresses />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile/details"
        element={
          <ProtectedRoute>
            <ProfileDetails />
          </ProtectedRoute>
        }
      />

      {/* ================= OTHER ================= */}
      <Route path="/settings" element={<Settings />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/help" element={<Help />} />
      <Route path="/language" element={<Language />} />
      <Route path="/share-app" element={<ShareApp />} />

      {/* ================= CONTENT ================= */}
      <Route path="/privacy-policy" element={<ContentPage title="Privacy Policy" />} />
      <Route path="/terms-conditions" element={<ContentPage title="Terms & Conditions" />} />
      <Route path="/refund-policy" element={<ContentPage title="Refund Policy" />} />
      <Route path="/cancellation-policy" element={<ContentPage title="Cancellation Policy" />} />
      <Route path="/about-us" element={<ContentPage title="About Us" />} />

      {/* ================= 404 ================= */}
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