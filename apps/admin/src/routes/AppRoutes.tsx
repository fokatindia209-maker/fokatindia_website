// ============================
// AppRoutes.tsx
// USING AdminLayout
// ============================

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

// AUTH PAGES
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import OtpLogin from "../pages/OtpLogin";

// MAIN PAGES
import Dashboard from "../pages/dashboard/Dashboard";
import DocumentUpload from "../pages/DocumentUpload";

// SETTINGS PAGES
import Profile from "../pages/Settings/Profile";
// import Security from "../pages/Settings/Security";
// import Notifications from "../pages/Settings/Notifications";
// import Password from "../pages/Settings/Password";
// import System from "../pages/Settings/System";
// import Backup from "../pages/Settings/Backup";

// COMPONENTS
import ProtectedRoute from "../components/ProtectedRoute";

// LAYOUT
import AdminLayout from "../layouts/AdminLayout";
import Security from "../pages/Settings/Security";
import Notifications from "../pages/Settings/Notifications";
import Password from "../pages/Settings/Password";
import System from "../pages/Settings/System";
import Backup from "../pages/Settings/Backup";
import UsersList from "../pages/users/UsersList";
import VendorList from "../pages/vendors/VendorsList";
import CreateVendor from "../pages/vendors/CreateVendor";
import SubVendorList from "../pages/subvendors/SubVendorList";
import CreateSubVendor from "../pages/subvendors/CreateSubVendor";
import BookingList from "../pages/bookings/BookingList";
import CreateBooking from "../pages/bookings/CreateBooking";
import PaymentList from "../pages/payments/PaymentList";
import CreatePayment from "../pages/payments/CreatePayment";
import CreateCategory from "../pages/categories/CreateCategory";
import CategoryList from "../pages/categories/CategoryList";
import CreateService from "../pages/services/CreateService";
import ServiceList from "../pages/services/ServiceList";
import DocumentList from "../pages/documents/DocumentList";
import DocumentDetails from "../pages/documents/DocumentDetails";
import UploadDocument from "../pages/documents/UploadDocument";
import RoleList from "../pages/AccessManagement/Roles/RoleList";
import CreateRole from "../pages/AccessManagement/Roles/CreateRole";
import CreateUser from "../pages/users/CreateUser";
import EditUser from "../pages/users/EditUser";
import EditVendor from "../pages/vendors/EditVendor";
import PermissionsList from "../pages/AccessManagement/Permissions/PermissionList";
import CreatePermission from "../pages/AccessManagement/Permissions/PermissionCreate";
import EditPermission from "../pages/AccessManagement/Permissions/EditPermission";
import EditRole from "../pages/AccessManagement/Roles/EditRole";
import UserRoleList from "../pages/AccessManagement/UserRoles/UserRoleList";
import EditUserRole from "../pages/AccessManagement/UserRoles/EditUserRole";
import AssignUserRole from "../pages/AccessManagement/UserRoles/AssignUserRole";
import RolePermissionsList from "../pages/AccessManagement/RolePermissions/RolePermissionsList";
import EditRolePermissions from "../pages/AccessManagement/RolePermissions/EditRolePermissions";
import AssignRolePermissions from "../pages/AccessManagement/RolePermissions/AssignRolePermissions";
import EditService from "../pages/services/EditService";
import EditCategory from "../pages/categories/EditCategory";
import EditBooking from "../pages/bookings/EditBooking";
import EditSubVendor from "../pages/subvendors/EditSubVendor";
import EditPayment from "../pages/payments/EditPayment";
import NotificationList from "../pages/notifications/NotificationList";
import SendNotification from "../pages/notifications/SendNotifications";
import EditNotification from "../pages/notifications/EditNotifications";
import ReviewList from "../pages/reviews/ReviewList";
import CreateReview from "../pages/reviews/CreateReview";
import EditReview from "../pages/reviews/EditReview";

