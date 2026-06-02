import UserLayout from "../components/UserLayout";
import { useNavigate } from "react-router-dom";
import { Search, Star } from "lucide-react";
import { useState } from "react";

export default function SubVendors() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const subVendors = [
    {
      id: 1,
      name: "Rahul Sharma",
      description: "Expert in AC repair and cooling systems with 5+ years experience",
      rating: 4.6,
    },
    {
      id: 2,
      name: "Amit Verma",
      description: "Professional home cleaning specialist for deep cleaning services",
      rating: 4.3,
    },
    {
      id: 3,
      name: "Suresh Yadav",
      description: "Certified electrician for home and commercial electrical work",
      rating: 4.8,
    },
  ];

  const filtered = subVendors.filter(
    (v) =>
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <UserLayout>
      <div className="space-y-6 py-4 px-4">

      
        {/* SEARCH */}
        <div className="flex items-center bg-white rounded-xl shadow px-4 py-3">
          <Search size={18} className="text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search vendors..."
            className="w-full ml-2 outline-none text-sm"
          />
        </div>

        {/* LIST */}
        <div className="space-y-3">
          {filtered.map((v) => (
            <div
              key={v.id}
              className="bg-white rounded-xl shadow p-4 hover:shadow-md transition"
            >

              {/* NAME */}
              <h2 className="font-semibold text-lg">
                {v.name}
              </h2>

              {/* DESCRIPTION */}
              <p className="text-sm text-gray-500 mt-1">
                {v.description}
              </p>

              {/* RATING */}
              <div className="flex items-center gap-1 text-yellow-500 text-sm mt-2">
                <Star size={14} />
                {v.rating}
              </div>

              {/* ACTIONS */}
              <div className="flex justify-end gap-2 mt-4">

                <button
                  onClick={() =>
                    navigate(`/subvendor/${v.id}`)
                  }
                  className="px-4 py-1 rounded-lg border text-sm hover:bg-gray-100"
                >
                  View
                </button>

                <button
                  onClick={() =>
                    // navigate(`/booking?subvendor=${v.id}`)
                    navigate(`/booking/${v.id}`)
                  }
                  className="px-4 py-1 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700"
                >
                  Book
                </button>

              </div>

            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {filtered.length === 0 && (
          <div className="text-center text-gray-500 py-10">
            No Sub Vendors found
          </div>
        )}

      </div>
    </UserLayout>
  );
}