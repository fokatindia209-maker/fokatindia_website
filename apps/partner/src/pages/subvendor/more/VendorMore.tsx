import {
  Users,
  FolderTree,
  Star,
  Bell,
  BarChart3,
  User,
  Settings,
} from "lucide-react";

import { Link } from "react-router-dom";
import PartnerLayout from "../../../components/PartnerLayout";

export default function VendorMore() {
  const menus = [
    {
      title: "Sub Vendors",
      icon: Users,
      path: "/vendor/subvendors",
    },
    {
      title: "Categories",
      icon: FolderTree,
      path: "/vendor/categories",
    },
    {
      title: "Reviews",
      icon: Star,
      path: "/vendor/reviews",
    },
    {
      title: "Reports",
      icon: BarChart3,
      path: "/vendor/reports",
    },
    {
      title: "Notifications",
      icon: Bell,
      path: "/vendor/notifications",
    },
    {
      title: "Profile",
      icon: User,
      path: "/vendor/profile",
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/vendor/settings",
    },
  ];

  return (
    <PartnerLayout>
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">
        More
      </h1>

      <div className="grid grid-cols-2 gap-4">
        {menus.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className="bg-white rounded-xl shadow p-5 flex flex-col items-center gap-3"
            >
              <Icon size={28} className="text-blue-600" />
              <span className="font-medium text-center">
                {item.title}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
    </PartnerLayout>
  );
}