import UserLayout from "../components/UserLayout";
import {
  Mail,
  Phone,
  Globe,
  Clock,
  MapPin,
} from "lucide-react";

export default function ContactUs() {
  return (
    <UserLayout>
      <div className="space-y-6 py-4 px-4">
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <h1 className="text-3xl font-bold mb-2">
            Contact Us
          </h1>

          <p className="text-gray-600 mb-6">
            We're here to help. If you have any questions regarding
            bookings, payments, refunds, cancellations, or services,
            please feel free to contact our support team.
          </p>

          <div className="space-y-5">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 mt-1 text-blue-600" />
              <div>
                <h3 className="font-semibold">
                  Email Support
                </h3>
                <p className="text-gray-600">
                  support@fokatindia.com
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 mt-1 text-green-600" />
              <div>
                <h3 className="font-semibold">
                  Phone Support
                </h3>
                <p className="text-gray-600">
                  +91 XXXXX XXXXX
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Globe className="w-5 h-5 mt-1 text-purple-600" />
              <div>
                <h3 className="font-semibold">
                  Website
                </h3>
                <p className="text-gray-600">
                  www.fokatindia.com
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 mt-1 text-orange-600" />
              <div>
                <h3 className="font-semibold">
                  Support Hours
                </h3>
                <p className="text-gray-600">
                  Monday – Sunday
                </p>
                <p className="text-gray-600">
                  9:00 AM – 9:00 PM
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 mt-1 text-red-600" />
              <div>
                <h3 className="font-semibold">
                  Service Area
                </h3>
                <p className="text-gray-600">
                  Available across selected cities in India.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <h3 className="font-semibold mb-2">
              Need Immediate Assistance?
            </h3>

            <p className="text-gray-700">
              Our customer support team typically responds within
              24 hours. For urgent booking-related issues, please
              contact us via phone.
            </p>
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