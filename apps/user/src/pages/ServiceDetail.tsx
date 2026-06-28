import UserLayout from "../components/UserLayout";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Star, Clock, Tag } from "lucide-react";
import api from "../api/axios";

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  discountedPrice: number;
  taxPercentage: number;
  durationMinutes: number;
  imageUrl: string;
  rating: number;
  totalReviews: number;
  serviceType: string;
  categoryId: number;
}

export default function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/services/${id}`)
      .then((res) => setService(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const handleBookNow = () => {
    if (!service) return;
    const tax = (service.discountedPrice * service.taxPercentage) / 100;
    localStorage.setItem("service", JSON.stringify({
      id: service.id,
      name: service.name,
      price: service.price,
      discountedPrice: service.discountedPrice,
      taxPercentage: service.taxPercentage,
      taxAmount: tax,
      finalPrice: service.discountedPrice + tax,
    }));
    localStorage.setItem("categoryId", String(service.categoryId));
    navigate("/addresses");
  };

  if (loading) {
    return (
      <UserLayout>
        <div className="text-center py-10 text-gray-400">Loading...</div>
      </UserLayout>
    );
  }

  if (!service) {
    return (
      <UserLayout>
        <div className="text-center text-gray-500 py-10">Service not found</div>
      </UserLayout>
    );
  }

  const tax = (service.discountedPrice * service.taxPercentage) / 100;
  const finalPrice = service.discountedPrice + tax;
  const hasDiscount = service.discountedPrice < service.price;

  return (
    <UserLayout>
      <div className="max-w-xl mx-auto py-4 px-4 space-y-5">

        {service.imageUrl && (
          <img
            src={service.imageUrl}
            alt={service.name}
            className="w-full h-52 object-cover rounded-2xl"
          />
        )}

        <div>
          <h1 className="text-2xl font-bold">{service.name}</h1>
          <p className="text-gray-500 text-sm mt-1">{service.serviceType}</p>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-1 text-yellow-500 font-medium">
            <Star size={15} fill="currentColor" /> {service.rating?.toFixed(1) ?? "—"}
          </span>
          <span>{service.totalReviews} reviews</span>
          {service.durationMinutes && (
            <span className="flex items-center gap-1">
              <Clock size={14} /> {service.durationMinutes} min
            </span>
          )}
        </div>

        <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>

        <div className="bg-white rounded-xl shadow p-4 space-y-2">
          {hasDiscount && (
            <div className="flex justify-between text-sm text-gray-400">
              <span>Original Price</span>
              <span className="line-through">₹{service.price.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span>Service Price</span>
            <span className="text-green-600 font-medium">₹{service.discountedPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span className="flex items-center gap-1"><Tag size={13} /> Tax ({service.taxPercentage}%)</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>
          <hr />
          <div className="flex justify-between font-bold text-base">
            <span>Total</span>
            <span className="text-blue-600">₹{finalPrice.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={handleBookNow}
          className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition font-medium"
        >
          Book Now
        </button>

      </div>
    </UserLayout>
  );
}
