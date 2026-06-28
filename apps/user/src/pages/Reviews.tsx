import UserLayout from "../components/UserLayout";
import { Star, Loader } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

interface Booking {
  id: number;
  subVendorId: number;
  vendorId: number;
  categoryId: number;
  serviceId: number;
}

export default function Reviews() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!bookingId) return;
    api.get(`/bookings/${bookingId}`)
      .then((res) => setBooking(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [bookingId]);

  const submitReview = async () => {
    if (!rating) { alert("Please select a rating"); return; }
    if (!booking) return;

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setSubmitting(true);
    try {
      await api.post("/reviews", {
        bookingId: booking.id,
        userId: user.userId,
        vendorId: booking.vendorId,
        subVendorId: booking.subVendorId,
        categoryId: booking.categoryId,
        serviceId: booking.serviceId,
        rating,
        comment,
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <UserLayout>
        <div className="flex justify-center py-20">
          <Loader className="animate-spin text-blue-500" />
        </div>
      </UserLayout>
    );
  }

  if (submitted) {
    return (
      <UserLayout>
        <div className="text-center py-20 space-y-4">
          <div className="text-5xl">⭐</div>
          <h2 className="text-xl font-bold text-gray-800">Thank you for your review!</h2>
          <button
            onClick={() => navigate("/order_history")}
            className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
          >
            Back to Orders
          </button>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="space-y-6 max-w-xl mx-auto px-4 py-4">

        <h1 className="text-2xl font-bold">Write a Review</h1>
        <p className="text-gray-500 text-sm">Booking #{bookingId}</p>

        <div className="bg-white p-5 rounded-xl shadow space-y-4">

          <div>
            <p className="text-sm font-medium mb-2">Your Rating</p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  size={32}
                  onClick={() => setRating(i)}
                  className={`cursor-pointer transition-colors ${
                    i <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Your Feedback</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience..."
              className="w-full border p-3 rounded-xl mt-1 text-sm"
              rows={4}
            />
          </div>

          <button
            onClick={submitReview}
            disabled={submitting || !rating}
            className={`w-full py-3 rounded-xl font-medium transition ${
              submitting || !rating
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </button>

        </div>

      </div>
    </UserLayout>
  );
}
