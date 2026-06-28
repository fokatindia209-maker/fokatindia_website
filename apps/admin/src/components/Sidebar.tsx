// ============================
// Sidebar.tsx
// PROFESSIONAL RBAC SIDEBAR
// ============================

import {
  LayoutDashboard,
  CalendarCheck,
  Users,
  Wallet,
  Settings,
  ChevronDown,
  ChevronUp,
  User,
  Shield,
  Bell,
  Lock,
  Globe,
  Database,
  FolderLock,
  KeyRound,
  UserCog,
  ShieldCheck,
  LogOut,
} from "lucide-react";

import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout());
    navigate("/login");
  }

  // ============================================
  // SETTINGS
  // ============================================

  const [settingsOpen, setSettingsOpen] =
    useState(
      location.pathname.startsWith("/settings")
    );

  // ============================================
  // ACCESS MANAGEMENT
  // ============================================

  const [accessOpen, setAccessOpen] = useState(
    location.pathname.startsWith("/access")
  );

  useEffect(() => {
    if (
      location.pathname.startsWith("/settings")
    ) {
      setSettingsOpen(true);
    }

    if (
      location.pathname.startsWith("/access")
    ) {
      setAccessOpen(true);
    }
  }, [location.pathname]);

  // ============================================
  // MAIN MENU
  // ============================================

  const menu = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },

    {
      title: "Users",
      icon: Users,
      path: "/users",
    },

    {
      title: "Vendors",
      icon: Users,
      path: "/vendors",
    },

    {
      title: "SubVendors",
      icon: Users,
      path: "/subVendors",
    },

    {
      title: "Bookings",
      icon: CalendarCheck,
      path: "/bookings",
    },

    {
      title: "Payments",
      icon: Wallet,
      path: "/payments",
    },

    {
      title: "Categories",
      icon: FolderLock,
      path: "/categories",
    },

    {
      title: "Services",
      icon: FolderLock,
      path: "/services",
    },

    {
      title: "Documents (KYC)",
      icon: ShieldCheck,
      path: "/kyc",
    },

    {
      title: "Notification",
      icon: ShieldCheck,
      path: "/notifications",
    },

    {
      title: "Review",
      icon: ShieldCheck,
      path: "/reviews",
    },
  ];

  // ============================================
  // ACCESS MANAGEMENT SUBMENU
  // ============================================

  const accessTabs = [
    {
      title: "Roles",
      icon: Shield,
      path: "/roles",
    },

    {
      title: "Permissions",
      icon: KeyRound,
      path: "/permissions",
    },

    {
      title: "User Roles",
      icon: UserCog,
      path: "/user-roles",
    },

    {
      title: "Role Permissions",
      icon: ShieldCheck,
      path: "/role-permissions",
    },
  ];

  // ============================================
  // SETTINGS SUBMENU
  // ============================================

  const settingsTabs = [
    {
      id: "profile",
      label: "Profile",
      icon: User,
    },

    {
      id: "security",
      label: "Security",
      icon: Shield,
    },

    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
    },

    {
      id: "password",
      label: "Password",
      icon: Lock,
    },

    {
      id: "system",
      label: "System",
      icon: Globe,
    },

    {
      id: "backup",
      label: "Backup",
      icon: Database,
    },
  ];

  return (
    <>
      {/* ===================================== */}
      {/* OVERLAY */}
      {/* ===================================== */}

      <div
        className={`
          fixed inset-0 bg-black/50 z-40 md:hidden
          transition-opacity duration-300
          ${
            sidebarOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible"
          }
        `}
        onClick={() =>
          setSidebarOpen(false)
        }
      />

      {/* ===================================== */}
      {/* SIDEBAR */}
      {/* ===================================== */}

      <aside
        className={`
          fixed left-0 top-16 z-40
          h-[calc(100vh-64px)]
          w-64 bg-white shadow-xl

          transform transition-transform duration-300

          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          md:translate-x-0
          overflow-y-auto
        `}
      >
        <nav className="p-4 pt-6 space-y-2">

          {/* ================================= */}
          {/* MAIN MENU */}
          {/* ================================= */}

          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => {
                  if (
                    window.innerWidth < 768
                  ) {
                    setSidebarOpen(false);
                  }
                }}
                className={({
                  isActive,
                }) =>
                  `
                  flex items-center gap-3
                  px-4 py-3 rounded-xl
                  transition-all

                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md"
                      : "hover:bg-gray-100 text-gray-700"
                  }
                `
                }
              >
                <Icon size={20} />

                <span className="font-medium">
                  {item.title}
                </span>
              </NavLink>
            );
          })}

          {/* ================================= */}
          {/* ACCESS MANAGEMENT */}
          {/* ================================= */}

          <div className="pt-2">

            {/* ACCESS BUTTON */}

            <div
              onClick={() =>
                setAccessOpen(!accessOpen)
              }
              className={`
                flex items-center justify-between
                px-4 py-3 rounded-xl
                cursor-pointer transition-all

                ${
                  location.pathname.startsWith(
                    "/access"
                  )
                    ? "bg-blue-600 text-white shadow-md"
                    : "hover:bg-gray-100 text-gray-700"
                }
              `}
            >
              <div className="flex items-center gap-3">
                <ShieldCheck size={20} />

                <span className="font-medium">
                  Access Management
                </span>
              </div>

              {accessOpen ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </div>

            {/* ACCESS SUBMENU */}

            <div
              className={`
                overflow-hidden
                transition-all duration-300

                ${
                  accessOpen
                    ? "max-h-[500px] mt-2"
                    : "max-h-0"
                }
              `}
            >
              <div className="ml-4 border-l pl-3 space-y-1">

                {accessTabs.map((tab) => {
                  const Icon = tab.icon;

                  return (
                    <NavLink
                      key={tab.path}
                      to={tab.path}
                      onClick={() => {
                        if (
                          window.innerWidth < 768
                        ) {
                          setSidebarOpen(false);
                        }
                      }}
                      className={({
                        isActive,
                      }) =>
                        `
                        flex items-center gap-3
                        px-3 py-2 rounded-xl
                        transition-all

                        ${
                          isActive
                            ? "bg-blue-100 text-blue-700 font-semibold"
                            : "text-gray-600 hover:bg-gray-100"
                        }
                      `
                      }
                    >
                      <Icon size={16} />

                      <span>
                        {tab.title}
                      </span>
                    </NavLink>
                  );
                })}

              </div>
            </div>
          </div>

          {/* ================================= */}
          {/* SETTINGS */}
          {/* ================================= */}

          <div className="pt-2">

            {/* SETTINGS BUTTON */}

            <div
              onClick={() =>
                setSettingsOpen(
                  !settingsOpen
                )
              }
              className={`
                flex items-center justify-between
                px-4 py-3 rounded-xl
                cursor-pointer transition-all

                ${
                  location.pathname.startsWith(
                    "/settings"
                  )
                    ? "bg-blue-600 text-white shadow-md"
                    : "hover:bg-gray-100 text-gray-700"
                }
              `}
            >
              <div className="flex items-center gap-3">
                <Settings size={20} />

                <span className="font-medium">
                  Settings
                </span>
              </div>

              {settingsOpen ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </div>

            {/* SETTINGS SUBMENU */}

            <div
              className={`
                overflow-hidden
                transition-all duration-300

                ${
                  settingsOpen
                    ? "max-h-[500px] mt-2"
                    : "max-h-0"
                }
              `}
            >
              <div className="ml-4 border-l pl-3 space-y-1">

                {settingsTabs.map((tab) => {
                  const Icon = tab.icon;

                  const path = `/settings/${tab.id}`;

                  return (
                    <NavLink
                      key={tab.id}
                      to={path}
                      onClick={() => {
                        if (
                          window.innerWidth < 768
                        ) {
                          setSidebarOpen(false);
                        }
                      }}
                      className={({
                        isActive,
                      }) =>
                        `
                        flex items-center gap-3
                        px-3 py-2 rounded-xl
                        transition-all

                        ${
                          isActive
                            ? "bg-blue-100 text-blue-700 font-semibold"
                            : "text-gray-600 hover:bg-gray-100"
                        }
                      `
                      }
                    >
                      <Icon size={16} />

                      <span>
                        {tab.label}
                      </span>
                    </NavLink>
                  );
                })}

              </div>
            </div>
          </div>

          {/* ================================= */}
          {/* LOGOUT */}
          {/* ================================= */}

          <div className="pt-4 pb-2">
            <button
              onClick={handleLogout}
              className="
                flex items-center gap-3
                w-full px-4 py-3 rounded-xl
                text-red-500 hover:bg-red-50
                transition-all font-medium
              "
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>

        </nav>
      </aside>
    </>
  );
}