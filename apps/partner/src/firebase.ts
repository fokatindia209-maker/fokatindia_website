// ============================================
// src/firebase.ts
// ============================================

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getMessaging,
  getToken,
  onMessage,
} from "firebase/messaging";

// ============================================
// FIREBASE CONFIG
// ============================================

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,

  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,

  projectId:
    import.meta.env.VITE_FIREBASE_PROJECT_ID,

  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,

  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,

  appId: import.meta.env.VITE_FIREBASE_APP_ID,

  measurementId:
    import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// ============================================
// INITIALIZE
// ============================================

const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);

export const messaging = getMessaging(app);

// ============================================
// GET FCM TOKEN
// ============================================

export const generateFCMToken = async () => {
  try {
    const permission =
      await Notification.requestPermission();

    if (permission !== "granted") {
      console.log("Permission denied");

      return null;
    }

    const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js"
    );

    const currentToken = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      serviceWorkerRegistration: registration,
    });

    if (currentToken) {
      console.log(
        "FCM TOKEN => ",
        currentToken
      );

      localStorage.setItem(
        "fcmToken",
        currentToken
      );

      return currentToken;
    }

    return null;
  } catch (error) {
    console.error("FCM ERROR => ", error);

    return null;
  }
};

// ============================================
// FOREGROUND MESSAGE
// ============================================

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log(
        "Foreground Message => ",
        payload
      );

      resolve(payload);
    });
  });