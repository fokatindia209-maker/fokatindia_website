import UserLayout from "../components/UserLayout";

export default function Language() {
  return (
    <UserLayout>
      <div className="max-w-2xl mx-auto p-4">
        <div className="bg-white rounded-xl shadow p-5">

          <h1 className="font-bold text-xl mb-4">
            Language
          </h1>

          <select className="border p-2 rounded-lg">
            <option>English</option>
            <option>Hindi</option>
            <option>Arabic</option>
          </select>

        </div>
      </div>
    </UserLayout>
  );
}