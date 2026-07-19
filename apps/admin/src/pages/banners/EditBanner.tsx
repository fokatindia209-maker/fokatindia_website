import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  Image,
  Save,
  ArrowLeft,
  Loader2,
  UploadCloud,
} from "lucide-react";

const BANNER_TYPES = ["HOME", "CATEGORY", "SERVICE", "OFFER", "GENERAL"];

// Backend stores/compares timestamps as server-local (UTC) LocalDateTime,
// while datetime-local inputs work in the browser's local timezone.

// UTC "YYYY-MM-DDTHH:mm:ss" (from the backend) -> local "YYYY-MM-DDTHH:mm" (for the input)
const utcToLocalInput = (utcValue?: string) => {
  if (!utcValue) return "";
  const date = new Date(utcValue.endsWith("Z") ? utcValue : `${utcValue}Z`);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

// local "YYYY-MM-DDTHH:mm" (from the input) -> UTC "YYYY-MM-DDTHH:mm:ss" (for the backend)
const localInputToUtc = (localValue: string) => {
  if (!localValue) return "";
  return new Date(localValue).toISOString().slice(0, 19);
};

interface Banner {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  redirectUrl?: string;
  bannerType?: string;
  displayOrder?: number;
  active?: boolean;
  startDate?: string;
  endDate?: string;
}

export default function EditBanner() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [file, setFile] = useState<File | null>(null);

  const [form, setForm] = useState<Banner>({
    id: 0,
    title: "",
    description: "",
    imageUrl: "",
    redirectUrl: "",
    bannerType: "HOME",
    displayOrder: 0,
    active: true,
    startDate: "",
    endDate: "",
  });

  // ============================================
  // FETCH BANNER
  // ============================================
  useEffect(() => {
    const fetchBanner = async () => {
      try {
        setFetching(true);

        const res = await api.get(`/restful/v1/api/banners/${id}`);

        const data = res.data.data || res.data;

        setForm({
          ...data,
          startDate: utcToLocalInput(data.startDate),
          endDate: utcToLocalInput(data.endDate),
        });
      } catch (err) {
        console.error("Error fetching banner", err);
      } finally {
        setFetching(false);
      }
    };

    fetchBanner();
  }, [id]);

  // ============================================
  // UPDATE BANNER
  // ============================================
  const handleUpdate = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description ?? "");
      formData.append("redirectUrl", form.redirectUrl ?? "");
      formData.append("bannerType", form.bannerType ?? "HOME");
      formData.append("displayOrder", String(form.displayOrder ?? 0));
      formData.append("active", form.active ? "true" : "false");
      formData.append("startDate", localInputToUtc(form.startDate ?? ""));
      formData.append("endDate", localInputToUtc(form.endDate ?? ""));

      if (file) formData.append("image", file);

      await api.post(`/restful/v1/api/banners/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Banner updated successfully");
      navigate("/banners");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="py-20 flex justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="py-12 px-4 bg-gray-100 min-h-screen">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate("/banners")}
        className="flex items-center gap-2 text-gray-600 hover:text-black mb-6"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      {/* CARD */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Image size={24} />
            </div>

            <div>
              <h2 className="text-xl font-bold">
                Edit Banner
              </h2>
              <p className="text-sm text-purple-100">
                Update banner details
              </p>
            </div>
          </div>
        </div>

        {/* FORM */}
        <div className="p-6 grid grid-cols-2 gap-4">

          {/* TITLE */}
          <input
            placeholder="Banner Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            className="border p-3 rounded-xl col-span-2"
          />

          {/* REDIRECT URL */}
          <input
            placeholder="Redirect URL"
            value={form.redirectUrl}
            onChange={(e) =>
              setForm({ ...form, redirectUrl: e.target.value })
            }
            className="border p-3 rounded-xl col-span-2"
          />

          {/* BANNER TYPE */}
          <select
            value={form.bannerType}
            onChange={(e) =>
              setForm({ ...form, bannerType: e.target.value })
            }
            className="border p-3 rounded-xl"
          >
            {BANNER_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          {/* DISPLAY ORDER */}
          <input
            placeholder="Display Order"
            type="number"
            value={form.displayOrder}
            onChange={(e) =>
              setForm({
                ...form,
                displayOrder: Number(e.target.value),
              })
            }
            className="border p-3 rounded-xl"
          />

          {/* START DATE */}
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Start Date</label>
            <input
              type="datetime-local"
              value={form.startDate}
              onChange={(e) =>
                setForm({ ...form, startDate: e.target.value })
              }
              className="w-full border p-3 rounded-xl"
            />
          </div>

          {/* END DATE */}
          <div>
            <label className="text-xs text-gray-500 mb-1 block">End Date</label>
            <input
              type="datetime-local"
              value={form.endDate}
              onChange={(e) =>
                setForm({ ...form, endDate: e.target.value })
              }
              className="w-full border p-3 rounded-xl"
            />
          </div>

          {/* ACTIVE */}
          <select
            value={form.active ? "true" : "false"}
            onChange={(e) =>
              setForm({
                ...form,
                active: e.target.value === "true",
              })
            }
            className="border p-3 rounded-xl col-span-2"
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>

          {/* DESCRIPTION */}
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
            className="border p-3 rounded-xl col-span-2"
          />

          {/* IMAGE */}
          <div className="col-span-2 border-2 border-dashed border-gray-300 rounded-xl p-4 text-center bg-gray-50">
            {form.imageUrl && !file && (
              <img
                src={form.imageUrl}
                className="w-32 h-32 object-cover rounded-xl mx-auto border mb-3"
              />
            )}

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="hidden"
              id="editFileInput"
            />

            <label htmlFor="editFileInput" className="cursor-pointer flex flex-col items-center gap-1">
              <UploadCloud className="text-blue-500 w-8 h-8" />
              <span className="text-sm font-medium">
                {form.imageUrl ? "Click to replace image" : "Click to upload image"}
              </span>
            </label>

            {file && (
              <div className="mt-3">
                <img
                  src={URL.createObjectURL(file)}
                  className="w-32 h-32 object-cover rounded-xl mx-auto border"
                />
                <p className="text-xs mt-2 text-gray-500">{file.name}</p>
              </div>
            )}
          </div>

          {/* BUTTON */}
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="col-span-2 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Update Banner
              </>
            )}
          </button>

        </div>
      </div>
    </div>
  );
}
