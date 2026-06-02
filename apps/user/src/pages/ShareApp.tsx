import UserLayout from "../components/UserLayout";

export default function ShareApp() {
  const shareLink = "https://fokatindia.com";

  const copy = () => {
    navigator.clipboard.writeText(shareLink);
    alert("Copied");
  };

  return (
    <UserLayout>
      <div className="max-w-2xl mx-auto p-4">
        <div className="bg-white rounded-xl shadow p-5">

          <h1 className="font-bold text-xl mb-4">
            Share App
          </h1>

          <button
            onClick={copy}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Copy Link
          </button>

        </div>
      </div>
    </UserLayout>
  );
}