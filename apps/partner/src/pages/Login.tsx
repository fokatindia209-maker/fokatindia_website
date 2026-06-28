import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { loginService } from "../services/authService";
import { loginSuccess } from "../store/slices/authSlice";
import type { AppDispatch } from "../store/store";
import Button from "../components/Button";
import AuthLayout from "../components/AuthLayout";
import { generateFCMToken } from "../firebase";

interface LoginForm {
  email: string;
  password: string;
}

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
    password: "",
  };

  const handleSubmit = async (
    values: LoginForm,
    { setSubmitting, setFieldError }: any
  ) => {
    try {
      let fcmToken = localStorage.getItem("fcmToken");

      if (!fcmToken) {
        fcmToken = await generateFCMToken();
      }

      const res = await loginService(
        values.email,
        values.password,
        fcmToken ?? null
      );

      // Only VENDOR, SUB_VENDOR allowed
      const allowedRoles = [
        "VENDOR",
        "SUB_VENDOR",
      ];

      if (!allowedRoles.includes(res.role)) {
        setFieldError(
          "email",
          "You are not authorized to access this portal."
        );
        return;
      }

      // Save Token
      localStorage.setItem(
        "token",
        res.token
      );

      // Save User
      localStorage.setItem(
        "user",
        JSON.stringify(res)
      );

      dispatch(loginSuccess(res));

      // Redirect based on document status first, then role
      if (res.documentStatus === "SUBMITTED") {
        navigate("/document_review");
        return;
      }

      if (res.documentStatus === "PENDING") {
        // First login after registration → profile setup; subsequent → document upload
        const setupDone = localStorage.getItem("profileSetupDone");
        navigate(setupDone ? "/document_upload" : "/profile_setup");
        return;
      }

      if (res.documentStatus !== "APPROVED") {
        // REJECTED → straight to document re-upload
        navigate("/document_upload");
        return;
      }

      switch (res.role) {
        case "VENDOR":
          navigate("/vendor/dashboard");
          break;

        case "SUB_VENDOR":
          navigate("/subvendor/dashboard");
          break;

        default:
          navigate("/");
      }
    } catch (err: any) {
      setFieldError(
        "email",
        err?.response?.data?.message ||
          "Login failed"
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

            {/* Login Button */}
            <Button
              type="submit"
              title={
                isSubmitting
                  ? "Signing in..."
                  : "Login"
              }
            />

            <div className="flex justify-between text-sm text-blue-600">
              <Link
                to="/otp-login"
                className="hover:underline"
              >
                OTP Login
              </Link>

              <Link
                to="/forgot-password"
                className="hover:underline"
              >
                Forgot Password
              </Link>
            </div>

          </Form>
        )}
      </Formik>

      <p className="text-center text-sm mt-5 text-gray-600">
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