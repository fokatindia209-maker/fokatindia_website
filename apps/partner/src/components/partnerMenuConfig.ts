import {
  Home,
  CalendarCheck,
  Briefcase,
  DollarSign,
  Grid3X3,
} from "lucide-react";
export const roleBasePath = {
  VENDOR: "/vendor",
  SUB_VENDOR: "/subvendor",
} as const;
export const partnerMenus = [
  {
    title: "Dashboard",
    icon: Home,
    path: "dashboard",
  },
  {
    title: "Bookings",
    icon: CalendarCheck,
    path: "bookings",
  },
  {
    title: "Services",
    icon: Briefcase,
    path: "services",
  },
  {
    title: "Earnings",
    icon: DollarSign,
    path: "earnings",
  },
  {
    title: "More",
    icon: Grid3X3,
    path: "more",
  },
];