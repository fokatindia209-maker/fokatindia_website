import UserLayout from "../components/UserLayout";
import { useLocation, useNavigate  } from "react-router-dom";
import { CreditCard } from "lucide-react";
import api from "../api/axios";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Payment() {
  const location = useLocation();
const navigate = useNavigate();
  const {
    bookingId,
    userId,
    name,
    email,
    mobile,
    amount = 0,
    tax = 0,
    total = 0,
  } = location.state || {};

  const handlePay = async () => {
    try {

      // Create Razorpay Order from backend
      const { data } = await api.post(
        "/payments",
        {
          bookingId,
          userId,
          amount: total,
          currency: "INR",
          paymentMethod: "UPI",
          gateway: "RAZORPAY",
        }
      );

      const order = data.data;
    console.log("payment", order)
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: order.amount * 100,
        currency: order.currency,
        order_id: order.razorpayOrderId,

        name: "Fokat India",
        description: "Service Booking Payment",

        prefill: {
          name: name || "",
          email: email || "",
          contact: mobile || "", // Mobile Number
        },

        handler: async (response: any) => {
          try {
            console.log("payment", response)
            const verifyRes = await api.post(
              "/payments/verify",
              {
                bookingId,
                userId,

                razorpayOrderId:
                  response.razorpay_order_id,

                razorpayPaymentId:
                  response.razorpay_payment_id,

                razorpaySignature:
                  response.razorpay_signature,
              }
            );

            console.log(
              "Verification Response",
              verifyRes.data
            );

            alert("Payment Successful 🎉");
navigate("/dashboard", { replace: true });
          } catch (error) {
            console.error(error);
            alert("Payment verification failed");
          }
        },

        modal: {
          ondismiss: () => {
            console.log("Payment popup closed");
          },
        },

      

        notes: {
          bookingId: bookingId,
        },

        theme: {
          color: "#2563eb",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on(
        "payment.failed",
        function (response: any) {
          console.error(response.error);

          alert(
            response.error.description ||
            "Payment Failed"
          );
        }
      );

      razorpay.open();

    } catch (error) {
      console.error(error);
      alert("Unable to create order");
    }
  };

  return (
    <UserLayout>
      <div className="max-w-xl mx-auto py-4 px-4 space-y-6">

        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-4">
            Order Summary
          </h2>

          <div className="flex justify-between">
            <span>Service Amount</span>
            <span>₹{amount}</span>
          </div>

          <div className="flex justify-between mt-2">
            <span>Tax</span>
            <span>₹{tax}</span>
          </div>

          <hr className="my-3" />

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span className="text-green-600">
              ₹{total}
            </span>
          </div>
        </div>

        <div className="border rounded-xl p-4 flex items-center gap-3">
          <CreditCard />
          <span>
            Razorpay (UPI, Cards, Wallet,
            Net Banking)
          </span>
        </div>

        <button
          onClick={handlePay}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
        >
          Pay ₹{total}
        </button>

      </div>
    </UserLayout>
  );
}