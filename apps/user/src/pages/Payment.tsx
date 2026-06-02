import UserLayout from "../components/UserLayout";
import { useState } from "react";
import { CreditCard, Wallet } from "lucide-react";

export default function Payment() {
  const [method, setMethod] = useState("card");

  const amount = 499;
  const tax = 50;
  const total = amount + tax;

  const handlePay = () => {
    alert(`Payment Successful ₹${total} 🎉`);
  };

  return (
    <UserLayout>
      <div className="max-w-xl mx-auto space-y-6 py-4 px-4">

        {/* ORDER SUMMARY */}
        <div className="bg-white p-4 rounded-xl shadow space-y-2">
          <div className="flex justify-between">
            <span>Service Amount</span>
            <span>₹{amount}</span>
          </div>

          <div className="flex justify-between">
            <span>Tax</span>
            <span>₹{tax}</span>
          </div>

          <hr />

          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span className="text-green-600">₹{total}</span>
          </div>
        </div>

        {/* PAYMENT METHODS */}
        <div className="space-y-3">
          <h2 className="font-semibold">Select Payment Method</h2>

          <div
            onClick={() => setMethod("card")}
            className={`p-4 border rounded-xl flex items-center gap-3 cursor-pointer ${
              method === "card" ? "border-blue-600" : ""
            }`}
          >
            <CreditCard />
            Credit / Debit Card
          </div>

          <div
            onClick={() => setMethod("wallet")}
            className={`p-4 border rounded-xl flex items-center gap-3 cursor-pointer ${
              method === "wallet" ? "border-blue-600" : ""
            }`}
          >
            <Wallet />
            Wallet / UPI
          </div>
        </div>

        {/* PAY BUTTON */}
        <button
          onClick={handlePay}
          className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
        >
          Pay ₹{total}
        </button>

      </div>
    </UserLayout>
  );
}