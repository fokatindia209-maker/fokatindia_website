import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import {
    sendOtpService,
    verifyOtpService
} from "../services/authService";

import AuthLayout from "../components/AuthLayout";
import Button from "../components/Button";

export default function OtpLogin() {

    const navigate = useNavigate();

    const [step, setStep] = useState<1 | 2>(1);
    const [mobile, setMobile] = useState("");

    // ========================
    // VALIDATION SCHEMAS
    // ========================

    const sendOtpSchema = Yup.object({
        mobile: Yup.string()
            .matches(/^\d{10}$/, "Enter valid 10-digit mobile number")
            .required("Mobile is required"),
    });

    const verifyOtpSchema = Yup.object({
        otp: Yup.string()
            .length(6, "OTP must be 6 digits")
            .required("OTP is required"),
    });

    // ========================
    // SEND OTP
    // ========================
    const handleSendOtp = async (
        values: { mobile: string },
        { setSubmitting, setFieldError }: any
    ) => {

        try {
            await sendOtpService(values.mobile);

            setMobile(values.mobile);
            setStep(2);

        } catch (err: any) {

            setFieldError(
                "mobile",
                err?.response?.data?.message || "Failed to send OTP"
            );

        } finally {
            setSubmitting(false);
        }
    };

    // ========================
    // VERIFY OTP
    // ========================
    const handleVerifyOtp = async (
        values: { otp: string },
        { setSubmitting, setFieldError }: any
    ) => {

        try {

            const res = await verifyOtpService(
                mobile,
                values.otp
            );

            localStorage.setItem("token", res.token);

            navigate("/dashboard");

        } catch (err: any) {

            setFieldError(
                "otp",
                err?.response?.data?.message || "Invalid OTP"
            );

        } finally {
            setSubmitting(false);
        }
    };

    return (
        <AuthLayout title="OTP Login">

            <div className="space-y-5">

                {/* STEP INDICATOR */}
                <div className="flex justify-center gap-2 text-sm">
                    <span className={`px-3 py-1 rounded-full ${step === 1 ? "bg-blue-600 text-white" : "bg-gray-200"}`}>
                        1. Mobile
                    </span>
                    <span className={`px-3 py-1 rounded-full ${step === 2 ? "bg-blue-600 text-white" : "bg-gray-200"}`}>
                        2. OTP
                    </span>
                </div>

                {/* ===================== */}
                {/* STEP 1: SEND OTP */}
                {/* ===================== */}
                {step === 1 && (
                    <Formik
                        initialValues={{ mobile: "" }}
                        validationSchema={sendOtpSchema}
                        onSubmit={handleSendOtp}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-4">

                                <Field
                                    name="mobile"
                                    placeholder="Enter mobile number"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                                />

                                <ErrorMessage
                                    name="mobile"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />

                                <Button
                                    type="submit"
                                    title={isSubmitting ? "Sending OTP..." : "Send OTP"}
                                />

                            </Form>
                        )}
                    </Formik>
                )}

                {/* ===================== */}
                {/* STEP 2: VERIFY OTP */}
                {/* ===================== */}
                {step === 2 && (
                    <Formik
                        initialValues={{ otp: "" }}
                        validationSchema={verifyOtpSchema}
                        onSubmit={handleVerifyOtp}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-4">

                                <div className="text-sm text-gray-600">
                                    OTP sent to: <b>{mobile}</b>
                                </div>

                                <Field
                                    name="otp"
                                    placeholder="Enter OTP"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                                />

                                <ErrorMessage
                                    name="otp"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />

                                <Button
                                    type="submit"
                                    title={isSubmitting ? "Verifying..." : "Verify OTP"}
                                />

                                {/* BACK OPTION */}
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="text-sm text-blue-600 hover:underline w-full text-center"
                                >
                                    Change mobile number
                                </button>

                            </Form>
                        )}
                    </Formik>
                )}

            </div>

        </AuthLayout>
    );
}