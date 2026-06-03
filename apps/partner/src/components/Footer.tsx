// ============================
// Footer.tsx
// ============================

export default function Footer() {

  return (

    <footer className="bg-white border-t">

      <div className="px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-3">

        <p className="text-sm text-gray-500">
          © 2026 FokatIndia.com
        </p>

        <div className="flex items-center gap-4 text-sm text-gray-500">

          <button className="hover:text-blue-600">
            Privacy
          </button>

          <button className="hover:text-blue-600">
            Terms
          </button>

          <button className="hover:text-blue-600">
            Support
          </button>

        </div>

      </div>

    </footer>
  );
}