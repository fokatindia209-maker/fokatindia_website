// ============================
// System.tsx
// ============================

export default function System() {
  return (
    <div className="max-w-5xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">
        System Settings
      </h1>

      <div className="bg-white p-6 rounded-2xl shadow space-y-5">
        <div>
          <label className="text-sm font-semibold">
            Time Zone
          </label>
          <select className="w-full mt-2 border rounded-xl p-3">
            <option>Asia/Dubai</option>
            <option>Asia/Kolkata</option>
            <option>UTC</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-semibold">
            Language
          </label>
          <select className="w-full mt-2 border rounded-xl p-3">
            <option>English</option>
            <option>Hindi</option>
          </select>
        </div>

        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl">
          Save Changes
        </button>
      </div>
    </div>
  );
}