export default function AppRoutes() {
  // REDUX
  const token = useSelector(
    (state: RootState) => state.auth.token
  );

  const user = useSelector(
    (state: RootState) => state.auth.user
  );

  // LOCAL STORAGE FALLBACK
  const localUser = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const documentStatus =
    user?.documentStatus ||
    localUser?.documentStatus;

  return (
    <BrowserRouter>
      <Routes>
        {/* ========================= */}
        {/* ROOT REDIRECT */}
        {/* ========================= */}

        <Route
          path="/"
          element={
            !token ? (
              <Navigate
                to="/login"
                replace
              />
            ) : documentStatus !==
              "APPROVED" ? (
              <Navigate
                to="/document_upload"
                replace
              />
            ) : (
              <Navigate
                to="/dashboard"
                replace
              />
            )
          }
        />

        {/* ========================= */}
        {/* LOGIN */}
        {/* ========================= */}

        <Route
          path="/login"
          element={
            token ? (
              documentStatus !==
                "APPROVED" ? (
                <Navigate
                  to="/document_upload"
                  replace
                />
              ) : (
                <Navigate
                  to="/dashboard"
                  replace
                />
              )
            ) : (
              <Login />
            )
          }
        />

        {/* ========================= */}
        {/* REGISTER */}
        {/* ========================= */}

        <Route
          path="/register"
          element={<Register />}
        />

        {/* ========================= */}
        {/* FORGOT PASSWORD */}
        {/* ========================= */}

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        {/* ========================= */}
        {/* OTP LOGIN */}
        {/* ========================= */}

        <Route
          path="/otp-login"
          element={<OtpLogin />}
        />

        {/* ========================= */}
        {/* DOCUMENT UPLOAD */}
        {/* ========================= */}

        <Route
          path="/document_upload"
          element={
            token ? (
              <DocumentUpload />
            ) : (
              <Navigate
                to="/login"
                replace
              />
            )
          }
        />

        {/* ========================= */}
        {/* ADMIN LAYOUT ROUTES */}
        {/* ========================= */}

        <Route
          element={
            <ProtectedRoute>
              {documentStatus ===
                "APPROVED" ? (
                <AdminLayout />
              ) : (
                <Navigate
                  to="/document_upload"
                  replace
                />
              )}
            </ProtectedRoute>
          }
        >



 <Route
            path="/reviews/edit/:id"
            element={<EditReview />}
          />

          <Route
            path="/reviews/create"
            element={<CreateReview />}
          />

          <Route
            path="/reviews"
            element={<ReviewList />}
          />

          <Route
            path="/notifications/edit/:id"
            element={<EditNotification />}
          />

          <Route
            path="/notifications/send"
            element={<SendNotification />}
          />

          <Route
            path="/notifications"
            element={<NotificationList />}
          />


          <Route
            path="/role-permissions/assign"
            element={<AssignRolePermissions />}
          />


          <Route
            path="/role-permissions/edit/:id"
            element={<EditRolePermissions />}
          />




          <Route
            path="/role-permissions"
            element={<RolePermissionsList />}
          />


          <Route
            path="/user-roles/create"
            element={<AssignUserRole />}
          />

          <Route
            path="/user-roles/edit/:id"
            element={<EditUserRole />}
          />
          <Route
            path="/user-roles"
            element={<UserRoleList />}
          />





          <Route
            path="/roles/create"
            element={<CreateRole />}
          />

          <Route
            path="/roles/edit/:id"
            element={<EditRole />}
          />
          <Route
            path="/roles"
            element={<RoleList />}
          />

          <Route
            path="/permissions"
            element={<PermissionsList />}
          />

          <Route
            path="/permissions/create"
            element={<CreatePermission />}
          />

          <Route
            path="/permissions/edit/:permissionId"
            element={<EditPermission />}
          />



          <Route
            path="/roles/roleCreate"
            element={<CreateRole />}
          />




          <Route
            path="/kyc"
            element={<DocumentList />}
          />

          <Route
            path="/kyc/documentDetails"
            element={<DocumentDetails />}
          />

          <Route
            path="/kyc/documents/upload"
            element={<UploadDocument />}
          />


          <Route
            path="/services"
            element={<ServiceList />}
          />

          <Route
            path="/services/edit/:id"
            element={<EditService />}
          />

          <Route
            path="/services/create"
            element={<CreateService />}
          />
          <Route
            path="/categories"
            element={<CategoryList />}
          />

          <Route
            path="/categories/edit/:id"
            element={<EditCategory />}
          />

          <Route
            path="/categories/create"
            element={<CreateCategory />}
          />

          <Route
            path="/payments"
            element={<PaymentList />}
          />

          <Route
            path="/payments/edit/:id"
            element={<EditPayment />}
          />

          <Route
            path="/payments/create"
            element={<CreatePayment />}
          />

          <Route
            path="/bookings"
            element={<BookingList />}
          />

          <Route
            path="/bookings/edit/:id"
            element={<EditBooking />}
          />

          <Route
            path="/bookings/create"
            element={<CreateBooking />}
          />

          <Route
            path="/subvendors"
            element={<SubVendorList />}
          />

          <Route
            path="/subvendors/edit/:id"
            element={<EditSubVendor />}
          />

          <Route
            path="/subvendors/create"
            element={<CreateSubVendor />}
          />

          <Route
            path="/vendors"
            element={<VendorList />}
          />

          <Route
            path="/vendors/:id"
            element={<EditVendor />}
          />

          <Route
            path="/vendors/create"
            element={<CreateVendor />}
          />

          <Route
            path="/users"
            element={<UsersList />}
          />

          <Route
            path="/users/:userId"
            element={<EditUser />}
          />



          <Route
            path="/users/create"
            element={<CreateUser />}
          />
          {/* DASHBOARD */}
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          {/* SETTINGS */}
          <Route
            path="/settings/profile"
            element={<Profile />}
          />

          <Route
            path="/settings/security"
            element={<Security />}
          />

          <Route
            path="/settings/notifications"
            element={
              <Notifications />
            }
          />

          <Route
            path="/settings/password"
            element={<Password />}
          />

          <Route
            path="/settings/system"
            element={<System />}
          />

          <Route
            path="/settings/backup"
            element={<Backup />}
          />
        </Route>

        {/* ========================= */}
        {/* FALLBACK */}
        {/* ========================= */}

        <Route
          path="*"
          element={
            <Navigate to="/" replace />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}