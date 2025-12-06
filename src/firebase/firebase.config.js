// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0bwovXjE275sYvB8eJMKdvmM-CGV9g6w",
  authDomain: "smart-deals-d7718.firebaseapp.com",
  projectId: "smart-deals-d7718",
  storageBucket: "smart-deals-d7718.firebasestorage.app",
  messagingSenderId: "101857577046",
  appId: "1:101857577046:web:e5f7113274714553b813f7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);