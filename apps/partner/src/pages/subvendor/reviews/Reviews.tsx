import { Star } from "lucide-react";
import PartnerLayout from "../../../components/PartnerLayout";

export default function Reviews() {
  const reviews = [
    {
      id: 1,
      customer: "Rahul Sharma",
      service: "Deep Cleaning",
      rating: 5,
      comment: "Excellent service",
    },
    {
      id: 2,
      customer: "Amit Kumar",
      service: "Sofa Cleaning",
      rating: 4,
      comment: "Good work",
    },
  ];

  return (
    <PartnerLayout>
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Reviews</h1>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-gray-500">Overall Rating</h2>
          <p className="text-3xl font-bold">4.8 ⭐</p>
        </div>

        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-gray-500">Total Reviews</h2>
          <p className="text-3xl font-bold">245</p>
        </div>

        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-gray-500">5 Star Reviews</h2>
          <p className="text-3xl font-bold">180</p>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((r) => (
          <div
            key={r.id}
            className="bg-white shadow rounded-xl p-4"
          >
            <h3 className="font-semibold">{r.customer}</h3>

            <p className="text-sm text-gray-500">
              {r.service}
            </p>

            <div className="flex mt-2">
              {[...Array(r.rating)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill="currentColor"
                />
              ))}
            </div>

            <p className="mt-2">{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
    </PartnerLayout>
  );
}