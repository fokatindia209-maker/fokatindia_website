importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: "AIzaSyDailC7nxUZjoRlPq1eMmNztHMbbhp9Stc",
    authDomain: "fokatindia-21620.firebaseapp.com",
    projectId: "fokatindia-21620",
    messagingSenderId: "966340445316",
    appId: "1:966340445316:web:0bafea3daf8e272a40eed1"
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