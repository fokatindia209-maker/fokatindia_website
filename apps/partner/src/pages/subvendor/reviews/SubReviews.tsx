import { useEffect, useState } from "react";
import { Star, Loader2 } from "lucide-react";
import PartnerLayout from "../../../components/PartnerLayout";
import api from "../../../api/axios";

interface Review {
  id: number;
  bookingId: number;
  userId: number;
  rating: number;
  comment: string;
  active: boolean;
  createdAt: string;
}

export default function SubReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const res = await api.get(
          `/restful/v1/api/reviews/subvendor/${user.subVendorId}`
        );
        setReviews(res.data?.data || []);
      } catch (err) {
        console.error(err);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const avgRating =
    reviews.length
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : "0.0";

  const fiveStarCount = reviews.filter((r) => r.rating === 5).length;

  return (
    <PartnerLayout role="SUB_VENDOR">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Reviews</h1>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white shadow rounded-xl p-4">
            <h2 className="text-gray-500">Overall Rating</h2>
            <p className="text-3xl font-bold">{avgRating} ⭐</p>
          </div>
          <div className="bg-white shadow rounded-xl p-4">
            <h2 className="text-gray-500">Total Reviews</h2>
            <p className="text-3xl font-bold">{reviews.length}</p>
          </div>
          <div className="bg-white shadow rounded-xl p-4">
            <h2 className="text-gray-500">5 Star Reviews</h2>
            <p className="text-3xl font-bold">{fiveStarCount}</p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-10 gap-2 text-gray-600">
            <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
            Loading reviews...
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-10 text-gray-500">No reviews yet</div>
        ) : (
          <div className="space-y-4">
            {reviews.map((r) => (
              <div key={r.id} className="bg-white shadow rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">Booking #{r.bookingId}</span>
                  <span className="text-xs text-gray-400">
                    {new Date(r.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i <= r.rating ? "#facc15" : "#e5e7eb"}
                      className={i <= r.rating ? "text-yellow-400" : "text-gray-200"}
                    />
                  ))}
                  <span className="ml-1 text-sm font-medium text-gray-600">
                    {r.rating}/5
                  </span>
                </div>

                <p className="text-gray-700">{r.comment || "No comment"}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </PartnerLayout>
  );
}
