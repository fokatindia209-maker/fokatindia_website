import UserLayout from "../components/UserLayout";
import {
  User,
  MapPin,
  Shield,
  FileText,
  Globe,
  HelpCircle,
  Phone,
  LogOut,
  ChevronRight,
  Share2,
  Info,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();

  const user = {
    name: "John Doe",
    email: "john@example.com",
    phone: "+971 000 000 000",
  };

  const stats = {
    bookings: 12,
    completed: 10,
    reviews: 5,
  };

  const menuSections = [
    {
      title: "My Account",
      items: [
        {
          icon: User,
          label: "Personal Information",
          path: "/profile/details",
        },
        {
          icon: MapPin,
          label: "Saved Addresses",
          path: "/addresses",
        }
      ],
    },

 

    {
      title: "Support",
      items: [
        {
          icon: HelpCircle,
          label: "Help Center",
          path: "/help",
        },
        {
          icon: Phone,
          label: "Contact Us",
          path: "/contact-us",
        },
      ],
    },

    {
      title: "Legal",
      items: [
        {
          icon: Shield,
          label: "Privacy Policy",
          path: "/privacy-policy",
        },
        {
          icon: FileText,
          label: "Terms & Conditions",
          path: "/terms-conditions",
        },
        {
          icon: FileText,
          label: "Refund Policy",
          path: "/refund-policy",
        },
        {
          icon: FileText,
          label: "Cancellation Policy",
          path: "/cancellation-policy",
        },
      ],
    },

    {
      title: "App Settings",
      items: [
        {
          icon: Globe,
          label: "Language",
          path: "/language",
        },
      ],
    },

    {
      title: "Other",
      items: [
        {
          icon: Info,
          label: "About Us",
          path: "/about-us",
        },
        {
          icon: Share2,
          label: "Share App",
          path: "/share-app",
        },
      ],
    },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <UserLayout>
      <div className="max-w-3xl mx-auto px-4 py-4 space-y-5">

        {/* PROFILE CARD */}
        <div className="bg-white rounded-2xl shadow p-5">

          <div className="flex items-center gap-4">

            <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
              {user.name.charAt(0)}
            </div>

            <div>
              <h2 className="font-bold text-lg">
                {user.name}
              </h2>

              <p className="text-gray-500 text-sm">
                {user.email}
              </p>

              <p className="text-gray-500 text-sm">
                {user.phone}
              </p>
            </div>

          </div>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-3">

          <div className="bg-white rounded-xl shadow p-4 text-center">
            <h3 className="text-xl font-bold text-blue-600">
              {stats.bookings}
            </h3>
            <p className="text-sm text-gray-500">
              Bookings
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-4 text-center">
            <h3 className="text-xl font-bold text-green-600">
              {stats.completed}
            </h3>
            <p className="text-sm text-gray-500">
              Completed
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-4 text-center">
            <h3 className="text-xl font-bold text-yellow-500">
              {stats.reviews}
            </h3>
            <p className="text-sm text-gray-500">
              Reviews
            </p>
          </div>

        </div>

        {/* MENU SECTIONS */}
        {menuSections.map((section) => (
          <div
            key={section.title}
            className="bg-white rounded-xl shadow overflow-hidden"
          >

            <div className="px-4 py-3 bg-gray-50 font-semibold text-gray-700">
              {section.title}
            </div>

            {section.items.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.label}
                  onClick={() => navigate(item.path)}
                  className="w-full flex items-center justify-between px-4 py-4 border-b last:border-b-0 hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </div>

                  <ChevronRight size={18} />
                </button>
              );
            })}
          </div>
        ))}

        {/* LOGOUT */}
        <div className="bg-white rounded-xl shadow overflow-hidden">

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-4 text-red-600 hover:bg-red-50"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

      </div>
    </UserLayout>
  );
}
// import UserLayout from "../components/UserLayout";
// import { User, Phone, Mail, MapPin, Settings, LogOut } from "lucide-react";
// import { useState } from "react";

// export default function Profile() {
//   const [name, setName] = useState("John Doe");
//   const [phone, setPhone] = useState("+971 000 000 000");
//   const [email, setEmail] = useState("john@example.com");
//   const [address, setAddress] = useState("Dubai, UAE");

//   const stats = {
//     bookings: 12,
//     reviews: 5,
//     completed: 10,
//   };

//   const handleSave = () => {
//     alert("Profile Updated ✅");
//   };

//   const handleLogout = () => {
//     alert("Logged out");
//   };

//   return (
//     <UserLayout>
//       <div className="max-w-2xl mx-auto space-y-6 py-4 px-4">

    

//         {/* PROFILE CARD */}
//         <div className="bg-white p-5 rounded-xl shadow space-y-4">

//           <div className="flex items-center gap-3">
//             <div className="w-14 h-14 bg-blue-600 text-white flex items-center justify-center rounded-full text-xl font-bold">
//               {name.charAt(0)}
//             </div>

//             <div>
//               <h2 className="font-semibold text-lg">
//                 {name}
//               </h2>
//               <p className="text-gray-500 text-sm">
//                 User Account
//               </p>
//             </div>
//           </div>

//           {/* INPUTS */}
//           <div className="space-y-3">

//             <div className="flex items-center gap-2 border p-2 rounded-xl">
//               <User size={16} />
//               <input
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="w-full outline-none"
//                 placeholder="Name"
//               />
//             </div>

//             <div className="flex items-center gap-2 border p-2 rounded-xl">
//               <Phone size={16} />
//               <input
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 className="w-full outline-none"
//                 placeholder="Phone"
//               />
//             </div>

//             <div className="flex items-center gap-2 border p-2 rounded-xl">
//               <Mail size={16} />
//               <input
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full outline-none"
//                 placeholder="Email"
//               />
//             </div>

//             <div className="flex items-center gap-2 border p-2 rounded-xl">
//               <MapPin size={16} />
//               <input
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//                 className="w-full outline-none"
//                 placeholder="Address"
//               />
//             </div>

//           </div>

//           {/* SAVE BUTTON */}
//           <button
//             onClick={handleSave}
//             className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
//           >
//             Save Profile
//           </button>

//         </div>

//         {/* STATS */}
//         <div className="grid grid-cols-3 gap-3">

//           <div className="bg-white p-4 rounded-xl shadow text-center">
//             <h3 className="text-xl font-bold text-blue-600">
//               {stats.bookings}
//             </h3>
//             <p className="text-sm text-gray-500">
//               Bookings
//             </p>
//           </div>

//           <div className="bg-white p-4 rounded-xl shadow text-center">
//             <h3 className="text-xl font-bold text-green-600">
//               {stats.completed}
//             </h3>
//             <p className="text-sm text-gray-500">
//               Completed
//             </p>
//           </div>

//           <div className="bg-white p-4 rounded-xl shadow text-center">
//             <h3 className="text-xl font-bold text-yellow-500">
//               {stats.reviews}
//             </h3>
//             <p className="text-sm text-gray-500">
//               Reviews
//             </p>
//           </div>

//         </div>

//         {/* SETTINGS */}
//         <div className="bg-white rounded-xl shadow divide-y">

//           <button className="flex items-center gap-3 p-4 w-full text-left hover:bg-gray-50">
//             <Settings size={18} />
//             Settings
//           </button>

//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-3 p-4 w-full text-left text-red-600 hover:bg-red-50"
//           >
//             <LogOut size={18} />
//             Logout
//           </button>

//         </div>

//       </div>
//     </UserLayout>
//   );
// }