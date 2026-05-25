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

    const user = useSelector(
        (state: RootState) => state.auth.user
    );

    const localUser = JSON.parse(
        localStorage.getItem("user") || "{}"
    );

    const localToken =
        localStorage.getItem("token");

    const documentStatus =
        user?.documentStatus ||
        localUser?.documentStatus;


    // ❌ NOT LOGGED IN
    if (!token && !localToken) {
        return <Navigate to="/login" replace />;
    }

    // ❌ DOCUMENT NOT APPROVED → FORCE DOCUMENT PAGE
    if (documentStatus && documentStatus !== "APPROVED") {
        return <Navigate to="/document_upload" replace />;
    }

   
    return children;
}