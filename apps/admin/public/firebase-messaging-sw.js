importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: "AIzaSyBKxwuFR-YKU28l9UGy98wI8pXC7Hwvd3k",
    authDomain: "fokatindia-3fca6.firebaseapp.com",
    projectId: "fokatindia-3fca6",
    messagingSenderId: "65383512746",
    appId: "1:65383512746:web:2a892463cc8d292e596ed3"
});


const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log("Background message received:", payload);

    self.registration.showNotification(
        payload?.notification?.title || "Notification",
        {
            body: payload?.notification?.body,
            icon: "/logo192.png",
        }
    );
});