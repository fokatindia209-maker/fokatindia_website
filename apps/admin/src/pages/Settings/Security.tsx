import { useEffect, useState } from "react";
import { Shield, ShieldCheck, Save } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { getSettings, updateSettings } from "../../services/settingsService";

interface SecurityState {
  twoFactorAuth: boolean;
  loginAlerts: boolean;
}

export default function Security() {
  const user = useSelector((state: RootState) => state.auth.user);

  const [form, setForm] = useState<SecurityState>({
    twoFactorAuth: false,
    loginAlerts: true,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user?.userId) return;
    getSettings(user.userId)
      .then((data) =>
        setForm({
          twoFactorAuth: data.twoFactorAuth,
          loginAlerts: data.loginAlerts,
        })
      )
      .catch(() => toast.error("Failed to load security settings."))
      .finally(() => setLoading(false));
  }, [user?.userId]);

  async function handleSave() {
    if (!user?.userId) return;
    setSaving(true);
    try {
      await updateSettings(user.userId, form);
      toast.success("Security settings saved!");
    } catch {
      toast.error("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto py-12 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-56 mb-2" />
        <div className="h-4 bg-gray-100 rounded w-44 mb-8" />
        <div className="bg-white rounded-2xl border p-8 space-y-6">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center justify-between border-b pb-4">
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-48" />
                <div className="h-3 bg-gray-100 rounded w-72" />
              </div>
              <div className="w-12 h-6 bg-gray-200 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Security Settings</h1>
        <p className="text-gray-500 mt-1">Manage your account security preferences</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-2">
        <SecurityToggle
          label="Two-Factor Authentication"
          description="Require a verification code in addition to your password"
          icon={<ShieldCheck size={18} className="text-blue-500" />}
          checked={form.twoFactorAuth}
          onChange={(v) => setForm((f) => ({ ...f, twoFactorAuth: v }))}
          badge={form.twoFactorAuth ? "Enabled" : "Disabled"}
          badgeColor={form.twoFactorAuth ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}
        />

        <SecurityToggle
          label="Login Alerts"
          description="Get notified whenever a new login to your account is detected"
          icon={<Shield size={18} className="text-orange-500" />}
          checked={form.loginAlerts}
          onChange={(v) => setForm((f) => ({ ...f, loginAlerts: v }))}
          badge={form.loginAlerts ? "Active" : "Inactive"}
          badgeColor={form.loginAlerts ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}
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

function SecurityToggle({
  label,
  description,
  icon,
  checked,
  onChange,
  badge,
  badgeColor,
}: {
  label: string;
  description: string;
  icon: React.ReactNode;
  checked: boolean;
  onChange: (v: boolean) => void;
  badge: string;
  badgeColor: string;
}) {
  return (
    <div className="flex items-center justify-between py-4 border-b last:border-0">
      <div className="flex items-start gap-3">
        <div className="mt-0.5">{icon}</div>
        <div>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-gray-800">{label}</p>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${badgeColor}`}>
              {badge}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-0.5">{description}</p>
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
