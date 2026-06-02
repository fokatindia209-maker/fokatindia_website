import UserLayout from "../components/UserLayout";

export default function ContactUs() {
  return (
    <UserLayout>
      <div className="max-w-2xl mx-auto p-4">
        <div className="bg-white rounded-xl shadow p-5">
          <h1 className="font-bold text-xl">
            Contact Us
          </h1>

          <p className="mt-4">
            Email: support@fokatindia.com
          </p>

          <p>
            Phone: +971000000000
          </p>
        </div>
      </div>
    </UserLayout>
  );
}