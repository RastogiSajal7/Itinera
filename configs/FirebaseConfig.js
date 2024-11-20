import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const APIKEY = "AIzaSyBGgBfOCRuDKqCFFJlBr-OECk6RKo7_lSI";
export const AUTHDOMAIN = "itinera-plan.firebaseapp.com";
export const PROJECTID = "itinera-plan";
export const STORAGEBUCKET = "itinera-plan.appspot.com";
export const MESSAGINGSENDERID = "679881087434";
export const APPID = "1:679881087434:web:754b3bb7676ac318f6d733";
export const MEASUREMENTID = "G-CSWEWQQGVX";

const firebaseConfig = {
  apiKey: APIKEY,
  authDomain: AUTHDOMAIN,
  projectId: PROJECTID,
  storageBucket: STORAGEBUCKET,
  messagingSenderId: MESSAGINGSENDERID,
  appId: APPID,
  measurementId: MEASUREMENTID,
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
