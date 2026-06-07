export default function BookingItem({ customer, service, time }: any) {
  return (
    <div className="flex items-center justify-between border-b pb-4">
      <div>
        <h3 className="font-semibold text-gray-800">{customer}</h3>
        <p className="text-sm text-gray-500">{time}</p>
      </div>

      <div className="text-right">
        <p className="font-medium text-blue-600">{service}</p>

        <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm">
          Assign SubVendor
        </button>
      </div>
    </div>
  );
}