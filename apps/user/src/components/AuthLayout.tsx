import { useEffect } from "react";
import logo from "../assets/logo.png";

interface Props {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
}

export default function AuthLayout({
    title,
    subtitle,
    children
}: Props) {

    // Auth screens own their own scroll region (below); prevent the document
    // itself from also scrolling/bouncing, which would show blank space above
    // the mobile status bar instead of the gradient staying pinned below it.
    useEffect(() => {
        const { documentElement, body } = document;
        const prevHtmlOverflow = documentElement.style.overflow;
        const prevBodyOverflow = body.style.overflow;

        documentElement.style.overflow = "hidden";
        body.style.overflow = "hidden";

        return () => {
            documentElement.style.overflow = prevHtmlOverflow;
            body.style.overflow = prevBodyOverflow;
        };
    }, []);

    return (
        <div
            className="hide-scrollbar relative min-h-[100dvh] w-full overflow-x-hidden overflow-y-auto overscroll-y-none flex items-center justify-center px-4 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700"
            style={{
                paddingTop: "max(2.5rem, env(safe-area-inset-top))",
                paddingBottom: "max(2.5rem, env(safe-area-inset-bottom))",
            }}
        >
            {/* Decorative background blobs */}
            <div className="pointer-events-none absolute -top-20 -left-20 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-16 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute top-1/3 right-8 hidden sm:block w-40 h-40 rounded-full bg-pink-400/20 blur-2xl" />

            <div className="relative w-full max-w-sm sm:max-w-md">
                <div className="bg-white/95 backdrop-blur rounded-3xl shadow-2xl px-6 py-8 sm:px-9 sm:py-10">
                    <div className="flex flex-col items-center mb-6 text-center">
                        <img
                            src={logo}
                            alt="FokatIndia"
                            className="w-16 h-16 rounded-2xl shadow-md object-contain mb-3"
                        />
                        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
                        {subtitle && (
                            <p className="text-sm text-gray-500 mt-1.5 max-w-xs">
                                {subtitle}
                            </p>
                        )}
                    </div>

                    {children}
                </div>

                <p className="text-center text-white/80 text-xs mt-6">
                    &copy; {new Date().getFullYear()} FokatIndia. All rights reserved.
                </p>
            </div>
        </div>
    );
}
