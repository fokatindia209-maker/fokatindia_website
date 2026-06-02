import UserLayout from "../components/UserLayout";

export default function Help() {
  return (
    <UserLayout>
      <div className="max-w-2xl mx-auto p-4">
        <div className="bg-white rounded-xl shadow p-5">
          <h1 className="font-bold text-xl">
            Help Center
          </h1>

          <ul className="mt-4 space-y-3">
            <li>How to book a service?</li>
            <li>How to cancel booking?</li>
            <li>How to get refund?</li>
          </ul>
        </div>
      </div>
    </UserLayout>
  );
}