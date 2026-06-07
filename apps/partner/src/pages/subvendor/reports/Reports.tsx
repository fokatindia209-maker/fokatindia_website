import PartnerLayout from "../../../components/PartnerLayout";

export default function Reports() {
  return (
    <PartnerLayout>
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Reports
      </h1>

      <div className="grid md:grid-cols-4 gap-4">

        <div className="bg-white shadow rounded-xl p-4">
          <h2>Total Revenue</h2>
          <p className="text-2xl font-bold">
            ₹1,50,000
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-4">
          <h2>Net Earnings</h2>
          <p className="text-2xl font-bold text-green-600">
            ₹1,25,000
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-4">
          <h2>Bookings</h2>
          <p className="text-2xl font-bold">
            250
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-4">
          <h2>Completed</h2>
          <p className="text-2xl font-bold">
            220
          </p>
        </div>

      </div>

      <div className="mt-6 bg-white rounded-xl shadow p-4">
        <h2 className="font-semibold mb-3">
          Top Services
        </h2>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Deep Cleaning</span>
            <span>₹35,000</span>
          </div>

          <div className="flex justify-between">
            <span>Sofa Cleaning</span>
            <span>₹20,000</span>
          </div>
        </div>
      </div>
    </div>
    </PartnerLayout>
  );
}