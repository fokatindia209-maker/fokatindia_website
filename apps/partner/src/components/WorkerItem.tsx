export default function WorkerItem({ name, jobs, status }: any) {
  return (
    <div className="flex items-center justify-between border-b pb-4">
      <div>
        <h3 className="font-semibold">{name}</h3>
        <p className="text-sm text-gray-500">{jobs}</p>
      </div>

      <span className="bg-green-100 text-green-700 px-4 py-2 rounded-xl text-sm">
        {status}
      </span>
    </div>
  );
}