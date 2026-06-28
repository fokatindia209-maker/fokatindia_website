import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import type { JSX } from "react";

interface Props {
  children: JSX.Element;
  allowedRole?: "VENDOR" | "SUB_VENDOR";
}

export default function ProtectedRoute({
  children,
  allowedRole,
}: Props) {
  const token = useSelector(
    (state: RootState) => state.auth.token
  );

  const user = useSelector(
    (state: RootState) => state.auth.user
  );

  const localUser = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const localToken =
    localStorage.getItem("token");

  const isLoggedIn = !!(token || localToken);

  const documentStatus =
    user?.documentStatus ||
    localUser?.documentStatus;

  const role =
    user?.role ||
    localUser?.role;

  // ❌ NOT LOGGED IN
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // ❌ DOCUMENTS SUBMITTED — awaiting admin review
  if (documentStatus === "SUBMITTED") {
    return <Navigate to="/document_review" replace />;
  }

  // ❌ DOCUMENT NOT APPROVED (PENDING or REJECTED)
  if (documentStatus !== "APPROVED") {
    return <Navigate to="/document_upload" replace />;
  }

  // ❌ ROLE CHECK (Vendor/SubVendor protection)
  if (allowedRole && role !== allowedRole) {
    return role === "SUB_VENDOR" ? (
      <Navigate to="/subvendor/dashboard" replace />
    ) : (
      <Navigate to="/vendor/dashboard" replace />
    );
  }

  return children;
}