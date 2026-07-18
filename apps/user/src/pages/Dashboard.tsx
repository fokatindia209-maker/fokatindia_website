import UserLayout from "../components/UserLayout";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Star,
  Clock,
  Sparkles,
  ChevronRight,
  MapPin,
  ShieldCheck,
} from "lucide-react";
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

function CategorySkeleton() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-xl bg-white shadow p-3 animate-pulse">
          <div className="aspect-square w-full rounded-lg bg-gray-200" />
          <div className="h-3 w-3/4 mx-auto mt-3 rounded bg-gray-200" />
        </div>
      ))}
    </div>
  );
}

function ServiceSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="bg-white p-4 rounded-xl shadow flex gap-3 animate-pulse">
          <div className="w-20 h-20 rounded-lg bg-gray-200 shrink-0" />
          <div className="flex-1 space-y-2 py-1">
            <div className="h-3 w-2/3 rounded bg-gray-200" />
            <div className="h-2.5 w-1/3 rounded bg-gray-200" />
            <div className="h-2.5 w-1/4 rounded bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
}

function VendorSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="bg-white p-4 rounded-xl shadow flex items-center gap-3 animate-pulse">
          <div className="w-12 h-12 rounded-full bg-gray-200 shrink-0" />
          <div className="flex-1 space-y-2 py-1">
            <div className="h-3 w-1/2 rounded bg-gray-200" />
            <div className="h-2.5 w-1/3 rounded bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
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
    if (loadingServices) return;

    if (!serviceId) {
      setLoadingVendors(false);
      return;
    }

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
  }, [serviceId, loadingServices]);

  const openServiceDetails = (service: Service) => {
    navigate(`/serviceDetails/${service.id}`);
  };

  const bookService = (service: Service) => {
    localStorage.setItem("service", JSON.stringify(service));
    navigate(`/subvendors/${service.id}`);
  };

  return (
    <UserLayout>
      <div className="space-y-5 py-4 px-4">

        {/* ================= SEARCH ================= */}
        <button
          onClick={() => navigate("/categories")}
          className="w-full flex items-center bg-white rounded-xl shadow px-4 py-3 text-left hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <Search size={18} className="text-gray-400 shrink-0" />
          <span className="ml-2 text-sm text-gray-400">
            Search services (AC, Cleaning, Repair...)
          </span>
        </button>

        {/* ================= MAIN BANNER ================= */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-2xl shadow">
          <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/10" />
          <div className="absolute -right-2 bottom-0 w-20 h-20 rounded-full bg-white/10" />

          <div className="relative">
            <h1 className="text-2xl font-bold leading-snug">
              Home Services at Your Doorstep
            </h1>
            <p className="text-sm mt-2 opacity-90">
              Trusted professionals, instant booking
            </p>

            <button
              onClick={() => navigate("/categories")}
              className="mt-4 bg-white text-blue-700 font-semibold text-sm px-4 py-2 rounded-lg shadow hover:bg-blue-50 transition"
            >
              Book a Service
            </button>
          </div>
        </div>

        {/* ================= OFFER + STATUS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-xl flex items-center gap-2">
            <Sparkles size={18} className="shrink-0" />
            <p className="text-sm font-medium">
              Flat 20% OFF on first booking 🎉
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-center gap-2 text-blue-700">
            <Clock size={16} className="shrink-0" />
            <p className="text-sm">
              Fast booking available in your area
            </p>
          </div>
        </div>

        {/* ================= CATEGORIES ================= */}

        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-lg">Categories</h2>

            {!loadingCategories && categories.length > 0 && (
              <button
                onClick={() => navigate("/categories")}
                className="flex items-center text-sm text-blue-600 font-medium hover:text-blue-700"
              >
                See All <ChevronRight size={16} />
              </button>
            )}
          </div>

          {loadingCategories ? (
            <CategorySkeleton />
          ) : categories.length === 0 ? (
            <p className="text-sm text-gray-500 bg-white rounded-xl shadow p-4 text-center">
              No categories available right now
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
                  className="bg-white rounded-xl text-center shadow hover:shadow-md active:scale-95 transition cursor-pointer overflow-hidden"
                >
                  <div className="aspect-square w-full bg-white flex items-center justify-center p-1">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <p className="text-xs font-medium py-2 px-1 truncate">
                    {/* {item.name} */}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>


        {/* ================= POPULAR SERVICES ================= */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-lg">Popular Services</h2>

            {!loadingServices && services.length > 0 && (
              <button
                onClick={() => navigate("/categories")}
                className="flex items-center text-sm text-blue-600 font-medium hover:text-blue-700"
              >
                See All <ChevronRight size={16} />
              </button>
            )}
          </div>

          {loadingServices ? (
            <ServiceSkeleton />
          ) : services.length === 0 ? (
            <p className="text-sm text-gray-500 bg-white rounded-xl shadow p-4 text-center">
              No featured services right now
            </p>
          ) : (
            <div className="space-y-3">
              {services.map((item) => {
                const discountPct =
                  item.price > item.discountedPrice
                    ? Math.round(
                      ((item.price - item.discountedPrice) / item.price) * 100
                    )
                    : 0;

                return (
                  <div
                    key={item.id}
                    onClick={() => openServiceDetails(item)}
                    className="bg-white p-4 rounded-xl shadow hover:shadow-md transition cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      {/* Service Image */}
                      <div className="relative shrink-0">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        {discountPct > 0 && (
                          <span className="absolute -top-2 -left-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow">
                            {discountPct}% OFF
                          </span>
                        )}
                      </div>

                      {/* Service Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm truncate">
                          {item.name}
                        </h3>

                        <p className="text-xs text-gray-500 mt-1 truncate">
                          {item.categoryName}
                        </p>

                        <div className="flex items-center gap-1 text-yellow-500 text-sm mt-2">
                          <Star size={14} fill="currentColor" />
                          <span className="text-gray-600 text-xs">{item.rating || 0}</span>
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
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          bookService(item);
                        }}
                        className="shrink-0 bg-blue-600 text-white px-3 py-2 rounded-lg text-xs font-medium hover:bg-blue-700 transition"
                      >
                        Book
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
        {/* ================= NEARBY ================= */}
        <section>
          <h2 className="font-bold text-lg mb-3 flex items-center gap-1">
            <MapPin size={18} className="text-blue-600" />
            Nearby Service Provider
          </h2>

          {loadingVendors ? (
            <VendorSkeleton />
          ) : nearbyVendors.length === 0 ? (
            <p className="text-sm text-gray-500 bg-white rounded-xl shadow p-4 text-center">
              No nearby providers found yet
            </p>
          ) : (
            <div className="space-y-3">
              {nearbyVendors.map((item) => (
                <div
                  key={item.subVendorId}
                  className="bg-white p-4 rounded-xl shadow flex justify-between items-center gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-700 font-semibold flex items-center justify-center shrink-0">
                      {item.name?.charAt(0)?.toUpperCase() || "?"}
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-medium truncate">{item.name}</h3>

                      <p className="text-xs text-gray-500 truncate">
                        {item.specialization}
                      </p>

                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${item.availabilityStatus === "AVAILABLE"
                            ? "bg-green-50 text-green-600"
                            : "bg-red-50 text-red-500"
                            }`}
                        >
                          {item.availabilityStatus}
                        </span>

                        {typeof item.rating === "number" && (
                          <span className="flex items-center gap-0.5 text-[11px] text-yellow-500">
                            <Star size={11} fill="currentColor" />
                            {item.rating}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      navigate(`/subvendor/${item.subVendorId}`)
                    }
                    className="shrink-0 text-blue-600 text-sm font-medium px-3 py-1.5 rounded-lg border border-blue-200 hover:bg-blue-50 transition"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>


        {/* ================= TIP ================= */}
        <div className="bg-gray-900 text-white p-4 rounded-xl flex items-center gap-2 text-sm">
          <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
          Tip: Morning bookings get faster service & lower prices
        </div>

      </div>
    </UserLayout>
  );
}
