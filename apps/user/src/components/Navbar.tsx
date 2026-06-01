import {
  Phone,
  Home,
  Grid3X3,
  History,
  Bell,
  User,
} from "lucide-react";

import { NavLink } from "react-router-dom";

export default function Navbar() {

  const menus = [
    { title: "Home", icon: Home, path: "/dashboard" },
    { title: "Categories", icon: Grid3X3, path: "/categories" },
    { title: "Order", icon: History, path: "/order_history" },
    { title: "Notifications", icon: Bell, path: "/notifications" },
    // { title: "Services", icon: Grid3X3, path: "/service" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b shadow-sm flex items-center justify-between px-4 md:px-16 z-50">

      {/* ================= LEFT LOGO ================= */}
      {/* <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg" />
        <span className="text-lg font-bold text-blue-600">
          FokatIndia
        </span>
      </div> */}
      <NavLink to="/dashboard" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg" />
        <span className="text-lg font-bold text-blue-600">
          FokatIndia
        </span>
      </NavLink>

      {/* ================= CENTER MENU (DESKTOP) ================= */}
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
              {item.title}
            </NavLink>
          );
        })}
      </div>

      {/* ================= RIGHT ACTIONS ================= */}
      <div className="flex items-center gap-3">

        {/* PROFILE */}
        <NavLink
          to="/profile"
          className="hidden md:flex items-center gap-2 text-gray-600 hover:text-blue-600"
        >
          <User size={18} />
        </NavLink>

        {/* CALL BUTTON */}
        <a
          href="tel:+971000000000"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition"
        >
          <Phone size={16} />
          Call Us
        </a>

      </div>

    </div>
  );
}