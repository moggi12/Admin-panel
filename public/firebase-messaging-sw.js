// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyAtF3S0gj1faqyo0E1Nz6ffMSgkX8tHAnU",
  authDomain: "toki-9c1c3.firebaseapp.com",
  projectId: "toki-9c1c3",
  storageBucket: "toki-9c1c3.appspot.com",
  messagingSenderId: "649301164794",
  appId: "1:649301164794:web:0f82d4c6dc2fdf65c93f43",
  measurementId: "G-1KD9G6S57J",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();
