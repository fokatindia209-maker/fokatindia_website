import { useEffect, useState } from "react";
import { Globe, Save } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { getSettings, updateSettings } from "../../services/settingsService";

const TIMEZONES = [
  "Asia/Kolkata",
  "Asia/Dubai",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Europe/London",
  "Europe/Paris",
  "America/New_York",
  "America/Los_Angeles",
  "UTC",
];

const LANGUAGES = ["English", "Hindi", "Arabic", "French", "Spanish"];

interface SystemState {
  timezone: string;
  language: string;
}

export default function System() {
  const user = useSelector((state: RootState) => state.auth.user);

  const [form, setForm] = useState<SystemState>({
    timezone: "Asia/Kolkata",
    language: "English",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user?.userId) return;
    getSettings(user.userId)
      .then((data) =>
        setForm({
          timezone: data.timezone,
          language: data.language,
        })
      )
      .catch(() => toast.error("Failed to load system settings."))
      .finally(() => setLoading(false));
  }, [user?.userId]);

  async function handleSave() {
    if (!user?.userId) return;
    setSaving(true);
    try {
      await updateSettings(user.userId, form);
      toast.success("System settings saved!");
    } catch {
      toast.error("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto py-12 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-48 mb-2" />
        <div className="h-4 bg-gray-100 rounded w-40 mb-8" />
        <div className="bg-white rounded-2xl border p-8 space-y-6">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-32" />
              <div className="h-12 bg-gray-100 rounded-2xl" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">System Settings</h1>
        <p className="text-gray-500 mt-1">Configure regional and display preferences</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">

        {/* TIMEZONE */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Globe size={14} className="inline mr-1.5 text-blue-500" />
            Time Zone
          </label>
          <select
            value={form.timezone}
            onChange={(e) => setForm((f) => ({ ...f, timezone: e.target.value }))}
            className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition"
          >
            {TIMEZONES.map((tz) => (
              <option key={tz} value={tz}>{tz}</option>
            ))}
          </select>
        </div>

        {/* LANGUAGE */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Language
          </label>
          <select
            value={form.language}
            onChange={(e) => setForm((f) => ({ ...f, language: e.target.value }))}
            className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>

        <div className="pt-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white px-8 py-3 rounded-2xl shadow-md transition"
          >
            <Save size={16} />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
