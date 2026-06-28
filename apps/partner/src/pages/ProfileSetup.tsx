import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Loader2,
  Save,
  Briefcase,
  Wrench,
  ChevronRight,
  CheckCircle,
} from "lucide-react";
import api from "../api/axios";

// ─── Vendor form fields ───────────────────────────────────────────────────────
interface VendorForm {
  businessName: string;
  gstNumber: string;
  serviceArea: string;
  address: string;
  city: string;
}

// ─── SubVendor form fields ────────────────────────────────────────────────────
interface SubForm {
  specialization: string;
  experienceYears: string;
  serviceRadiusKm: string;
  availabilityStatus: string;
}

export default function ProfileSetup() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role: string = user.role || "";

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState<any>(null);

  const [vendorForm, setVendorForm] = useState<VendorForm>({
    businessName: "",
    gstNumber: "",
    serviceArea: "",
    address: "",
    city: "",
  });

  const [subForm, setSubForm] = useState<SubForm>({
    specialization: "",
    experienceYears: "",
    serviceRadiusKm: "",
    availabilityStatus: "AVAILABLE",
  });

  // ── Fetch existing profile to pre-fill ─────────────────────────────────────
  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        if (role === "VENDOR") {
          const res = await api.get(
            `/restful/v1/api/vendors/users/${user.userId}`
          );
          const d = res.data?.data;
          setProfile(d);
          setVendorForm({
            businessName: d?.businessName || "",
            gstNumber: d?.gstNumber || "",
            serviceArea: d?.serviceArea || "",
            address: d?.address || "",
            city: d?.city || "",
          });
        } else if (role === "SUB_VENDOR") {
          const res = await api.get(
            `/restful/v1/api/subvendors/${user.subVendorId}`
          );
          const d = res.data?.data;
          setProfile(d);
          setSubForm({
            specialization: d?.specialization || "",
            experienceYears: String(d?.experienceYears || ""),
            serviceRadiusKm: String(d?.serviceRadiusKm || ""),
            availabilityStatus: d?.availabilityStatus || "AVAILABLE",
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Save profile ────────────────────────────────────────────────────────────
  const handleSave = async () => {
    setError("");

    try {
      setSaving(true);

      if (role === "VENDOR") {
        if (!vendorForm.businessName.trim()) {
          setError("Business name is required.");
          return;
        }

        await api.put(`/restful/v1/api/vendors/${profile.vendorId}`, {
          userId: user.userId,
          businessName: vendorForm.businessName,
          gstNumber: vendorForm.gstNumber,
          serviceArea: vendorForm.serviceArea,
          address: vendorForm.address,
          city: vendorForm.city,
        });
      } else {
        if (!subForm.specialization.trim()) {
          setError("Specialization is required.");
          return;
        }

        await api.put(`/restful/v1/api/subvendors/${profile.subVendorId}`, {
          userId: profile.userId,
          vendorId: profile.vendorId,
          specialization: subForm.specialization,
          experienceYears: Number(subForm.experienceYears) || 0,
          serviceRadiusKm: Number(subForm.serviceRadiusKm) || 0,
          availabilityStatus: subForm.availabilityStatus,
          latitude: profile.latitude ?? 0,
          longitude: profile.longitude ?? 0,
          rating: profile.rating ?? 0,
        });
      }

      localStorage.setItem("profileSetupDone", "1");
      navigate("/document_upload");
    } catch (err) {
      console.error(err);
      setError("Failed to save profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleSkip = () => {
    localStorage.setItem("profileSetupDone", "1");
    navigate("/document_upload");
  };

  // ── Loading state ───────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <Loader2 className="w-7 h-7 animate-spin text-blue-600" />
      </div>
    );
  }

  const isVendor = role === "VENDOR";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-8">

        {/* ── HEADER ────────────────────────────────────────────────────── */}
        <div className="text-center mb-6">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${isVendor ? "bg-blue-100" : "bg-purple-100"}`}>
            {isVendor
              ? <Briefcase size={32} className="text-blue-600" />
              : <Wrench size={32} className="text-purple-600" />
            }
          </div>

          <h1 className="text-2xl font-bold text-gray-800">
            {isVendor ? "Business Setup" : "Professional Setup"}
          </h1>

          <p className="text-gray-500 mt-1 text-sm">
            {isVendor
              ? "Tell us about your business before uploading documents."
              : "Tell us about your expertise before uploading documents."}
          </p>
        </div>

        {/* ── STEP INDICATOR ────────────────────────────────────────────── */}
        <div className="flex items-center gap-3 mb-7">
          {/* Step 1 */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">1</div>
            <span className="text-sm font-semibold text-blue-600">Profile</span>
          </div>

          <div className="flex-1 h-0.5 bg-gray-200 rounded">
            <div className="h-full w-0 bg-blue-600 rounded" />
          </div>

          {/* Step 2 */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs font-bold">2</div>
            <span className="text-sm text-gray-400">Documents</span>
          </div>
        </div>

        {/* ── ERROR ─────────────────────────────────────────────────────── */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">
            {error}
          </div>
        )}

        {/* ── VENDOR FORM ───────────────────────────────────────────────── */}
        {isVendor && (
          <div className="space-y-4">
            <Field
              label="Business Name *"
              placeholder="e.g. ABC Services Pvt. Ltd."
              value={vendorForm.businessName}
              onChange={(v) => setVendorForm({ ...vendorForm, businessName: v })}
            />
            <Field
              label="GST Number"
              placeholder="e.g. 27AAPFU0939F1ZV"
              value={vendorForm.gstNumber}
              onChange={(v) => setVendorForm({ ...vendorForm, gstNumber: v })}
            />
            <div className="grid grid-cols-2 gap-4">
              <Field
                label="City"
                placeholder="e.g. Mumbai"
                value={vendorForm.city}
                onChange={(v) => setVendorForm({ ...vendorForm, city: v })}
              />
              <Field
                label="Service Area"
                placeholder="e.g. Mumbai, Thane"
                value={vendorForm.serviceArea}
                onChange={(v) => setVendorForm({ ...vendorForm, serviceArea: v })}
              />
            </div>
            <Field
              label="Address"
              placeholder="e.g. Shop 5, MG Road, Andheri"
              value={vendorForm.address}
              onChange={(v) => setVendorForm({ ...vendorForm, address: v })}
            />
          </div>
        )}

        {/* ── SUB_VENDOR FORM ───────────────────────────────────────────── */}
        {!isVendor && (
          <div className="space-y-4">
            <Field
              label="Specialization *"
              placeholder="e.g. Deep Cleaning, Plumbing"
              value={subForm.specialization}
              onChange={(v) => setSubForm({ ...subForm, specialization: v })}
            />

            <div className="grid grid-cols-2 gap-4">
              <Field
                label="Experience (years)"
                placeholder="e.g. 5"
                type="number"
                value={subForm.experienceYears}
                onChange={(v) => setSubForm({ ...subForm, experienceYears: v })}
              />
              <Field
                label="Service Radius (km)"
                placeholder="e.g. 10"
                type="number"
                value={subForm.serviceRadiusKm}
                onChange={(v) => setSubForm({ ...subForm, serviceRadiusKm: v })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Availability Status
              </label>
              <select
                className="w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                value={subForm.availabilityStatus}
                onChange={(e) => setSubForm({ ...subForm, availabilityStatus: e.target.value })}
              >
                <option value="AVAILABLE">Available</option>
                <option value="BUSY">Busy</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>
          </div>
        )}

        {/* ── ACTIONS ───────────────────────────────────────────────────── */}
        <div className="flex gap-3 mt-7">
          <button
            onClick={handleSkip}
            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-500 hover:bg-gray-50 transition-colors"
          >
            Skip for now
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl text-sm font-semibold disabled:opacity-50 transition-colors"
          >
            {saving
              ? <Loader2 size={16} className="animate-spin" />
              : <Save size={16} />
            }
            {saving ? "Saving…" : "Save & Continue"}
          </button>
        </div>

        {/* ── HINT ──────────────────────────────────────────────────────── */}
        <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
          <CheckCircle size={12} />
          You can always update this from your profile later.
        </p>

        {/* ── NEXT STEP PREVIEW ─────────────────────────────────────────── */}
        <div className="mt-5 p-3 bg-gray-50 rounded-xl flex items-center gap-3 text-sm text-gray-500">
          <ChevronRight size={16} className="text-blue-400 shrink-0" />
          <span>Next: Upload KYC documents to get verified.</span>
        </div>

      </div>
    </div>
  );
}

// ─── Reusable input field ─────────────────────────────────────────────────────
function Field({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">
        {label}
      </label>
      <input
        type={type}
        min={type === "number" ? "0" : undefined}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
    </div>
  );
}
