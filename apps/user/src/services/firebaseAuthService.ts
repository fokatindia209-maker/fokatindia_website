import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  type ConfirmationResult,
} from "firebase/auth";
import { auth } from "../firebase";

let recaptchaVerifier: RecaptchaVerifier | null = null;

// Clears and recreates the invisible reCAPTCHA verifier.
// Must be called before every sendOtp attempt (Firebase requires a fresh one after each use).
export const initRecaptchaVerifier = (containerId: string): RecaptchaVerifier => {
  if (recaptchaVerifier) {
    try {
      recaptchaVerifier.clear();
    } catch (_) {
      // ignore — DOM node may already be gone
    }
    recaptchaVerifier = null;
  }

  recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
    size: "invisible",
    callback: () => {},
    "expired-callback": () => {},
  });

  return recaptchaVerifier;
};

// Sends OTP via Firebase Phone Authentication.
// phoneE164 must be in E.164 format, e.g. "+919876543210".
export const sendFirebaseOtp = async (
  phoneE164: string,
  verifier: RecaptchaVerifier
): Promise<ConfirmationResult> => {
  return await signInWithPhoneNumber(auth, phoneE164, verifier);
};

// Verifies the OTP code the user typed.
// Returns the Firebase User on success.
export const verifyFirebaseOtp = async (
  confirmationResult: ConfirmationResult,
  otp: string
) => {
  const credential = await confirmationResult.confirm(otp);
  return credential.user;
};

// Converts a 10-digit Indian number to E.164 format.
// Also handles numbers already in E.164 or with 91 prefix.
export const formatToE164 = (mobile: string): string => {
  const digits = mobile.replace(/\D/g, "");
  if (digits.startsWith("91") && digits.length === 12) return `+${digits}`;
  if (digits.length === 10) return `+91${digits}`;
  // already has country code but no +
  return `+${digits}`;
};

// Maps Firebase error codes to human-readable messages.
export const firebaseErrorMessage = (error: any): string => {
  const code: string = error?.code ?? "";
  const map: Record<string, string> = {
    "auth/invalid-phone-number": "Invalid phone number. Check the format.",
    "auth/too-many-requests": "Too many attempts. Please try again later.",
    "auth/invalid-verification-code": "Incorrect OTP. Please try again.",
    "auth/code-expired": "OTP has expired. Please request a new one.",
    "auth/missing-phone-number": "Phone number is required.",
    "auth/quota-exceeded": "SMS quota exceeded. Try again later.",
    "auth/captcha-check-failed": "reCAPTCHA verification failed. Refresh and try again.",
    "auth/network-request-failed": "Network error. Check your connection.",
  };
  return map[code] ?? (error?.message || "Something went wrong. Please try again.");
};
