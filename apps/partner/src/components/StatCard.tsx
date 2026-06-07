export default function StatCard({ title, value, sub, icon, color, bg }: any) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${bg} ${color}`}>
        {icon}
      </div>

      <p className="text-gray-500 mt-4">{title}</p>
      <h2 className="text-3xl font-bold mt-2">{value}</h2>
      <p className={`mt-2 text-sm ${color}`}>{sub}</p>
    </div>
  );
}