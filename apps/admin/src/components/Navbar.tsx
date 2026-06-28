import { useEffect, useRef, useState } from "react";
import {
  Phone,
  Home,
  Grid3X3,
  History,
  Bell,
  Menu,
  Settings,
  User,
  Shield,
  Lock,
  MonitorCog,
  HardDrive,
  LogOut,
} from "lucide-react";
import logo from "../assets/logo.png";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/authSlice";
import type { RootState } from "../store/store";

const settingsItems = [
  { label: "Profile", icon: User, path: "/settings/profile" },
  { label: "Security", icon: Shield, path: "/settings/security" },
  { label: "Notifications", icon: Bell, path: "/settings/notifications" },
  { label: "Password", icon: Lock, path: "/settings/password" },
  { label: "System", icon: MonitorCog, path: "/settings/system" },
  { label: "Backup", icon: HardDrive, path: "/settings/backup" },
];

interface NavbarProps {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navbar({ setSidebarOpen }: NavbarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  //const isDashboard = location.pathname === "/dashboard";

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setDropdownOpen(false);
  }, [location.pathname]);

  function handleLogout() {
    dispatch(logout());
    navigate("/login");
  }

  const menus = [
    { title: "Home", icon: Home, path: "/dashboard" },
    { title: "Categories", icon: Grid3X3, path: "/categories" },
    { title: "Order History", icon: History, path: "/order_history" },
    { title: "Notifications", icon: Bell, path: "/notifications" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b shadow-sm flex items-center justify-between px-4 md:px-16 z-50">

      {/* LEFT SIDE */}
      <div className="flex items-center gap-1">
        {/* Hamburger - mobile only */}
        <button
          onClick={() => setSidebarOpen((prev) => !prev)}
          className="md:hidden p-2 rounded-full hover:bg-gray-100 transition"
          aria-label="Toggle menu"
        >
          <Menu size={22} />
        </button>

        <NavLink to="/dashboard" className="flex items-center">
          <img
            src={logo}
            alt="FokatIndia"
            className="mt-3 h-16 w-auto object-contain"
          />
          <span className="text-lg font-bold text-blue-600">FokatIndia</span>
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
                `flex items-center gap-2 transition ${
                  isActive ? "text-blue-600" : "hover:text-blue-600"
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

        {/* Settings Dropdown */}
        <div ref={dropdownRef} className="relative hidden md:block">
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className={`flex items-center gap-2 p-2 rounded-full transition ${
              dropdownOpen
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
            }`}
            aria-label="Settings"
          >
            <Settings size={20} />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-12 w-56 bg-white rounded-2xl shadow-lg border border-gray-100 py-2 z-50">

              {/* LOGGED IN USER */}
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm shrink-0">
                    {user?.name?.charAt(0).toUpperCase() ?? "A"}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">
                      {user?.name ?? "Admin"}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {user?.email ?? ""}
                    </p>
                  </div>
                </div>
              </div>

              {/* SETTINGS LINKS */}
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-4 pt-3 pb-1">
                Settings
              </p>

              {settingsItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-2.5 text-sm transition ${
                        isActive
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                      }`
                    }
                  >
                    <Icon size={16} />
                    {item.label}
                  </NavLink>
                );
              })}

              {/* LOGOUT */}
              <div className="border-t border-gray-100 mt-1 pt-1">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>

            </div>
          )}
        </div>

        {/* Call Button */}
        <a
          href="tel:+971000000000"
          className="flex items-center gap-2 bg-blue-600 text-white px-3 md:px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition"
        >
          <Phone size={16} />
          <span className="hidden sm:block">Call Us</span>
        </a>

      </div>
    </div>
  );
}
