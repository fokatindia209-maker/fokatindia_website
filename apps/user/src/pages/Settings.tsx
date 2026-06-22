import UserLayout from "../components/UserLayout";
import {
  User,
  MapPin,
  Shield,
  FileText,
  Globe,
  HelpCircle,
  Phone,
  LogOut,
  ChevronRight,
  Share2,
  Info,
  LogIn,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface User {
  name: string;
  email: string;
  phone: string;
}

export default function Settings() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
  const userString = localStorage.getItem("user");

  setIsLoggedIn(!!token);

  if (userString) {
    try {
      setUser(JSON.parse(userString));
    } catch (e) {
      console.error("Invalid user in localStorage");
      setUser(null);
    }
  }
  }, []);


  const menuSections = [
    {
      title: "My Account",
      items: [
        {
          icon: User,
          label: "Personal Information",
          path: "/profile/details",
        },
        {
          icon: MapPin,
          label: "Saved Addresses",
          path: "/addresses",
        },
      ],
    },

    {
      title: "Support",
      items: [
        {
          icon: HelpCircle,
          label: "Help Center",
          path: "/help",
        },
        {
          icon: Phone,
          label: "Contact Us",
          path: "/contact-us",
        },
      ],
    },

    {
      title: "Legal",
      items: [
        {
          icon: Shield,
          label: "Privacy Policy",
          path: "/privacy-policy",
        },
        {
          icon: FileText,
          label: "Terms & Conditions",
          path: "/terms-conditions",
        },
        {
          icon: FileText,
          label: "Refund Policy",
          path: "/refund-policy",
        },
        {
          icon: FileText,
          label: "Cancellation Policy",
          path: "/cancellation-policy",
        },
      ],
    },

    {
      title: "App Settings",
      items: [
        {
          icon: Globe,
          label: "Language",
          path: "/language",
        },
      ],
    },

    {
      title: "Other",
      items: [
        {
          icon: Info,
          label: "About Us",
          path: "/about-us",
        },
        {
          icon: Share2,
          label: "Share App",
          path: "/share-app",
        },
      ],
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);

    navigate("/login");
  };

  return (
    <UserLayout>
      <div className="space-y-6 py-4 px-4">
        {/* PROFILE */}
        {isLoggedIn && (
          <div className="bg-white rounded-2xl shadow p-5">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
                {user?.name.charAt(0)}
              </div>

              <div>
                <h2 className="font-bold text-lg">{user?.name}</h2>

                <p className="text-gray-500 text-sm">{user?.email}</p>

                <p className="text-gray-500 text-sm">{user?.phone}</p>
              </div>
            </div>
          </div>
        )}

        {/* STATS */}
        {/* {isLoggedIn && (
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white rounded-xl shadow p-4 text-center">
              <h3 className="text-xl font-bold text-blue-600">
                {stats.bookings}
              </h3>
              <p className="text-sm text-gray-500">Bookings</p>
            </div>

            <div className="bg-white rounded-xl shadow p-4 text-center">
              <h3 className="text-xl font-bold text-green-600">
                {stats.completed}
              </h3>
              <p className="text-sm text-gray-500">Completed</p>
            </div>

            <div className="bg-white rounded-xl shadow p-4 text-center">
              <h3 className="text-xl font-bold text-yellow-500">
                {stats.reviews}
              </h3>
              <p className="text-sm text-gray-500">Reviews</p>
            </div>
          </div>
        )} */}

        {/* MENU */}
        {menuSections.map((section) => (
          <div
            key={section.title}
            className="bg-white rounded-xl shadow overflow-hidden"
          >
            <div className="px-4 py-3 bg-gray-50 font-semibold text-gray-700">
              {section.title}
            </div>

            {section.items.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.label}
                  onClick={() => navigate(item.path)}
                  className="w-full flex items-center justify-between px-4 py-4 border-b last:border-b-0 hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </div>

                  <ChevronRight size={18} />
                </button>
              );
            })}
          </div>
        ))}

        {/* LOGIN / LOGOUT */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-4 text-red-600 hover:bg-red-50"
            >
              <LogOut size={18} />
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="w-full flex items-center gap-3 px-4 py-4 text-blue-600 hover:bg-blue-50"
            >
              <LogIn size={18} />
              Login
            </button>
          )}
        </div>
      </div>
    </UserLayout>
  );
}
