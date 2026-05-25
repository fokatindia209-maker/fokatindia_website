import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import OtpLogin from "../pages/OtpLogin";
import Dashboard from "../pages/Dashboard";

import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {

    // ✅ USE REDUX (reactive)
    const token = useSelector(
        (state: RootState) => state.auth.token
    );

    return (

        <BrowserRouter>

            <Routes>

                {/* ROOT */}
                <Route
                    path="/"
                    element={
                        token
                            ? <Navigate to="/dashboard" replace />
                            : <Navigate to="/login" replace />
                    }
                />

                {/* LOGIN */}
                <Route
                    path="/login"
                    element={
                        token
                            ? <Navigate to="/dashboard" replace />
                            : <Login />
                    }
                />

                {/* REGISTER */}
                <Route
                    path="/register"
                    element={<Register />}
                />

                {/* FORGOT */}
                <Route
                    path="/forgot-password"
                    element={<ForgotPassword />}
                />

                {/* OTP */}
                <Route
                    path="/otp-login"
                    element={<OtpLogin />}
                />

                {/* DASHBOARD */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                {/* FALLBACK */}
                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />

            </Routes>

        </BrowserRouter>
    );
}