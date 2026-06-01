import UserLayout from "../components/UserLayout";
import {  Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Categories() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const categories = [
    { id: 1, name: "Home Cleaning", icon: "🧹" },
    { id: 2, name: "Plumbing", icon: "🔧" },
    { id: 3, name: "Electrician", icon: "⚡" },
    { id: 4, name: "AC Repair", icon: "❄️" },
    { id: 5, name: "Salon at Home", icon: "💇" },
    { id: 6, name: "Painting", icon: "🎨" },
  ];

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <UserLayout>
      <div className="space-y-6">

        {/* HEADER */}
        <div className="flex items-center gap-2">
  
          <h1 className="text-2xl font-bold">Categories</h1>
        </div>

        {/* SEARCH */}
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search categories..."
            className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          {filtered.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate(`/service/${cat.id}`)}
              className="bg-white rounded-2xl shadow hover:shadow-md transition cursor-pointer p-6 text-center"
            >
              <div className="text-4xl">{cat.icon}</div>

              <p className="mt-3 font-semibold text-gray-700">
                {cat.name}
              </p>
            </div>
          ))}

        </div>

      </div>
    </UserLayout>
  );
}