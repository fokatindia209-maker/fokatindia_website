import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { loginService } from "../services/authService";
import { loginSuccess } from "../store/slices/authSlice";
import type { AppDispatch } from "../store/store";
import Button from "../components/Button";
import { generateFCMToken } from "../firebase";
import AuthLayout from "../components/AuthLayout";
interface LoginForm {
    email: string;
    password: string;
}
// ✅ Yup Validation Schema
const validationSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),

    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
});

export default function Login() {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const location = useLocation();
    const redirectTo = (location.state as { redirectTo?: string })?.redirectTo || "/dashboard";
    const [showPassword, setShowPassword] = useState(false);

    const initialValues: LoginForm = {
        email: "",
        password: ""
    };

    const handleSubmit = async (values: LoginForm, { setSubmitting, setFieldError }: any) => {
        try {
            let fcmToken = localStorage.getItem("fcmToken");
            if (!fcmToken) {
                fcmToken = await generateFCMToken();
            }
            console.log("FCM TOKEN => ", fcmToken);
            const res = await loginService(
                values.email,
                values.password,
                fcmToken || ""
            );

            dispatch(loginSuccess(res));
            navigate(redirectTo, { replace: true });
        } catch (err: any) {
            setFieldError(
                "email",
                err?.response?.data?.message || "Login failed"
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (

        <AuthLayout
            title="Welcome Back"
            subtitle="Login to book trusted home services near you"
        >
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="space-y-4">

                        <div>
                            <div className="relative">
                                <Mail
                                    size={18}
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                                />
                                <Field
                                    name="email"
                                    type="email"
                                    placeholder="Email Address"
                                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                />
                            </div>
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="text-red-500 text-xs mt-1.5 ml-1"
                            />
                        </div>

                        <div>
                            <div className="relative">
                                <Lock
                                    size={18}
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                                />
                                <Field
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="w-full pl-11 pr-11 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    tabIndex={-1}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="text-red-500 text-xs mt-1.5 ml-1"
                            />
                        </div>

                        <div className="flex justify-end -mt-1">
                            <Link
                                to="/forgot-password"
                                className="text-sm text-blue-600 hover:underline font-medium"
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        <Button
                            type="submit"
                            title={isSubmitting ? "Signing In..." : "Login"}
                            disabled={isSubmitting}
                        />

                        <div className="relative flex items-center py-1">
                            <div className="flex-1 border-t border-gray-200" />
                            <span className="px-3 text-xs text-gray-400 uppercase tracking-wide">
                                or
                            </span>
                            <div className="flex-1 border-t border-gray-200" />
                        </div>

                        <Link
                            to="/otp-login"
                            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 active:scale-[0.98] transition-all"
                        >
                            Login with OTP
                        </Link>
                    </Form>
                )}
            </Formik>

            <p className="text-center text-sm mt-6 text-gray-600">
                Don’t have an account?{" "}
                <Link
                    to="/register"
                    className="text-blue-600 font-semibold hover:underline"
                >
                    Register
                </Link>
            </p>
        </AuthLayout>
    );
}
