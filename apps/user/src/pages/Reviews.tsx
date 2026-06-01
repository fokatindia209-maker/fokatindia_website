import UserLayout from "../components/UserLayout";
import { Star } from "lucide-react";
import { useState } from "react";

export default function Reviews() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const reviews = [
    { id: 1, name: "Amit", rating: 5, comment: "Great service!" },
    { id: 2, name: "Rahul", rating: 4, comment: "Good experience" },
  ];

  const submitReview = () => {
    alert(`Review Submitted ⭐ ${rating}`);
  };

  return (
    <UserLayout>
      <div className="space-y-6 max-w-xl mx-auto">

        <h1 className="text-2xl font-bold">
          Reviews
        </h1>

        {/* ADD REVIEW */}
        <div className="bg-white p-4 rounded-xl shadow space-y-3">
          <h2 className="font-semibold">Write Review</h2>

          <div className="flex gap-1">
            {[1,2,3,4,5].map((i) => (
              <Star
                key={i}
                onClick={() => setRating(i)}
                className={`cursor-pointer ${
                  i <= rating ? "text-yellow-500" : "text-gray-300"
                }`}
              />
            ))}
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write feedback..."
            className="w-full border p-3 rounded-xl"
          />

          <button
            onClick={submitReview}
            className="w-full bg-blue-600 text-white py-2 rounded-xl"
          >
            Submit Review
          </button>
        </div>

        {/* REVIEW LIST */}
        <div className="space-y-3">
          {reviews.map((r) => (
            <div key={r.id} className="bg-white p-4 rounded-xl shadow">
              <h3 className="font-semibold">{r.name}</h3>

              <div className="text-yellow-500 text-sm flex gap-1">
                ⭐ {r.rating}
              </div>

              <p className="text-gray-600 text-sm">
                {r.comment}
              </p>
            </div>
          ))}
        </div>

      </div>
    </UserLayout>
  );
}