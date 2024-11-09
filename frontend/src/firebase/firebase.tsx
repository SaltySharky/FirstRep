// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNBVuVcmcZeAuODrItmhbvZ6Ck3rpTCiA",
  authDomain: "first-rep-auth-dev.firebaseapp.com",
  projectId: "first-rep-auth-dev",
  storageBucket: "first-rep-auth-dev.firebasestorage.app",
  messagingSenderId: "840486593972",
  appId: "1:840486593972:web:6c529805c6e7eb385a3ee1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export{ app, auth};