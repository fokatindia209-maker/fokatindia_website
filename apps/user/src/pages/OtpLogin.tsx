import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import type { ConfirmationResult } from "firebase/auth";

import {
    initRecaptchaVerifier,
    sendFirebaseOtp,
    verifyFirebaseOtp,
    formatToE164,
    firebaseErrorMessage,
} from "../services/firebaseAuthService";
import { phoneLoginService } from "../services/authService";
import { loginSuccess } from "../store/slices/authSlice";
import type { AppDispatch } from "../store/store";

import Button from "../components/Button";
import AuthLayout from "../components/AuthLayout";

const RESEND_SECONDS = 60;

const sendOtpSchema = Yup.object({
    mobile: Yup.string()
        .matches(/^\d{10}$/, "Enter a valid 10-digit mobile number")
        .required("Mobile number is required"),
});

const verifyOtpSchema = Yup.object({
    otp: Yup.string()
        .matches(/^\d{6}$/, "OTP must be exactly 6 digits")
        .required("OTP is required"),
});

export default function OtpLogin() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [step, setStep] = useState<1 | 2>(1);
    const [mobile, setMobile] = useState("");
    const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
    const [countdown, setCountdown] = useState(0);
    const [sendError, setSendError] = useState("");
    const [verifyError, setVerifyError] = useState("");

    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Clear the countdown timer on unmount
    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    const startCountdown = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        setCountdown(RESEND_SECONDS);
        timerRef.current = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timerRef.current!);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    // ========================
    // SEND OTP (Step 1)
    // ========================
    const handleSendOtp = async (
        values: { mobile: string },
        { setSubmitting }: any
    ) => {
        setSendError("");
        try {
            const verifier = initRecaptchaVerifier("recaptcha-container");
            const phoneE164 = formatToE164(values.mobile);
            const result = await sendFirebaseOtp(phoneE164, verifier);

            setConfirmationResult(result);
            setMobile(values.mobile);
            setStep(2);
            startCountdown();
        } catch (err: any) {
            setSendError(firebaseErrorMessage(err));
        } finally {
            setSubmitting(false);
        }
    };

    // ========================
    // RESEND OTP
    // ========================
    const handleResendOtp = async () => {
        setSendError("");
        setVerifyError("");
        try {
            const verifier = initRecaptchaVerifier("recaptcha-container");
            const phoneE164 = formatToE164(mobile);
            const result = await sendFirebaseOtp(phoneE164, verifier);
            setConfirmationResult(result);
            startCountdown();
        } catch (err: any) {
            setSendError(firebaseErrorMessage(err));
        }
    };

    // ========================
    // VERIFY OTP (Step 2)
    // ========================
    const handleVerifyOtp = async (
        values: { otp: string },
        { setSubmitting }: any
    ) => {
        setVerifyError("");

        if (!confirmationResult) {
            setVerifyError("Session expired. Go back and request a new OTP.");
            setSubmitting(false);
            return;
        }

        try {
            // Step A: Firebase verifies the OTP
            await verifyFirebaseOtp(confirmationResult, values.otp);

            // Step B: Backend issues our app JWT for this phone number
            const fcmToken = localStorage.getItem("fcmToken") ?? "";
            const userData = await phoneLoginService(mobile, fcmToken);

            dispatch(loginSuccess(userData));
            navigate("/dashboard");
        } catch (err: any) {
            // Firebase errors have a `code` field; backend errors come from axios
            if (err?.code) {
                setVerifyError(firebaseErrorMessage(err));
            } else {
                setVerifyError(
                    err?.response?.data?.message || "Login failed. Please try again."
                );
            }
        } finally {
            setSubmitting(false);
        }
    };

    const handleChangeNumber = () => {
        setStep(1);
        setSendError("");
        setVerifyError("");
        setConfirmationResult(null);
        if (timerRef.current) clearInterval(timerRef.current);
        setCountdown(0);
    };

    return (
        <AuthLayout title="OTP Login">

            {/* Invisible reCAPTCHA mount point — must stay in the DOM */}
            <div id="recaptcha-container" />

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
                {/* STEP 1: ENTER MOBILE  */}
                {/* ===================== */}
                {step === 1 && (
                    <Formik
                        initialValues={{ mobile: "" }}
                        validationSchema={sendOtpSchema}
                        onSubmit={handleSendOtp}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-4">

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Mobile Number
                                    </label>

                                    {/* Phone input with +91 prefix badge */}
                                    <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-400">
                                        <span className="px-3 py-2 bg-gray-100 text-gray-600 text-sm border-r select-none">
                                            +91
                                        </span>
                                        <Field
                                            name="mobile"
                                            type="tel"
                                            inputMode="numeric"
                                            maxLength={10}
                                            placeholder="10-digit mobile number"
                                            className="flex-1 px-3 py-2 focus:outline-none text-sm"
                                        />
                                    </div>

                                    <ErrorMessage
                                        name="mobile"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>

                                {sendError && (
                                    <p className="text-red-500 text-sm">{sendError}</p>
                                )}

                                <Button
                                    type="submit"
                                    title={isSubmitting ? "Sending OTP..." : "Send OTP"}
                                />

                            </Form>
                        )}
                    </Formik>
                )}

                {/* ===================== */}
                {/* STEP 2: VERIFY OTP    */}
                {/* ===================== */}
                {step === 2 && (
                    <Formik
                        initialValues={{ otp: "" }}
                        validationSchema={verifyOtpSchema}
                        onSubmit={handleVerifyOtp}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-4">

                                <p className="text-sm text-gray-600 text-center">
                                    OTP sent to <span className="font-semibold">+91 {mobile}</span>
                                </p>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Enter OTP
                                    </label>
                                    <Field
                                        name="otp"
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={6}
                                        placeholder="• • • • • •"
                                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-center tracking-[0.5em] text-lg font-semibold"
                                    />
                                    <ErrorMessage
                                        name="otp"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>

                                {verifyError && (
                                    <p className="text-red-500 text-sm">{verifyError}</p>
                                )}

                                {sendError && (
                                    <p className="text-red-500 text-sm">{sendError}</p>
                                )}

                                <Button
                                    type="submit"
                                    title={isSubmitting ? "Verifying..." : "Verify OTP"}
                                />

                                {/* RESEND / COUNTDOWN */}
                                <div className="text-center text-sm">
                                    {countdown > 0 ? (
                                        <span className="text-gray-500">
                                            Resend OTP in{" "}
                                            <span className="font-semibold text-blue-600">
                                                {countdown}s
                                            </span>
                                        </span>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={handleResendOtp}
                                            className="text-blue-600 hover:underline font-medium"
                                        >
                                            Resend OTP
                                        </button>
                                    )}
                                </div>

                                <button
                                    type="button"
                                    onClick={handleChangeNumber}
                                    className="text-sm text-gray-500 hover:text-blue-600 hover:underline w-full text-center"
                                >
                                    Change mobile number
                                </button>

                            </Form>
                        )}
                    </Formik>
                )}

            </div>

            {/* Required attribution when the reCAPTCHA badge is hidden via CSS */}
            <p className="text-center text-xs text-gray-400 mt-4">
                Protected by reCAPTCHA —{" "}
                <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noreferrer"
                    className="underline hover:text-gray-600"
                >
                    Privacy
                </a>{" "}
                &{" "}
                <a
                    href="https://policies.google.com/terms"
                    target="_blank"
                    rel="noreferrer"
                    className="underline hover:text-gray-600"
                >
                    Terms
                </a>
            </p>

        </AuthLayout>
    );
}
