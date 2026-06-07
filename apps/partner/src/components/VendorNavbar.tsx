import {
  Home,
  CalendarCheck,
  DollarSign,
  Phone,
  ArrowLeft,
  Briefcase,
  Grid3X3,
} from "lucide-react";

import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function VendorNavbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const pathname = location.pathname;

  // Main pages (No Back Button)
  const mainPages = [
    "/vendor/dashboard",
    "/vendor/bookings",
    "/vendor/services",
    "/vendor/earnings",
    "/vendor/more",
  ];

  const showBackButton = !mainPages.includes(pathname);

  // Page Titles
  const pageTitles: Record<string, string> = {
    "/vendor/dashboard": "Dashboard",
    "/vendor/bookings": "Bookings",
    "/vendor/services": "Services",
    "/vendor/earnings": "Earnings",
    "/vendor/more": "More",

    "/vendor/profile": "Profile",
    "/vendor/settings": "Settings",
    "/vendor/categories": "Categories",
    "/vendor/reviews": "Reviews",
    "/vendor/reports": "Reports",
    "/vendor/notifications": "Notifications",
    "/vendor/subvendors": "Sub Vendors",
  };

  const pageTitle =
    pageTitles[pathname] ||
    pathname
      .split("/")
      .pop()
      ?.replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase()) ||
    "";

  const menus = [
    {
      title: "Dashboard",
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
  ];

  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b shadow-sm flex items-center justify-between px-4 md:px-8 z-50">
      {/* LEFT */}
      <div className="flex items-center gap-2 min-w-[220px]">
        {showBackButton ? (
          <>
            {/* Back Button + Title */}
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full hover:bg-gray-100 transition"
            >
              <ArrowLeft size={20} />
            </button>

            <h1 className="text-lg font-semibold text-gray-800">
              {pageTitle}
            </h1>
          </>
        ) : (
          <>
            {/* Logo + Brand */}
            <NavLink
              to="/vendor/dashboard"
              className="flex items-center gap-2"
            >
              <img
                src={logo}
                alt="logo"
                className="h-10 md:h-12 w-auto mt-2"
              />

              <span className="font-bold text-blue-600 text-base md:text-lg">
                Partner FokatIndia
              </span>
            </NavLink>
          </>
        )}
      </div>

      {/* DESKTOP MENU */}
      <div className="hidden lg:flex items-center gap-6">
        {menus.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-2 text-sm font-medium transition ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`
              }
            >
              <Icon size={18} />
              {item.title}
            </NavLink>
          );
        })}

        <NavLink
          to="/vendor/more"
          className={({ isActive }) =>
            `flex items-center gap-2 text-sm font-medium transition ${
              isActive
                ? "text-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`
          }
        >
          <Grid3X3 size={18} />
          More
        </NavLink>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        <a
          href="tel:+919999999999"
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 md:px-4 py-2 rounded-full flex items-center gap-2 text-sm transition"
        >
          <Phone size={16} />

          <span className="hidden sm:block">
            Support
          </span>
        </a>
      </div>
    </div>
  );
}