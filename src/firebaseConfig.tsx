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
export const auth = getAuth(app);



const provider = new GoogleAuthProvider();
export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {

      
      localStorage.setItem("name", result.user.displayName!);
      localStorage.setItem("hasLogin", "true");
      localStorage.setItem("photoURL", result.user.photoURL!);
      let name = localStorage.getItem("name");
      console.log(result);
      useHistory().push("/@register");
      // window.location.replace('/@register');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};