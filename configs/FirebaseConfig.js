import { initializeApp, getApps } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage'

export const APIKEY = "AIzaSyBGgBfOCRuDKqCFFJlBr-OECk6RKo7_lSI";
export const AUTHDOMAIN = "itinera-plan.firebaseapp.com";
export const PROJECTID = "itinera-plan";
export const STORAGEBUCKET = "itinera-plan.appspot.com";
export const MESSAGINGSENDERID = "679881087434";
export const APPID = "1:679881087434:web:754b3bb7676ac318f6d733";
export const MEASUREMENTID = "G-CSWEWQQGVX";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: APIKEY,
  authDomain: AUTHDOMAIN,
  projectId: PROJECTID,
  storageBucket: STORAGEBUCKET,
  messagingSenderId: MESSAGINGSENDERID,
  appId: APPID,
  measurementId: MEASUREMENTID,
};

// Initialize Firebase
let app;
try {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
} catch (error) {
  console.error("Firebase initialization error:", error);
}

// Initialize Auth and Firestore
let authInitialized;
let db;
try {
  authInitialized = initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });
  db = getFirestore(app);
  // console.log(authInitialized, db);
} catch (error) {
  console.error("Firebase Auth or Firestore initialization error:", error);
}

export { app, authInitialized, db };