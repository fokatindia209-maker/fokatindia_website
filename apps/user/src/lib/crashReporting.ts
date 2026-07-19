import { FirebaseCrashlytics } from "@capacitor-firebase/crashlytics";
import { Capacitor } from "@capacitor/core";

function toStackFrames(stack?: string) {
  if (!stack) return undefined;

  return stack
    .split("\n")
    .slice(1)
    .map((line) => ({ functionName: line.trim() }));
}

// Native Crashlytics only exists on device builds — on desktop web this just logs.
export function recordException(error: unknown, context?: string) {
  const prefix = context ? `[${context}] ` : "";
  const message =
    error instanceof Error ? `${prefix}${error.message}` : `${prefix}${String(error)}`;

  console.error("Crash captured:", context, error);

  if (!Capacitor.isNativePlatform()) return;

  FirebaseCrashlytics.recordException({
    message,
    stacktrace: error instanceof Error ? toStackFrames(error.stack) : undefined,
  }).catch((err) => console.error("Failed to record exception", err));
}

// Catches JS errors/rejections that happen outside React's render cycle
// (event handlers, async code, promise chains) — React's own error boundary
// only sees render-phase errors.
export function initCrashReporting() {
  if (!Capacitor.isNativePlatform()) return;

  window.addEventListener("error", (event) => {
    recordException(event.error ?? event.message, "window.onerror");
  });

  window.addEventListener("unhandledrejection", (event) => {
    recordException(event.reason, "unhandledrejection");
  });
}
