import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  FileText,
  User,
  ArrowLeft,
  Loader2,
} from "lucide-react";
export default function UploadDocument() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userId: "",
    documentType: "",
    file: null as File | null,
  });

  const [loading, setLoading] = useState(false);

  // ============================================
  // HANDLE INPUT CHANGE
  // ============================================
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ============================================
  // HANDLE FILE
  // ============================================
  const handleFile = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      setForm({
        ...form,
        file: e.target.files[0],
      });
    }
  };

  // ============================================
  // HANDLE SUBMIT
  // ============================================
  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      data.append("userId", form.userId);
      data.append(
        "documentType",
        form.documentType
      );

      if (form.file) {
        data.append("file", form.file);
      }

      const res = await api.post(`/restful/v1/api/documents/upload`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(
        res.data.message ||
          "Document uploaded successfully"
      );

      navigate("/documents");
    } catch (error: any) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          "Upload failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-xl">
              <Upload className="w-7 h-7 text-blue-600" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Upload Document
              </h1>

              <p className="text-sm text-gray-500">
                Upload user verification documents
              </p>
            </div>
          </div>

          {/* BACK BUTTON */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* USER ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              User ID
            </label>

            <div className="relative">
              <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />

              <input
                type="number"
                name="userId"
                placeholder="Enter User ID"
                value={form.userId}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* DOCUMENT TYPE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Document Type
            </label>

            <div className="relative">
              <FileText className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />

              <input
                type="text"
                name="documentType"
                placeholder="Police_Verification"
                value={form.documentType}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* FILE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload File
            </label>

            <input
              type="file"
              onChange={handleFile}
              required
              className="w-full border border-gray-300 rounded-xl p-3"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                Upload Document
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}