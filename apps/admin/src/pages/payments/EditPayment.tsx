import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

export default function EditPayment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState<any>({
    userId: "",
    bookingId: "",
    amount: "",
    currency: "INR",
    paymentMethod: "UPI",
    paymentStatus: "PENDING",
    gateway: "RAZORPAY",
    razorpayOrderId: "",
    refunded: false,
    refundAmount: 0,
  });

  const token = localStorage.getItem("token");

  // ================= FETCH =================
  const fetchPayment = async () => {
    try {
      const res = await axios.get(
        `${API}/restful/v1/api/payments/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setForm(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayment();
  }, [id]);

  // ================= HANDLE CHANGE =================
  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ================= UPDATE =================
  const handleUpdate = async () => {
    try {
      await axios.put(
        `${API}/restful/v1/api/payments/${id}/status?status=${form.paymentStatus}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Payment updated successfully");
      navigate("/payments");
    } catch (err) {
      console.error(err);
    }
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-lg font-semibold">Loading payment...</div>
      </div>
    );
  }

  // ================= UI =================
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center px-4 py-10">

      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-8">

        {/* BACK */}
        <button
          onClick={() => navigate("/payments")}
          className="mb-4 text-gray-600 hover:text-black font-medium"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold text-center mb-6">
          Edit Payment
        </h1>

        {/* USER ID */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">User ID</label>
          <input
            name="userId"
            value={form.userId}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            disabled
          />
        </div>

        {/* BOOKING ID */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Booking ID</label>
          <input
            name="bookingId"
            value={form.bookingId}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            disabled
          />
        </div>

        {/* AMOUNT */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Amount</label>
          <input
            name="amount"
            value={form.amount}
            className="w-full border rounded-lg p-3"
            disabled
          />
        </div>

        {/* METHOD */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Payment Method</label>
          <input
            name="paymentMethod"
            value={form.paymentMethod}
            className="w-full border rounded-lg p-3"
            disabled
          />
        </div>

        {/* STATUS (ONLY EDITABLE FIELD) */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Payment Status</label>
          <select
            name="paymentStatus"
            value={form.paymentStatus}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value="PENDING">PENDING</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="FAILED">FAILED</option>
            <option value="REFUNDED">REFUNDED</option>
          </select>
        </div>

        {/* GATEWAY */}
        <div className="mb-6">
          <label className="text-sm text-gray-600">Gateway</label>
          <input
            name="gateway"
            value={form.gateway}
            className="w-full border rounded-lg p-3"
            disabled
          />
        </div>

        {/* BUTTON */}
        <button
          onClick={handleUpdate}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Update Payment
        </button>

      </div>
    </div>
  );
}