import admin from "firebase-admin";

// Firebase config
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID as string,
  privateKey: (process.env.FIREBASE_PRIVATE_KEY as string).replace(/\\n/g, "\n"), // Handle newlines correctly
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
}

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;
