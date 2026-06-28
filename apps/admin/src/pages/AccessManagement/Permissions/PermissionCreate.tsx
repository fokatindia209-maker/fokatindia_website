// ============================================
// CreatePermission.tsx
// CENTERED PROFESSIONAL CREATE PERMISSION UI
// ============================================

import { useState } from "react";
import api from "../../../api/axios";
import {
  Shield,
  Save,
  ArrowLeft,
  KeyRound,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function CreatePermission() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  // ============================================
  // HANDLE CHANGE
  // ============================================

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ============================================
  // SUBMIT
  // ============================================

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post(
        `/restful/v1/api/permissions`,
        formData
      );

      console.log(
        "Permission Created:",
        res.data
      );

      alert("Permission Created Successfully");

      navigate("/permissions");
    } catch (error: any) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          "Failed to create permission"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen
        flex
        flex-col
        items-center
        justify-center
        bg-gray-50
        py-12
      "
    >
      {/* ===================================== */}
      {/* HEADER */}
      {/* ===================================== */}

      <div className="w-full max-w-3xl flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Create Permission
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Add new RBAC system permission
          </p>
        </div>

        <button
          onClick={() =>
            navigate("/access/permissions")
          }
          className="
            flex items-center gap-2
            border border-gray-300
            bg-white
            px-4 py-2
            rounded-xl
            hover:bg-gray-100
            transition
          "
        >
          <ArrowLeft size={18} />
          Back
        </button>
      </div>

      {/* ===================================== */}
      {/* FORM CARD */}
      {/* ===================================== */}

      <div
        className="
          bg-white
          rounded-3xl
          shadow-2xl
          w-full
          max-w-3xl
          overflow-hidden
        "
      >
        {/* ================================= */}
        {/* TOP HEADER */}
        {/* ================================= */}

        <div
          className="
            bg-gradient-to-r
            from-blue-600
            to-indigo-700
            p-8
            text-white
          "
        >
          <div className="flex items-center gap-5">
            <div
              className="
                h-16 w-16
                rounded-2xl
                bg-white/20
                flex items-center justify-center
              "
            >
              <Shield size={30} />
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                Permission Details
              </h2>

              <p className="text-sm text-blue-100 mt-1">
                Configure secure role-based access
              </p>
            </div>
          </div>
        </div>

        {/* ================================= */}
        {/* FORM */}
        {/* ================================= */}

        <form
          onSubmit={handleSubmit}
          className="p-8 space-y-6"
        >
          {/* ================================= */}
          {/* PERMISSION NAME */}
          {/* ================================= */}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Permission Name
            </label>

            <div className="relative">
              <KeyRound
                size={18}
                className="
                  absolute left-3 top-3.5
                  text-gray-400
                "
              />

              <input
                type="text"
                name="name"
                placeholder="Example: DOCUMENT_MANAGE"
                value={formData.name}
                onChange={handleChange}
                required
                className="
                  w-full
                  border border-gray-300
                  rounded-xl
                  pl-10 pr-4 py-3
                  outline-none
                  focus:ring-2 focus:ring-blue-500
                "
              />
            </div>

            <p className="text-xs text-gray-500 mt-2">
              Use uppercase letters with underscore
            </p>
          </div>

          {/* ================================= */}
          {/* DESCRIPTION */}
          {/* ================================= */}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>

            <textarea
              name="description"
              rows={4}
              placeholder="Example: Allows manage document"
              value={formData.description}
              onChange={handleChange}
              required
              className="
                w-full
                border border-gray-300
                rounded-xl
                px-4 py-3
                outline-none
                resize-none
                focus:ring-2 focus:ring-blue-500
              "
            />
          </div>

          {/* ================================= */}
          {/* ACTION BUTTONS */}
          {/* ================================= */}

          <div className="flex items-center gap-4 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="
                flex items-center gap-2
                bg-blue-600 hover:bg-blue-700
                text-white
                px-6 py-3
                rounded-xl
                transition
                disabled:opacity-50
              "
            >
              <Save size={18} />

              {loading
                ? "Creating..."
                : "Create Permission"}
            </button>

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/access/permissions"
                )
              }
              className="
                px-6 py-3
                rounded-xl
                border border-gray-300
                hover:bg-gray-100
                transition
              "
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* ===================================== */}
      {/* PREVIEW CARD */}
      {/* ===================================== */}

      <div
        className="
          mt-6
          bg-white
          rounded-3xl
          shadow-xl
          p-6
          w-full
          max-w-3xl
        "
      >
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          Live Preview
        </h3>

        <div
          className="
            inline-flex
            items-center gap-2
            px-4 py-2
            rounded-full
            bg-blue-50
            text-blue-700
            font-medium
          "
        >
          <Shield size={16} />

          {formData.name || "PERMISSION_NAME"}
        </div>

        <p className="mt-4 text-gray-600">
          {formData.description ||
            "Permission description preview"}
        </p>
      </div>
    </div>
  );
}
