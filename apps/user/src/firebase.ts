import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { Capacitor } from "@capacitor/core";
import {
  PushNotifications,
  type Token,
  type PushNotificationSchema,
  type RegistrationError,
} from "@capacitor/push-notifications";

// ============================================
// FIREBASE CONFIG
// ============================================

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// ============================================
// INITIALIZE
// ============================================

const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);

export const auth = getAuth(app);

// Firebase Web Messaging uses service workers — not supported in native WebView
export const messaging = Capacitor.isNativePlatform() ? null : getMessaging(app);

// ============================================
// GET FCM TOKEN
// ============================================

export const generateFCMToken = async (): Promise<string | null> => {
  try {
    if (Capacitor.isNativePlatform()) {
      // Native Android / iOS: use Capacitor Push Notifications plugin
      let permStatus = await PushNotifications.checkPermissions();

      if (permStatus.receive === "prompt") {
        permStatus = await PushNotifications.requestPermissions();
      }

      if (permStatus.receive !== "granted") {
        console.log("Push notification permission denied");
        return null;
      }

      // Listeners must be added BEFORE register() or the event can fire before they attach
      return new Promise((resolve) => {
        PushNotifications.addListener("registration", (token: Token) => {
          localStorage.setItem("fcmToken", token.value);
          resolve(token.value);
        });

        PushNotifications.addListener("registrationError", (err: RegistrationError) => {
          console.error("FCM registration error =>", err);
          resolve(null);
        });

        PushNotifications.register();
      });
    }

    // Web: use Firebase Web FCM with service worker
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      console.log("Notification permission denied");
      return null;
    }

    const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js"
    );

    const currentToken = await getToken(messaging!, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      serviceWorkerRegistration: registration,
    });

    if (currentToken) {
      localStorage.setItem("fcmToken", currentToken);
      return currentToken;
    }

    return null;
  } catch (error) {
    console.error("FCM ERROR =>", error);
    return null;
  }
};

// ============================================
// FOREGROUND MESSAGE LISTENER
// ============================================

export const onMessageListener = () =>
  new Promise((resolve) => {
    if (Capacitor.isNativePlatform()) {
      // Native: fires when a push arrives while the app is open
      PushNotifications.addListener("pushNotificationReceived", (notification: PushNotificationSchema) => {
        resolve(notification);
      });
    } else {
      onMessage(messaging!, (payload) => {
        resolve(payload);
      });
    }
  });
