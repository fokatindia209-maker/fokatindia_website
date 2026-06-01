import {
    Home,
    Grid3X3,
    CalendarCheck,
    Bell,
    User,
} from "lucide-react";

import { NavLink } from "react-router-dom";

export default function UserSidebar() {
    const menus = [
        { title: "Home", icon: Home, path: "/dashboard" },
        { title: "Categories", icon: Grid3X3, path: "/categories" },
        { title: "Services", icon: Grid3X3, path: "/service" },

        { title: "Bookings", icon: CalendarCheck, path: "/bookings" },
        { title: "Notifications", icon: Bell, path: "/notifications" },
        { title: "Profile", icon: User, path: "/profile" },
    ];

    return (
        <aside className="hidden md:block fixed left-0 top-16 w-64 h-[calc(100vh-64px)] bg-white shadow-md">
            <nav className="p-4 space-y-2">
                {menus.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl ${isActive
                                    ? "bg-blue-600 text-white"
                                    : "hover:bg-gray-100"
                                }`
                            }
                        >
                            <Icon size={20} />
                            {item.title}
                        </NavLink>
                    );
                })}
            </nav>
        </aside>
    );
}