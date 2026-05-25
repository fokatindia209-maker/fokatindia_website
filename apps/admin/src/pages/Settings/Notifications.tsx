// ============================
// Notifications.tsx
// ============================

export default function Notifications() {
  return (
    <div className="max-w-5xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">
        Notification Settings
      </h1>

      <div className="bg-white p-6 rounded-2xl shadow space-y-4">
        <Toggle label="Email Notifications" />
        <Toggle label="SMS Notifications" />
        <Toggle label="Push Notifications" />

        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl mt-4">
          Save Changes
        </button>
      </div>
    </div>
  );
}

function Toggle({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between border-b pb-3">
      <span className="font-medium text-gray-700">
        {label}
      </span>
      <input type="checkbox" className="w-5 h-5" />
    </div>
  );
}