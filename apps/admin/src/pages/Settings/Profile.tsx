// ============================
// src/pages/Settings/Profile.tsx
// ============================

import { useEffect, useState } from "react";
import axios from "axios";


const API = import.meta.env.VITE_API_URL;

export default function Profile() {
  const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    status: "",
  });

  const userId = user?.userId; // replace with JWT later

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API}/restful/v1/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data?.data;

      setForm({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        status: data.status || "",
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-60">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-12">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Profile Settings
        </h1>
        <p className="text-gray-500 mt-1">
          Manage your account information
        </p>
      </div>

      {/* CARD */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

        {/* HEADER BANNER */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-36 relative">
          <div className="absolute -bottom-14 left-8">
            <div className="w-28 h-28 rounded-full border-4 border-white bg-white overflow-hidden shadow-lg">
              <img
                src="https://i.pravatar.cc/300"
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="pt-20 p-8">

          {/* NAME + STATUS */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              {form.name}
            </h2>

            <p className="text-gray-500">
              Status: {form.status}
            </p>
          </div>

          {/* FORM */}
          <div className="grid md:grid-cols-2 gap-6">

            {/* NAME */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none"
              />
            </div>

            {/* PHONE */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none"
              />
            </div>

            {/* STATUS (readonly) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Status
              </label>
              <input
                name="status"
                value={form.status}
                disabled
                className="w-full border border-gray-300 bg-gray-100 rounded-2xl px-4 py-3"
              />
            </div>
          </div>

          {/* BUTTONS */}
          <div className="mt-10 flex gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl shadow-md">
              Save Changes
            </button>

            <button
              onClick={fetchProfile}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-2xl"
            >
              Reset
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
// // ============================
// // src/pages/Settings/Profile.tsx
// // USING AdminLayout
// // ============================

// export default function Profile() {
//   return (
//     <div className="max-w-5xl mx-auto py-12">
//       {/* PAGE HEADER */}
//       <div className="mb-6">
//         <h1 className="text-3xl font-bold text-gray-800">
//           Profile Settings
//         </h1>

//         <p className="text-gray-500 mt-1">
//           Manage admin profile information
//         </p>
//       </div>

//       {/* PROFILE CARD */}
//       <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
//         {/* TOP HEADER */}
//         <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-36 relative">
//           {/* PROFILE IMAGE */}
//           <div className="absolute -bottom-14 left-8">
//             <div className="w-28 h-28 rounded-full border-4 border-white bg-white shadow-lg overflow-hidden">
//               <img
//                 src="https://i.pravatar.cc/300"
//                 alt="profile"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           </div>
//         </div>

//         {/* CONTENT */}
//         <div className="pt-20 p-8">
//           {/* NAME + ROLE */}
//           <div className="mb-8">
//             <h2 className="text-2xl font-bold text-gray-800">
//               Admin User
//             </h2>

//             <p className="text-gray-500">
//               Super Administrator
//             </p>
//           </div>

//           {/* FORM */}
//           <div className="grid md:grid-cols-2 gap-6">
//             {/* FULL NAME */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Full Name
//               </label>

//               <input
//                 type="text"
//                 placeholder="Enter full name"
//                 className="
//                   w-full border border-gray-300
//                   rounded-2xl px-4 py-3
//                   outline-none
//                   focus:ring-4 focus:ring-blue-100
//                   focus:border-blue-500
//                   transition
//                 "
//               />
//             </div>

//             {/* EMAIL */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Email Address
//               </label>

//               <input
//                 type="email"
//                 placeholder="Enter email"
//                 className="
//                   w-full border border-gray-300
//                   rounded-2xl px-4 py-3
//                   outline-none
//                   focus:ring-4 focus:ring-blue-100
//                   focus:border-blue-500
//                   transition
//                 "
//               />
//             </div>

//             {/* PHONE */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Phone Number
//               </label>

//               <input
//                 type="text"
//                 placeholder="Enter phone number"
//                 className="
//                   w-full border border-gray-300
//                   rounded-2xl px-4 py-3
//                   outline-none
//                   focus:ring-4 focus:ring-blue-100
//                   focus:border-blue-500
//                   transition
//                 "
//               />
//             </div>

//             {/* ROLE */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Role
//               </label>

//               <input
//                 type="text"
//                 placeholder="Admin role"
//                 className="
//                   w-full border border-gray-300
//                   rounded-2xl px-4 py-3
//                   outline-none
//                   focus:ring-4 focus:ring-blue-100
//                   focus:border-blue-500
//                   transition
//                 "
//               />
//             </div>
//           </div>

//           {/* BUTTONS */}
//           <div className="mt-10 flex flex-wrap gap-4">
//             {/* SAVE BUTTON */}
//             <button
//               className="
//                 bg-blue-600 hover:bg-blue-700
//                 text-white font-semibold
//                 px-8 py-3 rounded-2xl
//                 shadow-md hover:shadow-lg
//                 transition-all duration-300
//                 active:scale-95
//               "
//             >
//               Save Changes
//             </button>

//             {/* CANCEL BUTTON */}
//             <button
//               className="
//                 bg-gray-100 hover:bg-gray-200
//                 text-gray-700 font-semibold
//                 px-8 py-3 rounded-2xl
//                 transition-all duration-300
//                 active:scale-95
//               "
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }