// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvh3iDfzKpaSGwk01MkTc_p9NfAXyyTX4",
  authDomain: "asset-verse-d5365.firebaseapp.com",
  projectId: "asset-verse-d5365",
  storageBucket: "asset-verse-d5365.firebasestorage.app",
  messagingSenderId: "1054289328832",
  appId: "1:1054289328832:web:7d8945cd99268b51d18b25"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);