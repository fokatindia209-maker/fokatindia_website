import { useEffect, useState } from "react";
import { Bell, Save } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { getSettings, updateSettings } from "../../services/settingsService";

interface NotifState {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
}

export default function Notifications() {
  const user = useSelector((state: RootState) => state.auth.user);

  const [form, setForm] = useState<NotifState>({
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user?.userId) return;
    getSettings(user.userId)
      .then((data) =>
        setForm({
          emailNotifications: data.emailNotifications,
          smsNotifications: data.smsNotifications,
          pushNotifications: data.pushNotifications,
        })
      )
      .catch(() => toast.error("Failed to load notification settings."))
      .finally(() => setLoading(false));
  }, [user?.userId]);

  async function handleSave() {
    if (!user?.userId) return;
    setSaving(true);
    try {
      await updateSettings(user.userId, form);
      toast.success("Notification settings saved!");
    } catch {
      toast.error("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <SettingsSkeleton title="Notification Settings" />;

  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Notification Settings</h1>
        <p className="text-gray-500 mt-1">Control how you receive alerts and updates</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-2">
        <Toggle
          label="Email Notifications"
          description="Receive booking, payment and system alerts via email"
          icon={<Bell size={18} className="text-blue-500" />}
          checked={form.emailNotifications}
          onChange={(v) => setForm((f) => ({ ...f, emailNotifications: v }))}
        />

        <Toggle
          label="SMS Notifications"
          description="Get text messages for important booking updates"
          icon={<Bell size={18} className="text-green-500" />}
          checked={form.smsNotifications}
          onChange={(v) => setForm((f) => ({ ...f, smsNotifications: v }))}
        />

        <Toggle
          label="Push Notifications"
          description="Browser push alerts for real-time updates"
          icon={<Bell size={18} className="text-purple-500" />}
          checked={form.pushNotifications}
          onChange={(v) => setForm((f) => ({ ...f, pushNotifications: v }))}
        />

        <div className="pt-4">
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

function Toggle({
  label,
  description,
  icon,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  icon: React.ReactNode;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-4 border-b last:border-0">
      <div className="flex items-start gap-3">
        <div className="mt-0.5">{icon}</div>
        <div>
          <p className="font-semibold text-gray-800">{label}</p>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
          checked ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ${
            checked ? "translate-x-7" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

function SettingsSkeleton({ title }: { title: string }) {
  return (
    <div className="max-w-2xl mx-auto py-12 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-64 mb-2" />
      <div className="h-4 bg-gray-100 rounded w-48 mb-8" />
      <div className="bg-white rounded-2xl border border-gray-100 p-8 space-y-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center justify-between border-b pb-4">
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-40" />
              <div className="h-3 bg-gray-100 rounded w-64" />
            </div>
            <div className="w-12 h-6 bg-gray-200 rounded-full" />
          </div>
        ))}
      </div>
      <p className="sr-only">{title}</p>
    </div>
  );
}
