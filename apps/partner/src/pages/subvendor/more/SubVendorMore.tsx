import {
  Star,
  Bell,
  BarChart3,
  User,
  Settings,
  FolderTree,
} from "lucide-react";

import { Link } from "react-router-dom";
import PartnerLayout from "../../../components/PartnerLayout";

export default function SubVendorMore() {
  const menus = [
    {
      title: "Categories",
      icon: FolderTree,
      path: "/subvendor/categories",
    },
    {
      title: "Reviews",
      icon: Star,
      path: "/subvendor/reviews",
    },
    {
      title: "Reports",
      icon: BarChart3,
      path: "/subvendor/reports",
    },
    {
      title: "Notifications",
      icon: Bell,
      path: "/subvendor/notifications",
    },
    {
      title: "Profile",
      icon: User,
      path: "/subvendor/profile",
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/subvendor/settings",
    },
  ];

  return (
    <PartnerLayout role="SUB_VENDOR">
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