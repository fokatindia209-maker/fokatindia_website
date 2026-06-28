import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

// AUTH
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import OtpLogin from "../pages/OtpLogin";
import DocumentUpload from "../pages/DocumentUpload";
import DocumentUnderReview from "../pages/DocumentUnderReview";
import ProfileSetup from "../pages/ProfileSetup";

// VENDOR
import VendorDashboard from "../pages/vendor/dashboard/VendorDashboard";
import VendorSubVendorList from "../pages/vendor/subvendors/VendorSubVendorList";
import AddSubVendor from "../pages/vendor/subvendors/AddSubVendor";
import VendorBookingList from "../pages/vendor/bookings/VendorBookingList";
import VendorBookingDetails from "../pages/vendor/bookings/BookingDetails";
import VendorCategoryList from "../pages/vendor/categories/VendorCategoryList";
import VendorServiceList from "../pages/vendor/services/VendorServiceList";
import AddService from "../pages/vendor/services/AddService";
import EditService from "../pages/vendor/services/EditService";
import VendorEarnings from "../pages/vendor/earnings/VendorEarnings";
import Notifications from "../pages/vendor/notifications/Notifications";
import Reviews from "../pages/vendor/reviews/Reviews";
import Reports from "../pages/vendor/reports/Reports";
import VendorProfile from "../pages/vendor/profile/VendorProfile";
import Settings from "../pages/vendor/setting/Settings";
import VendorMore from "../pages/vendor/more/VendorMore";

// SUB VENDOR
import SubVendorDashboard from "../pages/subvendor/dashboard/SubVendorDashboard";
import SubVendorBookingDetails from "../pages/subvendor/bookings/BookingDetails";

import ProtectedRoute from "../components/ProtectedRoute";
import SubVendorBookingList from "../pages/subvendor/bookings/SubVendorBookingList";
import SubVendorEarnings from "../pages/subvendor/earnings/SubVendorEarnings";
import SubVendorMore from "../pages/subvendor/more/SubVendorMore";
import SubNotifications from "../pages/subvendor/notifications/SubNotifications";
import SubReviews from "../pages/subvendor/reviews/SubReviews";
import SubReports from "../pages/subvendor/reports/SubReports";
import SubVendorProfile from "../pages/subvendor/profile/SubVendorProfile";
import SubSettings from "../pages/subvendor/setting/SubSettings";
import SubVendorCategoryList from "../pages/subvendor/categories/SubVendorCategoryList";
import SubVendorServiceList from "../pages/subvendor/services/SubVendorServiceList";

