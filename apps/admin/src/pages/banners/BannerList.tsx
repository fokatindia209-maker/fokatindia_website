import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

interface Banner {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  redirectUrl: string;
  bannerType: string;
  displayOrder: number;
  active: boolean;
  startDate: string;
  endDate: string;
}

export default function BannerList() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [togglingId, setTogglingId] = useState<number | null>(null);

  const navigate = useNavigate();

  const fetchBanners = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/restful/v1/api/banners`);

      setBanners(res.data.data || []);
    } catch (err) {
      console.error(err);
      setBanners([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const deleteBanner = async (id: number) => {
    if (!confirm("Delete this banner?")) return;

    try {
      setDeletingId(id);

      await api.delete(`/restful/v1/api/banners/${id}`);

      await fetchBanners();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  const toggleStatus = async (banner: Banner) => {
    try {
      setTogglingId(banner.id);

      await api.put(
        `/restful/v1/api/banners/${banner.id}/status?active=${!banner.active}`
      );

      await fetchBanners();
    } catch (err) {
      console.error(err);
      alert("Status update failed");
    } finally {
      setTogglingId(null);
    }
  };

  return (
    <div className="py-10 px-4">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Banners
        </h1>

        <button
          onClick={() => navigate("/banners/create")}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl"
        >
          + Create Banner
        </button>
      </div>

      {/* MOBILE CARDS */}
      <div className="md:hidden space-y-3">
        {loading && (
          <div className="bg-white rounded-xl p-6 text-center text-gray-500">
            <Loader2 className="w-5 h-5 animate-spin text-blue-600 mx-auto mb-2" />
            Loading banners...
          </div>
        )}
        {!loading && banners.length === 0 && (
          <div className="bg-white rounded-xl p-6 text-center text-gray-500">No banners found</div>
        )}
        {!loading && banners.map((b) => (
          <div key={b.id} className="bg-white rounded-xl shadow p-4 space-y-2">
            <div className="flex items-center gap-3">
              {b.imageUrl ? (
                <img src={b.imageUrl} className="w-12 h-12 rounded-lg object-cover cursor-pointer" onClick={() => window.open(b.imageUrl, "_blank")} />
              ) : (
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-xs">No img</div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-800 truncate">{b.title}</span>
                  <span className={`ml-2 px-2 py-1 rounded text-xs shrink-0 ${b.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{b.active ? "ACTIVE" : "INACTIVE"}</span>
                </div>
                <p className="text-xs text-gray-400 truncate">{b.bannerType} · Order {b.displayOrder}</p>
              </div>
            </div>
            <div className="flex gap-2 pt-1 flex-wrap">
              <button onClick={() => navigate(`/banners/edit/${b.id}`)} className="px-3 py-1 bg-blue-500 text-white rounded text-sm">Edit</button>
              <button onClick={() => toggleStatus(b)} disabled={togglingId === b.id} className="px-3 py-1 bg-amber-500 text-white rounded text-sm disabled:opacity-50">
                {togglingId === b.id ? "..." : b.active ? "Deactivate" : "Activate"}
              </button>
              <button onClick={() => deleteBanner(b.id)} disabled={deletingId === b.id} className="px-3 py-1 bg-red-600 text-white rounded text-sm disabled:opacity-50">
                {deletingId === b.id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block bg-white shadow rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">

            {/* HEADER ROW */}
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Order</th>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Schedule</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>

              {loading && (
                <tr>
                  <td colSpan={8} className="p-4">
                    <div className="flex items-center justify-center gap-2 text-gray-600">
                      <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                      Loading banners...
                    </div>
                  </td>
                </tr>
              )}
            </thead>

            <tbody>

              {/* EMPTY STATE */}
              {!loading && banners.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-10 text-gray-500">
                    No banners found
                  </td>
                </tr>
              )}

              {/* DATA ROWS */}
              {!loading &&
                banners.map((b) => (
                  <tr
                    key={b.id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="p-3">{b.id}</td>
                    <td className="p-3 font-semibold">{b.title}</td>
                    <td className="p-3">{b.bannerType}</td>
                    <td className="p-3">{b.displayOrder}</td>

                    <td className="p-3">
                      {b.imageUrl ? (
                        <img
                          src={b.imageUrl}
                          onClick={() =>
                            window.open(b.imageUrl, "_blank")
                          }
                          className="w-10 h-10 rounded cursor-pointer hover:scale-105 transition"
                        />
                      ) : (
                        "-"
                      )}
                    </td>

                    <td className="p-3 text-xs text-gray-500">
                      {b.startDate?.slice(0, 10)} → {b.endDate?.slice(0, 10)}
                    </td>

                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          b.active
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {b.active ? "ACTIVE" : "INACTIVE"}
                      </span>
                    </td>

                    <td className="p-3 flex gap-2">
                      <button
                        onClick={() =>
                          navigate(`/banners/edit/${b.id}`)
                        }
                        className="px-3 py-1 bg-blue-500 text-white rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => toggleStatus(b)}
                        disabled={togglingId === b.id}
                        className="px-3 py-1 bg-amber-500 text-white rounded disabled:opacity-50"
                      >
                        {togglingId === b.id ? "..." : b.active ? "Deactivate" : "Activate"}
                      </button>

                      <button
                        onClick={() => deleteBanner(b.id)}
                        disabled={deletingId === b.id}
                        className="px-3 py-1 bg-red-600 text-white rounded disabled:opacity-50"
                      >
                        {deletingId === b.id ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}
