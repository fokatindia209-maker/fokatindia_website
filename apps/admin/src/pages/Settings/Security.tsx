// ============================
// Security.tsx
// ============================

export default function Security() {
  return (
    <div className="max-w-5xl mx-auto  py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Security Settings
      </h1>

      <div className="bg-white rounded-2xl p-6 shadow space-y-5">
        <div>
          <label className="text-sm font-semibold text-gray-600">
            Two Factor Authentication
          </label>
          <select className="w-full mt-2 border rounded-xl p-3">
            <option>Enabled</option>
            <option>Disabled</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-600">
            Login Alerts
          </label>
          <select className="w-full mt-2 border rounded-xl p-3">
            <option>Enabled</option>
            <option>Disabled</option>
          </select>
        </div>

        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl">
          Save Changes
        </button>
      </div>
    </div>
  );
}