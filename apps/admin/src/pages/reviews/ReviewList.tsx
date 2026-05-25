// ============================================
// ReviewList.tsx
// FULL CRUD UI - REVIEWS
// ============================================

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Star,
  Search,
  Trash2,
  Plus,
  Eye,
  Pencil,
} from "lucide-react";
import { useNavigate } from "react-router-dom";


const API = import.meta.env.VITE_API_URL;
  
interface Review {
  id: number;
  bookingId: number;
  userId: number;
  vendorId: number;
  serviceId: number;
  rating: number;
  comment: string;
  active: boolean;
  createdAt: string;
}

export default function ReviewList() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  // ============================================
  // FETCH REVIEWS
  // ============================================

  const fetchReviews = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API}/restful/v1/api/reviews`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("REVIEWS API RESPONSE => ", res.data);

      const data =
        res.data?.data ||
        res.data?.content ||
        res.data ||
        [];

      setReviews(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch Reviews Error:", error);
      alert("Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // ============================================
  // DELETE REVIEW
  // ============================================

  const deleteReview = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API}/restful/v1/api/reviews/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Review deleted successfully");

      fetchReviews();
    } catch (error) {
      console.error("Delete Error:", error);
      alert("Failed to delete review");
    }
  };

  // ============================================
  // FILTER
  // ============================================

  const filteredReviews = useMemo(() => {
    return reviews.filter((item) => {
      const text = search.toLowerCase();

      return (
        item.comment?.toLowerCase().includes(text) ||
        String(item.id).includes(text) ||
        String(item.userId).includes(text) ||
        String(item.vendorId).includes(text) ||
        String(item.serviceId).includes(text) ||
        String(item.bookingId).includes(text)
      );
    });
  }, [reviews, search]);

  // ============================================
  // UI
  // ============================================

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Reviews Management
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all customer reviews
          </p>
        </div>

        <button
          onClick={() => navigate("/reviews/create")}
          className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-xl hover:opacity-90 transition"
        >
          <Plus size={18} />
          Create Review
        </button>
      </div>

      {/* SEARCH */}
      <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
        <div className="relative">
          <Search
            className="absolute left-3 top-3 text-gray-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search reviews..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-gray-500">
            Loading reviews...
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            No reviews found
          </div>
        ) : (
          <div className="overflow-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr className="text-left text-sm text-gray-600">
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Booking</th>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Vendor</th>
                  <th className="px-6 py-4">Service</th>
                  <th className="px-6 py-4">Rating</th>
                  <th className="px-6 py-4">Comment</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredReviews.map((review) => (
                  <tr
                    key={review.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 font-semibold">
                      #{review.id}
                    </td>

                    <td className="px-6 py-4">
                      {review.bookingId}
                    </td>

                    <td className="px-6 py-4">
                      {review.userId}
                    </td>

                    <td className="px-6 py-4">
                      {review.vendorId}
                    </td>

                    <td className="px-6 py-4">
                      {review.serviceId}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <Star
                          size={16}
                          className="fill-yellow-400 text-yellow-400"
                        />

                        <span>{review.rating}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4 max-w-xs truncate">
                      {review.comment}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          review.active
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {review.active ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {/* VIEW */}
                        <button
                          onClick={() =>
                            navigate(`/reviews/view/${review.id}`)
                          }
                          className="p-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200"
                        >
                          <Eye size={18} />
                        </button>

                        {/* EDIT */}
                        <button
                          onClick={() =>
                            navigate(`/reviews/edit/${review.id}`)
                          }
                          className="p-2 rounded-lg bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                        >
                          <Pencil size={18} />
                        </button>

                        {/* DELETE */}
                        <button
                          onClick={() => deleteReview(review.id)}
                          className="p-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}