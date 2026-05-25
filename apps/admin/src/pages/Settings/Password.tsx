// ============================
// Password.tsx
// ============================

export default function Password() {
  return (
    <div className="max-w-5xl mx-auto  py-12">
      <h1 className="text-3xl font-bold mb-6">
        Change Password
      </h1>

      <div className="bg-white p-6 rounded-2xl shadow space-y-4">
        <input
          type="password"
          placeholder="Current Password"
          className="w-full border rounded-xl p-3"
        />

        <input
          type="password"
          placeholder="New Password"
          className="w-full border rounded-xl p-3"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full border rounded-xl p-3"
        />

        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl">
          Update Password
        </button>
      </div>
    </div>
  );
}