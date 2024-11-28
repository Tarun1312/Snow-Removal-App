// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBI1QOkXtow7SHq6lOsui8sk7Ps6ZlV9Bk",
    authDomain: "snow-removal-11daa.firebaseapp.com",
    projectId: "snow-removal-11daa",
    storageBucket: "snow-removal-11daa.firebasestorage.app",
    messagingSenderId: "872530615392",
    appId: "1:872530615392:web:b497c5a106112907567705",
    measurementId: "G-1R9M1YGYHQ"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
