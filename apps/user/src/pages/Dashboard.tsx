import UserLayout from "../components/UserLayout";
import { useNavigate } from "react-router-dom";
import { Search, Star, Clock, Sparkles } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();

  const categories = [
    { id: 1, name: "Home Cleaning", icon: "🧹" },
    { id: 2, name: "Plumbing", icon: "🔧" },
    { id: 3, name: "Electrician", icon: "⚡" },
    { id: 4, name: "AC Repair", icon: "❄️" },
    { id: 5, name: "Salon", icon: "💇" },
    { id: 6, name: "Painting", icon: "🎨" },
  ];

  const popularServices = [
    { id: 1, title: "AC Full Service", price: "₹499", rating: 4.5 },
    { id: 2, title: "Deep Home Cleaning", price: "₹799", rating: 4.7 },
    { id: 3, title: "Bathroom Cleaning", price: "₹299", rating: 4.3 },
  ];

  const nearbyVendors = [
    { id: 1, name: "Raj Services", status: "Available" },
    { id: 2, name: "Quick Fix Team", status: "Available" },
    { id: 3, name: "Urban Helpers", status: "Busy" },
  ];

  return (
    <UserLayout>
      <div className="space-y-4 py-4 px-4">

        {/* ================= SEARCH ================= */}
        <div className="flex items-center bg-white rounded-xl shadow px-4 py-3">
          <Search size={18} className="text-gray-400" />
          <input
            placeholder="Search services (AC, Cleaning, Repair...)"
            className="w-full ml-2 outline-none text-sm"
          />
        </div>

        {/* ================= OFFER BANNER ================= */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-xl flex items-center gap-2">
          <Sparkles size={18} />
          <p className="text-sm font-medium">
            Flat 20% OFF on first booking 🎉
          </p>
        </div>

        {/* ================= MAIN BANNER ================= */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-2xl shadow">
          <h1 className="text-2xl font-bold">
            Home Services at Your Doorstep
          </h1>
          <p className="text-sm mt-20 opacity-80">
            Trusted professionals, instant booking
          </p>
        </div>

        {/* ================= QUICK STATUS ================= */}
        <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-center gap-2 text-blue-700">
          <Clock size={16} />
          <p className="text-sm">
            Fast booking available in your area
          </p>
        </div>

        {/* ================= CATEGORIES ================= */}
        <section>
          <h2 className="font-bold text-lg mb-1">Categories</h2>

          <div className="grid grid-cols-3 gap-3">
            {categories.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/service/${item.id}`)}
                className="bg-white rounded-xl p-4 text-center shadow hover:shadow-md active:scale-95 transition cursor-pointer"
              >
                <div className="text-2xl">{item.icon}</div>
                <p className="text-xs mt-2 font-medium">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= POPULAR SERVICES ================= */}
        <section>
          <h2 className="font-bold text-lg mb-3">Popular Services</h2>

          <div className="space-y-3">
            {popularServices.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold">{item.title}</h3>

                  <div className="flex items-center gap-1 text-yellow-500 text-sm mt-1">
                    <Star size={14} />
                    {item.rating}
                  </div>

                  <p className="text-green-600 font-bold text-sm mt-1">
                    {item.price}
                  </p>
                </div>

                <button
                  onClick={() => navigate(`/booking/${item.id}`)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
                >
                  Book
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ================= NEARBY ================= */}
        <section>
          <h2 className="font-bold text-lg mb-3">
            Nearby SubVendors
          </h2>

          <div className="space-y-3">
            {nearbyVendors.map((item, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
              >
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p
                    className={`text-xs mt-1 ${item.status === "Available"
                        ? "text-green-600"
                        : "text-red-500"
                      }`}
                  >
                    {item.status}
                  </p>
                </div>

                <button
                  onClick={() => navigate(`/subvendor/${item.id}`)}
                  className="text-blue-600 text-sm">
                  View
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ================= TIP ================= */}
        <div className="bg-gray-900 text-white p-4 rounded-xl text-center text-sm">
          💡 Tip: Morning bookings get faster service & lower prices
        </div>

      </div>
    </UserLayout>
  );
}