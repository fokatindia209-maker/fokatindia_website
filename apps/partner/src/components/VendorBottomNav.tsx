import {
  Home,
  CalendarCheck,
  Briefcase,
  DollarSign,
  Grid3X3,
} from "lucide-react";

import { NavLink } from "react-router-dom";

export default function VendorBottomNav() {
  const menus = [
    {
      title: "Home",
      icon: Home,
      path: "/vendor/dashboard",
    },
    {
      title: "Bookings",
      icon: CalendarCheck,
      path: "/vendor/bookings",
    },
    {
      title: "Services",
      icon: Briefcase,
      path: "/vendor/services",
    },
    {
      title: "Earnings",
      icon: DollarSign,
      path: "/vendor/earnings",
    },
    {
      title: "More",
      icon: Grid3X3,
      path: "/vendor/more",
    },
  ];

  return (
    <div
      className="
      fixed bottom-0 left-0 right-0
      bg-white border-t shadow-lg
      flex justify-around items-center
      h-16 z-[9999]
      lg:hidden
      pb-[env(safe-area-inset-bottom)]
    "
    >
      {menus.map((item) => {
        const Icon = item.icon;

        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center text-xs transition ${
                isActive
                  ? "text-blue-600"
                  : "text-gray-500"
              }`
            }
          >
            <Icon size={22} />
            <span>{item.title}</span>
          </NavLink>
        );
      })}
    </div>
  );
}