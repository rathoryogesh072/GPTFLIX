// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBD_EsB1lZuZ700fmbewIZpMoDTxvKTgdA",
  authDomain: "gptflix-6256b.firebaseapp.com",
  projectId: "gptflix-6256b",
  storageBucket: "gptflix-6256b.appspot.com",
  messagingSenderId: "1090266797290",
  appId: "1:1090266797290:web:9ef4eec70a7ca5d0ef3393",
  measurementId: "G-25LQ6WGBHJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
