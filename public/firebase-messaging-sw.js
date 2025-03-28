importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyBEv24sA97q2ghQO_9jTcsrHLH_R6A9ZAE",
    authDomain: "cinaf-mail-6a29b.firebaseapp.com",
    projectId: "cinaf-mail-6a29b",
    storageBucket: "cinaf-mail-6a29b.firebasestorage.app",
    messagingSenderId: "852024543958",
    appId: "1:852024543958:web:85bff95393a82d361c5777",
    measurementId: "G-748PWHSZ2N"
});

const messaging = firebase.messaging();