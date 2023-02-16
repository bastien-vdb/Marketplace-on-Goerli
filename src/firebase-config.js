// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: "whatchatapp-84c24.firebaseapp.com",
    projectId: "whatchatapp-84c24",
    storageBucket: "whatchatapp-84c24.appspot.com",
    messagingSenderId: "950558904096",
    appId: "1:950558904096:web:537d618a8e6cc3bc5a1145",
    measurementId: "G-6L2B904DH4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
