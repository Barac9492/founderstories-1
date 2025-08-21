// @ts-nocheck
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  projectId: "founderstories",
  appId: "1:328896008447:web:e9ced503593eda40d1bcca",
  storageBucket: "founderstories.firebasestorage.app",
  apiKey: "AIzaSyDbmKlj1mfTXz8poPLgUTLoUIvyNr8xMho",
  authDomain: "founderstories.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "328896008447"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };
