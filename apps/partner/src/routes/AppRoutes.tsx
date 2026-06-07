import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

// AUTH
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import OtpLogin from "../pages/OtpLogin";
import DocumentUpload from "../pages/DocumentUpload";

// VENDOR
import VendorDashboard from "../pages/vendor/dashboard/VendorDashboard";
import VendorSubVendorList from "../pages/vendor/subvendors/VendorSubVendorList";
import VendorBookingList from "../pages/vendor/bookings/VendorBookingList";
import VendorCategoryList from "../pages/vendor/categories/VendorCategoryList";
import VendorServiceList from "../pages/vendor/services/VendorServiceList";
import VendorEarnings from "../pages/vendor/earnings/VendorEarnings";
import Notifications from "../pages/vendor/notifications/Notifications";
import Reviews from "../pages/vendor/reviews/Reviews";
import Reports from "../pages/vendor/reports/Reports";
import VendorProfile from "../pages/vendor/profile/VendorProfile";
import Settings from "../pages/vendor/setting/Settings";
import VendorMore from "../pages/vendor/more/VendorMore";

// SUB VENDOR (you must create these pages)
import SubVendorDashboard from "../pages/subvendor/dashboard/SubVendorDashboard";
// import SubVendorJobs from "../pages/subvendor/jobs/SubVendorJobs";
// import SubVendorEarnings from "../pages/subvendor/earnings/SubVendorEarnings";

