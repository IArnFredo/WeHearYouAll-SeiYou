// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDF4OKDrsagCyTLhHL0JUCdOimGw2r9NA",
  authDomain: "seiyou2morrow.firebaseapp.com",
  projectId: "seiyou2morrow",
  storageBucket: "seiyou2morrow.appspot.com",
  messagingSenderId: "738580019131",
  appId: "1:738580019131:web:be29dce58bbc1ad0c9b69e",
  measurementId: "G-5WMREE5J1E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);