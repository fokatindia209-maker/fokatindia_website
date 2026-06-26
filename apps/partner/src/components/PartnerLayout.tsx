import type { ReactNode } from "react";
import { useMemo } from "react";

import Navbar from "./Navbar";
import BottomNav from "./BottomNav";
import Footer from "./Footer";

interface Props {
  children: ReactNode;
  role: "VENDOR" | "SUB_VENDOR";
}

export default function PartnerLayout({ children, role }: Props) {
  // optional: centralized role config (future-proof)
  const layoutConfig = useMemo(() => {
    return {
      showBottomNav: true,
      showFooter: true,
      containerPadding: "pt-16 md:ml-16 md:mr-16 pb-20",
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* TOP NAVBAR (role-based) */}
      <Navbar role={role} />

      {/* MAIN CONTENT */}
      <main className={`flex-1 ${layoutConfig.containerPadding}`}>
        {children}
      </main>

      {/* MOBILE BOTTOM NAV (role-based) */}
      {layoutConfig.showBottomNav && (
        <BottomNav role={role} />
      )}

      {/* FOOTER */}
      {layoutConfig.showFooter && <Footer />}
    </div>
  );
}