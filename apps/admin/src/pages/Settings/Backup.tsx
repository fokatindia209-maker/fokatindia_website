// ============================
// Backup.tsx
// ============================

export default function Backup() {
  return (
    <div className="max-w-5xl mx-auto  py-12">
      <h1 className="text-3xl font-bold mb-6">
        Backup & Restore
      </h1>

      <div className="bg-white p-6 rounded-2xl shadow space-y-5">
        <div className="border rounded-xl p-4 flex justify-between items-center">
          <div>
            <p className="font-semibold">
              Database Backup
            </p>
            <p className="text-sm text-gray-500">
              Last backup: Today 10:00 AM
            </p>
          </div>

          <button className="bg-green-600 text-white px-4 py-2 rounded-xl">
            Backup Now
          </button>
        </div>

        <div className="border rounded-xl p-4 flex justify-between items-center">
          <div>
            <p className="font-semibold">
              Restore System
            </p>
            <p className="text-sm text-gray-500">
              Restore from last backup
            </p>
          </div>

          <button className="bg-red-600 text-white px-4 py-2 rounded-xl">
            Restore
          </button>
        </div>
      </div>
    </div>
  );
}