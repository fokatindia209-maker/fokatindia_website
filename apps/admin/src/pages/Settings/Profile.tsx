// ============================
// src/pages/Settings/Profile.tsx
// USING AdminLayout
// ============================

export default function Profile() {
  return (
    <div className="max-w-5xl mx-auto py-12">
      {/* PAGE HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Profile Settings
        </h1>

        <p className="text-gray-500 mt-1">
          Manage admin profile information
        </p>
      </div>

      {/* PROFILE CARD */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {/* TOP HEADER */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-36 relative">
          {/* PROFILE IMAGE */}
          <div className="absolute -bottom-14 left-8">
            <div className="w-28 h-28 rounded-full border-4 border-white bg-white shadow-lg overflow-hidden">
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
          {/* NAME + ROLE */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              Admin User
            </h2>

            <p className="text-gray-500">
              Super Administrator
            </p>
          </div>

          {/* FORM */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* FULL NAME */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter full name"
                className="
                  w-full border border-gray-300
                  rounded-2xl px-4 py-3
                  outline-none
                  focus:ring-4 focus:ring-blue-100
                  focus:border-blue-500
                  transition
                "
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter email"
                className="
                  w-full border border-gray-300
                  rounded-2xl px-4 py-3
                  outline-none
                  focus:ring-4 focus:ring-blue-100
                  focus:border-blue-500
                  transition
                "
              />
            </div>

            {/* PHONE */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </label>

              <input
                type="text"
                placeholder="Enter phone number"
                className="
                  w-full border border-gray-300
                  rounded-2xl px-4 py-3
                  outline-none
                  focus:ring-4 focus:ring-blue-100
                  focus:border-blue-500
                  transition
                "
              />
            </div>

            {/* ROLE */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Role
              </label>

              <input
                type="text"
                placeholder="Admin role"
                className="
                  w-full border border-gray-300
                  rounded-2xl px-4 py-3
                  outline-none
                  focus:ring-4 focus:ring-blue-100
                  focus:border-blue-500
                  transition
                "
              />
            </div>
          </div>

          {/* BUTTONS */}
          <div className="mt-10 flex flex-wrap gap-4">
            {/* SAVE BUTTON */}
            <button
              className="
                bg-blue-600 hover:bg-blue-700
                text-white font-semibold
                px-8 py-3 rounded-2xl
                shadow-md hover:shadow-lg
                transition-all duration-300
                active:scale-95
              "
            >
              Save Changes
            </button>

            {/* CANCEL BUTTON */}
            <button
              className="
                bg-gray-100 hover:bg-gray-200
                text-gray-700 font-semibold
                px-8 py-3 rounded-2xl
                transition-all duration-300
                active:scale-95
              "
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}