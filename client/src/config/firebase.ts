import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const functions = getFunctions(app);

// Check if we're in development mode and connect to emulators if needed
if (process.env.NODE_ENV === "development") {
  // Check if we should use emulators
  if (process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATORS === "true") {
    // Connect to Auth Emulator
    connectAuthEmulator(auth, "http://localhost:9099");

    // Connect to Firestore Emulator
    connectFirestoreEmulator(firestore, "localhost", 8080);

    // Connect to Functions Emulator
    connectFunctionsEmulator(functions, "localhost", 5001);

    console.log("Connected to Firebase Emulators");
  }
}

export { app, auth, firestore, functions };
