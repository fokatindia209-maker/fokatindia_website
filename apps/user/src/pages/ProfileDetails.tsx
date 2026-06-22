import UserLayout from "../components/UserLayout";
import { User, Mail, Phone, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../api/axios";

interface UserProfile {
  userId: number;
  name: string;
  email: string;
  phone: string;
  status: string;
}

export default function ProfileDetails() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

const fetchProfile = async () => {
  try {
    const userString = localStorage.getItem("user");

    if (!userString) {
      setLoading(false);
      return;
    }

    const user = JSON.parse(userString);

    const response = await api.get(
      `/users/${user.userId}`
    );

    setProfile(response.data.data);
  } catch (error) {
    console.error("Profile fetch failed:", error);
  } finally {
    setLoading(false);
  }
};

  if (loading) {
    return (
      <UserLayout>
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin" />
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="space-y-6 py-4 px-4">
        <div className="bg-white rounded-xl shadow p-5">

          <h1 className="text-2xl font-bold mb-6">
            Personal Information
          </h1>

          <div className="space-y-4">

            <div className="flex items-center gap-3 border rounded-xl p-4">
              <User className="text-blue-600" size={20} />
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">
                  {profile?.name || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 border rounded-xl p-4">
              <Mail className="text-green-600" size={20} />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">
                  {profile?.email || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 border rounded-xl p-4">
              <Phone className="text-purple-600" size={20} />
              <div>
                <p className="text-sm text-gray-500">Mobile Number</p>
                <p className="font-medium">
                  {profile?.phone || "N/A"}
                </p>
              </div>
            </div>

            <div className="border rounded-xl p-4 bg-gray-50">
              <p className="text-sm text-gray-500">
                Account Status
              </p>

              <span
                className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium ${
                  profile?.status === "ACTIVE"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {profile?.status}
              </span>
            </div>

          </div>
        </div>
      </div>
    </UserLayout>
  );
}