import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

export default function EditNotification() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState<any>({
    userId: "",
    title: "",
    message: "",
    type: "",
    readStatus: false,
    createdAt: "",
  });

  // ================= FETCH =================
  const fetchNotification = async () => {
    try {
      const res = await axios.get(
        `${API}/restful/v1/api/notifications/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setForm(res.data?.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotification();
  }, [id]);

  // ================= HANDLE CHANGE =================
  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ================= UPDATE NOTIFICATION =================
  const handleUpdate = async () => {
    try {
      await axios.put(
        `${API}/restful/v1/api/notifications/${id}`,
        {
          title: form.title,
          message: form.message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Notification updated successfully");
      navigate("/notifications");
    } catch (err) {
      console.error(err);
    }
  };

  // ================= MARK AS READ =================
  const markAsRead = async () => {
    try {
      await axios.put(
        `${API}/restful/v1/api/notifications/${id}/read`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Marked as read");
      fetchNotification();
    } catch (err) {
      console.error(err);
    }
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-lg font-semibold">Loading...</div>
      </div>
    );
  }

  // ================= UI =================
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center px-4 py-12">

      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-8">

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/notifications")}
          className="mb-4 text-gray-600 hover:text-black font-medium"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold text-center mb-6">
          Edit Notification
        </h1>

        {/* USER ID (READ ONLY) */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">User ID</label>
          <input
            value={form.userId}
            disabled
            className="w-full border p-3 rounded bg-gray-100"
          />
        </div>

        {/* TITLE */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />
        </div>

        {/* MESSAGE */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />
        </div>

        {/* TYPE */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Type</label>
          <input
            value={form.type}
            disabled
            className="w-full border p-3 rounded bg-gray-100"
          />
        </div>

        {/* STATUS */}
        <div className="mb-6">
          <label className="text-sm text-gray-600">Status</label>
          <div className="mt-1">
            <span
              className={`px-3 py-1 text-sm rounded ${
                form.readStatus
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {form.readStatus ? "READ" : "UNREAD"}
            </span>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-3">

          {/* UPDATE */}
          <button
            onClick={handleUpdate}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
          >
            Update
          </button>

          {/* MARK AS READ */}
          {!form.readStatus && (
            <button
              onClick={markAsRead}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
            >
              Mark Read
            </button>
          )}
        </div>

      </div>
    </div>
  );
}