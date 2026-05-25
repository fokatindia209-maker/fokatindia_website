import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { registerServiceSubVendor, registerServiceVendor } from "../services/authService";


import { registerSuccess } from "../store/slices/authSlice";
import type { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";


interface RegisterForm {
    name: string;
    email: string;
    phone: string;
    password: string;
    invitationCode : string; // NEW
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
    invitationCode: Yup.string().optional(),
});

export default function Register() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const initialValues: RegisterForm = {
        name: "",
        email: "",
        phone: "",
        password: "",
        invitationCode : ""
    };

    const handleSubmit = async (values: RegisterForm,      { setSubmitting, setFieldError }: any) => {

        console.log("values", values)

        try {

          

               let res;

            if (!values.invitationCode?.trim()) {
                res = await registerServiceVendor(values);
                alert("Vendor registered successfully");
            } else {
                res = await registerServiceSubVendor(values);
                alert("SubVendor registered successfully");
            }

            // ✅ Redux store (same like login)
            dispatch(registerSuccess(res));

            // redirect
            navigate("/document_upload");

         } catch (error: any) {
            setFieldError(
                "email",
                error?.response?.data?.message || "Registration failed"
            );
        } finally {
            setSubmitting(false);
        }

        // try {
        //     await registerServiceVendor(values);

        //     alert("Registered successfully");

        //     navigate("/document_upload");

        // } catch (error) {
        //     alert("Registration failed");
        // }
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

                            <div>
                                <Field
                                    name="invitationCode"
                                    placeholder="Invitation Code (optional)"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                                <ErrorMessage
                                    name="invitationCode"
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