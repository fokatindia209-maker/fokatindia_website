import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

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

  const fetchPayments = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/restful/v1/api/payments`);

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

  const deletePayment = async (id: number) => {
    if (!confirm("Delete this payment?")) return;

    try {
      await api.delete(`/restful/v1/api/payments/${id}`);
      fetchPayments();
    } catch (err) {
      console.error(err);
    }
  };

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

      {/* MOBILE CARDS */}
      <div className="md:hidden space-y-3">
        {loading && (
          <div className="bg-white rounded-xl p-6 text-center text-gray-500">
            <Loader2 className="w-5 h-5 animate-spin text-blue-600 mx-auto mb-2" />
            Loading payments...
          </div>
        )}
        {!loading && payments.length === 0 && (
          <div className="bg-white rounded-xl p-6 text-center text-gray-500">No payments found</div>
        )}
        {!loading && payments.map((p) => (
          <div key={p.id} className="bg-white rounded-xl shadow p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-blue-600">₹{p.amount}</span>
              <span className={`px-2 py-1 rounded-full text-xs ${statusColor(p.paymentStatus)}`}>{p.paymentStatus}</span>
            </div>
            <p className="text-sm text-gray-500">User: {p.userId} · Booking: {p.bookingId}</p>
            <p className="text-sm text-gray-500">{p.paymentMethod} · {p.gateway}</p>
            <p className="text-xs text-gray-400">{new Date(p.createdAt).toLocaleDateString()}</p>
            <div className="flex gap-2 pt-1">
              <button onClick={() => navigate(`/payments/edit/${p.id}`)} className="px-3 py-1 bg-blue-600 text-white rounded text-sm">View/Edit</button>
              <button onClick={() => deletePayment(p.id)} className="px-3 py-1 bg-red-500 text-white rounded text-sm">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block bg-white shadow rounded-lg overflow-hidden">

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

        {/* LOADER BELOW HEADER ROW */}
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
                  onClick={() => navigate(`/payments/edit/${p.id}`)}
                  className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  View/Edit
                </button>
              </div>

              <div>
                <button
                  onClick={() => deletePayment(p.id)}
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
