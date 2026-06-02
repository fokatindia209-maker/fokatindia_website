import UserLayout from "../components/UserLayout";

interface Props {
  title: string;
}

export default function ContentPage({ title }: Props) {
  return (
    <UserLayout>
      <div className="max-w-3xl mx-auto p-4">
        <div className="bg-white rounded-xl shadow p-5">

          <h1 className="text-2xl font-bold mb-4">
            {title}
          </h1>

          <p className="text-gray-600 leading-7">
            Content will come from API or Admin Panel.
          </p>

        </div>
      </div>
    </UserLayout>
  );
}