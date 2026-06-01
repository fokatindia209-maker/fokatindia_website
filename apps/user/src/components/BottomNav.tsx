import {
  Home,
  Grid3X3,
  CalendarCheck,
  Bell,
  User,
} from "lucide-react";

import { NavLink } from "react-router-dom";

export default function BottomNav() {
  const menus = [
    { title: "Home", icon: Home, path: "/dashboard" },
    { title: "Categories", icon: Grid3X3, path: "/categories" },
    { title: "Bookings", icon: CalendarCheck, path: "/bookings" },
    { title: "Notifications", icon: Bell, path: "/notifications" },
    { title: "Profile", icon: User, path: "/profile" },
  ];

  return (
    <div className="
      fixed bottom-0 left-0 right-0
      bg-white border-t shadow-lg
      flex justify-around items-center
      h-16 z-[9999]
      md:hidden
      pb-[env(safe-area-inset-bottom)]
    ">
      {menus.map((item) => {
        const Icon = item.icon;

        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center text-xs ${
                isActive ? "text-blue-600" : "text-gray-500"
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
// import {
//   Home,
//   Grid3X3,
//   CalendarCheck,
//   Bell,
//   User,
// } from "lucide-react";

// import { NavLink } from "react-router-dom";

// export default function BottomNav() {
//   const menus = [
//     {
//       title: "Home",
//       icon: Home,
//       path: "/dashboard",
//     },
//     {
//       title: "Categories",
//       icon: Grid3X3,
//       path: "/categories",
//     },
//     {
//       title: "Bookings",
//       icon: CalendarCheck,
//       path: "/bookings",
//     },
//     {
//       title: "Notifications",
//       icon: Bell,
//       path: "/notifications",
//     },
//     {
//       title: "Profile",
//       icon: User,
//       path: "/profile",
//     },
//   ];

//   return (
//     <div className="
//       fixed bottom-0 left-0 right-0
//       bg-white border-t shadow-lg
//       flex justify-around items-center
//       h-16 z-[9999]
//       md:hidden
//       pb-[env(safe-area-inset-bottom)]
//     ">
//       {menus.map((item) => {
//         const Icon = item.icon;

//         return (
//           <NavLink
//             key={item.path}
//             to={item.path}
//             className={({ isActive }) =>
//               `flex flex-col items-center justify-center text-xs
//               ${
//                 isActive
//                   ? "text-blue-600"
//                   : "text-gray-500"
//               }`
//             }
//           >
//             <Icon size={22} />
//             <span>{item.title}</span>
//           </NavLink>
//         );
//       })}
//     </div>
//   );
// }