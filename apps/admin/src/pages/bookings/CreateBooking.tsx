import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";

export default function CreateBooking() {
  const navigate = useNavigate();

  const [users, setUsers] = useState<any[]>([]);
  const [vendors, setVendors] = useState<any[]>([]);
  const [subVendors, setSubVendors] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
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

  // ================= FETCH USERS + VENDORS =================
  const fetchInitialData = async () => {
    try {
      const [u, v] = await Promise.all([
        api.get(`/restful/v1/api/users`),
        api.get(`/restful/v1/api/vendors/users`),
      ]);



      setUsers(u.data.data || []);
      setVendors(v.data.data || []);

      console.log(v.data.data)
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  // ================= VENDOR → SUBVENDOR =================
  const onVendorChange = async (vendorId: string) => {
    setForm({
      ...form,
      vendorId,
      subVendorId: "",
      categoryId: "",
      serviceId: "",
    });

    console.log(vendorId)

    try {
      const res = await api.get(`/restful/v1/api/subvendors/vendor/${vendorId}/users`);

      setSubVendors(res.data.data || []);
      setCategories([]);
      setServices([]);
    } catch (err) {
      console.error(err);
    }
  };

  // ================= SUBVENDOR → CATEGORY =================
  const onSubVendorChange = async (subVendorId: string) => {
    setForm({
      ...form,
      subVendorId,
      categoryId: "",
      serviceId: "",
    });

    try {
      const res = await api.get(`/restful/v1/api/categories`);

      setCategories(res.data.data || []);
      setServices([]);
    } catch (err) {
      console.error(err);
    }
  };

  // ================= CATEGORY → SERVICE =================
  const onCategoryChange = async (categoryId: string) => {
    setForm({
      ...form,
      categoryId,
      serviceId: "",
    });

    try {
      const res = await api.get(`/restful/v1/api/services?categoryId=${categoryId}`);

      setServices(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  // ================= SUBMIT =================
  const handleSubmit = async () => {
    try {
      setLoading(true);

      console.log("booking", form)

      await api.post(`/restful/v1/api/bookings`, {
        ...form,
        userId: Number(form.userId),
        vendorId: Number(form.vendorId),
        subVendorId: Number(form.subVendorId),
        categoryId: Number(form.categoryId),
        serviceId: Number(form.serviceId),
        latitude: Number(form.latitude),
        longitude: Number(form.longitude),
        amount: Number(form.amount),
        discountAmount: Number(form.discountAmount),
        finalAmount: Number(form.finalAmount),
      });

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
    <div className="min-h-screen bg-gray-100 py-12 flex justify-center px-4">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-8">

        {/* HEADER */}
        <div className="flex justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Create Booking</h1>
            <p className="text-gray-500">Fill all required details</p>
          </div>

          <button
            onClick={() => navigate("/bookings")}
            className="flex items-center gap-2 text-gray-600"
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
              <option key={u.userId} value={u.userId}>
                {u.name}
              </option>
            ))}
          </select>

          {/* VENDOR */}
          <select
            className="border p-3 rounded-xl col-span-2"
            value={form.vendorId}
            onChange={(e) => onVendorChange(e.target.value)}
          >
            <option>Select Vendor</option>
            {vendors.map((v) => (
              <option key={v.vendorId} value={v.vendorId}>
                {v.name}
              </option>
            ))}
          </select>

          {/* SUBVENDOR */}
          <select
            className="border p-3 rounded-xl col-span-2"
            value={form.subVendorId}
            onChange={(e) => onSubVendorChange(e.target.value)}
          >
            <option>Select Sub Vendor</option>
            {subVendors.map((sv) => (
              <option key={sv.subVendorId} value={sv.subVendorId}>
                {sv.name}
              </option>
            ))}
          </select>

          {/* CATEGORY */}
          <select
            className="border p-3 rounded-xl col-span-2"
            value={form.categoryId}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <option>Select Category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* SERVICE */}
          <select
            className="border p-3 rounded-xl col-span-2"
            value={form.serviceId}
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

          {/* OTHER FIELDS (UNCHANGED) */}
          <input
            type="date"
            className="border p-3 rounded-xl"
            onChange={(e) =>
              setForm({ ...form, bookingDate: e.target.value })
            }
          />

          {/* <input
            placeholder="Booking Time"
            className="border p-3 rounded-xl"
            onChange={(e) =>
              setForm({ ...form, bookingTime: e.target.value })
            }
          /> */}
          <input
            type="time"
            className="border p-3 rounded-xl"
            value={form.bookingTime}
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

          {/* SUBMIT */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="col-span-2 bg-blue-600 text-white py-3 rounded-xl flex items-center justify-center gap-2"
          >
            <Save size={18} />
            {loading ? "Creating..." : "Create Booking"}
          </button>

        </div>
      </div>
    </div>
  );
}