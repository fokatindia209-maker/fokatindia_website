import { useEffect, useState } from "react";
import {
  Bell,
  Lock,
  Globe,
  HelpCircle,
  LogOut,
  ChevronRight,
  Loader2,
  Save,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import PartnerLayout from "../../../components/PartnerLayout";
import { useDispatch } from "react-redux";
import { logout as logoutAction } from "../../../store/slices/authSlice";
import api from "../../../api/axios";

interface UserSettings {
  userId: number;
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  twoFactorAuth: boolean;
  loginAlerts: boolean;
  timezone: string;
  language: string;
}

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        checked ? "bg-blue-600" : "bg-gray-200"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

export default function Settings() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const userId = JSON.parse(localStorage.getItem("user") || "{}").userId;

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const res = await api.get(
          `/restful/v1/api/admin/settings/${userId}`
        );
        setSettings(res.data?.data || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchSettings();
  }, [userId]);

  const toggle = (key: keyof UserSettings) => {
    if (!settings) return;
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const saveSettings = async () => {
    if (!settings) return;
    try {
      setSaving(true);
      await api.put(`/restful/v1/api/admin/settings/${userId}`, {
        emailNotifications: settings.emailNotifications,
        smsNotifications: settings.smsNotifications,
        pushNotifications: settings.pushNotifications,
        twoFactorAuth: settings.twoFactorAuth,
        loginAlerts: settings.loginAlerts,
        timezone: settings.timezone,
        language: settings.language,
      });
      alert("Settings saved");
    } catch (err) {
      console.error(err);
      alert("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const logout = () => {
    dispatch(logoutAction());
    navigate("/login", { replace: true });
  };

  if (loading) {
    return (
      <PartnerLayout role="VENDOR">
        <div className="flex items-center justify-center py-20 gap-2 text-gray-600">
          <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
          Loading settings...
        </div>
      </PartnerLayout>
    );
  }

  return (
    <PartnerLayout role="VENDOR">
      <div className="p-4 md:p-6 max-w-4xl mx-auto">

        <div className="mb-6">
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-gray-500">Manage your account preferences</p>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl shadow p-5 mb-5">
          <div className="flex items-center gap-2 mb-4">
            <Bell size={20} />
            <h2 className="font-semibold">Notifications</h2>
          </div>

          <div className="space-y-4">
            {(
              [
                ["Push Notifications", "pushNotifications"],
                ["Email Notifications", "emailNotifications"],
                ["SMS Notifications", "smsNotifications"],
                ["Login Alerts", "loginAlerts"],
              ] as [string, keyof UserSettings][]
            ).map(([label, key]) => (
              <div key={key} className="flex justify-between items-center">
                <span>{label}</span>
                <Toggle
                  checked={!!(settings?.[key] as boolean)}
                  onChange={() => toggle(key)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-2xl shadow p-5 mb-5">
          <div className="flex items-center gap-2 mb-4">
            <Lock size={20} />
            <h2 className="font-semibold">Security</h2>
          </div>

          <div className="flex justify-between items-center mb-4">
            <span>Two Factor Authentication</span>
            <Toggle
              checked={!!(settings?.twoFactorAuth)}
              onChange={() => toggle("twoFactorAuth")}
            />
          </div>

          <button className="w-full flex justify-between items-center border rounded-lg p-3 hover:bg-gray-50">
            Change Password
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Preferences */}
        <div className="bg-white rounded-2xl shadow p-5 mb-5">
          <div className="flex items-center gap-2 mb-4">
            <Globe size={20} />
            <h2 className="font-semibold">Preferences</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Timezone
              </label>
              <input
                className="w-full border rounded-lg p-3 text-sm"
                value={settings?.timezone || ""}
                onChange={(e) =>
                  setSettings(
                    settings ? { ...settings, timezone: e.target.value } : null
                  )
                }
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Language
              </label>
              <input
                className="w-full border rounded-lg p-3 text-sm"
                value={settings?.language || ""}
                onChange={(e) =>
                  setSettings(
                    settings ? { ...settings, language: e.target.value } : null
                  )
                }
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mb-5">
          <button
            onClick={saveSettings}
            disabled={saving}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl disabled:opacity-50 transition-colors"
          >
            <Save size={16} />
            {saving ? "Saving..." : "Save Settings"}
          </button>
        </div>

        {/* Support */}
        <div className="bg-white rounded-2xl shadow p-5 mb-5">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle size={20} />
            <h2 className="font-semibold">Support</h2>
          </div>

          <button className="w-full flex justify-between items-center border rounded-lg p-3 mb-3 hover:bg-gray-50">
            Help Center
            <ChevronRight size={18} />
          </button>

          <button className="w-full flex justify-between items-center border rounded-lg p-3 mb-3 hover:bg-gray-50">
            Contact Admin
            <ChevronRight size={18} />
          </button>

          <button className="w-full flex justify-between items-center border rounded-lg p-3 hover:bg-gray-50">
            Privacy Policy
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Logout */}
        <div className="bg-white rounded-2xl shadow p-5">
          <button
            onClick={logout}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

      </div>
    </PartnerLayout>
  );
}
