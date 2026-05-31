import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

export default function SendNotification() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    sendType: "single",
    userId: "",
    userIds: "",
    title: "",
    message: "",
    fcmToken: "",
    type: "SYSTEM",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      let payload: any = {
        title: form.title,
        message: form.message,
        type: form.type,
      };

      if (form.sendType === "single") {
        payload.userId = Number(form.userId);
      }

      if (form.sendType === "multiple") {
        payload.userIds = form.userIds
          .split(",")
          .map((id) => Number(id.trim()))
          .filter((id) => !isNaN(id));
      }

      if (form.sendType === "all") {
        payload.sendToAll = true;
      }

      if (form.sendType === "token") {
        payload.fcmToken = form.fcmToken;
      }

      const response = await axios.post(
        `${API}/restful/v1/api/notifications`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert(response.data.message || "Notification sent successfully");

      navigate("/notifications");
    } catch (error: any) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          "Failed to send notification"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6">

        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate("/notifications")}
            className="mr-3 text-blue-600 font-medium"
          >
            ← Back
          </button>

          <h1 className="text-2xl font-bold">
            Send Notification
          </h1>
        </div>

        {/* Send Type */}
        <label className="block text-sm font-medium mb-2">
          Send To
        </label>

        <select
          name="sendType"
          value={form.sendType}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 mb-4"
        >
          <option value="single">Single User</option>
          <option value="multiple">Multiple Users</option>
          <option value="all">All Users</option>
          <option value="token">Direct FCM Token</option>
        </select>

        {/* Single User */}
        {form.sendType === "single" && (
          <input
            type="number"
            name="userId"
            placeholder="User ID"
            value={form.userId}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mb-4"
          />
        )}

        {/* Multiple Users */}
        {form.sendType === "multiple" && (
          <input
            type="text"
            name="userIds"
            placeholder="User IDs (example: 1,2,3,4)"
            value={form.userIds}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mb-4"
          />
        )}

        {/* Direct Token */}
        {form.sendType === "token" && (
          <textarea
            name="fcmToken"
            placeholder="Firebase FCM Token"
            value={form.fcmToken}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded-lg p-3 mb-4"
          />
        )}

        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Notification Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 mb-4"
        />

        {/* Message */}
        <textarea
          name="message"
          placeholder="Notification Message"
          value={form.message}
          onChange={handleChange}
          rows={5}
          className="w-full border rounded-lg p-3 mb-4"
        />

        {/* Type */}
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 mb-6"
        >
          <option value="SYSTEM">SYSTEM</option>
          <option value="BOOKING">BOOKING</option>
          <option value="PAYMENT">PAYMENT</option>
          <option value="PROMO">PROMO</option>
          <option value="ORDER">ORDER</option>
          <option value="TEST">TEST</option>
        </select>

        {/* Preview */}
        <div className="bg-gray-50 border rounded-lg p-4 mb-6">
          <h3 className="font-semibold mb-2">
            Notification Preview
          </h3>

          <div className="font-medium">
            {form.title || "Title"}
          </div>

          <div className="text-sm text-gray-600 mt-1">
            {form.message || "Message"}
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Sending..." : "Send Notification"}
        </button>
      </div>
    </div>
  );
}
// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const API = import.meta.env.VITE_API_URL;

// export default function SendNotification() {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const [form, setForm] = useState({
//     userId: "",
//     title: "",
//     message: "",
//     fcmToken: "",
//     type: "ORDER",
//   });

//   const [loading, setLoading] = useState(false);

//   // ================= HANDLE CHANGE =================
//   const handleChange = (e: any) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // ================= SUBMIT =================
//   const handleSubmit = async () => {
//     try {
//       setLoading(true);

//       const payload = {
//         userId: Number(form.userId),
//         title: form.title,
//         message: form.message,
//         fcmToken: form.fcmToken,
//         type: form.type,
//       };

//       await axios.post(
//         `${API}/restful/v1/api/notifications`,
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       alert("Notification sent successfully");
//       navigate("/notifications");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to send notification");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ================= UI =================
//   return (
//     <div className="min-h-screen bg-gray-100 py-12 flex items-center justify-center px-4">

//       <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-6">

//         {/* BACK BUTTON */}
//         <button
//           onClick={() => navigate("/notifications")}
//           className="text-gray-600 hover:text-black mb-4"
//         >
//           ← Back
//         </button>

//         <h1 className="text-2xl font-bold mb-6 text-center">
//           Send Notification
//         </h1>

//         {/* USER ID */}
//         <input
//           name="userId"
//           placeholder="User ID"
//           value={form.userId}
//           onChange={handleChange}
//           className="w-full border p-3 rounded mb-3"
//         />

//         {/* TITLE */}
//         <input
//           name="title"
//           placeholder="Title"
//           value={form.title}
//           onChange={handleChange}
//           className="w-full border p-3 rounded mb-3"
//         />

//         {/* MESSAGE */}
//         <textarea
//           name="message"
//           placeholder="Message"
//           value={form.message}
//           onChange={handleChange}
//           className="w-full border p-3 rounded mb-3"
//         />

//         {/* FCM TOKEN */}
//         <input
//           name="fcmToken"
//           placeholder="FCM Token (Device Token)"
//           value={form.fcmToken}
//           onChange={handleChange}
//           className="w-full border p-3 rounded mb-3"
//         />

//         {/* TYPE */}
//         <select
//           name="type"
//           value={form.type}
//           onChange={handleChange}
//           className="w-full border p-3 rounded mb-4"
//         >
//           <option value="ORDER">ORDER</option>
//           <option value="PAYMENT">PAYMENT</option>
//           <option value="SYSTEM">SYSTEM</option>
//           <option value="PROMO">PROMO</option>
//         </select>

//         {/* SUBMIT BUTTON */}
//         <button
//           onClick={handleSubmit}
//           disabled={loading}
//           className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
//         >
//           {loading ? "Sending..." : "Send Notification"}
//         </button>
//       </div>
//     </div>
//   );
// }