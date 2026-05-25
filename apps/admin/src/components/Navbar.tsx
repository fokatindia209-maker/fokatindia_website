import {
  Menu,
  X,
  Bell,
  Search,
  LogOut,
} from "lucide-react";

import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { logout } from "../store/slices/authSlice";

import type { AppDispatch } from "../store/store";

interface NavbarProps {

  sidebarOpen: boolean;

  setSidebarOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

export default function Navbar({
  sidebarOpen,
  setSidebarOpen,
}: NavbarProps) {

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const handleLogout = () => {

    dispatch(logout());

    navigate("/");
  };

  return (

    <header
      className="
        fixed top-0 left-0 right-0 
        bg-white border-b shadow-sm
        z-40
      "
    >

      <div className="flex items-center justify-between px-4 md:px-6 py-4">

        {/* LEFT */}
        <div className="flex items-center gap-4">

          {/* TOGGLE BUTTON */}
          <button
            onClick={() =>
              setSidebarOpen((prev) => !prev)
            }
            className="
              md:hidden
              p-2 rounded-lg
              hover:bg-gray-100
              transition
            "
          >

            {sidebarOpen ? (
              <X
                size={28}
                className="text-gray-700"
              />

            ) : (

              <Menu
                size={28}
                className="text-gray-700"
              />

            )}
          </button>

          {/* LOGO */}
          <div>
            <h1 className="text-2xl font-bold text-blue-600">
              FokatIndia
            </h1>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">

          {/* SEARCH */}
          <div
            className="
              hidden md:flex
              items-center
              bg-gray-100
              px-3 py-2 rounded-xl
            "
          >

            <Search
              size={18}
              className="text-gray-400"
            />

            <input
              type="text"
              placeholder="Search..."
              className="
                bg-transparent
                outline-none
                ml-2
              "
            />

          </div>

          {/* NOTIFICATION */}
          <button className="relative">

            <Bell className="text-gray-700" />

            <span
              className="
                absolute -top-1 -right-1
                bg-red-500 text-white
                text-[10px]
                px-1 rounded-full
              "
            >
              2
            </span>

          </button>

          {/* PROFILE */}
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="
              w-10 h-10
              rounded-full border
            "
          />

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="
              flex items-center gap-2
              bg-red-500 hover:bg-red-600
              text-white px-4 py-2
              rounded-xl transition
            "
          >

            <LogOut size={18} />

            <span className="hidden md:block">
              Logout
            </span>

          </button>

        </div>

      </div>

    </header>
  );
}