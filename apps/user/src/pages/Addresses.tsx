import UserLayout from "../components/UserLayout";

export default function Addresses() {
  return (
    <UserLayout>
      <div className="max-w-2xl mx-auto p-4">
        <div className="bg-white rounded-xl shadow p-5">
          <h1 className="font-bold text-xl mb-4">
            Saved Addresses
          </h1>

          <div className="border rounded-lg p-4">
            Dubai Silicon Oasis, Dubai UAE
          </div>
        </div>
      </div>
    </UserLayout>
  );
}