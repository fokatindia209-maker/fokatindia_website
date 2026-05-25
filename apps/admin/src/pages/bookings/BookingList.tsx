import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const API = import.meta.env.VITE_API_URL;
interface Booking {
  id: number;
  bookingCode: string;
  userId: number;
  vendorId: number;
  serviceId: number;
  bookingDate: string;
  bookingTime: string;
  finalAmount: number;
  bookingStatus: string;
  paymentStatus: string;
  createdAt: string;
}

export default function BookingList() {
  const [bookings, setBookings] =
    useState<Booking[]>([]);

  const navigate = useNavigate();

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${API}/restful/v1/api/bookings`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "token"
          )}`,
        },
      });

      setBookings(res.data.data);
    } catch (err) {
      console.error(
        "Error fetching bookings",
        err
      );
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="py-12">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">
          Bookings
        </h1>

        <button
          onClick={() =>
            navigate("/bookings/create")
          }
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          + Create Booking
        </button>
      </div>

      <div className="bg-white shadow rounded overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">
                ID
              </th>

              <th className="p-3 text-left">
                Booking Code
              </th>

              <th className="p-3 text-left">
                User ID
              </th>

              <th className="p-3 text-left">
                Vendor ID
              </th>

              <th className="p-3 text-left">
                Service ID
              </th>

              <th className="p-3 text-left">
                Booking Date
              </th>

              <th className="p-3 text-left">
                Booking Time
              </th>

              <th className="p-3 text-left">
                Final Amount
              </th>

              <th className="p-3 text-left">
                Booking Status
              </th>

              <th className="p-3 text-left">
                Payment Status
              </th>

              <th className="p-3 text-left">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr
                key={b.id}
                className="border-t"
              >
                <td className="p-3">
                  {b.id}
                </td>

                <td className="p-3 font-medium">
                  {b.bookingCode}
                </td>

                <td className="p-3">
                  {b.userId}
                </td>

                <td className="p-3">
                  {b.vendorId}
                </td>

                <td className="p-3">
                  {b.serviceId}
                </td>

                <td className="p-3">
                  {b.bookingDate}
                </td>

                <td className="p-3">
                  {b.bookingTime}
                </td>

                <td className="p-3 font-semibold">
                  ₹{b.finalAmount}
                </td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      b.bookingStatus ===
                      "PENDING"
                        ? "bg-yellow-100 text-yellow-700"
                        : b.bookingStatus ===
                          "CONFIRMED"
                        ? "bg-blue-100 text-blue-700"
                        : b.bookingStatus ===
                          "COMPLETED"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {b.bookingStatus}
                  </span>
                </td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      b.paymentStatus ===
                      "PAID"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {b.paymentStatus}
                  </span>
                </td>

                <td className="p-3">
                  <button
                    onClick={() =>
                      navigate(
                        `/bookings/edit/${b.id}`
                      )
                    }
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    View/Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {bookings.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No bookings found
          </div>
        )}
      </div>
    </div>
  );
}