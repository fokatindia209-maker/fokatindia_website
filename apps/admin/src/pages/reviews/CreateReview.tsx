// ============================================
// CreateReview.tsx
// CREATE REVIEW SCREEN
// ============================================

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Star } from "lucide-react";

const API = "http://localhost:8001/restful/v1/api/reviews";


export default function CreateReview() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(false);

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
  // CREATE REVIEW
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

      console.log("CREATE REVIEW PAYLOAD => ", payload);

      await axios.post(API, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      alert("Review created successfully");

      navigate("/reviews");
    } catch (error) {
      console.error("Create Review Error:", error);

      alert("Failed to create review");
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // UI
  // ============================================

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* TOP BAR */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Create Review
          </h1>

          <p className="text-gray-500 mt-1">
            Add new customer review
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
              {loading ? "Creating..." : "Create Review"}
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