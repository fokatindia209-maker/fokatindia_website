import UserLayout from "../components/UserLayout";
import {
  HelpCircle,
  Calendar,
  XCircle,
  CreditCard,
  Phone,
  Mail,
} from "lucide-react";

export default function Help() {
  return (
    <UserLayout>
      <div className="space-y-6 py-4 px-4">
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold">
                Help Center
              </h1>
              <p className="text-gray-500">
                Find answers to common questions and get support.
              </p>
            </div>
          </div>

          {/* FAQs */}
          <div className="space-y-6">
            <div className="border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <h2 className="font-semibold">
                  How do I book a service?
                </h2>
              </div>

              <p className="text-gray-600">
                Browse available services, select your preferred service,
                choose a date and time, provide your address, and confirm
                your booking through the FokatIndia app.
              </p>
            </div>

            <div className="border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="w-5 h-5 text-red-600" />
                <h2 className="font-semibold">
                  How can I cancel a booking?
                </h2>
              </div>

              <p className="text-gray-600">
                Open "My Bookings", select the booking you wish to cancel,
                and click the Cancel Booking option. Cancellation charges
                may apply depending on the cancellation time.
              </p>
            </div>

            <div className="border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="w-5 h-5 text-green-600" />
                <h2 className="font-semibold">
                  How do I request a refund?
                </h2>
              </div>

              <p className="text-gray-600">
                Eligible refunds are automatically reviewed. You may also
                contact customer support with your booking details for
                assistance. Approved refunds are generally processed within
                5–10 business days.
              </p>
            </div>

            <div className="border rounded-xl p-4">
              <h2 className="font-semibold mb-2">
                What payment methods are supported?
              </h2>

              <p className="text-gray-600">
                We support UPI, Debit Cards, Credit Cards, Net Banking,
                Wallets, and other secure online payment methods.
              </p>
            </div>

            <div className="border rounded-xl p-4">
              <h2 className="font-semibold mb-2">
                How can I track my booking?
              </h2>

              <p className="text-gray-600">
                You can track booking status, assigned professional details,
                and service updates from the "My Bookings" section.
              </p>
            </div>

            <div className="border rounded-xl p-4">
              <h2 className="font-semibold mb-2">
                Are service professionals verified?
              </h2>

              <p className="text-gray-600">
                Yes. All professionals undergo verification and quality
                checks before being onboarded to the FokatIndia platform.
              </p>
            </div>
          </div>

          {/* Support Section */}
          <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-5">
            <h2 className="font-semibold text-lg mb-3">
              Need More Help?
            </h2>

            <p className="text-gray-700 mb-4">
              Our customer support team is available to assist you with
              bookings, payments, refunds, cancellations, and service
              related queries.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-600" />
                <span>support@fokatindia.com</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-green-600" />
                <span>+91 XXXXX XXXXX</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-5 border-t text-sm text-gray-500">
            <p>
              FokatIndia – Trusted Home Services at Your Doorstep.
            </p>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}