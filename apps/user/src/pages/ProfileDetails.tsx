import UserLayout from "../components/UserLayout";
import { User, Mail, Phone } from "lucide-react";

export default function ProfileDetails() {
  return (
    <UserLayout>
      <div className="max-w-2xl mx-auto p-4">
        <div className="bg-white rounded-xl shadow p-5 space-y-4">

          <h1 className="text-xl font-bold">
            Personal Information
          </h1>

          <div className="flex items-center gap-3 border p-3 rounded-lg">
            <User size={18} />
            <span>John Doe</span>
          </div>

          <div className="flex items-center gap-3 border p-3 rounded-lg">
            <Mail size={18} />
            <span>john@example.com</span>
          </div>

          <div className="flex items-center gap-3 border p-3 rounded-lg">
            <Phone size={18} />
            <span>+971000000000</span>
          </div>

        </div>
      </div>
    </UserLayout>
  );
}