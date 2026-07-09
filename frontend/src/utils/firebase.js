// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "multiagents-7720a.firebaseapp.com",
  projectId: "multiagents-7720a",
  storageBucket: "multiagents-7720a.firebasestorage.app",
  messagingSenderId: "852189973717",
  appId: "1:852189973717:web:4588ff470d36a71a88a65c",
  measurementId: "G-JC0JM8KBTN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
