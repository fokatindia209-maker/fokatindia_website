import UserLayout from "../components/UserLayout";
import { Share2 } from "lucide-react";

export default function ShareApp() {
  const appLink = "https://fokatindia.com";

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "FokatIndia",
        text: "Book trusted home services with FokatIndia.",
        url: appLink,
      });
    } else {
      navigator.clipboard.writeText(appLink);
      alert("App link copied to clipboard!");
    }
  };

  return (
    <UserLayout>
      <div className="space-y-6 py-4 px-4">
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <div className="flex justify-center mb-4">
            <Share2 size={50} className="text-blue-600" />
          </div>

          <h1 className="text-2xl font-bold mb-3">Share FokatIndia</h1>

          <p className="text-gray-600 mb-6">
            Invite your friends and family to experience trusted home services
            including Cleaning, Plumbing, Electrician, AC Repair, Salon, and
            Painting services.
          </p>

          <div className="bg-gray-100 rounded-lg p-3 text-sm break-all mb-5">
            {appLink}
          </div>

          <button
            onClick={handleShare}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Share App
          </button>
        </div>
      </div>
    </UserLayout>
  );
}
// 
