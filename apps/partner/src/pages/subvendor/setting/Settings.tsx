import { useState } from "react";
import {
  Bell,
  Lock,
  Globe,
  HelpCircle,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import PartnerLayout from "../../../components/PartnerLayout";

export default function Settings() {
  const navigate = useNavigate();

  const [bookingNotification, setBookingNotification] =
    useState(true);

  const [paymentNotification, setPaymentNotification] =
    useState(true);

  const [reviewNotification, setReviewNotification] =
    useState(true);

  const [darkMode, setDarkMode] = useState(false);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <PartnerLayout>
    <div className="p-4 md:p-6 max-w-4xl mx-auto">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          Settings
        </h1>

        <p className="text-gray-500">
          Manage your account preferences
        </p>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-2xl shadow p-5 mb-5">

        <div className="flex items-center gap-2 mb-4">
          <Bell size={20} />
          <h2 className="font-semibold">
            Notifications
          </h2>
        </div>

        <div className="space-y-4">

          <div className="flex justify-between items-center">
            <span>New Booking Alerts</span>

            <input
              type="checkbox"
              checked={bookingNotification}
              onChange={() =>
                setBookingNotification(
                  !bookingNotification
                )
              }
            />
          </div>

          <div className="flex justify-between items-center">
            <span>Payment Notifications</span>

            <input
              type="checkbox"
              checked={paymentNotification}
              onChange={() =>
                setPaymentNotification(
                  !paymentNotification
                )
              }
            />
          </div>

          <div className="flex justify-between items-center">
            <span>Review Notifications</span>

            <input
              type="checkbox"
              checked={reviewNotification}
              onChange={() =>
                setReviewNotification(
                  !reviewNotification
                )
              }
            />
          </div>

        </div>

      </div>

      {/* Security */}
      <div className="bg-white rounded-2xl shadow p-5 mb-5">

        <div className="flex items-center gap-2 mb-4">
          <Lock size={20} />
          <h2 className="font-semibold">
            Security
          </h2>
        </div>

        <button className="w-full flex justify-between items-center border rounded-lg p-3 mb-3 hover:bg-gray-50">
          Change Password
          <ChevronRight size={18} />
        </button>

        <button className="w-full flex justify-between items-center border rounded-lg p-3 hover:bg-gray-50">
          Two Factor Authentication
          <ChevronRight size={18} />
        </button>

      </div>

      {/* App Preferences */}
      <div className="bg-white rounded-2xl shadow p-5 mb-5">

        <div className="flex items-center gap-2 mb-4">
          <Globe size={20} />
          <h2 className="font-semibold">
            Preferences
          </h2>
        </div>

        <div className="flex justify-between items-center">
          <span>Dark Mode</span>

          <input
            type="checkbox"
            checked={darkMode}
            onChange={() =>
              setDarkMode(!darkMode)
            }
          />
        </div>

      </div>

      {/* Support */}
      <div className="bg-white rounded-2xl shadow p-5 mb-5">

        <div className="flex items-center gap-2 mb-4">
          <HelpCircle size={20} />
          <h2 className="font-semibold">
            Support
          </h2>
        </div>

        <button className="w-full flex justify-between items-center border rounded-lg p-3 mb-3 hover:bg-gray-50">
          Help Center
          <ChevronRight size={18} />
        </button>

        <button className="w-full flex justify-between items-center border rounded-lg p-3 mb-3 hover:bg-gray-50">
          Contact Admin
          <ChevronRight size={18} />
        </button>

        <button className="w-full flex justify-between items-center border rounded-lg p-3 hover:bg-gray-50">
          Privacy Policy
          <ChevronRight size={18} />
        </button>

      </div>

      {/* Logout */}
      <div className="bg-white rounded-2xl shadow p-5">

        <button
          onClick={logout}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl flex items-center justify-center gap-2"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </div>
    </PartnerLayout>
  );
}