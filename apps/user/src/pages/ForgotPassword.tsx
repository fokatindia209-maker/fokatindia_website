import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { forgotPasswordService } from "../services/authService";
import Button from "../components/Button";
import AuthLayout from "../components/AuthLayout";

interface ForgotForm {
    email: string;
}

// ✅ Validation Schema
const validationSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
});

export default function ForgotPassword() {

    const [success, setSuccess] = useState("");

    const initialValues: ForgotForm = {
        email: ""
    };

    const handleSubmit = async (
        values: ForgotForm,
        { setSubmitting, setFieldError }: any
    ) => {

        try {
            setSuccess("");

            await forgotPasswordService(values.email);

            setSuccess("Reset link sent to your email");

        } catch (error: any) {

            setFieldError(
                "email",
                error?.response?.data?.message || "Failed to send reset link"
            );

        } finally {
            setSubmitting(false);
        }
    };

    return (
        <AuthLayout title="Forgot Password">

            <div className="space-y-4 ">

                <p className="text-sm text-gray-500 text-center">
                    Enter your email and we’ll send you a reset link.
                </p>

                {success && (
                    <div className="bg-green-100 text-green-700 px-3 py-2 rounded-lg text-sm text-center">
                        {success}
                    </div>
                )}

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
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />

                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>

                            {/* Submit */}
                            <Button
                                type="submit"
                                title={
                                    isSubmitting
                                        ? "Sending..."
                                        : "Send Reset Link"
                                }
                            />

                        </Form>

                    )}
                </Formik>

            </div>

        </AuthLayout>
    );
}