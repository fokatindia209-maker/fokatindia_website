import UserLayout from "../components/UserLayout";
import { useNavigate } from "react-router-dom";
import { Search, Star, Clock, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../api/axios";
interface Category {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
}

interface Service {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  discountedPrice: number;
  rating: number;
  featured: boolean;
  categoryId: number;
  categoryName: string;
}
export default function Dashboard() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [services, setServices] = useState<Service[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [nearbyVendors, setNearbyVendors] = useState<any[]>([]);
  const [loadingVendors, setLoadingVendors] = useState(true);
  useEffect(() => {
    fetchCategories();
    fetchServices();
  }, []);

  const lat = 25.2048;
  const lng = 55.2708;
  const serviceId = services?.[0]?.id;

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data.data || []);
    } catch (error) {
      console.error("Failed to load categories", error);
    } finally {
      setLoadingCategories(false);
    }
  };

  const fetchServices = async () => {
    try {
      const res = await api.get("/services");

      const featuredServices = (res.data.data || []).filter(
        (service: Service) => service.featured
      ).slice(0, 5);

      setServices(featuredServices);
    } catch (error) {
      console.error("Failed to load services", error);
    } finally {
      setLoadingServices(false);
    }
  };

  useEffect(() => {

    if (!serviceId) return;

    const fetchNearby = async () => {
      try {
        setLoadingVendors(true);

        const res = await api.get(
          `/subvendors/service/${serviceId}`,
          {
            params: {
              lat,
              lng,
            },
          }
        );

        setNearbyVendors(res.data.data || []);
      } catch (err) {
        console.error("Failed to load nearby vendors", err);
      } finally {
        setLoadingVendors(false);
      }
    };

    fetchNearby();
  }, [serviceId]);

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
          <h2 className="font-bold text-lg mb-3">Categories</h2>

          {loadingCategories ? (
            <p className="text-sm text-gray-500">
              Loading categories...
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-3">
              {categories.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    localStorage.setItem(
                      "categoryId",
                      item.id.toString()
                    );

                    navigate(`/service/${item.id}`);
                  }}
                  // onClick={() => navigate(`/service/${item.id}`)}
                  className="bg-white rounded-xl p-3 text-center shadow hover:shadow-md active:scale-95 transition cursor-pointer"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-14 h-14 mx-auto object-cover rounded-lg"
                  />

                  <p className="text-xs mt-2 font-medium">
                    {item.name}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>


        {/* ================= POPULAR SERVICES ================= */}
        <section>
          <h2 className="font-bold text-lg mb-3">
            Popular Services
          </h2>

          {loadingServices ? (
            <p className="text-sm text-gray-500">
              Loading services...
            </p>
          ) : (
            <div className="space-y-3">
              {services.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-xl shadow"
                >
                  <div className="flex items-center gap-3">
                    {/* Service Image */}
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />

                    {/* Service Details */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">
                        {item.name}
                      </h3>

                      <p className="text-xs text-gray-500 mt-1">
                        {item.categoryName}
                      </p>

                      <div className="flex items-center gap-1 text-yellow-500 text-sm mt-2">
                        <Star size={14} />
                        <span>{item.rating || 0}</span>
                      </div>

                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-green-600 font-bold">
                          ₹{item.discountedPrice}
                        </span>

                        {item.price > item.discountedPrice && (
                          <span className="text-gray-400 line-through text-sm">
                            ₹{item.price}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Book Button */}
                    {/* <button
                      onClick={() => navigate(`/booking/${item.id}`)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition ml-auto"
                    >
                      Book
                    </button> */}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
        {/* ================= NEARBY ================= */}
        <section>
          <h2 className="font-bold text-lg mb-3">
            Nearby Service Provider
          </h2>

          {loadingVendors ? (
            <p className="text-sm text-gray-500">Loading providers...</p>
          ) : (
            <div className="space-y-3">
              {nearbyVendors.map((item) => (
                <div
                  key={item.subVendorId}
                  className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-medium">{item.name}</h3>

                    <p className="text-xs text-gray-500">
                      {item.specialization}
                    </p>

                    <p
                      className={`text-xs mt-1 ${item.availabilityStatus === "AVAILABLE"
                        ? "text-green-600"
                        : "text-red-500"
                        }`}
                    >
                      {item.availabilityStatus}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      navigate(`/subvendor/${item.subVendorId}`)
                    }
                    className="text-blue-600 text-sm"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>


        {/* ================= TIP ================= */}
        <div className="bg-gray-900 text-white p-4 rounded-xl text-center text-sm">
          💡 Tip: Morning bookings get faster service & lower prices
        </div>

      </div>
    </UserLayout>
  );
}