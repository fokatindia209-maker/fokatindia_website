import { useEffect, useState } from "react";
import { HardDrive, RefreshCw, CheckCircle, Clock } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { getSettings, triggerBackup } from "../../services/settingsService";

export default function Backup() {
  const user = useSelector((state: RootState) => state.auth.user);

  const [lastBackupAt, setLastBackupAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [backing, setBacking] = useState(false);

  useEffect(() => {
    if (!user?.userId) return;
    getSettings(user.userId)
      .then((data) => setLastBackupAt(data.lastBackupAt))
      .catch(() => toast.error("Failed to load backup info."))
      .finally(() => setLoading(false));
  }, [user?.userId]);

  async function handleBackup() {
    if (!user?.userId) return;
    setBacking(true);
    try {
      const data = await triggerBackup(user.userId);
      setLastBackupAt(data.lastBackupAt);
      toast.success("Backup completed successfully!");
    } catch {
      toast.error("Backup failed. Please try again.");
    } finally {
      setBacking(false);
    }
  }

  function formatDate(iso: string | null) {
    if (!iso) return "Never";
    const d = new Date(iso);
    return d.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Backup & Restore</h1>
        <p className="text-gray-500 mt-1">Manage your system data backups</p>
      </div>

      <div className="space-y-4">
        {/* DATABASE BACKUP */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center justify-between">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
              <HardDrive size={22} className="text-green-600" />
            </div>

            <div>
              <p className="font-semibold text-gray-800">Database Backup</p>
              <div className="flex items-center gap-1.5 mt-1">
                {loading ? (
                  <p className="text-sm text-gray-400">Loading...</p>
                ) : lastBackupAt ? (
                  <>
                    <CheckCircle size={14} className="text-green-500" />
                    <p className="text-sm text-gray-500">
                      Last backup: <span className="font-medium text-gray-700">{formatDate(lastBackupAt)}</span>
                    </p>
                  </>
                ) : (
                  <>
                    <Clock size={14} className="text-orange-400" />
                    <p className="text-sm text-orange-500">No backup recorded yet</p>
                  </>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={handleBackup}
            disabled={backing}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition"
          >
            <RefreshCw size={15} className={backing ? "animate-spin" : ""} />
            {backing ? "Running..." : "Backup Now"}
          </button>
        </div>

        {/* BACKUP HISTORY */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-800 mb-4">Backup Status</h2>

          {lastBackupAt ? (
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
              <CheckCircle size={20} className="text-green-500 shrink-0" />
              <div>
                <p className="text-sm font-medium text-green-800">Last backup successful</p>
                <p className="text-xs text-green-600 mt-0.5">{formatDate(lastBackupAt)}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-xl border border-orange-100">
              <Clock size={20} className="text-orange-400 shrink-0" />
              <div>
                <p className="text-sm font-medium text-orange-800">No backups yet</p>
                <p className="text-xs text-orange-600 mt-0.5">Click "Backup Now" to create your first backup</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
