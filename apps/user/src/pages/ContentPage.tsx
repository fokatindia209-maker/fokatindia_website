import type { ReactNode } from "react";
import UserLayout from "../components/UserLayout";
import {
  Sparkles,
  Home,
  Wrench,
  Zap,
  Snowflake,
  Scissors,
  Paintbrush,
  ShieldCheck,
  CalendarCheck,
  IndianRupee,
  Award,
  Headphones,
  Target,
  Rocket,
  Lock,
  Users,
  Smartphone,
  FileText,
  AlertTriangle,
  Ban,
  CheckCircle2,
  XCircle,
  Clock,
  Mail,
  Globe,
  type LucideIcon,
} from "lucide-react";

interface Props {
  title: string;
}

type Tone = "blue" | "green" | "red" | "amber" | "gray";

const TONE_CLASSES: Record<Tone, { border: string; bg: string; icon: string }> = {
  blue: { border: "border-blue-100", bg: "bg-blue-50", icon: "text-blue-600" },
  green: { border: "border-green-100", bg: "bg-green-50", icon: "text-green-600" },
  red: { border: "border-red-100", bg: "bg-red-50", icon: "text-red-600" },
  amber: { border: "border-amber-100", bg: "bg-amber-50", icon: "text-amber-600" },
  gray: { border: "border-gray-200", bg: "bg-gray-50", icon: "text-gray-600" },
};

function InfoCard({
  icon: Icon,
  title,
  tone = "gray",
  children,
}: {
  icon: LucideIcon;
  title: string;
  tone?: Tone;
  children: ReactNode;
}) {
  const t = TONE_CLASSES[tone];
  return (
    <div className={`rounded-xl border p-4 ${t.border} ${t.bg}`}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className={`w-5 h-5 ${t.icon}`} />
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="text-gray-700 text-sm leading-6">{children}</div>
    </div>
  );
}

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-3">
      {children}
    </h2>
  );
}

function CheckItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-600 shrink-0" />
      <span>{children}</span>
    </li>
  );
}

function CrossItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <XCircle className="w-4 h-4 mt-0.5 text-red-600 shrink-0" />
      <span>{children}</span>
    </li>
  );
}

const SERVICES: { icon: LucideIcon; label: string }[] = [
  { icon: Home, label: "Home Cleaning" },
  { icon: Wrench, label: "Plumbing Services" },
  { icon: Zap, label: "Electrical Repairs" },
  { icon: Snowflake, label: "AC Repair & Maintenance" },
  { icon: Scissors, label: "Salon at Home" },
  { icon: Paintbrush, label: "Painting Services" },
];

const WHY_CHOOSE_US: { icon: LucideIcon; color: string; title: string; desc: string }[] = [
  {
    icon: ShieldCheck,
    color: "text-blue-600",
    title: "Verified Professionals",
    desc: "Every service provider undergoes a verification process before joining our platform.",
  },
  {
    icon: CalendarCheck,
    color: "text-green-600",
    title: "Convenient Booking",
    desc: "Book services anytime, anywhere through our website or mobile application.",
  },
  {
    icon: IndianRupee,
    color: "text-purple-600",
    title: "Transparent Pricing",
    desc: "No hidden charges and clear pricing before service confirmation.",
  },
  {
    icon: Award,
    color: "text-orange-600",
    title: "Quality Assurance",
    desc: "We strive to maintain high service standards and customer satisfaction.",
  },
  {
    icon: Headphones,
    color: "text-red-600",
    title: "Customer Support",
    desc: "Dedicated support team for bookings, payments, and service-related concerns.",
  },
];

const PAGE_META: Record<string, { icon: LucideIcon; subtitle: string }> = {
  "About Us": {
    icon: Sparkles,
    subtitle: "Get to know FokatIndia and what we stand for.",
  },
  "Privacy Policy": {
    icon: Lock,
    subtitle: "How we collect, use, and protect your information.",
  },
  "Terms & Conditions": {
    icon: FileText,
    subtitle: "The rules that govern your use of FokatIndia.",
  },
  "Refund Policy": {
    icon: IndianRupee,
    subtitle: "When and how refunds are processed.",
  },
  "Cancellation Policy": {
    icon: Ban,
    subtitle: "Guidelines for cancelling a booking.",
  },
};

