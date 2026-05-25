import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const API = import.meta.env.VITE_API_URL;

export default function EditBooking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState<any>({
    userId: "",
    vendorId: "",
    subVendorId: "",
    categoryId: "",
    serviceId: "",
    bookingDate: "",
    bookingTime: "",
    address: "",
    city: "",
    pincode: "",
    latitude: "",
    longitude: "",
    amount: "",
    discountAmount: "",
    finalAmount: "",
    paymentStatus: "PENDING",
    bookingStatus: "PENDING",
    notes: "",
    otp: "",
    active: true,
  });

  // ================= FETCH =================
  const fetchBooking = async () => {
    try {
      const res = await axios.get(
        `${API}/restful/v1/api/bookings/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setForm(res.data.data || res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooking();
  }, [id]);

  // ================= HANDLE =================
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
        `${API}/restful/v1/api/bookings/${id}`,
        {
          ...form,
          userId: Number(form.userId),
          vendorId: Number(form.vendorId),
          subVendorId: Number(form.subVendorId),
          categoryId: Number(form.categoryId),
          serviceId: Number(form.serviceId),
          amount: Number(form.amount),
          discountAmount: Number(form.discountAmount),
          finalAmount: Number(form.finalAmount),
          latitude: Number(form.latitude),
          longitude: Number(form.longitude),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Booking updated successfully");
      navigate("/bookings");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-lg font-semibold">Loading booking...</div>
      </div>
    );
  }

  // ================= UI =================
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center px-4 py-10">

      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-8">

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/bookings")}
          className="flex items-center gap-2 text-gray-600 hover:text-black mb-6"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <h1 className="text-3xl font-bold text-center mb-6">
          Edit Booking
        </h1>

        {/* FIELDS */}
        <input name="userId" value={form.userId} placeholder="User ID" className="w-full border rounded-lg p-3 mb-3" onChange={handleChange} />

        <input name="vendorId" value={form.vendorId} placeholder="Vendor ID" className="w-full border rounded-lg p-3 mb-3" onChange={handleChange} />

        <input name="subVendorId" value={form.subVendorId} placeholder="Sub Vendor ID" className="w-full border rounded-lg p-3 mb-3" onChange={handleChange} />

        <input name="categoryId" value={form.categoryId} placeholder="Category ID" className="w-full border rounded-lg p-3 mb-3" onChange={handleChange} />

        <input name="serviceId" value={form.serviceId} placeholder="Service ID" className="w-full border rounded-lg p-3 mb-3" onChange={handleChange} />

        <input name="bookingDate" value={form.bookingDate} placeholder="Booking Date" className="w-full border rounded-lg p-3 mb-3" onChange={handleChange} />

        <input name="bookingTime" value={form.bookingTime} placeholder="Booking Time" className="w-full border rounded-lg p-3 mb-3" onChange={handleChange} />

        <textarea name="address" value={form.address} placeholder="Address" className="w-full border rounded-lg p-3 mb-3" onChange={handleChange} />

        <input name="city" value={form.city} placeholder="City" className="w-full border rounded-lg p-3 mb-3" onChange={handleChange} />

        <input name="amount" value={form.amount} placeholder="Amount" className="w-full border rounded-lg p-3 mb-3" onChange={handleChange} />

        <input name="discountAmount" value={form.discountAmount} placeholder="Discount Amount" className="w-full border rounded-lg p-3 mb-3" onChange={handleChange} />

        <input name="finalAmount" value={form.finalAmount} placeholder="Final Amount" className="w-full border rounded-lg p-3 mb-3" onChange={handleChange} />

        <select name="bookingStatus" value={form.bookingStatus} className="w-full border rounded-lg p-3 mb-3" onChange={handleChange}>
          <option value="PENDING">PENDING</option>
          <option value="CONFIRMED">CONFIRMED</option>
          <option value="CANCELLED">CANCELLED</option>
          <option value="COMPLETED">COMPLETED</option>
        </select>

        <select name="paymentStatus" value={form.paymentStatus} className="w-full border rounded-lg p-3 mb-4" onChange={handleChange}>
          <option value="PENDING">PENDING</option>
          <option value="PAID">PAID</option>
          <option value="FAILED">FAILED</option>
        </select>

        {/* UPDATE BUTTON */}
        <button
          onClick={handleUpdate}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Update Booking
        </button>

      </div>
    </div>
  );
}