export default function AppRoutes() {
  // const token = useSelector(
  //   (state: RootState) => state.auth.token
  // );

  const user = useSelector((state: RootState) => state.auth.user);

  const localToken = localStorage.getItem("token");

  const localUser = JSON.parse(localStorage.getItem("user") || "{}");

  const isLoggedIn = localToken;

  const role = user?.role || localUser?.role;

  const documentStatus = user?.documentStatus || localUser?.documentStatus;

  // Helper: redirect logged-in user to the right page based on document status
  const getDocumentRedirect = () => {
    if (documentStatus === "SUBMITTED") return <Navigate to="/document_review" replace />;
    if (documentStatus === "APPROVED") {
      return role === "SUB_VENDOR"
        ? <Navigate to="/subvendor/dashboard" replace />
        : <Navigate to="/vendor/dashboard" replace />;
    }
    // PENDING → profile setup (first time) then document upload
    if (documentStatus === "PENDING" && !localStorage.getItem("profileSetupDone")) {
      return <Navigate to="/profile_setup" replace />;
    }
    // REJECTED or PENDING (already set up) → document upload
    return <Navigate to="/document_upload" replace />;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* ================= ROOT ================= */}
        <Route
          path="/"
          element={!isLoggedIn ? <Navigate to="/login" replace /> : getDocumentRedirect()}
        />

        {/* ================= LOGIN ================= */}
        <Route
          path="/login"
          element={!isLoggedIn ? <Login /> : getDocumentRedirect()}
        />

        <Route path="/register" element={<Register />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/otp-login" element={<OtpLogin />} />

        {/* ================= PROFILE SETUP ================= */}
        <Route
          path="/profile_setup"
          element={
            !isLoggedIn ? (
              <Navigate to="/login" replace />
            ) : documentStatus === "APPROVED" ? (
              getDocumentRedirect()
            ) : documentStatus === "SUBMITTED" ? (
              <Navigate to="/document_review" replace />
            ) : documentStatus === "PENDING" ? (
              <ProfileSetup />
            ) : (
              // REJECTED → skip setup, go to upload
              <Navigate to="/document_upload" replace />
            )
          }
        />

        {/* ================= DOCUMENT UPLOAD ================= */}
        <Route
          path="/document_upload"
          element={
            !isLoggedIn ? (
              <Navigate to="/login" replace />
            ) : documentStatus === "SUBMITTED" ? (
              <Navigate to="/document_review" replace />
            ) : documentStatus === "APPROVED" ? (
              getDocumentRedirect()
            ) : (
              <DocumentUpload />
            )
          }
        />

        {/* ================= DOCUMENT REVIEW ================= */}
        <Route
          path="/document_review"
          element={
            !isLoggedIn ? (
              <Navigate to="/login" replace />
            ) : documentStatus === "APPROVED" ? (
              getDocumentRedirect()
            ) : documentStatus !== "SUBMITTED" ? (
              <Navigate to="/document_upload" replace />
            ) : (
              <DocumentUnderReview />
            )
          }
        />

        {/* ===================================================== */}
        {/* ================= VENDOR ROUTES ===================== */}
        {/* ===================================================== */}

        <Route
          path="/vendor/dashboard"
          element={
            <ProtectedRoute allowedRole="VENDOR">
              <VendorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendor/subvendors"
          element={
            <ProtectedRoute allowedRole="VENDOR">
              <VendorSubVendorList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendor/subvendors/create"
          element={
            <ProtectedRoute allowedRole="VENDOR">
              <AddSubVendor />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendor/bookings"
          element={
            <ProtectedRoute allowedRole="VENDOR">
              <VendorBookingList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendor/bookings/:id"
          element={
            <ProtectedRoute allowedRole="VENDOR">
              <VendorBookingDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendor/categories"
          element={
            <ProtectedRoute allowedRole="VENDOR">
              <VendorCategoryList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendor/services"
          element={
            <ProtectedRoute allowedRole="VENDOR">
              <VendorServiceList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendor/services/create"
          element={
            <ProtectedRoute allowedRole="VENDOR">
              <AddService />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendor/services/edit/:id"
          element={
            <ProtectedRoute allowedRole="VENDOR">
              <EditService />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendor/earnings"
          element={
            <ProtectedRoute allowedRole="VENDOR">
              <VendorEarnings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendor/notifications"
          element={
            <ProtectedRoute allowedRole="VENDOR">
              <Notifications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendor/reviews"
          element={
            <ProtectedRoute allowedRole="VENDOR">
              <Reviews />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendor/reports"
          element={
            <ProtectedRoute allowedRole="VENDOR">
              <Reports />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendor/profile"
          element={
            <ProtectedRoute allowedRole="VENDOR">
              <VendorProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendor/settings"
          element={
            <ProtectedRoute allowedRole="VENDOR">
              <Settings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendor/more"
          element={
            <ProtectedRoute allowedRole="VENDOR">
              <VendorMore />
            </ProtectedRoute>
          }
        />

        {/* ===================================================== */}
        {/* ================= SUB VENDOR ROUTES ================= */}
        {/* ===================================================== */}

        <Route
          path="/subvendor/dashboard"
          element={
            <ProtectedRoute allowedRole="SUB_VENDOR">
              <SubVendorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/subvendor/bookings"
          element={
            <ProtectedRoute allowedRole="SUB_VENDOR">
              <SubVendorBookingList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/subvendor/bookings/:id"
          element={
            <ProtectedRoute allowedRole="SUB_VENDOR">
              <SubVendorBookingDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/subvendor/earnings"
          element={
            <ProtectedRoute allowedRole="SUB_VENDOR">
              <SubVendorEarnings />
            </ProtectedRoute>
          }
        />


           <Route
          path="/subvendor/services"
          element={
            <ProtectedRoute allowedRole="SUB_VENDOR">
              <SubVendorServiceList />
            </ProtectedRoute>
          }
        />


        <Route
          path="/subvendor/more"
          element={
            <ProtectedRoute allowedRole="SUB_VENDOR">
              <SubVendorMore />
            </ProtectedRoute>
          }
        />

        <Route
          path="/subvendor/categories"
          element={
            <ProtectedRoute allowedRole="SUB_VENDOR">
              <SubVendorCategoryList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/subvendor/notifications"
          element={
            <ProtectedRoute allowedRole="SUB_VENDOR">
              <SubNotifications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/subvendor/reviews"
          element={
            <ProtectedRoute allowedRole="SUB_VENDOR">
              <SubReviews />
            </ProtectedRoute>
          }
        />

        <Route
          path="/subvendor/reports"
          element={
            <ProtectedRoute allowedRole="SUB_VENDOR">
              <SubReports />
            </ProtectedRoute>
          }
        />

        <Route
          path="/subvendor/profile"
          element={
            <ProtectedRoute allowedRole="SUB_VENDOR">
              <SubVendorProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/subvendor/settings"
          element={
            <ProtectedRoute allowedRole="SUB_VENDOR">
              <SubSettings />
            </ProtectedRoute>
          }
        />

        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
