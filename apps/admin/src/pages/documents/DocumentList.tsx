import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  CheckCircle,
  XCircle,
  Eye,
  FileText,
  Loader2,
} from "lucide-react";

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
  const [loading, setLoading] = useState(true);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  // Rejection remarks modal state
  const [rejectModal, setRejectModal] = useState<{
    open: boolean;
    docId: number | null;
    remarks: string;
  }>({ open: false, docId: null, remarks: "" });

  const [popup, setPopup] = useState({
    open: false,
    message: "",
    type: "",
  });

  const navigate = useNavigate();

  const fetchDocs = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/restful/v1/api/documents`);

      setDocs(res.data.data || []);
    } catch (err) {
      console.error("Error fetching documents", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const verifyDocument = async (
    id: number,
    status: "APPROVED" | "REJECTED",
    remarks?: string
  ) => {
    try {
      setLoadingId(id);

      const params = new URLSearchParams({ status });
      if (remarks && remarks.trim()) params.set("remarks", remarks.trim());

      await api.put(`/restful/v1/api/documents/${id}/verify?${params.toString()}`, {});

      setDocs((prev) =>
        prev.map((doc) =>
          doc.documentId === id
            ? { ...doc, status, verifiedAt: new Date().toISOString() }
            : doc
        )
      );

      setPopup({
        open: true,
        message:
          status === "APPROVED"
            ? "Document approved successfully"
            : "Document rejected successfully",
        type: status,
      });
    } catch {
      setPopup({ open: true, message: "Status update failed", type: "ERROR" });
    } finally {
      setLoadingId(null);
      setTimeout(() => setPopup({ open: false, message: "", type: "" }), 2500);
    }
  };

  const handleRejectConfirm = async () => {
    if (!rejectModal.docId) return;
    setRejectModal(prev => ({ ...prev, open: false }));
    await verifyDocument(rejectModal.docId, "REJECTED", rejectModal.remarks);
    setRejectModal({ open: false, docId: null, remarks: "" });
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

          <button
            onClick={() => navigate("/kyc/documents/upload")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"
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
                  <th className="p-4 text-left">ID</th>
                  <th className="p-4 text-left">User ID</th>
                  <th className="p-4 text-left">Document Type</th>
                  <th className="p-4 text-left">Uploaded At</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Document</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>

                {/* ✅ LOADER ROW BELOW HEADER */}
                {loading && (
                  <tr>
                    <td colSpan={7} className="p-6">
                      <div className="flex items-center justify-center gap-2 text-blue-600">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Loading documents...
                      </div>
                    </td>
                  </tr>
                )}

                {/* DATA */}
                {!loading &&
                  docs.map((doc) => (
                    <tr
                      key={doc.documentId}
                      className="border-t hover:bg-gray-50"
                    >
                      <td className="p-4 font-medium">
                        #{doc.documentId}
                      </td>

                      <td className="p-4">{doc.userId}</td>

                      <td className="p-4 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-blue-500" />
                        {doc.documentType}
                      </td>

                      <td className="p-4 text-gray-600">
                        {new Date(doc.uploadedAt).toLocaleString()}
                      </td>

                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
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

                      <td className="p-4">
                        <a
                          href={doc.documentUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 underline flex items-center gap-1"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </a>
                      </td>

                      <td className="p-4 flex gap-2">

                        <button
                          onClick={() =>
                            verifyDocument(doc.documentId, "APPROVED")
                          }
                          disabled={
                            loadingId === doc.documentId ||
                            doc.status === "APPROVED"
                          }
                          className="bg-green-600 text-white px-3 py-2 rounded-lg text-xs flex items-center gap-1 disabled:opacity-50"
                        >
                          {loadingId === doc.documentId ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <CheckCircle className="w-4 h-4" />
                          )}
                          Approve
                        </button>

                        <button
                          onClick={() =>
                            setRejectModal({ open: true, docId: doc.documentId, remarks: "" })
                          }
                          disabled={
                            loadingId === doc.documentId ||
                            doc.status === "REJECTED"
                          }
                          className="bg-red-600 text-white px-3 py-2 rounded-lg text-xs flex items-center gap-1 disabled:opacity-50"
                        >
                          {loadingId === doc.documentId ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <XCircle className="w-4 h-4" />
                          )}
                          Reject
                        </button>

                      </td>
                    </tr>
                  ))}

                {/* EMPTY STATE */}
                {!loading && docs.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-10 text-center text-gray-500">
                      No documents found
                    </td>
                  </tr>
                )}

              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* POPUP */}
      {popup.open && (
        <div className="fixed top-6 right-6 z-50">
          <div className="bg-gray-800 text-white px-6 py-4 rounded-2xl shadow-xl">
            {popup.message}
          </div>
        </div>
      )}

      {/* REJECT MODAL */}
      {rejectModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Reject Document</h3>
            <p className="text-sm text-gray-500 mb-4">
              Provide a reason for rejection. The vendor/sub-vendor will see this message when they log in.
            </p>
            <textarea
              className="w-full border rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-red-400"
              rows={3}
              placeholder="Enter rejection reason (optional)"
              value={rejectModal.remarks}
              onChange={e => setRejectModal(prev => ({ ...prev, remarks: e.target.value }))}
            />
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setRejectModal({ open: false, docId: null, remarks: "" })}
                className="px-4 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleRejectConfirm}
                className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                Confirm Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}