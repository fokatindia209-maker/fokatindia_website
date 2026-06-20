import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import type { JSX } from "react";

interface Props {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: Props) {
  const location = useLocation();

  const token = useSelector((state: RootState) => state.auth.token);
  const localToken = localStorage.getItem("token");

  const isLoggedIn = !!token || !!localToken;

  if (!isLoggedIn) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          redirectTo: location.pathname, // 👈 IMPORTANT
        }}
      />
    );
  }

  return children;
}