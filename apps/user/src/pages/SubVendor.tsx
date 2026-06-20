import UserLayout from "../components/UserLayout";
import { Search, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

interface SubVendor {
  subVendorId: number;
  name: string;
  specialization: string;
  experienceYears: number;
  rating: number;
  availabilityStatus: string;
}

export default function SubVendors() {
  const navigate = useNavigate();
  const { serviceId } = useParams();

  const [search, setSearch] = useState("");
  const [subVendors, setSubVendors] = useState<SubVendor[]>([]);
  const [loading, setLoading] = useState(false);

  const lat = 25.2048;
  const lng = 55.2708;

  useEffect(() => {
    if (!serviceId) return;

    const fetchSubVendors = async () => {
      try {
        setLoading(true);

        const res = await api.get(`/subvendors/service/${serviceId}`, {
          params: { lat, lng },
        });

        setSubVendors(res.data.data || []);
      } catch (err) {
        console.error("Error fetching subvendors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubVendors();
  }, [serviceId]);

  const filtered = subVendors.filter((v) => {
    const name = v.name?.toLowerCase() || "";
    const spec = v.specialization?.toLowerCase() || "";

    return (
      name.includes(search.toLowerCase()) ||
      spec.includes(search.toLowerCase())
    );
  });

  const handleBook = (data: any) => {
    const isLoggedIn = !!localStorage.getItem("token");


    localStorage.setItem(
      "vendorId",
      data.vendorId.toString()
    );
    localStorage.setItem(
      "subVendorId",
      data.subVendorId.toString()
    );
    if (isLoggedIn) {
      navigate("/addresses", {
        state: {
          subVendorId: data.subVendorId,
        },
      });
    } else {
      navigate("/login", {
        state: {
          redirectTo: `/booking/${data.subVendorId}`,
        },
      });
    }
  };

  return (
    <UserLayout>
      <div className="space-y-6 py-4 px-4">

        {/* SEARCH */}
        <div className="flex items-center bg-white rounded-xl shadow px-4 py-3">
          <Search size={18} className="text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search vendors..."
            className="w-full ml-2 outline-none text-sm"
          />
        </div>

        {/* LOADING */}
        {loading && (
          <div className="text-center text-gray-500 py-10">
            Loading cleaners...
          </div>
        )}

        {/* LIST */}
        {!loading && (
          <div className="space-y-3">
            {filtered.map((v) => (
              <div
                key={v.subVendorId}
                className="bg-white rounded-xl shadow p-4 hover:shadow-md transition"
              >

                <h2 className="font-semibold text-lg">{v.name}</h2>

                <p className="text-sm text-gray-500 mt-1">
                  {v.specialization}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  {v.experienceYears} years experience
                </p>

                <div className="flex items-center gap-1 text-yellow-500 text-sm mt-2">
                  <Star size={14} />
                  {v.rating || 0}
                </div>

                <p className="text-xs mt-1">
                  Status:{" "}
                  <span
                    className={
                      v.availabilityStatus === "AVAILABLE"
                        ? "text-green-600"
                        : "text-red-500"
                    }
                  >
                    {v.availabilityStatus}
                  </span>
                </p>

                <div className="flex justify-end gap-2 mt-4">

                  <button
                    onClick={() =>
                      navigate(`/subvendor/${v.subVendorId}`)
                    }
                    className="px-4 py-1 rounded-lg border text-sm hover:bg-gray-100"
                  >
                    View
                  </button>

                  <button
                    onClick={() => handleBook(v)}
                    className="px-4 py-1 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700"
                  >
                    Book
                  </button>

                </div>

              </div>
            ))}
          </div>
        )}

        {/* EMPTY */}
        {!loading && filtered.length === 0 && (
          <div className="text-center text-gray-500 py-10">
            No Sub Vendors found
          </div>
        )}

      </div>
    </UserLayout>
  );
}