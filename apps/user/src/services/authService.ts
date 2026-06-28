// src/services/authService.ts

import api from "../api/axios";

// ===============================
// LOGIN
// ===============================

export const loginService = async (
    email: string,
    password: string,
    fcmToken: string | null
) => {

    const response = await api.post(
        "/users/login",
        {
            email,
            password,
            ...(fcmToken ? { fcmToken } : {}),
        }
    );

    // RETURN ACTUAL USER DATA
    return response.data.data;
};

// ===============================
// REGISTER
// ===============================

export const registerService = async (
    data: any
) => {

    const response = await api.post(
        "/users/register",
        data
    );

    return response.data.data;
};

// ===============================
// FORGOT PASSWORD
// ===============================

export const forgotPasswordService =
    async (email: string) => {

        const response = await api.post(
            "/users/forgot-password",
            { email }
        );

        return response.data;
    };

// ===============================
// SEND OTP
// ===============================

export const sendOtpService = async (
    mobile: string
) => {

    const response = await api.post(
        "/users/send-otp",
        { mobile }
    );

    return response.data;
};

// ===============================
// VERIFY OTP
// ===============================

export const verifyOtpService = async (
    mobile: string,
    otp: string
) => {

    const response = await api.post(
        "/users/verify-otp",
        {
            mobile,
            otp
        }
    );

    return response.data.data;
};