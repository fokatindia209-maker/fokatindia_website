import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import {
  Image,
  ArrowLeft,
  Loader2,
  UploadCloud
} from "lucide-react";

const BANNER_TYPES = ["HOME", "CATEGORY", "SERVICE", "OFFER", "GENERAL"];

// Converts a datetime-local value (interpreted in the browser's local
// timezone) into a UTC "YYYY-MM-DDTHH:mm:ss" string, since the backend
// stores/compares timestamps as server-local (UTC) LocalDateTime.
const localInputToUtc = (localValue: string) => {
  if (!localValue) return "";
  return new Date(localValue).toISOString().slice(0, 19);
};

export default function CreateBanner() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    redirectUrl: "",
    bannerType: "HOME",
    displayOrder: 1,
    active: true,
    startDate: "",
    endDate: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a banner image");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append("title", form.title);
      data.append("description", form.description);
      data.append("redirectUrl", form.redirectUrl);
      data.append("bannerType", form.bannerType);
      data.append("displayOrder", String(form.displayOrder));
      data.append("active", String(form.active));
      data.append("startDate", localInputToUtc(form.startDate));
      data.append("endDate", localInputToUtc(form.endDate));
      data.append("image", file);

      const res = await api.post(`/restful/v1/api/banners/create`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(res.data.message);
      navigate("/banners");
    } catch (err: any) {
      alert(err?.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center py-12">

      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Image /> Create Banner
            </h1>
            <p className="text-sm opacity-80">
              Add a new promotional banner
            </p>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="bg-white/20 hover:bg-white/30 p-2 rounded-lg"
          >
            <ArrowLeft />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          {/* TITLE */}
          <input
            name="title"
            placeholder="Banner Title"
            value={form.title}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />

          {/* DESCRIPTION */}
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl min-h-[100px] focus:ring-2 focus:ring-blue-400 outline-none"
          />

          {/* REDIRECT URL */}
          <input
            name="redirectUrl"
            placeholder="Redirect URL (e.g. /services/home-cleaning)"
            value={form.redirectUrl}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
          />

          {/* TYPE + ORDER */}
          <div className="grid grid-cols-2 gap-4">
            <select
              name="bannerType"
              value={form.bannerType}
              onChange={handleChange}
              className="border p-3 rounded-xl"
            >
              {BANNER_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

            <input
              type="number"
              name="displayOrder"
              placeholder="Display Order"
              value={form.displayOrder}
              onChange={handleChange}
              className="border p-3 rounded-xl"
            />
          </div>

          {/* START + END DATE */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Start Date</label>
              <input
                type="datetime-local"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                className="w-full border p-3 rounded-xl"
                required
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1 block">End Date</label>
              <input
                type="datetime-local"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                className="w-full border p-3 rounded-xl"
                required
              />
            </div>
          </div>

          {/* ACTIVE */}
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              name="active"
              checked={form.active}
              onChange={handleChange}
            />
            Active
          </label>

          {/* FILE UPLOAD DROPZONE */}
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer">

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFile(e.target.files?.[0] || null)
              }
              className="hidden"
              id="fileInput"
              required
            />

            <label htmlFor="fileInput" className="cursor-pointer">
              <UploadCloud className="mx-auto text-blue-500 w-10 h-10" />
              <p className="mt-2 font-medium">
                Click to upload banner image
              </p>
              <p className="text-xs text-gray-500">
                PNG, JPG, JPEG
              </p>
            </label>

            {/* PREVIEW */}
            {file && (
              <div className="mt-4">
                <img
                  src={URL.createObjectURL(file)}
                  className="w-full max-w-md h-32 object-cover rounded-xl mx-auto border"
                />
                <p className="text-xs mt-2 text-gray-500">
                  {file.name}
                </p>
              </div>
            )}
          </div>

          {/* SUBMIT */}
          <button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl flex justify-center gap-2 font-semibold"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Image />
                Create Banner
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
