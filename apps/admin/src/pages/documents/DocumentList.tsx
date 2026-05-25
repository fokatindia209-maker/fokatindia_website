import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  CheckCircle,
  XCircle,
  Eye,
  FileText,
  Loader2,
} from "lucide-react";

const API = import.meta.env.VITE_API_URL;

interface Document {
  documentId: number;
  userId: number;
  documentType: string;
  documentUrl: string;
  status: string;
  uploadedAt: string;
  verifiedAt?: string;
}

export default function DocumentList() {
  const [docs, setDocs] = useState<Document[]>([]);
  const [loadingId, setLoadingId] = useState<number | null>(
    null
  );

  // ============================================
  // POPUP STATE
  // ============================================
  const [popup, setPopup] = useState({
    open: false,
    message: "",
    type: "",
  });

  const navigate = useNavigate();

  // ============================================
  // FETCH DOCUMENTS
  // ============================================
  const fetchDocs = async () => {
    try {
      const res = await axios.get(
        `${API}/restful/v1/api/documents`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "token"
            )}`,
          },
        }
      );

      setDocs(res.data.data || []);
    } catch (err) {
      console.error("Error fetching documents", err);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  // ============================================
  // VERIFY DOCUMENT
  // ============================================
  const verifyDocument = async (
    id: number,
    status: "APPROVED" | "REJECTED"
  ) => {
    try {
      setLoadingId(id);

      await axios.put(
        `${API}/restful/v1/api/documents/${id}/verify?status=${status}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "token"
            )}`,
          },
        }
      );

      // UPDATE ONLY SINGLE ROW
      setDocs((prevDocs) =>
        prevDocs.map((doc) =>
          doc.documentId === id
            ? {
                ...doc,
                status,
                verifiedAt:
                  new Date().toISOString(),
              }
            : doc
        )
      );

      // SUCCESS POPUP
      setPopup({
        open: true,
        message:
          status === "APPROVED"
            ? "Document approved successfully"
            : "Document rejected successfully",
        type: status,
      });
    } catch (err) {
      console.error("Verification failed", err);

      // ERROR POPUP
      setPopup({
        open: true,
        message: "Status update failed",
        type: "ERROR",
      });
    } finally {
      setLoadingId(null);

      // AUTO CLOSE POPUP
      setTimeout(() => {
        setPopup({
          open: false,
          message: "",
          type: "",
        });
      }, 2500);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Documents
            </h1>

            <p className="text-gray-500 mt-1">
              Manage and verify uploaded documents
            </p>
          </div>

          {/* UPLOAD BUTTON */}
          <button
            onClick={() =>
              navigate("/kyc/documents/upload")
            }
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2 transition-all"
          >
            <Upload className="w-5 h-5" />
            Upload Document
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-4 text-left">
                    ID
                  </th>

                  <th className="p-4 text-left">
                    User ID
                  </th>

                  <th className="p-4 text-left">
                    Document Type
                  </th>

                  <th className="p-4 text-left">
                    Uploaded At
                  </th>

                  <th className="p-4 text-left">
                    Status
                  </th>

                  <th className="p-4 text-left">
                    Document
                  </th>

                  <th className="p-4 text-left">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {docs.map((doc) => (
                  <tr
                    key={doc.documentId}
                    className="border-t hover:bg-gray-50 transition-all"
                  >
                    {/* ID */}
                    <td className="p-4 font-medium">
                      #{doc.documentId}
                    </td>

                    {/* USER ID */}
                    <td className="p-4">
                      {doc.userId}
                    </td>

                    {/* DOCUMENT TYPE */}
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-blue-500" />

                        {doc.documentType}
                      </div>
                    </td>

                    {/* UPLOADED DATE */}
                    <td className="p-4 text-gray-600">
                      {new Date(
                        doc.uploadedAt
                      ).toLocaleString()}
                    </td>

                    {/* STATUS */}
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                          doc.status === "APPROVED"
                            ? "bg-green-100 text-green-700"
                            : doc.status === "REJECTED"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {doc.status}
                      </span>
                    </td>

                    {/* VIEW DOCUMENT */}
                    <td className="p-4">
                      <a
                        href={doc.documentUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </a>
                    </td>

                    {/* ACTIONS */}
                    <td className="p-4">
                      <div className="flex gap-2">
                        {/* APPROVE */}
                        <button
                          onClick={() =>
                            verifyDocument(
                              doc.documentId,
                              "APPROVED"
                            )
                          }
                          disabled={
                            loadingId ===
                              doc.documentId ||
                            doc.status === "APPROVED"
                          }
                          className="bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-3 py-2 rounded-lg text-xs flex items-center gap-1 transition-all"
                        >
                          {loadingId ===
                            doc.documentId && (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          )}

                          {loadingId !==
                            doc.documentId && (
                            <CheckCircle className="w-4 h-4" />
                          )}

                          {loadingId ===
                          doc.documentId
                            ? "Updating..."
                            : "Approve"}
                        </button>

                        {/* REJECT */}
                        <button
                          onClick={() =>
                            verifyDocument(
                              doc.documentId,
                              "REJECTED"
                            )
                          }
                          disabled={
                            loadingId ===
                              doc.documentId ||
                            doc.status === "REJECTED"
                          }
                          className="bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-3 py-2 rounded-lg text-xs flex items-center gap-1 transition-all"
                        >
                          {loadingId ===
                            doc.documentId && (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          )}

                          {loadingId !==
                            doc.documentId && (
                            <XCircle className="w-4 h-4" />
                          )}

                          {loadingId ===
                          doc.documentId
                            ? "Updating..."
                            : "Reject"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {/* EMPTY STATE */}
                {docs.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="p-10 text-center text-gray-500"
                    >
                      No documents found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* SMOOTH POPUP */}
      {popup.open && (
        <div className="fixed top-6 right-6 z-50 animate-slideIn">
          <div
            className={`min-w-[320px] px-6 py-4 rounded-2xl shadow-2xl text-white font-semibold flex items-center gap-3 ${
              popup.type === "APPROVED"
                ? "bg-green-600"
                : popup.type === "REJECTED"
                ? "bg-red-600"
                : "bg-gray-800"
            }`}
          >
            <div className="bg-white/20 p-2 rounded-full">
              {popup.type === "APPROVED" && (
                <CheckCircle className="w-5 h-5" />
              )}

              {popup.type === "REJECTED" && (
                <XCircle className="w-5 h-5" />
              )}
            </div>

            <div>
              <p className="text-sm font-semibold">
                {popup.message}
              </p>

              <p className="text-xs text-white/80 mt-1">
                Document status updated
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}