import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { uploadDocument } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, logout } from "../store/slices/authSlice";
import type { AppDispatch, RootState } from "../store/store";
import api from "../api/axios";

const DOCUMENT_TYPES = [
    "PAN",
    "AADHAAR",
    "GST",
    "POLICE_VERIFICATION",
    "PHOTO"
];

const REQUIRED_DOCUMENTS = ["PAN", "AADHAAR", "PHOTO"];

interface ExistingDoc {
    documentId: number;
    documentType: string;
    documentUrl: string;
    status: string;
    remarks?: string;
}

interface UploadState {
    [key: string]: boolean;
}

export default function DocumentUpload() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const reduxUser = useSelector((state: RootState) => state.auth.user);
    const localUser = JSON.parse(localStorage.getItem("user") || "{}");
    const user = reduxUser || localUser;

    const [existingDocs, setExistingDocs] = useState<Record<string, ExistingDoc>>({});
    const [uploaded, setUploaded] = useState<UploadState>({});
    const [loadingDocs, setLoadingDocs] = useState(true);

    useEffect(() => {
        if (!user?.userId) return;
        api.get(`/restful/v1/api/documents/${user.userId}`)
            .then(res => {
                const docsMap: Record<string, ExistingDoc> = {};
                (res.data?.data || []).forEach((doc: ExistingDoc) => {
                    docsMap[doc.documentType] = doc;
                });
                setExistingDocs(docsMap);
            })
            .catch(() => {})
            .finally(() => setLoadingDocs(false));
    }, [user?.userId]);

    const handleUpload = async (
        documentType: string,
        file: File | null,
        resetForm: () => void
    ) => {
        if (!file) {
            alert("Please select a file");
            return;
        }
        try {
            const formData = new FormData();
            formData.append("userId", String(user.userId));
            formData.append("documentType", documentType);
            formData.append("file", file);
            await uploadDocument(formData);
            setUploaded(prev => ({ ...prev, [documentType]: true }));
            resetForm();
        } catch {
            alert("Upload failed. Please try again.");
        }
    };

    // A required doc is "handled" if it was just uploaded OR if it exists with a non-REJECTED status
    const allRequiredHandled = REQUIRED_DOCUMENTS.every(doc => {
        if (uploaded[doc]) return true;
        const existing = existingDocs[doc];
        return existing && existing.status !== "REJECTED";
    });

    const handleContinue = () => {
        const updatedUser = { ...user, documentStatus: "SUBMITTED" };
        dispatch(loginSuccess(updatedUser as any));
        navigate("/document_review");
    };

    const initialValues = { file: null as File | null };

    if (loadingDocs) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <div className="text-white text-lg">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-6">
            <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6">

                <h2 className="text-xl font-bold text-center mb-2">
                    Document Verification
                </h2>

                <p className="text-center text-gray-500 text-sm mb-6">
                    Upload the required documents to activate your account.
                </p>

                <div className="space-y-4">
                    {DOCUMENT_TYPES.map((doc) => {
                        const existing = existingDocs[doc];
                        const justUploaded = uploaded[doc];
                        const isRequired = REQUIRED_DOCUMENTS.includes(doc);
                        const needsUpload = !existing || existing.status === "REJECTED";

                        return (
                            <div key={doc} className="border rounded-lg p-4">

                                {/* Header row */}
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium">
                                        {doc}
                                        {isRequired && (
                                            <span className="text-red-500 text-xs ml-1">(Required)</span>
                                        )}
                                    </span>

                                    {/* Status badge */}
                                    {justUploaded ? (
                                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-semibold">
                                            Uploaded
                                        </span>
                                    ) : existing?.status === "APPROVED" ? (
                                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                                            Approved
                                        </span>
                                    ) : existing?.status === "PENDING" ? (
                                        <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-semibold">
                                            Under Review
                                        </span>
                                    ) : existing?.status === "REJECTED" ? (
                                        <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-semibold">
                                            Rejected
                                        </span>
                                    ) : null}
                                </div>

                                {/* Rejection remarks */}
                                {existing?.status === "REJECTED" && existing.remarks && (
                                    <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded p-2 mb-2">
                                        <span className="font-semibold">Reason: </span>{existing.remarks}
                                    </p>
                                )}

                                {/* Upload form — only for docs that need uploading */}
                                {needsUpload && !justUploaded && (
                                    <Formik
                                        initialValues={initialValues}
                                        onSubmit={(values, { resetForm }) =>
                                            handleUpload(doc, values.file, resetForm)
                                        }
                                    >
                                        {({ setFieldValue, isSubmitting }) => (
                                            <Form className="flex items-center gap-2">
                                                <input
                                                    type="file"
                                                    className="text-sm flex-1"
                                                    onChange={e => setFieldValue("file", e.currentTarget.files?.[0] || null)}
                                                />
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 disabled:opacity-50"
                                                >
                                                    {isSubmitting ? "Uploading..." : "Upload"}
                                                </button>
                                            </Form>
                                        )}
                                    </Formik>
                                )}

                                {/* View existing doc link */}
                                {existing && !justUploaded && (
                                    <a
                                        href={existing.documentUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-xs text-blue-600 underline mt-1 inline-block"
                                    >
                                        View uploaded file
                                    </a>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Status message */}
                <div className="mt-6 text-center">
                    {allRequiredHandled ? (
                        <>
                            <p className="text-green-600 font-semibold mb-3">
                                All required documents are submitted. Click Continue to proceed.
                            </p>
                            <button
                                onClick={handleContinue}
                                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition mb-3"
                            >
                                Continue
                            </button>
                        </>
                    ) : (
                        <p className="text-yellow-600 font-semibold">
                            Please upload all required documents marked with *.
                        </p>
                    )}
                    <p className="text-sm text-gray-500 mt-2">
                        Once verified, an email will be sent to your registered email ID.
                    </p>
                </div>

                <div className="mt-4 flex justify-center">
                    <button
                        onClick={() => {
                            dispatch(logout());
                            navigate("/login");
                        }}
                        className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                    >
                        Back to Login
                    </button>
                </div>

            </div>
        </div>
    );
}
