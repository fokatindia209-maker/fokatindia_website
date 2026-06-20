import UserLayout from "../components/UserLayout";
import { Search, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

interface Service {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    discountedPrice: number;
    rating: number;
    categoryId: number;
    categoryName: string;
}


export default function Services() {
    const navigate = useNavigate();
    const { categoryId } = useParams();

    const [search, setSearch] = useState("");
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (categoryId) {
            fetchServices();
        }
    }, [categoryId]);

    const fetchServices = async () => {
        try {
            const res = await api.get(
                `/services/category/${categoryId}`
            );

            setServices(res.data.data || []);
        } catch (error) {
            console.error("Failed to load services", error);
        } finally {
            setLoading(false);
        }
    };



    const filtered = services.filter((service) =>
        service.name.toLowerCase().includes(search.toLowerCase())
    );


    return (

        <UserLayout>
            <div className="space-y-6 py-4 px-4">

                {/* Search */}
                <div className="relative">
                    <Search
                        className="absolute left-3 top-3 text-gray-400"
                        size={18}
                    />

                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search services..."
                        className="w-full pl-10 pr-4 py-3 border rounded-xl"
                    />
                </div>

                {loading ? (
                    <div className="text-center py-10">
                        Loading services...
                    </div>
                ) : (
                    <div className="grid md:grid-cols-3 gap-4">
                        {filtered.map((service) => (
                            <div
                                key={service.id}
                                onClick={() =>
                                    navigate(`/serviceDetails/${service.id}`)
                                }
                                className="bg-white rounded-2xl shadow p-5 hover:shadow-md cursor-pointer"
                            >
                                <img
                                    src={service.imageUrl}
                                    alt={service.name}
                                    className="w-full h-40 object-cover rounded-xl"
                                />

                                <h3 className="font-semibold text-lg mt-3">
                                    {service.name}
                                </h3>

                                <p className="text-sm text-gray-500">
                                    {service.categoryName}
                                </p>

                                <div className="flex items-center gap-1 mt-2 text-yellow-500">
                                    <Star size={16} />
                                    {service.rating}
                                </div>

                                <div className="mt-2">
                                    <span className="text-green-600 font-bold">
                                        ₹{service.discountedPrice}
                                    </span>

                                    {service.price > service.discountedPrice && (
                                        <span className="text-gray-400 line-through ml-2">
                                            ₹{service.price}
                                        </span>
                                    )}
                                </div>

                                <button
                                    // onClick={(e) => {
                                    //     e.stopPropagation();
                                    //     navigate(`/subvendors/${service.id}`);
                                    // }}


                                    onClick={(e) => {
                                        e.stopPropagation();
                                        localStorage.setItem(
                                            "serviceId",
                                            service.id.toString()
                                        );

                                        navigate(`/subvendors/${service.id}`);
                                    }}
                                    className="mt-4 w-full bg-blue-600 text-white py-2 rounded-xl"
                                >
                                    View Available Experts
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && filtered.length === 0 && (
                    <div className="text-center text-gray-500 py-10">
                        No services found 😢
                    </div>
                )}
            </div>
        </UserLayout>
        // <UserLayout>
        //     <div className="space-y-6 py-4 px-4">



        //         {/* SEARCH */}
        //         <div className="relative">
        //             <Search className="absolute left-3 top-3 text-gray-400" size={18} />

        //             <input
        //                 value={search}
        //                 onChange={(e) => setSearch(e.target.value)}
        //                 placeholder="Search services..."
        //                 className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
        //             />
        //         </div>

        //         {/* SERVICES GRID */}
        //         <div className="grid md:grid-cols-3 gap-4">

        //             {filtered.map((service) => (
        //                 <div
        //                     key={service.id}
        //                     onClick={() => navigate(`/serviceDetails/${service.id}`)}
        //                     className="bg-white rounded-2xl shadow p-5 hover:shadow-md transition cursor-pointer"
        //                 >
        //                     <h3 className="font-semibold text-lg">
        //                         {service.name}
        //                     </h3>

        //                     <div className="flex items-center gap-1 mt-2 text-yellow-500 text-sm">
        //                         <Star size={16} />
        //                         {service.rating}
        //                     </div>

        //                     <p className="text-green-600 font-bold mt-2">
        //                         ₹{service.price}
        //                     </p>

        //                     <button
        //                         onClick={(e) => {
        //                             e.stopPropagation(); // important (card click conflict)

        //                             navigate(`/subvendors/${service.id}`);
        //                         }}
        //                         className="mt-4 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
        //                     >
        //                         View Available Experts
        //                     </button>
        //                 </div>
        //             ))}

        //         </div>
        //         {filtered.length === 0 && (
        //             <div className="text-center text-gray-500 py-10">
        //                 No services found 😢
        //             </div>
        //         )}

        //     </div>
        // </UserLayout>
    );
}