import UserLayout from "../components/UserLayout";
import { useParams } from "react-router-dom";
import { Star } from "lucide-react";

export default function ServiceDetail() {
  const { id } = useParams();

  const services = [
    { id: "1", name: "Deep Home Cleaning", price: 499, rating: 4.5, desc: "Full home deep cleaning service" },
    { id: "2", name: "Bathroom Cleaning", price: 299, rating: 4.2, desc: "Deep bathroom cleaning" },
    { id: "3", name: "AC Repair Service", price: 799, rating: 4.7, desc: "AC repair & maintenance" },
  ];

  const service = services.find((s) => s.id === id);

  if (!service) {
    return (
      <UserLayout>
        <div className="text-center text-gray-500 py-10">
          Service not found 😢
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="space-y-6">

        {/* TITLE */}
        <h1 className="text-2xl font-bold">
          {service.name}
        </h1>

        {/* RATING */}
        <div className="flex items-center gap-2 text-yellow-500">
          <Star size={18} />
          {service.rating}
        </div>

        {/* PRICE */}
        <p className="text-green-600 font-bold text-xl">
          ₹{service.price}
        </p>

        {/* DESCRIPTION */}
        <p className="text-gray-600">
          {service.desc}
        </p>

        {/* BOOK BUTTON */}
        <button className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition">
          Book Now
        </button>

      </div>
    </UserLayout>
  );
}