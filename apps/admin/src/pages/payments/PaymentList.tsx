import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const API = import.meta.env.VITE_API_URL;

interface Payment {
  id: number;
  userId: number;
  bookingId: number;
  amount: number;
  currency: string;
  paymentMethod: string;
  paymentStatus: string;
  gateway: string;
  razorpayOrderId: string;
  refunded: boolean;
  refundAmount: number;
  createdAt: string;
}

export default function PaymentList() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchPayments = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API}/restful/v1/api/payments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPayments(res.data?.data || []);
    } catch (err) {
      console.error(err);
      setPayments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const statusColor = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return "bg-green-100 text-green-700";
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      case "FAILED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen px-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Payments</h1>

        <div className="flex gap-3">
          <button
            onClick={fetchPayments}
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            Refresh
          </button>

          <button
            onClick={() => navigate("/payments/create")}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            + Create Payment
          </button>
        </div>
      </div>

      {/* CARD WRAPPER */}
      <div className="bg-white shadow rounded-lg overflow-hidden">

        {/* HEADER ROW */}
        <div className="grid grid-cols-11 bg-gray-100 text-xs font-semibold p-3">
          <div>ID</div>
          <div>User</div>
          <div>Booking</div>
          <div>Amount</div>
          <div>Method</div>
          <div>Status</div>
          <div>Gateway</div>
          <div>Refund</div>
          <div>Created</div>
          <div>Action</div>
          <div></div>
        </div>

        {/* 🔥 LOADER BELOW HEADER ROW */}
        {loading && (
          <div className="border-t p-10 flex justify-center items-center">
            <div className="flex items-center gap-2 text-blue-600">
              <Loader2 className="w-5 h-5 animate-spin" />
              Loading payments...
            </div>
          </div>
        )}

        {/* BODY */}
        {!loading &&
          payments.map((p) => (
            <div
              key={p.id}
              className="grid grid-cols-11 p-3 border-t text-sm items-center hover:bg-gray-50"
            >
              <div className="font-medium">{p.id}</div>
              <div>{p.userId}</div>
              <div>{p.bookingId}</div>

              <div className="font-semibold text-blue-600">
                ₹{p.amount}
              </div>

              <div>{p.paymentMethod}</div>

              <div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${statusColor(
                    p.paymentStatus
                  )}`}
                >
                  {p.paymentStatus}
                </span>
              </div>

              <div>{p.gateway}</div>

              <div>
                {p.refunded ? (
                  <span className="text-green-600 text-xs font-semibold">
                    REFUNDED
                  </span>
                ) : (
                  <span className="text-gray-400 text-xs">NO</span>
                )}
              </div>

              <div className="text-xs text-gray-500">
                {new Date(p.createdAt).toLocaleDateString()}
              </div>

              <div>
                <button
                  onClick={() =>
                    navigate(`/payments/edit/${p.id}`)
                  }
                  className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  View/Edit
                </button>
              </div>

              <div>
                <button
                  onClick={() =>
                    navigate(`/payments/edit/${p.id}`)
                  }
                  className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

        {/* EMPTY STATE */}
        {!loading && payments.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No payments found
          </div>
        )}
      </div>
    </div>
  );
}