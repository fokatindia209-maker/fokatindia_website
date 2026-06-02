import UserLayout from "../components/UserLayout";
import { Search, Star } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Services() {
    const [search, setSearch] = useState("");
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const categoryId = params.get("category");

    const services = [
        { id: 1, name: "Deep Home Cleaning", categoryId: 1, price: 499, rating: 4.5 },
        { id: 2, name: "Bathroom Cleaning", categoryId: 1, price: 299, rating: 4.2 },
        { id: 3, name: "AC Repair Service", categoryId: 4, price: 799, rating: 4.7 },
        { id: 4, name: "Fan Repair", categoryId: 3, price: 199, rating: 4.3 },
    ];

    const filtered = services.filter((s) => {
        const matchCategory =
            !categoryId || String(s.categoryId) === categoryId;

        const matchSearch =
            s.name.toLowerCase().includes(search.toLowerCase());

        return matchCategory && matchSearch;
    });

    return (
        <UserLayout>
            <div className="space-y-6 py-4 px-4">

           

                {/* SEARCH */}
                <div className="relative">
                    <Search className="absolute left-3 top-3 text-gray-400" size={18} />

                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search services..."
                        className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                {/* SERVICES GRID */}
                <div className="grid md:grid-cols-3 gap-4">

                    {filtered.map((service) => (
                        <div
                            key={service.id}
                            onClick={() => navigate(`/serviceDetails/${service.id}`)}
                            className="bg-white rounded-2xl shadow p-5 hover:shadow-md transition cursor-pointer"
                        >
                            <h3 className="font-semibold text-lg">
                                {service.name}
                            </h3>

                            <div className="flex items-center gap-1 mt-2 text-yellow-500 text-sm">
                                <Star size={16} />
                                {service.rating}
                            </div>

                            <p className="text-green-600 font-bold mt-2">
                                ₹{service.price}
                            </p>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation(); // important (card click conflict)
                             
                                     navigate(`/subvendors/${service.id}`);
                                }}
                                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
                            >
                                 View Available Experts
                            </button>
                        </div>
                    ))}

                </div>

                {/* EMPTY STATE */}
                {filtered.length === 0 && (
                    <div className="text-center text-gray-500 py-10">
                        No services found 😢
                    </div>
                )}

            </div>
        </UserLayout>
    );
}