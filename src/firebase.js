// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQ_DHsaPDugFc4QB5s_JEXTcyEkn2N6BY",
  authDomain: "netflix-react-app-e9567.firebaseapp.com",
  projectId: "netflix-react-app-e9567",
  storageBucket: "netflix-react-app-e9567.appspot.com",
  messagingSenderId: "678048372600",
  appId: "1:678048372600:web:342742298a3c43450c1a8d",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// import.meta.env.VITE_FIREBASE_API_KEY,
// import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
// import.meta.env.VITE_FIREBASE_PROJECT_ID,
// import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
// import.meta.env.VITE_MESSAGING_SENDER,
// import.meta.env.VITE_APP_ID,
