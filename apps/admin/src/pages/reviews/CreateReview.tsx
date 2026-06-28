import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Save } from "lucide-react";

export default function CreateReview() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [bookings, setBookings] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [vendors, setVendors] = useState<any[]>([]);
  const [subVendors, setSubVendors] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);

  const [form, setForm] = useState({
    bookingId: "",
    userId: "",
    vendorId: "",
    subVendorId: "",
    categoryId: "",
    serviceId: "",
    rating: 5,
    comment: "",
  });

  // ================= FETCH DATA =================

  const fetchInitialData = async () => {
    try {
      const [bookingRes, userRes, vendorRes] =
        await Promise.all([
          api.get(`/restful/v1/api/bookings`),
          api.get(`/restful/v1/api/users`),
          api.get(`/restful/v1/api/vendors/users`),
        ]);

      setBookings(bookingRes.data.data || []);
      setUsers(userRes.data.data || []);
      setVendors(vendorRes.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  // ================= VENDOR -> SUBVENDOR =================

  const onVendorChange = async (vendorId: string) => {
    setForm({
      ...form,
      vendorId,
      subVendorId: "",
      categoryId: "",
      serviceId: "",
    });

    try {
      const res = await api.get(`/restful/v1/api/subvendors/vendor/${vendorId}/users`);

      setSubVendors(res.data.data || []);
      setCategories([]);
      setServices([]);
    } catch (err) {
      console.error(err);
    }
  };

  // ================= SUBVENDOR -> CATEGORY =================

  const onSubVendorChange = async (
    subVendorId: string
  ) => {
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

  // ================= CATEGORY -> SERVICE =================

  const onCategoryChange = async (
    categoryId: string
  ) => {
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

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        bookingId: Number(form.bookingId),
        userId: Number(form.userId),
        vendorId: Number(form.vendorId),
        subVendorId: Number(form.subVendorId),
        categoryId: Number(form.categoryId),
        serviceId: Number(form.serviceId),
        rating: Number(form.rating),
        comment: form.comment,
      };

      console.log("REVIEW PAYLOAD", payload);

      await api.post(`/restful/v1/api/reviews`, payload);

      alert("Review created successfully");

      navigate("/reviews");
    } catch (err) {
      console.error(err);
      alert("Failed to create review");
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
            <h1 className="text-2xl font-bold">
              Create Review
            </h1>

            <p className="text-gray-500">
              Add customer review
            </p>
          </div>

          <button
            onClick={() =>
              navigate("/reviews")
            }
            className="flex items-center gap-2 text-gray-600"
          >
            <ArrowLeft size={18} />
            Back
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-4"
        >
          {/* BOOKING */}

          <select
            className="border p-3 rounded-xl col-span-2"
            value={form.bookingId}
            onChange={(e) =>
              setForm({
                ...form,
                bookingId: e.target.value,
              })
            }
          >
            <option value="">
              Select Booking
            </option>

            {bookings.map((b) => (
              <option
                key={b.id}
                value={b.id}
              >
                {b.bookingCode ??
                  `Booking #${b.id}`}
              </option>
            ))}
          </select>

          {/* USER */}

          <select
            className="border p-3 rounded-xl col-span-2"
            value={form.userId}
            onChange={(e) =>
              setForm({
                ...form,
                userId: e.target.value,
              })
            }
          >
            <option value="">
              Select User
            </option>

            {users.map((u) => (
              <option
                key={u.userId}
                value={u.userId}
              >
                {u.name}
              </option>
            ))}
          </select>

          {/* VENDOR */}

          <select
            className="border p-3 rounded-xl col-span-2"
            value={form.vendorId}
            onChange={(e) =>
              onVendorChange(
                e.target.value
              )
            }
          >
            <option value="">
              Select Vendor
            </option>

            {vendors.map((v) => (
              <option
                key={v.vendorId}
                value={v.vendorId}
              >
                {v.name}
              </option>
            ))}
          </select>

          {/* SUBVENDOR */}

          <select
            className="border p-3 rounded-xl col-span-2"
            value={form.subVendorId}
            onChange={(e) =>
              onSubVendorChange(
                e.target.value
              )
            }
          >
            <option value="">
              Select Sub Vendor
            </option>

            {subVendors.map((sv) => (
              <option
                key={sv.subVendorId}
                value={sv.subVendorId}
              >
                {sv.name}
              </option>
            ))}
          </select>

          {/* CATEGORY */}

          <select
            className="border p-3 rounded-xl col-span-2"
            value={form.categoryId}
            onChange={(e) =>
              onCategoryChange(
                e.target.value
              )
            }
          >
            <option value="">
              Select Category
            </option>

            {categories.map((c) => (
              <option
                key={c.id}
                value={c.id}
              >
                {c.name}
              </option>
            ))}
          </select>

          {/* SERVICE */}

          <select
            className="border p-3 rounded-xl col-span-2"
            value={form.serviceId}
            onChange={(e) =>
              setForm({
                ...form,
                serviceId:
                  e.target.value,
              })
            }
          >
            <option value="">
              Select Service
            </option>

            {services.map((s) => (
              <option
                key={s.id}
                value={s.id}
              >
                {s.name}
              </option>
            ))}
          </select>

          {/* RATING */}

          <div className="col-span-2">
            <label className="block mb-2 font-medium">
              Rating
            </label>

            <div className="flex items-center gap-4">
              <input
                type="number"
                min={1}
                max={5}
                value={form.rating}
                onChange={(e) =>
                  setForm({
                    ...form,
                    rating: Number(
                      e.target.value
                    ),
                  })
                }
                className="border p-3 rounded-xl w-24"
              />

              <div className="flex gap-1">
                {Array.from({
                  length:
                    Number(
                      form.rating
                    ),
                }).map((_, i) => (
                  <Star
                    key={i}
                    size={22}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* COMMENT */}

          <textarea
            rows={5}
            placeholder="Review comment..."
            value={form.comment}
            onChange={(e) =>
              setForm({
                ...form,
                comment:
                  e.target.value,
              })
            }
            className="border p-3 rounded-xl col-span-2"
          />

          {/* SUBMIT */}

          <button
            type="submit"
            disabled={loading}
            className="col-span-2 bg-blue-600 text-white py-3 rounded-xl flex justify-center items-center gap-2"
          >
            <Save size={18} />

            {loading
              ? "Creating..."
              : "Create Review"}
          </button>
        </form>
      </div>
    </div>
  );
}
// // ============================================
// // CreateReview.tsx
// // CREATE REVIEW SCREEN
// // ============================================

// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { ArrowLeft, Star } from "lucide-react";




// const API = import.meta.env.VITE_API_URL;
// export default function CreateReview() {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const [loading, setLoading] = useState(false);

//   const [form, setForm] = useState({
//     bookingId: "",
//     userId: "",
//     vendorId: "",
//     subVendorId: "",
//     serviceId: "",
//     rating: 5,
//     comment: "",
//   });

//   // ============================================
//   // HANDLE CHANGE
//   // ============================================

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // ============================================
//   // CREATE REVIEW
//   // ============================================

//   const handleSubmit = async (
//     e: React.FormEvent<HTMLFormElement>
//   ) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       const payload = {
//         bookingId: Number(form.bookingId),
//         userId: Number(form.userId),
//         vendorId: Number(form.vendorId),
//         serviceId: Number(form.serviceId),
//         rating: Number(form.rating),
//         comment: form.comment,
//       };

//       console.log("CREATE REVIEW PAYLOAD => ", payload);

//       await axios.post(`${API}/restful/v1/api/reviews`, payload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       alert("Review created successfully");

//       navigate("/reviews");
//     } catch (error) {
//       console.error("Create Review Error:", error);

//       alert("Failed to create review");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ============================================
//   // UI
//   // ============================================

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       {/* TOP BAR */}
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800">
//             Create Review
//           </h1>

//           <p className="text-gray-500 mt-1">
//             Add new customer review
//           </p>
//         </div>

//         {/* BACK BUTTON */}
//         <button
//           onClick={() => navigate("/reviews")}
//           className="flex items-center gap-2 bg-white border px-4 py-2 rounded-xl hover:bg-gray-50"
//         >
//           <ArrowLeft size={18} />
//           Back
//         </button>
//       </div>

//       {/* FORM CARD */}
//       <div className="bg-white rounded-2xl shadow-sm p-8 max-w-3xl">
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* BOOKING ID */}
//           <div>
//             <label className="block text-sm font-semibold mb-2">
//               Booking ID
//             </label>

//             <input
//               type="number"
//               name="bookingId"
//               value={form.bookingId}
//               onChange={handleChange}
//               required
//               placeholder="Enter booking id"
//               className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
//             />
//           </div>

//           {/* USER ID */}
//           <div>
//             <label className="block text-sm font-semibold mb-2">
//               User ID
//             </label>

//             <input
//               type="number"
//               name="userId"
//               value={form.userId}
//               onChange={handleChange}
//               required
//               placeholder="Enter user id"
//               className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
//             />
//           </div>

//           {/* VENDOR ID */}
//           <div>
//             <label className="block text-sm font-semibold mb-2">
//               Vendor ID
//             </label>

//             <input
//               type="number"
//               name="vendorId"
//               value={form.vendorId}
//               onChange={handleChange}
//               required
//               placeholder="Enter vendor id"
//               className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
//             />
//           </div>

//           {/* SERVICE ID */}
//           <div>
//             <label className="block text-sm font-semibold mb-2">
//               Service ID
//             </label>

//             <input
//               type="number"
//               name="serviceId"
//               value={form.serviceId}
//               onChange={handleChange}
//               required
//               placeholder="Enter service id"
//               className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
//             />
//           </div>

//           {/* RATING */}
//           <div>
//             <label className="block text-sm font-semibold mb-2">
//               Rating
//             </label>

//             <div className="flex items-center gap-3">
//               <input
//                 type="number"
//                 min={1}
//                 max={5}
//                 name="rating"
//                 value={form.rating}
//                 onChange={handleChange}
//                 required
//                 className="w-32 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
//               />

//               <div className="flex items-center gap-1">
//                 {Array.from({ length: Number(form.rating) }).map(
//                   (_, index) => (
//                     <Star
//                       key={index}
//                       size={20}
//                       className="fill-yellow-400 text-yellow-400"
//                     />
//                   )
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* COMMENT */}
//           <div>
//             <label className="block text-sm font-semibold mb-2">
//               Comment
//             </label>

//             <textarea
//               name="comment"
//               value={form.comment}
//               onChange={handleChange}
//               required
//               rows={5}
//               placeholder="Write review comment..."
//               className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black resize-none"
//             />
//           </div>

//           {/* BUTTONS */}
//           <div className="flex items-center gap-4 pt-4">
//             <button
//               type="submit"
//               disabled={loading}
//               className="bg-black text-white px-6 py-3 rounded-xl hover:opacity-90 transition disabled:opacity-50"
//             >
//               {loading ? "Creating..." : "Create Review"}
//             </button>

//             <button
//               type="button"
//               onClick={() => navigate("/reviews")}
//               className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-300 transition"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }