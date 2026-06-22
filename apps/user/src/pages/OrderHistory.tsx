import UserLayout from "../components/UserLayout";
import { Calendar, CheckCircle, Clock, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function OrderHistory() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      console.log("userI", user.userId)
      const { data } = await api.get(`/payments/user/${user.userId}`);

      console.log("userI", data.data)
      setOrders(data.data || []);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusUI = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return (
          <span className="flex items-center gap-1 text-green-600 text-sm">
            <CheckCircle size={16} />
            Completed
          </span>
        );

      case "PENDING":
        return (
          <span className="flex items-center gap-1 text-yellow-600 text-sm">
            <Clock size={16} />
            Pending
          </span>
        );

      case "FAILED":
        return (
          <span className="flex items-center gap-1 text-red-600 text-sm">
            <XCircle size={16} />
            Failed
          </span>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <UserLayout>
        <div className="p-6 text-center">
          Loading orders...
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="max-w-3xl mx-auto space-y-6 py-4 px-4">

        <h1 className="text-2xl font-bold">
          Order History
        </h1>

        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-5 rounded-xl shadow"
            >
              <div className="flex justify-between items-start">

                <div>
                  <h2 className="font-semibold text-lg">
                    Booking #{order.bookingId}
                  </h2>

                  <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                    <Calendar size={14} />
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}
                  </div>

                  <div className="text-sm text-gray-500 mt-1">
                    Payment: {order.paymentMethod}
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-bold text-green-600">
                    ₹{order.amount}
                  </p>

                  {getStatusUI(order.paymentStatus)}
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() =>
                    navigate(
                      `/order-details/${order.bookingId}`
                    )
                  }
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  View Details
                </button>

                {order.paymentStatus === "SUCCESS" && (
                  <button
                    className="px-3 py-1 text-sm border rounded-lg hover:bg-gray-100"
                  >
                    Rebook
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {orders.length === 0 && (
          <div className="text-center text-gray-500 py-10">
            No orders found 😢
          </div>
        )}
      </div>
    </UserLayout>
  );
}
// import UserLayout from "../components/UserLayout";
// import { Calendar, CheckCircle, Clock, XCircle } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// export default function OrderHistory() {

// const navigate = useNavigate();

//   const orders = [
//     {
//       id: 1,
//       service: "Deep Home Cleaning",
//       date: "2026-06-01",
//       status: "completed",
//       price: 499,
//     },
//     {
//       id: 2,
//       service: "AC Repair Service",
//       date: "2026-05-28",
//       status: "pending",
//       price: 799,
//     },
//     {
//       id: 3,
//       service: "Bathroom Cleaning",
//       date: "2026-05-20",
//       status: "cancelled",
//       price: 299,
//     },
//   ];

//   const getStatusUI = (status: string) => {
//     switch (status) {
//       case "completed":
//         return (
//           <span className="flex items-center gap-1 text-green-600 text-sm">
//             <CheckCircle size={16} /> Completed
//           </span>
//         );

//       case "pending":
//         return (
//           <span className="flex items-center gap-1 text-yellow-600 text-sm">
//             <Clock size={16} /> Pending
//           </span>
//         );

//       case "cancelled":
//         return (
//           <span className="flex items-center gap-1 text-red-600 text-sm">
//             <XCircle size={16} /> Cancelled
//           </span>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <UserLayout>
//       <div className="max-w-3xl mx-auto space-y-6 py-4 px-4">

    

//         {/* ORDERS LIST */}
//         <div className="space-y-4">

//           {orders.map((order) => (
//             <div
//               key={order.id}
//               className="bg-white p-5 rounded-xl shadow hover:shadow-md transition"
//             >

//               {/* TOP */}
//               <div className="flex justify-between items-start">

//                 <div>
//                   <h2 className="font-semibold text-lg">
//                     {order.service}
//                   </h2>

//                   <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
//                     <Calendar size={14} />
//                     {order.date}
//                   </div>
//                 </div>

//                 <div className="text-right">
//                   <p className="font-bold text-green-600">
//                     ₹{order.price}
//                   </p>

//                   {getStatusUI(order.status)}
//                 </div>

//               </div>

//               {/* ACTIONS */}
//               <div className="flex gap-3 mt-4">

//                 <button 
//                 onClick={() => navigate(`/order-details/${order.id}`)}
//                 className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
//                   View Details
//                 </button>

//                 {order.status === "completed" && (
//                   <button className="px-3 py-1 text-sm border rounded-lg hover:bg-gray-100">
//                     Rebook
//                   </button>
//                 )}

//               </div>

//             </div>
//           ))}

//         </div>

//         {/* EMPTY STATE (optional) */}
//         {orders.length === 0 && (
//           <div className="text-center text-gray-500 py-10">
//             No orders found 😢
//           </div>
//         )}

//       </div>
//     </UserLayout>
//   );
// }