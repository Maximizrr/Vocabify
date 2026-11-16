/* Vocabify: Service Worker für Erinnerungen (Firebase Cloud Messaging).
   Muss im selben Ordner wie index.html liegen. Speichert nichts zwischen. */
importScripts("https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js");
firebase.initializeApp({
  apiKey: "AIzaSyDokUR1eZjbE_JfiLyMGx9JDYmSBMpHTM8",
  authDomain: "vocabify-8abb9.firebaseapp.com",
  projectId: "vocabify-8abb9",
  storageBucket: "vocabify-8abb9.firebasestorage.app",
  messagingSenderId: "683312640028",
  appId: "1:683312640028:web:81c0c05fdc588776ba6fd9"
});
firebase.messaging();
/* Klick auf eine Test-Benachrichtigung (die echten öffnen die App über fcmOptions.link) */
self.addEventListener("notificationclick", (e) => {
  if (!e.notification.tag || !e.notification.tag.startsWith("vf-local")) return;
  e.notification.close();
  e.waitUntil(clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
    for (const c of list) if (c.url.startsWith(self.registration.scope) && "focus" in c) return c.focus();
    return clients.openWindow(self.registration.scope);
  }));
});
