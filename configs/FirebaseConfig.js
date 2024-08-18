import { initializeApp } from "firebase/app";
import {initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGgBfOCRuDKqCFFJlBr-OECk6RKo7_lSI",
  authDomain: "itinera-plan.firebaseapp.com",
  projectId: "itinera-plan",
  storageBucket: "itinera-plan.appspot.com",
  messagingSenderId: "679881087434",
  appId: "1:679881087434:web:754b3bb7676ac318f6d733",
  measurementId: "G-CSWEWQQGVX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth and Firestore
// Initialize Firebase Auth with AsyncStorage persistence
const authInitialized = initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });
const db = getFirestore(app);

export { app, authInitialized, db };