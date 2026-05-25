import { useState } from "react";
import { Formik, Form } from "formik";
import { uploadDocument } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import type { AppDispatch } from "../store/store";

const DOCUMENT_TYPES = [
    "PAN",
    "AADHAAR",
    "GST",
    "POLICE_VERIFICATION",
    "PHOTO"
];

// Required documents
const REQUIRED_DOCUMENTS = ["PAN", "AADHAAR", "PHOTO"];

interface UploadState {
    [key: string]: boolean;
}

export default function DocumentUpload() {
    const dispatch = useDispatch<AppDispatch>();

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const navigate = useNavigate();
    const [uploaded, setUploaded] = useState<UploadState>({});

    const initialValues = {
        file: null as File | null
    };

    const handleUpload = async (
        documentType: string,
        file: File | null,
        resetForm: any
    ) => {

        if (!file) {
            alert("Please select a file");
            return;
        }

        try {

            const formData = new FormData();

            console.log("user", user)

            formData.append("userId", user.userId);
            formData.append("documentType", documentType);
            formData.append("file", file);

            await uploadDocument(formData);

            setUploaded((prev) => ({
                ...prev,
                [documentType]: true
            }));

            resetForm();

        } catch (err) {
            alert("Upload failed");
        }
    };

    const allRequiredUploaded = REQUIRED_DOCUMENTS.every(
        (doc) => uploaded[doc]
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-6">

            <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6">

                <h2 className="text-xl font-bold text-center mb-6">
                    Vendor Document Upload
                </h2>

                <div className="space-y-4">

                    {DOCUMENT_TYPES.map((doc) => (

                        <div
                            key={doc}
                            className="border p-4 rounded-lg flex items-center justify-between"
                        >

                            {/* LEFT SIDE */}
                            <div className="flex items-center gap-2">

                                <span className="font-medium">
                                    {doc}{" "}
                                    {REQUIRED_DOCUMENTS.includes(doc) && (
                                        <span className="text-red-500 text-xs ml-1">
                                            (Required)
                                        </span>
                                    )}
                                </span>

                                {uploaded[doc] && (
                                    <span className="text-green-600 text-lg">
                                        ✔
                                    </span>
                                )}
                            </div>

                            {/* RIGHT SIDE FORM */}
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
                                            className="text-sm"
                                            onChange={(e) => {
                                                const file =
                                                    e.currentTarget.files?.[0] || null;

                                                setFieldValue("file", file);
                                            }}
                                        />

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                                        >
                                            Upload
                                        </button>

                                    </Form>
                                )}
                            </Formik>

                        </div>
                    ))}

                </div>

                {/* FINAL STATUS */}
                <div className="mt-6 text-center">

                    {allRequiredUploaded ? (
                        <p className="text-green-600 font-semibold">
                            ✔ All required documents uploaded. Verification is in progress.
                        </p>
                    ) : (
                        <p className="text-yellow-600 font-semibold">
                            Verification pending. Please upload all required documents.
                        </p>
                    )}

                    <p className="text-sm text-gray-500 mt-2">
                        Once verified, an email will be sent to your registered email ID.
                    </p>

                </div>

                <div className="mt-6 flex justify-center">
                    <button
                        onClick={() => {
                            dispatch(logout());
                            navigate("/")
                        }
                        }
                        className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                    >
                        Back to Login
                    </button>
                </div>

            </div>
        </div>
    );
}