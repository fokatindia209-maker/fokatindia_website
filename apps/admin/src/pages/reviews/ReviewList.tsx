// ============================================
// ReviewList.tsx
// FULL CRUD UI - REVIEWS (WITH LOADER ROW)
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
  Loader2,
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

  const fetchReviews = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API}/restful/v1/api/reviews`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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

  const deleteReview = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${API}/restful/v1/api/reviews/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchReviews();
    } catch (error) {
      console.error("Delete Error:", error);
      alert("Failed to delete review");
    }
  };

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
          className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-xl hover:opacity-90"
        >
          <Plus size={18} />
          Create Review
        </button>
      </div>

      {/* SEARCH */}
      <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />

          <input
            type="text"
            placeholder="Search reviews..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
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

            {/* ✅ LOADER ROW BELOW HEADER */}
            {loading && (
              <tr>
                <td colSpan={9} className="p-8">
                  <div className="flex items-center justify-center gap-2 text-blue-600">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Loading reviews...
                  </div>
                </td>
              </tr>
            )}

            {/* DATA */}
            {!loading &&
              filteredReviews.map((review) => (
                <tr key={review.id} className="border-b hover:bg-gray-50">

                  <td className="px-6 py-4 font-semibold">
                    #{review.id}
                  </td>

                  <td className="px-6 py-4">{review.bookingId}</td>
                  <td className="px-6 py-4">{review.userId}</td>
                  <td className="px-6 py-4">{review.vendorId}</td>
                  <td className="px-6 py-4">{review.serviceId}</td>

                  <td className="px-6 py-4 flex items-center gap-1">
                    <Star size={16} className="text-yellow-400 fill-yellow-400" />
                    {review.rating}
                  </td>

                  <td className="px-6 py-4 max-w-xs truncate">
                    {review.comment}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        review.active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {review.active ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex gap-2">

                      <button
                        onClick={() =>
                          navigate(`/reviews/view/${review.id}`)
                        }
                        className="p-2 bg-blue-100 rounded"
                      >
                        <Eye size={16} />
                      </button>

                      <button
                        onClick={() =>
                          navigate(`/reviews/edit/${review.id}`)
                        }
                        className="p-2 bg-yellow-100 rounded"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() => deleteReview(review.id)}
                        className="p-2 bg-red-100 rounded"
                      >
                        <Trash2 size={16} />
                      </button>

                    </div>
                  </td>

                </tr>
              ))}

            {/* EMPTY STATE */}
            {!loading && filteredReviews.length === 0 && (
              <tr>
                <td colSpan={9} className="p-8 text-center text-gray-500">
                  No reviews found
                </td>
              </tr>
            )}

          </tbody>
        </table>
      </div>
    </div>
  );
}