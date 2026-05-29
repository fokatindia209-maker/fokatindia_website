// ============================================
// EditReview.tsx
// EDIT REVIEW SCREEN
// ============================================

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Star } from "lucide-react";

const API = import.meta.env.VITE_API_URL;


export default function EditReview() {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const [form, setForm] = useState({
    bookingId: "",
    userId: "",
    vendorId: "",
    serviceId: "",
    rating: 5,
    comment: "",
  });

  // ============================================
  // HANDLE CHANGE
  // ============================================

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ============================================
  // FETCH REVIEW
  // ============================================

  const fetchReview = async () => {
    try {
      setPageLoading(true);

      const res = await axios.get(`${API}/restful/v1/api/reviews/${id}`, {
        headers: {
         Authorization: `Bearer ${token}`,
        },
      });

      console.log("REVIEW DETAILS => ", res.data);

      const review = res.data?.data || res.data;

      setForm({
        bookingId: String(review.bookingId || ""),
        userId: String(review.userId || ""),
        vendorId: String(review.vendorId || ""),
        serviceId: String(review.serviceId || ""),
        rating: Number(review.rating || 5),
        comment: review.comment || "",
      });
    } catch (error) {
      console.error("Fetch Review Error:", error);

      alert("Failed to fetch review details");
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchReview();
  }, []);

  // ============================================
  // UPDATE REVIEW
  // ============================================

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        bookingId: Number(form.bookingId),
        userId: Number(form.userId),
        vendorId: Number(form.vendorId),
        serviceId: Number(form.serviceId),
        rating: Number(form.rating),
        comment: form.comment,
      };

      console.log("UPDATE REVIEW PAYLOAD => ", payload);

      await axios.put(`${API}/restful/v1/api/reviews/${id}`, payload, {
        headers: {
         Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      alert("Review updated successfully");

      navigate("/reviews");
    } catch (error) {
      console.error("Update Review Error:", error);

      alert("Failed to update review");
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // LOADING
  // ============================================

  if (pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-lg text-gray-500">
          Loading review...
        </div>
      </div>
    );
  }

  // ============================================
  // UI
  // ============================================

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      {/* TOP BAR */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Edit Review
          </h1>

          <p className="text-gray-500 mt-1">
            Update customer review details
          </p>
        </div>

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/reviews")}
          className="flex items-center gap-2 bg-white border px-4 py-2 rounded-xl hover:bg-gray-50"
        >
          <ArrowLeft size={18} />
          Back
        </button>
      </div>

      {/* FORM CARD */}
      <div className="bg-white rounded-2xl shadow-sm p-8 max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* BOOKING ID */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Booking ID
            </label>

            <input
              type="number"
              name="bookingId"
              value={form.bookingId}
              onChange={handleChange}
              required
              placeholder="Enter booking id"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* USER ID */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              User ID
            </label>

            <input
              type="number"
              name="userId"
              value={form.userId}
              onChange={handleChange}
              required
              placeholder="Enter user id"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* VENDOR ID */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Vendor ID
            </label>

            <input
              type="number"
              name="vendorId"
              value={form.vendorId}
              onChange={handleChange}
              required
              placeholder="Enter vendor id"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* SERVICE ID */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Service ID
            </label>

            <input
              type="number"
              name="serviceId"
              value={form.serviceId}
              onChange={handleChange}
              required
              placeholder="Enter service id"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* RATING */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Rating
            </label>

            <div className="flex items-center gap-3">
              <input
                type="number"
                min={1}
                max={5}
                name="rating"
                value={form.rating}
                onChange={handleChange}
                required
                className="w-32 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />

              <div className="flex items-center gap-1">
                {Array.from({ length: Number(form.rating) }).map(
                  (_, index) => (
                    <Star
                      key={index}
                      size={20}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  )
                )}
              </div>
            </div>
          </div>

          {/* COMMENT */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Comment
            </label>

            <textarea
              name="comment"
              value={form.comment}
              onChange={handleChange}
              required
              rows={5}
              placeholder="Write review comment..."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black resize-none"
            />
          </div>

          {/* BUTTONS */}
          <div className="flex items-center gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white px-6 py-3 rounded-xl hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Review"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/reviews")}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}