import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { changePassword } from "../../services/settingsService";

export default function Password() {
  const user = useSelector((state: RootState) => state.auth.user);

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [show, setShow] = useState({
    current: false,
    newPw: false,
    confirm: false,
  });

  const [saving, setSaving] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
      toast.error("All fields are required.");
      return;
    }

    if (form.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters.");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    if (!user?.userId) {
      toast.error("User not found. Please log in again.");
      return;
    }

    setSaving(true);
    try {
      await changePassword({
        userId: user.userId,
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });
      toast.success("Password changed successfully!");
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to change password.";
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Change Password</h1>
        <p className="text-gray-500 mt-1">Update your account password</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <form onSubmit={handleSubmit} className="space-y-5">

          <PasswordField
            label="Current Password"
            name="currentPassword"
            value={form.currentPassword}
            visible={show.current}
            onToggle={() => setShow((s) => ({ ...s, current: !s.current }))}
            onChange={handleChange}
          />

          <PasswordField
            label="New Password"
            name="newPassword"
            value={form.newPassword}
            visible={show.newPw}
            onToggle={() => setShow((s) => ({ ...s, newPw: !s.newPw }))}
            onChange={handleChange}
          />

          <PasswordField
            label="Confirm New Password"
            name="confirmPassword"
            value={form.confirmPassword}
            visible={show.confirm}
            onToggle={() => setShow((s) => ({ ...s, confirm: !s.confirm }))}
            onChange={handleChange}
          />

          {/* STRENGTH HINT */}
          {form.newPassword && (
            <p className={`text-sm ${form.newPassword.length >= 8 ? "text-green-600" : "text-orange-500"}`}>
              {form.newPassword.length >= 8
                ? "Strong password"
                : `${8 - form.newPassword.length} more characters for a strong password`}
            </p>
          )}

          <div className="pt-2 flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white px-8 py-3 rounded-2xl shadow-md transition"
            >
              <Lock size={16} />
              {saving ? "Updating..." : "Update Password"}
            </button>

            <button
              type="button"
              onClick={() => setForm({ currentPassword: "", newPassword: "", confirmPassword: "" })}
              className="px-8 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface PasswordFieldProps {
  label: string;
  name: string;
  value: string;
  visible: boolean;
  onToggle: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function PasswordField({ label, name, value, visible, onToggle, onChange }: PasswordFieldProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      <div className="relative">
        <input
          type={visible ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full border border-gray-300 rounded-2xl px-4 py-3 pr-12 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition"
          placeholder={label}
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}
