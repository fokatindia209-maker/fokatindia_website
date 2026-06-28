import { useEffect, useState } from "react";
import { Loader2, Save, User, Briefcase, ShieldCheck } from "lucide-react";
import PartnerLayout from "../../../components/PartnerLayout";
import api from "../../../api/axios";

interface VendorData {
  vendorId: number;
  userId: number;
  businessName: string;
  gstNumber: string;
  serviceArea: string;
  kycStatus: string;
  rating: number;
  name: string;
  email: string;
  phone: string;
  status: string;
  createdAt: string;
}

interface VendorForm {
  businessName: string;
  gstNumber: string;
  serviceArea: string;
  address: string;
  city: string;
}

const tabs = [
  { id: "Overview", icon: User },
  { id: "Business", icon: Briefcase },
  { id: "KYC", icon: ShieldCheck },
];

const kycBadge = (status: string) => {
  if (status === "APPROVED") return "bg-green-100 text-green-700";
  if (status === "PENDING") return "bg-yellow-100 text-yellow-700";
  if (status === "REJECTED") return "bg-red-100 text-red-700";
  return "bg-gray-100 text-gray-600";
};

export default function VendorProfile() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [vendor, setVendor] = useState<VendorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [form, setForm] = useState<VendorForm>({
    businessName: "",
    gstNumber: "",
    serviceArea: "",
    address: "",
    city: "",
  });

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const fetchProfile = async () => {
    try {
      setLoading(true);
      // Use userId (not vendorId) — endpoint is GET /vendors/users/{userId}
      const res = await api.get(`/restful/v1/api/vendors/users/${user.userId}`);
      const data: VendorData = res.data?.data;
      setVendor(data);
      setForm({
        businessName: data.businessName || "",
        gstNumber: data.gstNumber || "",
        serviceArea: data.serviceArea || "",
        address: "",
        city: "",
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveProfile = async () => {
    if (!vendor) return;
    try {
      setSaving(true);
      setSaveMsg(null);
      await api.put(`/restful/v1/api/vendors/${vendor.vendorId}`, {
        userId: vendor.userId,
        businessName: form.businessName,
        gstNumber: form.gstNumber,
        serviceArea: form.serviceArea,
        address: form.address,
        city: form.city,
      });
      await fetchProfile();
      setSaveMsg({ ok: true, text: "Profile updated successfully." });
    } catch (err) {
      console.error(err);
      setSaveMsg({ ok: false, text: "Update failed. Please try again." });
    } finally {
      setSaving(false);
    }
  };

  const field = (label: string, value: string | number | undefined) => (
    <div key={label} className="border rounded-lg p-4">
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">{label}</p>
      <p className="font-medium text-gray-800">{value || "—"}</p>
    </div>
  );

  if (loading) {
    return (
      <PartnerLayout role="VENDOR">
        <div className="flex items-center justify-center py-20 gap-2 text-gray-500">
          <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
          Loading profile…
        </div>
      </PartnerLayout>
    );
  }

  return (
    <PartnerLayout role="VENDOR">
      <div className="p-4 md:p-6 max-w-3xl mx-auto">

        {/* HEADER CARD */}
        <div className="bg-white rounded-2xl shadow p-6 mb-6 flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-3xl font-bold text-blue-600 flex-shrink-0">
            {vendor?.businessName?.charAt(0)?.toUpperCase() || "V"}
          </div>
          <div className="min-w-0">
            <h1 className="text-2xl font-bold truncate">{vendor?.businessName || "—"}</h1>
            <p className="text-sm text-gray-500 mt-0.5">Vendor ID: #{vendor?.vendorId}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <span
                className={`inline-block px-3 py-0.5 rounded-full text-xs font-semibold ${
                  vendor?.status === "ACTIVE"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {vendor?.status || "UNKNOWN"}
              </span>
              <span className={`inline-block px-3 py-0.5 rounded-full text-xs font-semibold ${kycBadge(vendor?.kycStatus || "")}`}>
                KYC: {vendor?.kycStatus || "UNKNOWN"}
              </span>
              {vendor?.rating ? (
                <span className="inline-block px-3 py-0.5 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                  ⭐ {vendor.rating.toFixed(1)}
                </span>
              ) : null}
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="bg-white rounded-xl shadow mb-6">
          <div className="flex overflow-x-auto border-b">
            {tabs.map(({ id, icon: Icon }) => (
              <button
                key={id}
                onClick={() => { setActiveTab(id); setSaveMsg(null); }}
                className={`flex items-center gap-2 px-5 py-4 whitespace-nowrap border-b-2 -mb-px transition-colors ${
                  activeTab === id
                    ? "border-blue-600 text-blue-600 font-semibold"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <Icon size={16} />
                {id}
              </button>
            ))}
          </div>
        </div>

        {/* TAB CONTENT */}
        <div className="bg-white rounded-xl shadow p-6">

          {/* ── OVERVIEW ── */}
          {activeTab === "Overview" && (
            <div className="grid md:grid-cols-2 gap-4">
              {field("Name", vendor?.name)}
              {field("Email", vendor?.email)}
              {field("Phone", vendor?.phone)}
              {field("Business Name", vendor?.businessName)}
              {field("GST Number", vendor?.gstNumber)}
              {field("Service Area", vendor?.serviceArea)}
              {field("KYC Status", vendor?.kycStatus)}
              {field("Rating", vendor?.rating ? `${vendor.rating.toFixed(1)} / 5` : undefined)}
              {field(
                "Member Since",
                vendor?.createdAt
                  ? new Date(vendor.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : undefined
              )}
            </div>
          )}

          {/* ── BUSINESS (editable) ── */}
          {activeTab === "Business" && (
            <div className="space-y-4">
              {saveMsg && (
                <div
                  className={`p-3 rounded-lg text-sm ${
                    saveMsg.ok
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  {saveMsg.text}
                </div>
              )}

              {(
                [
                  ["Business Name", "businessName", "e.g. ABC Services Pvt. Ltd."],
                  ["GST Number", "gstNumber", "e.g. 27AAPFU0939F1ZV"],
                  ["Service Area", "serviceArea", "e.g. Mumbai, Thane"],
                  ["Address", "address", "e.g. Shop 5, MG Road"],
                  ["City", "city", "e.g. Mumbai"],
                ] as [string, keyof VendorForm, string][]
              ).map(([label, key, placeholder]) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
                  <input
                    className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={placeholder}
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  />
                </div>
              ))}

              <button
                onClick={saveProfile}
                disabled={saving}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl disabled:opacity-50 transition-colors text-sm font-medium"
              >
                {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                {saving ? "Saving…" : "Save Changes"}
              </button>
            </div>
          )}

          {/* ── KYC ── */}
          {activeTab === "KYC" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <span className="font-medium text-gray-700">KYC Status</span>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${kycBadge(vendor?.kycStatus || "")}`}>
                  {vendor?.kycStatus || "UNKNOWN"}
                </span>
              </div>

              {vendor?.kycStatus === "APPROVED" && (
                <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                  <ShieldCheck size={18} />
                  Your KYC is verified. You have full access to all features.
                </div>
              )}

              {vendor?.kycStatus === "PENDING" && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700 text-sm">
                  Your KYC documents are under review. You will be notified once verified.
                </div>
              )}

              {vendor?.kycStatus === "REJECTED" && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  Your KYC was rejected. Please contact support to re-submit your documents.
                </div>
              )}

              <p className="text-sm text-gray-400">
                KYC documents are managed by the admin. Contact support to update your KYC details.
              </p>
            </div>
          )}

        </div>
      </div>
    </PartnerLayout>
  );
}
