import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import type { RootState } from "../store/store";
import type { JSX } from "react";

interface Props {
    children: JSX.Element;
}

export default function ProtectedRoute({
    children
}: Props) {

    const token = useSelector(
        (state: RootState) => state.auth.token
    );

    const localToken =
        localStorage.getItem("token");

    if (!token && !localToken) {
        return <Navigate to="/login" replace />;
    }

    return children;
}