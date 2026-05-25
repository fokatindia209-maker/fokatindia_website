import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { loginService } from "../services/authService";
import { loginSuccess } from "../store/slices/authSlice";
import type { AppDispatch } from "../store/store";

import AuthLayout from "../components/AuthLayout";
import Button from "../components/Button";
import { generateFCMToken } from "../firebase";

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
            navigate("/");




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
        <AuthLayout title="Welcome Back">

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (

                    <Form className="space-y-4">

                        {/* Email */}
                        <div>
                            <Field
                                name="email"
                                type="email"
                                placeholder="Email Address"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <Field
                                name="password"
                                type="password"
                                placeholder="Password"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                            />
                        </div>

                        {/* Submit */}
                        <Button
                            type="submit"
                            title={isSubmitting ? "Signing in..." : "Login"}
                        />

                        {/* Links */}
                        <div className="flex justify-center text-sm text-blue-600">


                            {/* <Link to="/forgot-password" className="hover:underline">
                                Forgot Password
                            </Link> */}

                            <Link to="/otp-login" className="hover:underline">
                                OTP Login
                            </Link>
                        </div>

                    </Form>

                )}
            </Formik>

            {/* <p className="text-center text-sm mt-5 text-gray-600">
                Don’t have an account?{" "}
                <Link
                    to="/register"
                    className="text-blue-600 font-semibold hover:underline"
                >
                    Register
                </Link>
            </p> */}

        </AuthLayout>
    );
}