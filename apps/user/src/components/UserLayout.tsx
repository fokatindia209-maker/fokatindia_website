import type { ReactNode } from "react";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";
import Footer from "./Footer";

interface Props {
    children: ReactNode;
}

export default function UserLayout({ children }: Props) {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* TOP NAVBAR */}
            <Navbar />
            {/* MAIN CONTENT */}
            <main className="pt-[calc(4rem+env(safe-area-inset-top))] md:ml-16 md:mr-16 pb-[calc(5rem+env(safe-area-inset-bottom))]">
                {children}
            </main>
            {/* MOBILE BOTTOM NAV */}
            <BottomNav />

            <Footer />

        </div>
    );
}