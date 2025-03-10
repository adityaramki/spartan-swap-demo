// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbNfEmxvQUuw_kcv1kGtlsvE_RTzFS0yk",
  authDomain: "spartan-swap.firebaseapp.com",
  projectId: "spartan-swap",
  storageBucket: "spartan-swap.firebasestorage.app",
  messagingSenderId: "413276883867",
  appId: "1:413276883867:web:62bbeb376cb2c86526ef3e",
  measurementId: "G-D3N8NYFR6K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth(app);
export { auth, db };