export default function ContentPage({ title }: Props) {
  const renderContent = () => {
    switch (title) {
      case "About Us":
        return (
          <>
            <p>
              FokatIndia is a trusted home services platform designed to make
              everyday household services simple, reliable, and accessible.
              We connect customers with verified service professionals
              through a seamless digital experience.
            </p>
            <p>
              Our goal is to eliminate the hassle of finding dependable
              service providers by offering a single platform for booking
              professional home services.
            </p>

            <SectionHeading>Services We Provide</SectionHeading>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {SERVICES.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 rounded-xl border p-3 bg-white"
                >
                  <Icon className="w-5 h-5 text-blue-600 shrink-0" />
                  <span className="text-sm font-medium text-gray-800">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <SectionHeading>Why Choose FokatIndia?</SectionHeading>
            <div className="space-y-5">
              {WHY_CHOOSE_US.map(({ icon: Icon, color, title: t, desc }) => (
                <div key={t} className="flex items-start gap-3">
                  <Icon className={`w-5 h-5 mt-1 shrink-0 ${color}`} />
                  <div>
                    <h3 className="font-semibold">{t}</h3>
                    <p className="text-gray-600">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <InfoCard icon={Target} title="Our Vision" tone="blue">
                To become India's most trusted home services marketplace by
                delivering quality, affordability, and convenience.
              </InfoCard>
              <InfoCard icon={Rocket} title="Our Mission" tone="green">
                <ul className="space-y-1.5">
                  <CheckItem>Simplify home service booking.</CheckItem>
                  <CheckItem>Empower local service professionals.</CheckItem>
                  <CheckItem>Deliver exceptional customer experiences.</CheckItem>
                  <CheckItem>Build long-term customer trust.</CheckItem>
                </ul>
              </InfoCard>
            </div>

            <SectionHeading>Customer First</SectionHeading>
            <p>
              At FokatIndia, customer satisfaction is at the heart of
              everything we do. We are committed to providing dependable
              services that save time and deliver peace of mind.
            </p>

            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100 text-center">
              <strong className="text-blue-900">
                FokatIndia – Trusted Home Services at Your Doorstep.
              </strong>
            </div>
          </>
        );

      case "Privacy Policy":
        return (
          <>
            <p>
              At FokatIndia, we respect your privacy and are committed to
              protecting your personal information.
            </p>

            <SectionHeading>Information We Collect</SectionHeading>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <InfoCard icon={Users} title="Personal Information">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Name</li>
                  <li>Mobile Number</li>
                  <li>Email Address</li>
                  <li>Service Address</li>
                </ul>
              </InfoCard>
              <InfoCard icon={CalendarCheck} title="Booking Information">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Booking History</li>
                  <li>Service Preferences</li>
                  <li>Reviews and Ratings</li>
                </ul>
              </InfoCard>
              <InfoCard icon={Smartphone} title="Device Information">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Device Type</li>
                  <li>Operating System</li>
                  <li>IP Address</li>
                  <li>Usage Analytics</li>
                </ul>
              </InfoCard>
            </div>

            <SectionHeading>How We Use Information</SectionHeading>
            <ul className="space-y-2">
              <CheckItem>Process service bookings</CheckItem>
              <CheckItem>Provide customer support</CheckItem>
              <CheckItem>Improve app performance</CheckItem>
              <CheckItem>Send booking notifications</CheckItem>
              <CheckItem>Prevent fraud and misuse</CheckItem>
            </ul>

            <SectionHeading>Information Sharing</SectionHeading>
            <p>
              We may share information with verified service providers,
              payment gateway partners, and legal authorities when required
              by law.
            </p>
            <div className="mt-4">
              <InfoCard icon={ShieldCheck} title="Your Data Stays Yours" tone="green">
                We do not sell customer information to third parties.
              </InfoCard>
            </div>

            <SectionHeading>Data Security</SectionHeading>
            <InfoCard icon={Lock} title="How We Protect You" tone="blue">
              We implement industry-standard security measures to protect
              your personal information from unauthorized access or misuse.
            </InfoCard>

            <SectionHeading>Children's Privacy</SectionHeading>
            <InfoCard icon={AlertTriangle} title="Age Requirement" tone="amber">
              Our services are intended for users above 18 years of age.
            </InfoCard>
          </>
        );

      case "Terms & Conditions":
        return (
          <>
            <p>
              By using FokatIndia, you agree to comply with these Terms and
              Conditions.
            </p>

            <SectionHeading>Service Booking</SectionHeading>
            <ul className="list-disc pl-6 space-y-2">
              <li>Users must provide accurate information.</li>
              <li>
                Service availability depends on location and professional
                availability.
              </li>
              <li>
                Additional charges may apply for extra work requested by the
                customer.
              </li>
            </ul>

            <SectionHeading>User Responsibilities</SectionHeading>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide a safe working environment.</li>
              <li>Make timely payments.</li>
              <li>Maintain account confidentiality.</li>
              <li>Treat service professionals respectfully.</li>
            </ul>

            <SectionHeading>Account Suspension</SectionHeading>
            <InfoCard icon={AlertTriangle} title="Please Note" tone="amber">
              FokatIndia reserves the right to suspend or terminate accounts
              involved in fraud, abuse, illegal activity, or violations of
              platform policies.
            </InfoCard>
          </>
        );

      case "Refund Policy":
        return (
          <>
            <p>
              Customer satisfaction is important to us. Refunds are reviewed
              on a case-by-case basis.
            </p>

            <SectionHeading>Eligible Refund Cases</SectionHeading>
            <InfoCard icon={CheckCircle2} title="Refunds Apply When" tone="green">
              <ul className="space-y-1.5">
                <CheckItem>Service provider fails to arrive.</CheckItem>
                <CheckItem>Duplicate payment is made.</CheckItem>
                <CheckItem>Payment deducted but booking not confirmed.</CheckItem>
                <CheckItem>Service cancelled by FokatIndia.</CheckItem>
              </ul>
            </InfoCard>

            <SectionHeading>Non-Refundable Cases</SectionHeading>
            <InfoCard icon={XCircle} title="Refunds Do Not Apply When" tone="red">
              <ul className="space-y-1.5">
                <CrossItem>Service has been successfully completed.</CrossItem>
                <CrossItem>Incorrect booking details provided by customer.</CrossItem>
                <CrossItem>Cancellation after service completion.</CrossItem>
              </ul>
            </InfoCard>

            <SectionHeading>Refund Timeline</SectionHeading>
            <InfoCard icon={Clock} title="Processing Time" tone="blue">
              Approved refunds are generally processed within 5–10 business
              days to the original payment method.
            </InfoCard>
          </>
        );

      case "Cancellation Policy":
        return (
          <>
            <InfoCard icon={CheckCircle2} title="Free Cancellation" tone="green">
              Customers may cancel bookings up to 10 minutes before the
              scheduled service time without any penalty.
            </InfoCard>

            <div className="mt-4">
              <InfoCard icon={Clock} title="Late Cancellation" tone="amber">
                Cancellations made within 10 minutes of the scheduled service
                time may incur cancellation charges.
              </InfoCard>
            </div>

            <div className="mt-4">
              <InfoCard icon={XCircle} title="No Show Policy" tone="red">
                If the customer is unavailable at the scheduled location and
                time, the booking may be cancelled without refund.
              </InfoCard>
            </div>

            <div className="mt-4">
              <InfoCard icon={ShieldCheck} title="Service Provider Cancellation" tone="blue">
                If a service provider cancels a booking, FokatIndia may
                arrange a replacement provider or issue a full refund where
                applicable.
              </InfoCard>
            </div>
          </>
        );

      default:
        return <p className="text-gray-600">Content not available.</p>;
    }
  };

  const meta = PAGE_META[title];
  const HeaderIcon = meta?.icon ?? FileText;

  return (
    <UserLayout>
      <div className="space-y-6 py-4 px-4">
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <div className="flex items-center gap-3 mb-2">
            <HeaderIcon className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold">{title}</h1>
              {meta?.subtitle && (
                <p className="text-gray-500">{meta.subtitle}</p>
              )}
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 bg-gray-100 rounded-full px-3 py-1 mb-6">
            <Clock className="w-3.5 h-3.5" />
            Last Updated: June 2026
          </span>

          <div className="space-y-4 text-gray-700 leading-7">
            {renderContent()}
          </div>

          <div className="mt-8 pt-5 border-t text-sm text-gray-500 space-y-2">
            <p>
              For any questions or concerns regarding this page, please
              contact us.
            </p>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-600" />
              <span>support@fokatindia.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-purple-600" />
              <span>www.fokatindia.com</span>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
