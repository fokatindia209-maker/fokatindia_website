import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { App as CapacitorApp } from "@capacitor/app";
import { Capacitor } from "@capacitor/core";
import toast from "react-hot-toast";

// Screens with no logical "back" destination — pressing back here shows the
// exit confirmation instead of navigating (mirrors Navbar.tsx's isDashboard check).
const ROOT_PATHS = ["/dashboard", "/login"];

const EXIT_CONFIRM_WINDOW_MS = 2000;

/**
 * Makes the Android hardware back button behave exactly like the in-app
 * header back button (which calls navigate(-1) — see Navbar.tsx).
 *
 * Capacitor does not fall back to WebView history on its own: if no
 * `backButton` listener is registered, it exits the app on every press.
 * Registering this listener hands control to the SPA router instead.
 */
export default function useAndroidBackHandler() {
  const navigate = useNavigate();
  const location = useLocation();

  const locationRef = useRef(location);
  const lastBackPressRef = useRef(0);

  useEffect(() => {
    locationRef.current = location;
  }, [location]);

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    const listenerPromise = CapacitorApp.addListener("backButton", () => {
      const isRootScreen = ROOT_PATHS.includes(locationRef.current.pathname);

      if (!isRootScreen) {
        navigate(-1);
        return;
      }

      const now = Date.now();

      if (now - lastBackPressRef.current < EXIT_CONFIRM_WINDOW_MS) {
        CapacitorApp.exitApp();
        return;
      }

      lastBackPressRef.current = now;
      toast("Press back again to exit", {
        id: "exit-toast",
        duration: EXIT_CONFIRM_WINDOW_MS,
      });
    });

    return () => {
      listenerPromise.then((listener) => listener.remove());
    };
  }, [navigate]);
}
