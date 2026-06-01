import UserLayout from "../components/UserLayout";
import { User, Phone, Mail, MapPin, Settings, LogOut } from "lucide-react";
import { useState } from "react";

export default function Profile() {
  const [name, setName] = useState("John Doe");
  const [phone, setPhone] = useState("+971 000 000 000");
  const [email, setEmail] = useState("john@example.com");
  const [address, setAddress] = useState("Dubai, UAE");

  const stats = {
    bookings: 12,
    reviews: 5,
    completed: 10,
  };

  const handleSave = () => {
    alert("Profile Updated ✅");
  };

  const handleLogout = () => {
    alert("Logged out");
  };

  return (
    <UserLayout>
      <div className="max-w-2xl mx-auto space-y-6">

        {/* HEADER */}
        <h1 className="text-2xl font-bold">
          My Profile
        </h1>

        {/* PROFILE CARD */}
        <div className="bg-white p-5 rounded-xl shadow space-y-4">

          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-blue-600 text-white flex items-center justify-center rounded-full text-xl font-bold">
              {name.charAt(0)}
            </div>

            <div>
              <h2 className="font-semibold text-lg">
                {name}
              </h2>
              <p className="text-gray-500 text-sm">
                User Account
              </p>
            </div>
          </div>

          {/* INPUTS */}
          <div className="space-y-3">

            <div className="flex items-center gap-2 border p-2 rounded-xl">
              <User size={16} />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full outline-none"
                placeholder="Name"
              />
            </div>

            <div className="flex items-center gap-2 border p-2 rounded-xl">
              <Phone size={16} />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full outline-none"
                placeholder="Phone"
              />
            </div>

            <div className="flex items-center gap-2 border p-2 rounded-xl">
              <Mail size={16} />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full outline-none"
                placeholder="Email"
              />
            </div>

            <div className="flex items-center gap-2 border p-2 rounded-xl">
              <MapPin size={16} />
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full outline-none"
                placeholder="Address"
              />
            </div>

          </div>

          {/* SAVE BUTTON */}
          <button
            onClick={handleSave}
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
          >
            Save Profile
          </button>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-3">

          <div className="bg-white p-4 rounded-xl shadow text-center">
            <h3 className="text-xl font-bold text-blue-600">
              {stats.bookings}
            </h3>
            <p className="text-sm text-gray-500">
              Bookings
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow text-center">
            <h3 className="text-xl font-bold text-green-600">
              {stats.completed}
            </h3>
            <p className="text-sm text-gray-500">
              Completed
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow text-center">
            <h3 className="text-xl font-bold text-yellow-500">
              {stats.reviews}
            </h3>
            <p className="text-sm text-gray-500">
              Reviews
            </p>
          </div>

        </div>

        {/* SETTINGS */}
        <div className="bg-white rounded-xl shadow divide-y">

          <button className="flex items-center gap-3 p-4 w-full text-left hover:bg-gray-50">
            <Settings size={18} />
            Settings
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 p-4 w-full text-left text-red-600 hover:bg-red-50"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

      </div>
    </UserLayout>
  );
}