import { initializeApp as initializeAdminApp, getApps as getAdminApps, getApp as getAdminApp, App as AdminApp, credential } from 'firebase-admin/app';
import { getFirestore as getAdminFirestore, Firestore as AdminFirestore } from 'firebase-admin/firestore';

const firebaseConfig = {
  projectId: "founderstories",
};

let adminApp: AdminApp;
let adminDb: AdminFirestore;

if (!getAdminApps().length) {
  adminApp = initializeAdminApp({
    credential: credential.applicationDefault(),
    projectId: firebaseConfig.projectId,
  });
} else {
  adminApp = getAdminApp();
}

adminDb = getAdminFirestore(adminApp);

export { adminDb as db };
