// @ts-nocheck
import { initializeApp, getApp, getApps, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
  projectId: "founderstories",
  appId: "1:328896008447:web:e9ced503593eda40d1bcca",
  storageBucket: "founderstories.firebasestorage.app",
  apiKey: "AIzaSyDbmKlj1mfTXz8poPLgUTLoUIvyNr8xMho",
  authDomain: "founderstories.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "328896008447"
};

let app: FirebaseApp;
let db: Firestore;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

db = getFirestore(app);

export { db };
