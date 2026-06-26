import { useState } from "react";
import PartnerLayout from "../../../components/PartnerLayout";

const tabs = [
  "Overview",
  "Business",
  "Bank",
  "Documents",
  "Service Areas",
  "KYC",
];

export default function SubVendorProfile() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <PartnerLayout role="SUB_VENDOR">
    <div className="p-6 max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="bg-white rounded-2xl shadow p-6 mb-6">
        <div className="flex items-center gap-5">
          <img
            src="https://via.placeholder.com/100"
            alt="Vendor"
            className="w-24 h-24 rounded-full border"
          />

          <div>
            <h1 className="text-2xl font-bold">
              CleanPro Services
            </h1>

            <p className="text-gray-500">
              Vendor ID: VND001
            </p>

            <p className="text-green-600 font-medium">
              ✓ Verified Vendor
            </p>
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
              className={`px-5 py-4 whitespace-nowrap border-b-2 ${
                activeTab === tab
                  ? "border-blue-600 text-blue-600 font-semibold"
                  : "border-transparent"
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
          <div className="space-y-6">

            <div className="grid md:grid-cols-4 gap-4">

              <div className="border rounded-xl p-4">
                <p>Total Bookings</p>
                <h2 className="text-2xl font-bold">
                  1250
                </h2>
              </div>

              <div className="border rounded-xl p-4">
                <p>Completed Jobs</p>
                <h2 className="text-2xl font-bold">
                  1180
                </h2>
              </div>

              <div className="border rounded-xl p-4">
                <p>Total Earnings</p>
                <h2 className="text-2xl font-bold">
                  ₹4,50,000
                </h2>
              </div>

              <div className="border rounded-xl p-4">
                <p>Rating</p>
                <h2 className="text-2xl font-bold">
                  ⭐ 4.8
                </h2>
              </div>

            </div>

          </div>
        )}

        {activeTab === "Business" && (
          <div className="grid md:grid-cols-2 gap-4">

            <input
              className="border rounded-lg p-3"
              placeholder="Business Name"
            />

            <input
              className="border rounded-lg p-3"
              placeholder="Owner Name"
            />

            <input
              className="border rounded-lg p-3"
              placeholder="GST Number"
            />

            <input
              className="border rounded-lg p-3"
              placeholder="PAN Number"
            />

            <input
              className="border rounded-lg p-3"
              placeholder="Experience"
            />

            <textarea
              className="border rounded-lg p-3 md:col-span-2"
              placeholder="Business Address"
            />

          </div>
        )}

        {activeTab === "Bank" && (
          <div className="grid md:grid-cols-2 gap-4">

            <input
              className="border rounded-lg p-3"
              placeholder="Account Holder"
            />

            <input
              className="border rounded-lg p-3"
              placeholder="Bank Name"
            />

            <input
              className="border rounded-lg p-3"
              placeholder="Account Number"
            />

            <input
              className="border rounded-lg p-3"
              placeholder="IFSC Code"
            />

            <input
              className="border rounded-lg p-3"
              placeholder="UPI ID"
            />

          </div>
        )}

        {activeTab === "Documents" && (
          <div className="space-y-4">

            <div className="border rounded-lg p-4">
              Aadhaar Card
              <input
                type="file"
                className="block mt-2"
              />
            </div>

            <div className="border rounded-lg p-4">
              PAN Card
              <input
                type="file"
                className="block mt-2"
              />
            </div>

            <div className="border rounded-lg p-4">
              GST Certificate
              <input
                type="file"
                className="block mt-2"
              />
            </div>

          </div>
        )}

        {activeTab === "Service Areas" && (
          <div>

            <input
              className="border rounded-lg p-3 w-full mb-4"
              placeholder="Add Service Area"
            />

            <div className="flex flex-wrap gap-2">

              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                Mumbai
              </span>

              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                Navi Mumbai
              </span>

              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                Thane
              </span>

            </div>

          </div>
        )}

        {activeTab === "KYC" && (
          <div>

            <div className="mb-4">
              <h2 className="font-semibold">
                KYC Progress
              </h2>

              <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                <div className="bg-green-600 h-3 rounded-full w-full" />
              </div>

              <p className="mt-2 text-green-600">
                100% Completed
              </p>
            </div>

            <div className="space-y-3">

              <div className="flex justify-between">
                <span>Aadhaar</span>
                <span className="text-green-600">
                  Approved
                </span>
              </div>

              <div className="flex justify-between">
                <span>PAN</span>
                <span className="text-green-600">
                  Approved
                </span>
              </div>

              <div className="flex justify-between">
                <span>GST</span>
                <span className="text-green-600">
                  Approved
                </span>
              </div>

              <div className="flex justify-between">
                <span>Bank Details</span>
                <span className="text-green-600">
                  Approved
                </span>
              </div>

            </div>

          </div>
        )}

      </div>

    </div>
    </PartnerLayout>
  );
}