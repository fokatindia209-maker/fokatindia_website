import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { registerServiceVendor } from "../services/authService";

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

    const initialValues: RegisterForm = {
        name: "",
        email: "",
        phone: "",
        password: ""
    };

    const handleSubmit = async (values: RegisterForm) => {

        try {
            await registerServiceVendor(values);

            alert("Registered successfully");

            navigate("/");

        } catch (error) {
            alert("Registration failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">

            <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-xl">

                <h2 className="text-2xl font-bold text-center mb-6">
                    Create Account
                </h2>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (

                        <Form className="space-y-4">

                            {/* Name */}
                            <div>
                                <Field
                                    name="name"
                                    placeholder="Full Name"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                                <ErrorMessage
                                    name="name"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <Field
                                    name="email"
                                    placeholder="Email Address"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <Field
                                    name="phone"
                                    placeholder="Mobile Number"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                                <ErrorMessage
                                    name="phone"
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
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                            >
                                {isSubmitting ? "Registering..." : "Register"}
                            </button>

                        </Form>

                    )}
                </Formik>

                <p className="text-center text-sm mt-4">
                    Already have an account?{" "}
                    <span
                        onClick={() => navigate("/")}
                        className="text-blue-600 cursor-pointer font-semibold"
                    >
                        Login
                    </span>
                </p>

            </div>

        </div>
    );
}