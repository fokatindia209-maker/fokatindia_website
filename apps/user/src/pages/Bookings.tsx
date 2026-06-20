import UserLayout from "../components/UserLayout";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Calendar, Clock } from "lucide-react";
import api from "../api/axios";


export default function Booking() {
  const location = useLocation();
  const navigate = useNavigate();

  const addressId = location.state?.addressId;
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const price = 499;
  const tax = 50;
  const total = price + tax;


  const handleBooking = async () => {

    let vendorId = localStorage.getItem("vendorId");
    let subVendorId = localStorage.getItem("subVendorId");
    let categoryId = localStorage.getItem("categoryId");
    let serviceId = localStorage.getItem("serviceId");

    console.log("", vendorId, subVendorId, categoryId, serviceId)
    if (!date || !time) {
      alert("Please fill all required fields");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const bookingData = {
      userId: user.userId,
      vendorId: vendorId,            
      subVendorId: subVendorId,
      categoryId: categoryId,       
      serviceId: serviceId,
      addressId,
      bookingDate: date,
      bookingTime: time + ":00", 
      amount: price,
      discountAmount: 0,
      finalAmount: total,
      paymentStatus: "PENDING",
      bookingStatus: "PENDING",
      otp: "0000",    
      active: true,
      notes,
    };

    try {
      setLoading(true);

      const res = await api.post("/bookings", bookingData);

      console.log("Booking Success:", res.data);

      alert("Booking Confirmed 🎉");

      navigate(`/payment/${res.data.id}`);
    } catch (err) {
      console.error("Booking failed:", err);
      alert("Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserLayout>
      <div className="max-w-2xl mx-auto py-4 px-4 space-y-6">

        <h1 className="text-2xl font-bold">
          Confirm Booking
        </h1>

        {/* DATE */}
        <div>
          <label className="text-sm font-medium flex items-center gap-2">
            <Calendar size={16} /> Select Date
          </label>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full mt-2 p-3 border rounded-xl"
          />
        </div>

        {/* TIME */}
        <div>
          <label className="text-sm font-medium flex items-center gap-2">
            <Clock size={16} /> Select Time
          </label>

          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full mt-2 p-3 border rounded-xl"
          />
        </div>



        {/* NOTES */}
        <div>
          <label className="text-sm font-medium">
            Notes
          </label>

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full mt-2 p-3 border rounded-xl"
            rows={4}
          />
        </div>

        {/* PRICE */}
        <div className="bg-white rounded-xl shadow p-4 space-y-2">
          <div className="flex justify-between">
            <span>Service Price</span>
            <span>₹{price}</span>
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

        {/* BUTTON */}
        <button
          onClick={handleBooking}
          disabled={!addressId || loading}
          className={`w-full py-3 rounded-xl font-medium transition ${!addressId || loading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
        >
          {loading ? "Booking..." : "Confirm Booking"}
        </button>
      
      </div>
    </UserLayout>
  );
}