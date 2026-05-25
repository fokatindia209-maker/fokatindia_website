import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

export default function SendNotification() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    userId: "",
    title: "",
    message: "",
    fcmToken: "",
    type: "ORDER",
  });

  const [loading, setLoading] = useState(false);

  // ================= HANDLE CHANGE =================
  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ================= SUBMIT =================
  const handleSubmit = async () => {
    try {
      setLoading(true);

      const payload = {
        userId: Number(form.userId),
        title: form.title,
        message: form.message,
        fcmToken: form.fcmToken,
        type: form.type,
      };

      await axios.post(
        `${API}/restful/v1/api/notifications`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Notification sent successfully");
      navigate("/notifications");
    } catch (err) {
      console.error(err);
      alert("Failed to send notification");
    } finally {
      setLoading(false);
    }
  };

  // ================= UI =================
  return (
    <div className="min-h-screen bg-gray-100 py-12 flex items-center justify-center px-4">

      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-6">

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/notifications")}
          className="text-gray-600 hover:text-black mb-4"
        >
          ← Back
        </button>

        <h1 className="text-2xl font-bold mb-6 text-center">
          Send Notification
        </h1>

        {/* USER ID */}
        <input
          name="userId"
          placeholder="User ID"
          value={form.userId}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-3"
        />

        {/* TITLE */}
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-3"
        />

        {/* MESSAGE */}
        <textarea
          name="message"
          placeholder="Message"
          value={form.message}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-3"
        />

        {/* FCM TOKEN */}
        <input
          name="fcmToken"
          placeholder="FCM Token (Device Token)"
          value={form.fcmToken}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-3"
        />

        {/* TYPE */}
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
        >
          <option value="ORDER">ORDER</option>
          <option value="PAYMENT">PAYMENT</option>
          <option value="SYSTEM">SYSTEM</option>
          <option value="PROMO">PROMO</option>
        </select>

        {/* SUBMIT BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
        >
          {loading ? "Sending..." : "Send Notification"}
        </button>
      </div>
    </div>
  );
}