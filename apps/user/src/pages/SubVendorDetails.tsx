import UserLayout from "../components/UserLayout";
import { useParams } from "react-router-dom";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../api/axios";

interface SubVendorAPIResponse {
  availabilityStatus: string;
  createdAt: string;
  email: string;
  experienceYears: number;
  name: string;
  phone: string;
  rating: number;
  specialization: string;
  status: string;
  subVendorId: number;
  userId: number;
  vendorId: number;
}

interface SubVendor {
  id: number;
  name: string;
  description: string;
  rating: number;
  experience: string;
  services: string[];
}

export default function SubVendorDetails() {
  const { id } = useParams<{ id: string }>();
  // const navigate = useNavigate();

  const [subVendor, setSubVendor] = useState<SubVendor | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubVendor = async () => {
      try {
        setLoading(true);

        const res = await api.get<{ data: SubVendorAPIResponse }>(
          `/subvendors/${id}`
        );

        const data = res.data.data;

        const formatted: SubVendor = {
          id: data.subVendorId,
          name: data.name,
          description: data.specialization,
          rating: data.rating,
          experience: `${data.experienceYears} Years`,
          services: data.specialization ? [data.specialization] : [],
        };

        setSubVendor(formatted);
      } catch (err) {
        console.error(err);
        setError("Failed to load sub vendor");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchSubVendor();
  }, [id]);

  // =========================
  // BOOK HANDLER (LOGIN CHECK)
  // =========================
  // const handleBook = () => {
  //   const isLoggedIn = !!localStorage.getItem("token");

  //   if (isLoggedIn) {
  //      navigate("/addresses", {
  //       state: {
  //         subVendorId: id,
  //       },
  //     });
  //   } else {
  //     navigate("/login", {
  //       state: {
  //         redirectTo: `/booking/${id}`,
  //       },
  //     });
  //   }
  // };

  if (loading) {
    return (
      <UserLayout>
        <div className="p-4">Loading...</div>
      </UserLayout>
    );
  }

  if (error) {
    return (
      <UserLayout>
        <div className="p-4 text-red-500">{error}</div>
      </UserLayout>
    );
  }

  if (!subVendor) return null;

  return (
    <UserLayout>
      <div className="space-y-6 py-4 px-4">

        {/* PROFILE */}
        <div className="bg-white rounded-xl shadow p-5">
          <h1 className="text-2xl font-bold">{subVendor.name}</h1>

          <div className="flex items-center gap-1 text-yellow-500 mt-2">
            <Star size={16} />
            {subVendor.rating}
          </div>

          <p className="text-gray-500 mt-3 text-sm">
            {subVendor.description}
          </p>

          <div className="mt-4 text-sm bg-gray-100 p-3 rounded-lg">
            <p className="text-gray-500">Experience</p>
            <p className="font-semibold">{subVendor.experience}</p>
          </div>
        </div>

        {/* SERVICES */}
        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="font-bold mb-3">Services</h2>

          <div className="flex flex-wrap gap-2">
            {subVendor.services.map((s, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* BOOK BUTTON */}
        {/* <button
          onClick={handleBook}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700"
        >
          Book
        </button> */}

      </div>
    </UserLayout>
  );
}
// import UserLayout from "../components/UserLayout";
// import { useParams, useNavigate } from "react-router-dom";
// import { Star } from "lucide-react";
// import { useEffect, useState } from "react";
// import api from "../api/axios";

// interface SubVendorAPIResponse {
//   availabilityStatus: string;
//   createdAt: string;
//   email: string;
//   experienceYears: number;
//   name: string;
//   phone: string;
//   rating: number;
//   specialization: string;
//   status: string;
//   subVendorId: number;
//   userId: number;
//   vendorId: number;
// }

// interface SubVendor {
//   id: number;
//   name: string;
//   description: string;
//   rating: number;
//   experience: string;
//   services: string[];
// }

// export default function SubVendorDetails() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();

//   const [subVendor, setSubVendor] = useState<SubVendor | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchSubVendor = async () => {
//       try {
//         setLoading(true);

//         const res = await api.get<{ data: SubVendorAPIResponse }>(
//           `/subvendors/${id}`
//         );

//         const data = res.data.data;

//         const formatted: SubVendor = {
//           id: data.subVendorId,
//           name: data.name,
//           description: data.specialization,
//           rating: data.rating,
//           experience: `${data.experienceYears} Years`,
//           services: data.specialization ? [data.specialization] : [],
//         };

//         setSubVendor(formatted);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load sub vendor");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) fetchSubVendor();
//   }, [id]);

//   if (loading) {
//     return (
//       <UserLayout>
//         <div className="p-4">Loading...</div>
//       </UserLayout>
//     );
//   }

//   if (error) {
//     return (
//       <UserLayout>
//         <div className="p-4 text-red-500">{error}</div>
//       </UserLayout>
//     );
//   }

//   if (!subVendor) return null;

//   return (
//     <UserLayout>
//       <div className="space-y-6 py-4 px-4">

//         {/* PROFILE */}
//         <div className="bg-white rounded-xl shadow p-5">
//           <h1 className="text-2xl font-bold">{subVendor.name}</h1>

//           <div className="flex items-center gap-1 text-yellow-500 mt-2">
//             <Star size={16} />
//             {subVendor.rating}
//           </div>

//           <p className="text-gray-500 mt-3 text-sm">
//             {subVendor.description}
//           </p>

//           <div className="mt-4 text-sm bg-gray-100 p-3 rounded-lg">
//             <p className="text-gray-500">Experience</p>
//             <p className="font-semibold">{subVendor.experience}</p>
//           </div>
//         </div>

//         {/* SERVICES */}
//         <div className="bg-white rounded-xl shadow p-5">
//           <h2 className="font-bold mb-3">Services</h2>

//           <div className="flex flex-wrap gap-2">
//             {subVendor.services.map((s, i) => (
//               <span
//                 key={i}
//                 className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
//               >
//                 {s}
//               </span>
//             ))}
//           </div>
//         </div>

//         {/* BOOK BUTTON */}
//         <button
//           onClick={() => navigate(`/booking/${id}`)}
//           className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700"
//         >
//           Book
//         </button>

//       </div>
//     </UserLayout>
//   );
// }
// // import UserLayout from "../components/UserLayout";
// // import { useParams, useNavigate } from "react-router-dom";
// // import { Star } from "lucide-react";

// // export default function SubVendorDetails() {
// //   const { id } = useParams();
// //   const navigate = useNavigate();

// //   const vendor = {
// //     id,
// //     name: "Rahul Sharma",
// //     description:
// //       "Professional technician with 5+ years experience in AC repair, installation and maintenance. Fast service with high customer satisfaction.",
// //     rating: 4.6,
// //     completedJobs: 120,
// //     experience: "5+ Years",
// //     services: [
// //       "AC Repair",
// //       "AC Installation",
// //       "Gas Filling",
// //       "Cooling Issue Fix",
// //     ],
// //   };

// //   return (
// //     <UserLayout>
// //       <div className="space-y-6 py-4 px-4">



// //         {/* PROFILE CARD */}
// //         <div className="bg-white rounded-xl shadow p-5">
// //           <h1 className="text-2xl font-bold">
// //             {vendor.name}
// //           </h1>

// //           <div className="flex items-center gap-1 text-yellow-500 mt-2">
// //             <Star size={16} />
// //             {vendor.rating}
// //           </div>

// //           <p className="text-gray-500 mt-3 text-sm">
// //             {vendor.description}
// //           </p>

// //           {/* STATS */}
// //           <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
// //             <div className="bg-gray-100 p-3 rounded-lg">
// //               <p className="text-gray-500">Experience</p>
// //               <p className="font-semibold">
// //                 {vendor.experience}
// //               </p>
// //             </div>

// //             <div className="bg-gray-100 p-3 rounded-lg">
// //               <p className="text-gray-500">Jobs Completed</p>
// //               <p className="font-semibold">
// //                 {vendor.completedJobs}
// //               </p>
// //             </div>
// //           </div>
// //         </div>

// //         {/* SERVICES */}
// //         <div className="bg-white rounded-xl shadow p-5">
// //           <h2 className="font-bold mb-3">Services</h2>

// //           <div className="flex flex-wrap gap-2">
// //             {vendor.services.map((s, i) => (
// //               <span
// //                 key={i}
// //                 className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
// //               >
// //                 {s}
// //               </span>
// //             ))}
// //           </div>
// //         </div>

// //         {/* BOOK BUTTON */}
// //         <button
// //           onClick={() =>
// //             navigate(`/booking/${id}`)
// //           }
// //           className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700"
// //         >
// //           Book
// //         </button>

// //       </div>
// //     </UserLayout>
// //   );
// // }