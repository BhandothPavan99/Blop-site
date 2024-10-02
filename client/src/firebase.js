// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "blog-app-68537.firebaseapp.com",
  projectId: "blog-app-68537",
  storageBucket: "blog-app-68537.appspot.com",
  messagingSenderId: "609165385136",
  appId: "1:609165385136:web:8df3933b43f9efdd964a75"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);