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

  const service = JSON.parse(
    localStorage.getItem("service") || "{}"
  );

  const price = service?.price || 0;

  const discountedPrice =
    service?.discountedPrice || price;

  const discountAmount =
    price - discountedPrice;

  const tax =
    service?.taxAmount || 0;

  const total =
    service?.finalPrice ||
    discountedPrice + tax;

  const handleBooking = async () => {
    const vendorId =
      localStorage.getItem("vendorId");

    const subVendorId =
      localStorage.getItem("subVendorId");

    const categoryId =
      localStorage.getItem("categoryId");

    if (!date || !time) {
      alert("Please fill all required fields");
      return;
    }

    const user = JSON.parse(
      localStorage.getItem("user") || "{}"
    );

    const bookingData = {
      userId: user.userId,
      vendorId,
      subVendorId,
      categoryId,

      serviceId: service.id,
      addressId,

      bookingDate: date,
      bookingTime: time + ":00",

      amount: discountedPrice,
      discountAmount: discountAmount,
      finalAmount: total,

      paymentStatus: "PENDING",
      bookingStatus: "SUCCESS",

      otp: "0000",
      active: true,
      notes,
    };

    try {
      setLoading(true);

      const res = await api.post(
        "/bookings",
        bookingData
      );

      alert("Booking Confirmed 🎉");

      navigate(
        `/payment/${res.data.data.id}`,
        {
          state: {
            bookingId:
              res.data.data.id,

            userId:
              user.userId,

            name:
              user.name,

            email:
              user.email,

            mobile:
              user.phone,

            amount:
              discountedPrice,

            discount:
              discountAmount,

            tax,

            total,
          },
        }
      );
    } catch (err) {
      console.error(err);
      alert("Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserLayout>
      <div className="space-y-6 py-4 px-4">

        <h1 className="text-2xl font-bold">
          Confirm Booking
        </h1>

        {/* DATE */}
        <div>
          <label className="text-sm font-medium flex items-center gap-2">
            <Calendar size={16} />
            Select Date
          </label>

          <input
            type="date"
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
            }
            className="w-full mt-2 p-3 border rounded-xl"
          />
        </div>

        {/* TIME */}
        <div>
          <label className="text-sm font-medium flex items-center gap-2">
            <Clock size={16} />
            Select Time
          </label>

          <input
            type="time"
            value={time}
            onChange={(e) =>
              setTime(e.target.value)
            }
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
            onChange={(e) =>
              setNotes(e.target.value)
            }
            className="w-full mt-2 p-3 border rounded-xl"
            rows={4}
          />
        </div>

        {/* PRICE CARD */}
        <div className="bg-white rounded-xl shadow p-4 space-y-2">

          <div className="flex justify-between">
            <span>Original Price</span>
            <span>
              ₹{price.toFixed(2)}
            </span>
          </div>

          {discountAmount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>
                -₹{discountAmount.toFixed(2)}
              </span>
            </div>
          )}

          <div className="flex justify-between">
            <span>Service Price</span>
            <span>
              ₹{discountedPrice.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between">
            <span>
              Tax (
              {service.taxPercentage ||
                18}
              %)
            </span>

            <span>
              ₹{tax.toFixed(2)}
            </span>
          </div>

          <hr />

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>

            <span className="text-green-600">
              ₹{total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* BUTTON */}
        <button
          onClick={handleBooking}
          disabled={
            !addressId || loading
          }
          className={`w-full py-3 rounded-xl font-medium transition ${
            !addressId || loading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {loading
            ? "Booking..."
            : "Confirm Booking"}
        </button>

      </div>
    </UserLayout>
  );
}