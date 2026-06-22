import UserLayout from "../components/UserLayout";
interface Props {
  title: string;
}
export default function ContentPage({ title }: Props) {
  const renderContent = () => {
    switch (title) {
      case "About Us":
        return (
          <>
            {" "}
            <h2 className="text-xl font-semibold mb-3">
              {" "}
              Welcome to FokatIndia{" "}
            </h2>{" "}
            <p>
              {" "}
              FokatIndia is a trusted home services platform designed to make
              everyday household services simple, reliable, and accessible. We
              connect customers with verified service professionals through a
              seamless digital experience.{" "}
            </p>{" "}
            <p className="mt-3">
              {" "}
              Our goal is to eliminate the hassle of finding dependable service
              providers by offering a single platform for booking professional
              home services.{" "}
            </p>{" "}
            <h2 className="text-xl font-semibold mt-6 mb-3">
              {" "}
              Services We Provide{" "}
            </h2>{" "}
            <ul className="list-disc pl-6 space-y-2">
              {" "}
              <li>🏠 Home Cleaning</li> <li>🚰 Plumbing Services</li>{" "}
              <li>⚡ Electrical Repairs</li> <li>❄️ AC Repair & Maintenance</li>{" "}
              <li>💇 Salon at Home</li> <li>🎨 Painting Services</li>{" "}
            </ul>{" "}
            <h2 className="text-xl font-semibold mt-6 mb-3">
              {" "}
              Why Choose FokatIndia?{" "}
            </h2>{" "}
            <ul className="space-y-3">
              {" "}
              <li>
                {" "}
                <strong>Verified Professionals:</strong> Every service provider
                undergoes a verification process before joining our
                platform.{" "}
              </li>{" "}
              <li>
                {" "}
                <strong>Convenient Booking:</strong> Book services anytime,
                anywhere through our website or mobile application.{" "}
              </li>{" "}
              <li>
                {" "}
                <strong>Transparent Pricing:</strong> No hidden charges and
                clear pricing before service confirmation.{" "}
              </li>{" "}
              <li>
                {" "}
                <strong>Quality Assurance:</strong> We strive to maintain high
                service standards and customer satisfaction.{" "}
              </li>{" "}
              <li>
                {" "}
                <strong>Customer Support:</strong> Dedicated support team for
                bookings, payments, and service-related concerns.{" "}
              </li>{" "}
            </ul>{" "}
            <h2 className="text-xl font-semibold mt-6 mb-3">Our Vision</h2>{" "}
            <p>
              {" "}
              To become India's most trusted home services marketplace by
              delivering quality, affordability, and convenience.{" "}
            </p>{" "}
            <h2 className="text-xl font-semibold mt-6 mb-3">
              Our Mission
            </h2>{" "}
            <ul className="list-disc pl-6 space-y-2">
              {" "}
              <li>Simplify home service booking.</li>{" "}
              <li>Empower local service professionals.</li>{" "}
              <li>Deliver exceptional customer experiences.</li>{" "}
              <li>Build long-term customer trust.</li>{" "}
            </ul>{" "}
            <h2 className="text-xl font-semibold mt-6 mb-3">
              {" "}
              Customer First{" "}
            </h2>{" "}
            <p>
              {" "}
              At FokatIndia, customer satisfaction is at the heart of everything
              we do. We are committed to providing dependable services that save
              time and deliver peace of mind.{" "}
            </p>{" "}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border">
              {" "}
              <strong>
                FokatIndia – Trusted Home Services at Your Doorstep.
              </strong>{" "}
            </div>{" "}
          </>
        );
      case "Privacy Policy":
        return (
          <>
            {" "}
            <p>
              {" "}
              At FokatIndia, we respect your privacy and are committed to
              protecting your personal information.{" "}
            </p>{" "}
            <h2 className="font-semibold text-lg mt-6 mb-2">
              {" "}
              Information We Collect{" "}
            </h2>{" "}
            <h3 className="font-medium mt-3 mb-2">Personal Information</h3>{" "}
            <ul className="list-disc pl-6">
              {" "}
              <li>Name</li> <li>Mobile Number</li> <li>Email Address</li>{" "}
              <li>Service Address</li>{" "}
            </ul>{" "}
            <h3 className="font-medium mt-4 mb-2">Booking Information</h3>{" "}
            <ul className="list-disc pl-6">
              {" "}
              <li>Booking History</li> <li>Service Preferences</li>{" "}
              <li>Reviews and Ratings</li>{" "}
            </ul>{" "}
            <h3 className="font-medium mt-4 mb-2">Device Information</h3>{" "}
            <ul className="list-disc pl-6">
              {" "}
              <li>Device Type</li> <li>Operating System</li> <li>IP Address</li>{" "}
              <li>Usage Analytics</li>{" "}
            </ul>{" "}
            <h2 className="font-semibold text-lg mt-6 mb-2">
              {" "}
              How We Use Information{" "}
            </h2>{" "}
            <ul className="list-disc pl-6">
              {" "}
              <li>Process service bookings</li>{" "}
              <li>Provide customer support</li> <li>Improve app performance</li>{" "}
              <li>Send booking notifications</li>{" "}
              <li>Prevent fraud and misuse</li>{" "}
            </ul>{" "}
            <h2 className="font-semibold text-lg mt-6 mb-2">
              {" "}
              Information Sharing{" "}
            </h2>{" "}
            <p>
              {" "}
              We may share information with verified service providers, payment
              gateway partners, and legal authorities when required by law.{" "}
            </p>{" "}
            <p className="mt-3">
              {" "}
              We do not sell customer information to third parties.{" "}
            </p>{" "}
            <h2 className="font-semibold text-lg mt-6 mb-2">
              {" "}
              Data Security{" "}
            </h2>{" "}
            <p>
              {" "}
              We implement industry-standard security measures to protect your
              personal information from unauthorized access or misuse.{" "}
            </p>{" "}
            <h2 className="font-semibold text-lg mt-6 mb-2">
              {" "}
              Children's Privacy{" "}
            </h2>{" "}
            <p>
              {" "}
              Our services are intended for users above 18 years of age.{" "}
            </p>{" "}
          </>
        );
      case "Terms & Conditions":
        return (
          <>
            {" "}
            <p>
              {" "}
              By using FokatIndia, you agree to comply with these Terms and
              Conditions.{" "}
            </p>{" "}
            <h2 className="font-semibold text-lg mt-6 mb-2">
              {" "}
              Service Booking{" "}
            </h2>{" "}
            <ul className="list-disc pl-6">
              {" "}
              <li>Users must provide accurate information.</li>{" "}
              <li>
                {" "}
                Service availability depends on location and professional
                availability.{" "}
              </li>{" "}
              <li>
                {" "}
                Additional charges may apply for extra work requested by the
                customer.{" "}
              </li>{" "}
            </ul>{" "}
            <h2 className="font-semibold text-lg mt-6 mb-2">
              {" "}
              User Responsibilities{" "}
            </h2>{" "}
            <ul className="list-disc pl-6">
              {" "}
              <li>Provide a safe working environment.</li>{" "}
              <li>Make timely payments.</li>{" "}
              <li>Maintain account confidentiality.</li>{" "}
              <li>Treat service professionals respectfully.</li>{" "}
            </ul>{" "}
            <h2 className="font-semibold text-lg mt-6 mb-2">
              {" "}
              Account Suspension{" "}
            </h2>{" "}
            <p>
              {" "}
              FokatIndia reserves the right to suspend or terminate accounts
              involved in fraud, abuse, illegal activity, or violations of
              platform policies.{" "}
            </p>{" "}
          </>
        );
      case "Refund Policy":
        return (
          <>
            {" "}
            <p>
              {" "}
              Customer satisfaction is important to us. Refunds are reviewed on
              a case-by-case basis.{" "}
            </p>{" "}
            <h2 className="font-semibold text-lg mt-6 mb-2">
              {" "}
              Eligible Refund Cases{" "}
            </h2>{" "}
            <ul className="list-disc pl-6">
              {" "}
              <li>Service provider fails to arrive.</li>{" "}
              <li>Duplicate payment is made.</li>{" "}
              <li>Payment deducted but booking not confirmed.</li>{" "}
              <li>Service cancelled by FokatIndia.</li>{" "}
            </ul>{" "}
            <h2 className="font-semibold text-lg mt-6 mb-2">
              {" "}
              Non-Refundable Cases{" "}
            </h2>{" "}
            <ul className="list-disc pl-6">
              {" "}
              <li>Service has been successfully completed.</li>{" "}
              <li>Incorrect booking details provided by customer.</li>{" "}
              <li>Cancellation after service completion.</li>{" "}
            </ul>{" "}
            <h2 className="font-semibold text-lg mt-6 mb-2">
              {" "}
              Refund Timeline{" "}
            </h2>{" "}
            <p>
              {" "}
              Approved refunds are generally processed within 5–10 business days
              to the original payment method.{" "}
            </p>{" "}
          </>
        );
      case "Cancellation Policy":
        return (
          <>
            {" "}
            <h2 className="font-semibold text-lg mb-2">
              {" "}
              Free Cancellation{" "}
            </h2>{" "}
            <p>
              {" "}
              Customers may cancel bookings up to 2 hours before the scheduled
              service time without any penalty.{" "}
            </p>{" "}
            <h2 className="font-semibold text-lg mt-6 mb-2">
              {" "}
              Late Cancellation{" "}
            </h2>{" "}
            <p>
              {" "}
              Cancellations made within 2 hours of the scheduled service time
              may incur cancellation charges.{" "}
            </p>{" "}
            <h2 className="font-semibold text-lg mt-6 mb-2">
              {" "}
              No Show Policy{" "}
            </h2>{" "}
            <p>
              {" "}
              If the customer is unavailable at the scheduled location and time,
              the booking may be cancelled without refund.{" "}
            </p>{" "}
            <h2 className="font-semibold text-lg mt-6 mb-2">
              {" "}
              Service Provider Cancellation{" "}
            </h2>{" "}
            <p>
              {" "}
              If a service provider cancels a booking, FokatIndia may arrange a
              replacement provider or issue a full refund where applicable.{" "}
            </p>{" "}
          </>
        );
      default:
        return <p className="text-gray-600">Content not available.</p>;
    }
  };
  return (
    <UserLayout>
      {" "}
      <div className="space-y-6 py-4 px-4">
        {" "}
        <div className="bg-white rounded-xl shadow p-6">
          {" "}
          <h1 className="text-3xl font-bold mb-2">{title}</h1>{" "}
          <p className="text-sm text-gray-500 mb-6">
            {" "}
            Last Updated: June 2026{" "}
          </p>{" "}
          <div className="space-y-4 text-gray-700 leading-7">
            {" "}
            {renderContent()}{" "}
          </div>{" "}
          <div className="mt-10 pt-6 border-t text-sm text-gray-500">
            {" "}
            <p>
              {" "}
              For any questions or concerns regarding this page, please contact
              us.{" "}
            </p>{" "}
            <p className="mt-2"> Email: support@fokatindia.com </p>{" "}
            <p> Website: www.fokatindia.com </p>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </UserLayout>
  );
}
