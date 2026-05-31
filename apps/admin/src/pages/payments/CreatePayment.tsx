import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

export default function CreatePayment() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(false);

  const [users, setUsers] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);

  const [form, setForm] = useState({
    userId: "",
    bookingId: "",
    amount: "",
    paymentMethod: "UPI",
    currency: "INR",
    gateway: "RAZORPAY",
    razorpayOrderId: "",
  });

  // ---------------- FETCH DATA ----------------
  const fetchData = async () => {
    try {
      const [u, b] = await Promise.all([
        axios.get(`${API}/restful/v1/api/users`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${API}/restful/v1/api/bookings`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setUsers(u.data?.data || []);
      setBookings(b.data?.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ---------------- HANDLE CHANGE ----------------
  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async () => {
    setLoading(true);

    try {
      const payload = {
        userId: Number(form.userId),
        bookingId: Number(form.bookingId),
        amount: Number(form.amount),
        currency: form.currency,
        paymentMethod: form.paymentMethod,
        paymentStatus: "PENDING",
        gateway: form.gateway,
        razorpayOrderId:
          form.razorpayOrderId || "order_" + Date.now(),
        razorpayPaymentId: null,
        razorpaySignature: null,
        refunded: false,
        refundAmount: 0,
      };

      await axios.post(
        `${API}/restful/v1/api/payments`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Payment created successfully");
      navigate("/payments");
    } catch (error) {
      console.error(error);
      alert("Failed to create payment");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- VALIDATION ----------------
  const isValid =
    form.userId && form.bookingId && form.amount;

  // ---------------- UI ----------------
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center px-4 py-10">

      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-8">

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/payments")}
          className="mb-4 text-gray-600 hover:text-black font-medium"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold text-center mb-6">
          Create Payment
        </h1>

        {/* USER */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">User</label>
          <select
            name="userId"
            value={form.userId}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value="">Select User</option>
            {users.map((u: any) => (
              <option key={u.userId} value={u.userId}>
                {u.name}
              </option>
            ))}
          </select>
        </div>

        {/* BOOKING */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Booking</label>
          <select
            name="bookingId"
            value={form.bookingId}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value="">Select Booking</option>
            {bookings.map((b: any) => (
              <option key={b.id} value={b.id}>
                Booking #{b.id}
              </option>
            ))}
          </select>
        </div>

        {/* AMOUNT */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Amount</label>
          <input
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            placeholder="Enter amount"
          />
        </div>

        {/* METHOD */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Payment Method</label>
          <select
            name="paymentMethod"
            value={form.paymentMethod}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value="UPI">UPI</option>
            <option value="CARD">CARD</option>
            <option value="CASH">CASH</option>
            <option value="WALLET">WALLET</option>
          </select>
        </div>

        {/* GATEWAY */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Gateway</label>
          <select
            name="gateway"
            value={form.gateway}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value="RAZORPAY">RAZORPAY</option>
            <option value="STRIPE">STRIPE</option>
          </select>
        </div>

        {/* ORDER ID */}
        <div className="mb-6">
          <label className="text-sm text-gray-600">
            Razorpay Order ID
          </label>
          <input
            name="razorpayOrderId"
            value={form.razorpayOrderId}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            placeholder="Optional"
          />
        </div>

        {/* BUTTON */}
        <button
          disabled={!isValid || loading}
          onClick={handleSubmit}
          className={`w-full py-3 rounded-lg font-semibold text-white transition ${
            isValid
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {loading ? "Creating..." : "Create Payment"}
        </button>

      </div>
    </div>
  );
}