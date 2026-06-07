import {
  Phone,
  Home,
  Grid3X3,
  History,
  Bell,
  ArrowLeft,
  Settings,
} from "lucide-react";
import logo from "../assets/logo.png"
import { NavLink, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isDashboard = location.pathname === "/dashboard";

  const menus = [
    { title: "Home", icon: Home, path: "/dashboard" },
    { title: "Categories", icon: Grid3X3, path: "/categories" },
    { title: "Order History", icon: History, path: "/order_history" },
    { title: "Notifications", icon: Bell, path: "/notifications" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b shadow-sm flex items-center justify-between px-4 md:px-16 z-50">

      {/* LEFT SIDE */}
      <div className="flex items-center gap-0">

        {/* Mobile & Tablet Only Back Button */}
        {!isDashboard && (
          <button
            onClick={() => navigate(-1)}
            className="md:hidden p-2 rounded-full hover:bg-gray-100 transition"
          >
            <ArrowLeft size={22} />
          </button>
        )}

     

        <NavLink
          to="/dashboard"
          className="flex items-center"
        >
          <img
            src={logo}
            alt="FokatIndia"
            className="mt-3 h-16 w-auto object-contain"
          />

          <span className="text-lg font-bold text-blue-600">
            FokatIndia
          </span>
        </NavLink>

      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
        {menus.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-2 transition ${isActive
                  ? "text-blue-600"
                  : "hover:text-blue-600"
                }`
              }
            >
              <Icon size={16} />
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-3">

        {/* Settings - Desktop Only */}
        <NavLink
          to="/settings"
          className="hidden md:flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
        >
          <Settings size={18} />
        </NavLink>

        {/* Call Button */}
        <a
          href="tel:+971000000000"
          className="flex items-center gap-2 bg-blue-600 text-white px-3 md:px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition"
        >
          <Phone size={16} />

          <span className="hidden sm:block">
            Call Us
          </span>
        </a>

      </div>

    </div>
  );
}