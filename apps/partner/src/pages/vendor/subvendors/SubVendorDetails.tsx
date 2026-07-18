import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, AlertCircle, Star } from "lucide-react";
import PartnerLayout from "../../../components/PartnerLayout";
import api from "../../../api/axios";

interface SubVendorDetail {
  userId: number;
  subVendorId: number;
  vendorId: number;
  specialization: string;
  latitude: number;
  longitude: number;
  serviceRadiusKm: number;
  experienceYears: number;
  availabilityStatus: string;
  rating: number;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  status: string;
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between py-3 border-b last:border-0">
      <span className="text-gray-500 text-sm">{label}</span>
      <span className="font-medium text-sm text-right max-w-xs">{value || "—"}</span>
    </div>
  );
}

export default function SubVendorDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [subVendor, setSubVendor] = useState<SubVendorDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    api
      .get(`/restful/v1/api/subvendors/${id}`)
      .then((res) => setSubVendor(res.data?.data || null))
      .catch(() => setError("Failed to load sub-vendor details."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <PartnerLayout role="VENDOR">
        <div className="flex items-center justify-center py-20 gap-2 text-gray-600">
          <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
          Loading sub-vendor...
        </div>
      </PartnerLayout>
    );
  }

  if (error || !subVendor) {
    return (
      <PartnerLayout role="VENDOR">
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-red-500">
          <AlertCircle size={36} />
          <p>{error ?? "Sub-vendor not found."}</p>
          <button
            onClick={() => navigate("/vendor/subvendors")}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Back to Sub Vendors
          </button>
        </div>
      </PartnerLayout>
    );
  }

  return (
    <PartnerLayout role="VENDOR">
      <div className="p-4 max-w-3xl mx-auto space-y-6">

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/vendor/subvendors")}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold">{subVendor.name}</h1>
            <p className="text-gray-500 text-sm">Sub-Vendor #{subVendor.subVendorId}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-wrap gap-3 items-center">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              subVendor.availabilityStatus === "AVAILABLE"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {subVendor.availabilityStatus}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              subVendor.status === "ACTIVE"
                ? "bg-blue-100 text-blue-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {subVendor.status}
          </span>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            {subVendor.rating ?? 0}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h2 className="font-semibold text-gray-800 mb-3">Contact Information</h2>
          <InfoRow label="Email" value={subVendor.email} />
          <InfoRow label="Phone" value={subVendor.phone} />
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h2 className="font-semibold text-gray-800 mb-3">Work Details</h2>
          <InfoRow label="Specialization" value={subVendor.specialization} />
          <InfoRow label="Experience" value={`${subVendor.experienceYears ?? 0} Years`} />
          <InfoRow label="Service Radius" value={`${subVendor.serviceRadiusKm ?? 0} km`} />
          <InfoRow
            label="Joined"
            value={subVendor.createdAt ? new Date(subVendor.createdAt).toLocaleDateString() : "—"}
          />
        </div>

      </div>
    </PartnerLayout>
  );
}
