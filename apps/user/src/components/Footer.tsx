import {
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="hidden md:block bg-gray-900 text-gray-300 mt-10">

      {/* CENTERED CONTAINER */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-10 grid grid-cols-4 gap-8">

        {/* BRAND */}
        <div>
          <h2 className="text-white text-xl font-bold">
            FokatIndia
          </h2>

          <p className="text-sm mt-3 text-gray-400">
            Book trusted home services like cleaning, repair, and more at your doorstep.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-white font-semibold mb-3">
            Quick Links
          </h3>

          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Categories</li>
            <li className="hover:text-white cursor-pointer">Services</li>
            <li className="hover:text-white cursor-pointer">Bookings</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-white font-semibold mb-3">
            Contact
          </h3>

          <div className="space-y-2 text-sm">

            <div className="flex items-center gap-2">
              <Phone size={16} />
              +91 000 000 000
            </div>

            <div className="flex items-center gap-2">
              <Mail size={16} />
              support@fokatindia.com
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={16} />
              Delhi, India
            </div>

          </div>
        </div>

        {/* SOCIAL */}
        <div>
          <h3 className="text-white font-semibold mb-3">
            Follow Us
          </h3>

          <p className="text-sm text-gray-400">
            Stay connected for updates and offers.
          </p>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-800 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} FokatIndia. All rights reserved.
      </div>

    </footer>
  );
}