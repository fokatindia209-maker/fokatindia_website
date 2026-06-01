import UserLayout from "../components/UserLayout";
import { useState } from "react";
import { Calendar, Clock, MapPin } from "lucide-react";

export default function Booking() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  // demo price
  const price = 499;
  const tax = 50;
  const total = price + tax;

  const handleBooking = () => {
    const bookingData = {
      date,
      time,
      address,
      notes,
      total,
    };

    console.log("Booking Created:", bookingData);

    alert("Booking Confirmed 🎉");
  };

  return (
    <UserLayout>
      <div className="space-y-6 max-w-2xl mx-auto">

        {/* HEADER */}
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

        {/* ADDRESS */}
        <div>
          <label className="text-sm font-medium flex items-center gap-2">
            <MapPin size={16} /> Address
          </label>

          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter full address..."
            className="w-full mt-2 p-3 border rounded-xl"
          />
        </div>

        {/* NOTES */}
        <div>
          <label className="text-sm font-medium">
            Notes (Optional)
          </label>

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any special instructions..."
            className="w-full mt-2 p-3 border rounded-xl"
          />
        </div>

        {/* PRICE SUMMARY */}
        <div className="bg-white p-4 rounded-xl shadow space-y-2">
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
          className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
        >
          Confirm Booking
        </button>

      </div>
    </UserLayout>
  );
}