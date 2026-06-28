import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, User } from "lucide-react";

interface SubVendorForm {
  userId: number;
  vendorId: number;
  specialization: string;
  experienceYears: number;
  availabilityStatus: string;
  rating: number;
  latitude: number;
  longitude: number;
  serviceRadiusKm: number;
}

export default function EditSubVendor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const [form, setForm] = useState<SubVendorForm>({
    userId: 0,
    vendorId: 0,
    specialization: "",
    experienceYears: 0,
    availabilityStatus: "AVAILABLE",
    rating: 0,
    latitude: 0,
    longitude: 0,
    serviceRadiusKm: 0,
  });

  // ================= FETCH SUBVENDOR =================
  const fetchSubVendor = async () => {
    try {
      setPageLoading(true);

      const res = await api.get(`/restful/v1/api/subvendors/${id}`);

      const data = res.data.data || res.data;
      setForm({
        userId: data.userId ?? 0,
        vendorId: data.vendorId ?? 0,
        specialization: data.specialization ?? "",
        experienceYears: data.experienceYears ?? 0,
        availabilityStatus: data.availabilityStatus ?? "AVAILABLE",
        rating: data.rating ?? 0,
        latitude: data.latitude ?? 0,
        longitude: data.longitude ?? 0,
        serviceRadiusKm: data.serviceRadiusKm ?? 0,
      });
    } catch (err) {
      console.error("Error fetching subVendor", err);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchSubVendor();
  }, [id]);

  // ================= UPDATE =================
  const handleUpdate = async () => {
    try {
      setLoading(true);

      await api.put(`/restful/v1/api/subvendors/${id}`, {
        userId: form.userId,
        vendorId: form.vendorId,
        specialization: form.specialization,
        experienceYears: Number(form.experienceYears),
        availabilityStatus: form.availabilityStatus,
        rating: Number(form.rating),
        latitude: Number(form.latitude),
        longitude: Number(form.longitude),
        serviceRadiusKm: Number(form.serviceRadiusKm),
      });

      alert("SubVendor updated successfully");
      navigate("/subvendors");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ================= LOADING =================
  if (pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-lg font-semibold">Loading subvendor...</div>
      </div>
    );
  }

  // ================= UI =================
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">

      {/* CARD */}
      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-8">

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/subvendors")}
          className="flex items-center gap-2 text-gray-600 hover:text-black mb-6"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-100 p-3 rounded-xl">
            <User className="text-blue-600" />
          </div>

          <div>
            <h1 className="text-2xl font-bold">Edit SubVendor</h1>
            <p className="text-sm text-gray-500">
              Update subvendor profile details
            </p>
          </div>
        </div>

        {/* FORM */}
        <div className="space-y-4">

          <div>
            <label className="text-sm text-gray-600">Specialization</label>
            <input
              name="specialization"
              value={form.specialization}
              onChange={handleChange}
              className="w-full border rounded-xl p-3 mt-1"
              placeholder="Enter specialization"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Experience Years</label>
            <input
              name="experienceYears"
              type="number"
              value={form.experienceYears}
              onChange={handleChange}
              className="w-full border rounded-xl p-3 mt-1"
              placeholder="Enter experience years"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Availability Status</label>
            <select
              name="availabilityStatus"
              value={form.availabilityStatus}
              onChange={handleChange}
              className="w-full border rounded-xl p-3 mt-1"
            >
              <option value="AVAILABLE">AVAILABLE</option>
              <option value="BUSY">BUSY</option>
              <option value="INACTIVE">INACTIVE</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-600">Service Radius (KM)</label>
            <input
              name="serviceRadiusKm"
              type="number"
              value={form.serviceRadiusKm}
              onChange={handleChange}
              className="w-full border rounded-xl p-3 mt-1"
              placeholder="Enter service radius in KM"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Latitude</label>
            <input
              name="latitude"
              type="number"
              value={form.latitude}
              onChange={handleChange}
              className="w-full border rounded-xl p-3 mt-1"
              placeholder="Enter latitude"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Longitude</label>
            <input
              name="longitude"
              type="number"
              value={form.longitude}
              onChange={handleChange}
              className="w-full border rounded-xl p-3 mt-1"
              placeholder="Enter longitude"
            />
          </div>

          {/* BUTTON */}
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl flex items-center justify-center gap-2"
          >
            <Save size={18} />
            {loading ? "Updating..." : "Update SubVendor"}
          </button>
        </div>
      </div>
    </div>
  );
}