import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {
  const token = useSelector(
    (state: RootState) => state.auth.token
  );

  const user = useSelector(
    (state: RootState) => state.auth.user
  );

  const localToken = localStorage.getItem("token");

  const localUser = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const isLoggedIn = !!(token || localToken);

  const role =
    user?.role || localUser?.role;

  const documentStatus =
    user?.documentStatus ||
    localUser?.documentStatus;

  return (
    <BrowserRouter>
      <Routes>

        {/* ================= ROOT ================= */}
        <Route
          path="/"
          element={
            !isLoggedIn ? (
              <Navigate to="/login" replace />
            ) : documentStatus !== "APPROVED" ? (
              <Navigate
                to="/document_upload"
                replace
              />
            ) : role === "SUB_VENDOR" ? (
              <Navigate
                to="/subvendor/dashboard"
                replace
              />
            ) : (
              <Navigate
                to="/vendor/dashboard"
                replace
              />
            )
          }
        />

        {/* ================= LOGIN ================= */}
        <Route
          path="/login"
          element={
            !isLoggedIn ? (
              <Login />
            ) : documentStatus !== "APPROVED" ? (
              <Navigate
                to="/document_upload"
                replace
              />
            ) : role === "SUB_VENDOR" ? (
              <Navigate
                to="/subvendor/dashboard"
                replace
              />
            ) : (
              <Navigate
                to="/vendor/dashboard"
                replace
              />
            )
          }
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/otp-login"
          element={<OtpLogin />}
        />

        {/* ================= DOCUMENT ================= */}
        <Route
          path="/document_upload"
          element={
            !isLoggedIn ? (
              <Navigate to="/login" replace />
            ) : (
              <DocumentUpload />
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
          path="/vendor/bookings"
          element={
            <ProtectedRoute allowedRole="VENDOR">
              <VendorBookingList />
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

        {/* <Route
          path="/subvendor/jobs"
          element={
            <ProtectedRoute allowedRole="SUB_VENDOR">
              <SubVendorJobs />
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
        /> */}

        {/* ================= FALLBACK ================= */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}
// import {
//     BrowserRouter,
//     Routes,
//     Route,
//     Navigate,
// } from "react-router-dom";

// import { useSelector } from "react-redux";
// import type { RootState } from "../store/store";

// // AUTH PAGES
// import Login from "../pages/Login";
// import Register from "../pages/Register";
// import ForgotPassword from "../pages/ForgotPassword";
// import OtpLogin from "../pages/OtpLogin";
// import DocumentUpload from "../pages/DocumentUpload";
// import VendorDashboard from "../pages/vendor/dashboard/VendorDashboard";
// import VendorSubVendorList from "../pages/vendor/subvendors/VendorSubVendorList";
// import VendorBookingList from "../pages/vendor/bookings/VendorBookingList";
// import VendorCategoryList from "../pages/vendor/categories/VendorCategoryList";
// import VendorServiceList from "../pages/vendor/services/VendorServiceList";
// import VendorEarnings from "../pages/vendor/earnings/VendorEarnings";
// import Notifications from "../pages/vendor/notifications/Notifications";
// import Reviews from "../pages/vendor/reviews/Reviews";
// import Reports from "../pages/vendor/reports/Reports";
// import VendorProfile from "../pages/vendor/profile/VendorProfile";
// import Settings from "../pages/vendor/setting/Settings";
// import VendorMore from "../pages/vendor/more/VendorMore";


// export default function AppRoutes() {
//     // REDUX
//     const token = useSelector(
//         (state: RootState) => state.auth.token
//     );

//     const user = useSelector(
//         (state: RootState) => state.auth.user
//     );

//     const localToken =
//         localStorage.getItem("token");

//     // LOCAL STORAGE FALLBACK
//     const localUser = JSON.parse(
//         localStorage.getItem("user") || "{}"
//     );

//     const isLoggedIn = !!(
//         token || localToken
//     );

//     const role =
//         user?.role ||
//         localUser?.role;

//     const documentStatus =
//         user?.documentStatus ||
//         localUser?.documentStatus;


//     return (
//         <BrowserRouter>
//             <Routes>

//                 <Route
//                     path="/"
//                     element={
//                         !isLoggedIn ? (
//                             <Navigate
//                                 to="/login"
//                                 replace
//                             />
//                         ) : documentStatus !==
//                             "APPROVED" ? (
//                             <Navigate
//                                 to="/document_upload"
//                                 replace
//                             />
//                         ) : role ===
//                             "SUB_VENDOR" ? (
//                             <Navigate
//                                 to="/subvendor/dashboard"
//                                 replace
//                             />
//                         ) : (
//                             <Navigate
//                                 to="/vendor/dashboard"
//                                 replace
//                             />
//                         )
//                     }
//                 />

//                 <Route
//                     path="/login"
//                     element={
//                         !isLoggedIn ? (
//                             <Login />
//                         ) : documentStatus !==
//                             "APPROVED" ? (
//                             <Navigate
//                                 to="/document_upload"
//                                 replace
//                             />
//                         ) : role ===
//                             "SUB_VENDOR" ? (
//                             <Navigate
//                                 to="/subvendor/dashboard"
//                                 replace
//                             />
//                         ) : (
//                             <Navigate
//                                 to="/vendor/dashboard"
//                                 replace
//                             />
//                         )
//                     }
//                 />


//                 <Route
//                     path="/register"
//                     element={<Register />}
//                 />



//                 <Route
//                     path="/forgot-password"
//                     element={<ForgotPassword />}
//                 />



//                 <Route
//                     path="/otp-login"
//                     element={<OtpLogin />}
//                 />

//                 <Route
//                     path="/document_upload"
//                     element={
//                         !isLoggedIn ? (
//                             <Navigate
//                                 to="/login"
//                                 replace
//                             />
//                         ) : (
//                             <DocumentUpload />
//                         )
//                     }
//                 />


//                 <Route
//                     path="/vendor/dashboard"
//                     element={<VendorDashboard />}
//                 />

//                 <Route
//                     path="/vendor/subvendors"
//                     element={

//                         <VendorSubVendorList />

//                     }
//                 />

//                 <Route
//                     path="/vendor/bookings"
//                     element={

//                         <VendorBookingList />

//                     }
//                 />

//                 <Route
//                     path="/vendor/categories"
//                     element={

//                         <VendorCategoryList />

//                     }
//                 />

//                 <Route
//                     path="/vendor/services"
//                     element={

//                         <VendorServiceList />

//                     }
//                 />


//                 <Route
//                     path="/vendor/earnings"
//                     element={

//                         <VendorEarnings />

//                     }
//                 />


//                 <Route
//                     path="/vendor/notifications"
//                     element={

//                         <Notifications />

//                     }
//                 />

//                 <Route
//                     path="/vendor/reviews"
//                     element={

//                         <Reviews />

//                     }
//                 />

//                 <Route
//                     path="/vendor/reports"
//                     element={

//                         <Reports />

//                     }
//                 />

//                 <Route
//                     path="/vendor/profile"
//                     element={

//                         <VendorProfile />

//                     }
//                 />

//                 <Route
//                     path="/vendor/settings"
//                     element={

//                         <Settings />

//                     }
//                 />

//                 <Route
//                     path="/vendor/more"
//                     element={

//                         <VendorMore />

//                     }
//                 />


//                 <Route
//                     path="*"
//                     element={
//                         <Navigate to="/" replace />
//                     }
//                 />
//             </Routes>
//         </BrowserRouter>
//     );
// }