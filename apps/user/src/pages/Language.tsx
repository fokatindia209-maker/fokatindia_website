import UserLayout from "../components/UserLayout";
import { Globe, CheckCircle } from "lucide-react";

export default function Language() {
  const currentLanguage = "English";

  return (
    <UserLayout>
      <div className="space-y-6 py-4 px-4">
        <div className="bg-white rounded-2xl shadow-sm border p-6">

          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-7 h-7 text-blue-600" />

            <div>
              <h1 className="text-2xl font-bold">
                Language
              </h1>

              <p className="text-gray-500 text-sm">
                Choose your preferred app language.
              </p>
            </div>
          </div>

          {/* Current Language */}
          <div className="border rounded-xl p-4 bg-blue-50 border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold">
                  Current Language
                </h2>

                <p className="text-gray-600 text-sm">
                  {currentLanguage}
                </p>
              </div>

              <CheckCircle className="text-green-600" size={22} />
            </div>
          </div>

          {/* Available Languages */}
          <div className="mt-6">
            <h3 className="font-semibold mb-3">
              Available Languages
            </h3>

            <div className="space-y-3">

              <button
                disabled
                className="w-full flex items-center justify-between p-4 border rounded-xl bg-gray-50"
              >
                <span>🇬🇧 English</span>
                <span className="text-green-600 font-medium">
                  Active
                </span>
              </button>

              <button
                disabled
                className="w-full flex items-center justify-between p-4 border rounded-xl opacity-70"
              >
                <span>🇮🇳 Hindi</span>
                <span className="text-gray-500">
                  Coming Soon
                </span>
              </button>

              <button
                disabled
                className="w-full flex items-center justify-between p-4 border rounded-xl opacity-70"
              >
                <span>🇦🇪 Arabic</span>
                <span className="text-gray-500">
                  Coming Soon
                </span>
              </button>

            </div>
          </div>

          {/* Info */}
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-100 rounded-xl">
            <p className="text-sm text-gray-700">
              Additional languages will be available in future updates.
              We are continuously working to improve accessibility and
              provide a better experience for all users.
            </p>
          </div>

          <div className="mt-8 pt-4 border-t text-sm text-gray-500">
            FokatIndia currently supports English language only.
          </div>

        </div>
      </div>
    </UserLayout>
  );
}