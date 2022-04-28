// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useHistory } from "react-router-dom";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPLCjAOnwoP_99cvGgn7pevvNvUwIJ2LI",
  authDomain: "seiyou-e9555.firebaseapp.com",
  projectId: "seiyou-e9555",
  storageBucket: "seiyou-e9555.appspot.com",
  messagingSenderId: "695866630588",
  appId: "1:695866630588:web:a29d52d9d3671e848e8bb9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
