import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";

const API = import.meta.env.VITE_API_URL;

export default function CreateBooking() {
  const navigate = useNavigate();

  const [users, setUsers] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
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
    otp: "1234",
    active: true,
  });

  // ============================================
  // FETCH USERS + SERVICES
  // ============================================
  const fetchData = async () => {
    try {
      const [u, s] = await Promise.all([
        axios.get(`${API}/restful/v1/api/users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }),
        axios.get(`${API}/restful/v1/api/services`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }),
      ]);

      setUsers(u.data.data || u.data || []);
      setServices(s.data.data || s.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ============================================
  // SUBMIT BOOKING
  // ============================================
  const handleSubmit = async () => {
    try {
      setLoading(true);

      await axios.post(
        `${API}/restful/v1/api/bookings`,
        {
          userId: Number(form.userId),
          vendorId: Number(form.vendorId),
          subVendorId: Number(form.subVendorId),
          categoryId: Number(form.categoryId),
          serviceId: Number(form.serviceId),
          bookingDate: form.bookingDate,
          bookingTime: form.bookingTime,
          address: form.address,
          city: form.city,
          pincode: form.pincode,
          latitude: Number(form.latitude),
          longitude: Number(form.longitude),
          amount: Number(form.amount),
          discountAmount: Number(form.discountAmount),
          finalAmount: Number(form.finalAmount),
          paymentStatus: form.paymentStatus,
          bookingStatus: form.bookingStatus,
          notes: form.notes,
          otp: form.otp,
          active: form.active,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Booking created successfully");
      navigate("/bookings");
    } catch (err) {
      console.error(err);
      alert("Failed to create booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 flex items-center justify-center px-4">

      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-8">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">

          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Create Booking
            </h1>
            <p className="text-gray-500">
              Fill all required details
            </p>
          </div>

          {/* BACK BUTTON */}
          <button
            onClick={() => navigate("/bookings")}
            className="flex items-center gap-2 text-gray-600 hover:text-black"
          >
            <ArrowLeft size={18} />
            Back
          </button>

        </div>

        {/* FORM */}
        <div className="grid grid-cols-2 gap-4">

          {/* USER */}
          <select
            className="border p-3 rounded-xl col-span-2"
            onChange={(e) =>
              setForm({ ...form, userId: e.target.value })
            }
          >
            <option>Select User</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>

          {/* SERVICE */}
          <select
            className="border p-3 rounded-xl col-span-2"
            onChange={(e) =>
              setForm({ ...form, serviceId: e.target.value })
            }
          >
            <option>Select Service</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>

          <input
            placeholder="Vendor ID"
            className="border p-3 rounded-xl"
            onChange={(e) =>
              setForm({ ...form, vendorId: e.target.value })
            }
          />

          <input
            placeholder="Sub Vendor ID"
            className="border p-3 rounded-xl"
            onChange={(e) =>
              setForm({ ...form, subVendorId: e.target.value })
            }
          />

          <input
            placeholder="Category ID"
            className="border p-3 rounded-xl"
            onChange={(e) =>
              setForm({ ...form, categoryId: e.target.value })
            }
          />

          <input
            type="date"
            className="border p-3 rounded-xl"
            onChange={(e) =>
              setForm({ ...form, bookingDate: e.target.value })
            }
          />

          <input
            placeholder="Booking Time (10:30 AM)"
            className="border p-3 rounded-xl"
            onChange={(e) =>
              setForm({ ...form, bookingTime: e.target.value })
            }
          />

          <input
            placeholder="Address"
            className="border p-3 rounded-xl col-span-2"
            onChange={(e) =>
              setForm({ ...form, address: e.target.value })
            }
          />

          <input
            placeholder="City"
            className="border p-3 rounded-xl"
            onChange={(e) =>
              setForm({ ...form, city: e.target.value })
            }
          />

          <input
            placeholder="Pincode"
            className="border p-3 rounded-xl"
            onChange={(e) =>
              setForm({ ...form, pincode: e.target.value })
            }
          />

          <input
            placeholder="Latitude"
            className="border p-3 rounded-xl"
            onChange={(e) =>
              setForm({ ...form, latitude: e.target.value })
            }
          />

          <input
            placeholder="Longitude"
            className="border p-3 rounded-xl"
            onChange={(e) =>
              setForm({ ...form, longitude: e.target.value })
            }
          />

          <input
            placeholder="Amount"
            className="border p-3 rounded-xl"
            onChange={(e) =>
              setForm({ ...form, amount: e.target.value })
            }
          />

          <input
            placeholder="Discount"
            className="border p-3 rounded-xl"
            onChange={(e) =>
              setForm({ ...form, discountAmount: e.target.value })
            }
          />

          <input
            placeholder="Final Amount"
            className="border p-3 rounded-xl"
            onChange={(e) =>
              setForm({ ...form, finalAmount: e.target.value })
            }
          />

          <textarea
            placeholder="Notes"
            className="border p-3 rounded-xl col-span-2"
            onChange={(e) =>
              setForm({ ...form, notes: e.target.value })
            }
          />

          {/* BUTTON */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl flex items-center justify-center gap-2"
          >
            <Save size={18} />
            {loading ? "Creating..." : "Create Booking"}
          </button>

        </div>
      </div>
    </div>
  );
}