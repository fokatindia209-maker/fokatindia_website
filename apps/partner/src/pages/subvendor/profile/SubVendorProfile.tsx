import { useEffect, useState } from "react";
import { Loader2, Save } from "lucide-react";
import PartnerLayout from "../../../components/PartnerLayout";
import api from "../../../api/axios";

interface SubVendorData {
  userId: number;
  subVendorId: number;
  vendorId: number;
  name: string;
  email: string;
  phone: string;
  status: string;
  specialization: string;
  experienceYears: number;
  availabilityStatus: string;
  rating: number;
  latitude: number;
  longitude: number;
  serviceRadiusKm: number;
  createdAt: string;
}

const tabs = ["Overview", "Professional", "KYC"];

export default function SubVendorProfile() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [profile, setProfile] = useState<SubVendorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    specialization: "",
    experienceYears: "",
    serviceRadiusKm: "",
    availabilityStatus: "AVAILABLE",
  });

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const res = await api.get(
        `/restful/v1/api/subvendors/${user.subVendorId}`
      );
      const data: SubVendorData = res.data?.data;
      setProfile(data);
      setForm({
        specialization: data.specialization || "",
        experienceYears: String(data.experienceYears || ""),
        serviceRadiusKm: String(data.serviceRadiusKm || ""),
        availabilityStatus: data.availabilityStatus || "AVAILABLE",
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const saveProfile = async () => {
    if (!profile) return;
    try {
      setSaving(true);
      await api.put(`/restful/v1/api/subvendors/${profile.subVendorId}`, {
        userId: profile.userId,
        vendorId: profile.vendorId,
        specialization: form.specialization,
        experienceYears: Number(form.experienceYears) || 0,
        serviceRadiusKm: Number(form.serviceRadiusKm) || 0,
        availabilityStatus: form.availabilityStatus,
        latitude: profile.latitude,
        longitude: profile.longitude,
        rating: profile.rating,
      });
      await fetchProfile();
      alert("Profile updated successfully");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <PartnerLayout role="SUB_VENDOR">
        <div className="flex items-center justify-center py-20 gap-2 text-gray-600">
          <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
          Loading profile...
        </div>
      </PartnerLayout>
    );
  }

  return (
    <PartnerLayout role="SUB_VENDOR">
      <div className="p-6 max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="bg-white rounded-2xl shadow p-6 mb-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center text-3xl font-bold text-purple-600">
              {profile?.name?.charAt(0)?.toUpperCase() || "S"}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{profile?.name || "—"}</h1>
              <p className="text-gray-500">Sub-Vendor ID: #{profile?.subVendorId}</p>
              <span
                className={`inline-block mt-1 px-3 py-0.5 rounded-full text-sm font-medium ${
                  profile?.status === "ACTIVE"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {profile?.status}
              </span>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="bg-white rounded-xl shadow mb-6">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-4 whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-blue-600 text-blue-600 font-semibold"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* CONTENT */}
        <div className="bg-white rounded-xl shadow p-6">

          {activeTab === "Overview" && (
            <div className="grid md:grid-cols-2 gap-4">
              {(
                [
                  ["Name", profile?.name],
                  ["Email", profile?.email],
                  ["Phone", profile?.phone],
                  ["Rating", profile?.rating ? `⭐ ${profile.rating}` : "—"],
                  ["Availability", profile?.availabilityStatus],
                  [
                    "Member Since",
                    profile?.createdAt
                      ? new Date(profile.createdAt).toLocaleDateString()
                      : "—",
                  ],
                ] as [string, string | number | undefined][]
              ).map(([label, value]) => (
                <div key={label} className="border rounded-lg p-4">
                  <p className="text-sm text-gray-500">{label}</p>
                  <p className="font-medium mt-1">{value || "—"}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "Professional" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Specialization
                </label>
                <input
                  className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.specialization}
                  onChange={(e) => setForm({ ...form, specialization: e.target.value })}
                  placeholder="e.g. Deep Cleaning"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Experience (years)
                  </label>
                  <input
                    type="number"
                    min="0"
                    className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.experienceYears}
                    onChange={(e) => setForm({ ...form, experienceYears: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Service Radius (km)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.serviceRadiusKm}
                    onChange={(e) => setForm({ ...form, serviceRadiusKm: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Availability Status
                </label>
                <select
                  className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.availabilityStatus}
                  onChange={(e) => setForm({ ...form, availabilityStatus: e.target.value })}
                >
                  <option value="AVAILABLE">Available</option>
                  <option value="BUSY">Busy</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
              </div>

              <button
                onClick={saveProfile}
                disabled={saving}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl disabled:opacity-50 transition-colors"
              >
                <Save size={16} />
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          )}

          {activeTab === "KYC" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <span className="font-medium">KYC Status</span>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                  APPROVED
                </span>
              </div>
              <p className="text-sm text-gray-500">
                KYC documents are managed by the admin. Contact your vendor or support to update your KYC details.
              </p>
            </div>
          )}

        </div>
      </div>
    </PartnerLayout>
  );
}
