import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { User, Mail, Phone, Lock, Eye, EyeOff } from "lucide-react";
import { registerService } from "../services/authService";
import Button from "../components/Button";
import AuthLayout from "../components/AuthLayout";

interface RegisterForm {
    name: string;
    email: string;
    phone: string;
    password: string;
}

const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
        .matches(/^\d{10}$/, "Phone must be 10 digits")
        .required("Phone is required"),
    password: Yup.string()
        .min(6, "Min 6 characters")
        .required("Password is required"),
});

export default function Register() {

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const initialValues: RegisterForm = {
        name: "",
        email: "",
        phone: "",
        password: ""
    };

    const handleSubmit = async (values: RegisterForm, { setSubmitting, setFieldError }: any) => {

        try {
            await registerService(values);

            navigate("/login");

        } catch (error: any) {
            setFieldError(
                "email",
                error?.response?.data?.message || "Registration failed"
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <AuthLayout
            title="Create Account"
            subtitle="Sign up to book trusted home services near you"
        >
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (

                    <Form className="space-y-4">

                        {/* Name */}
                        <div>
                            <div className="relative">
                                <User
                                    size={18}
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                                />
                                <Field
                                    name="name"
                                    placeholder="Full Name"
                                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                />
                            </div>
                            <ErrorMessage
                                name="name"
                                component="div"
                                className="text-red-500 text-xs mt-1.5 ml-1"
                            />
                        </div>

                        {/* Email */}
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

                        {/* Phone */}
                        <div>
                            <div className="relative">
                                <Phone
                                    size={18}
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                                />
                                <Field
                                    name="phone"
                                    type="tel"
                                    inputMode="numeric"
                                    maxLength={10}
                                    placeholder="Mobile Number"
                                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                />
                            </div>
                            <ErrorMessage
                                name="phone"
                                component="div"
                                className="text-red-500 text-xs mt-1.5 ml-1"
                            />
                        </div>

                        {/* Password */}
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

                        {/* Submit */}
                        <Button
                            type="submit"
                            title={isSubmitting ? "Registering..." : "Register"}
                            disabled={isSubmitting}
                        />

                    </Form>

                )}
            </Formik>

            <p className="text-center text-sm mt-6 text-gray-600">
                Already have an account?{" "}
                <Link
                    to="/login"
                    className="text-blue-600 font-semibold hover:underline"
                >
                    Login
                </Link>
            </p>

        </AuthLayout>
    );
}
