// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "ai-interview-prject.firebaseapp.com",
  projectId: "ai-interview-prject",
  storageBucket: "ai-interview-prject.firebasestorage.app",
  messagingSenderId: "812747877514",
  appId: "1:812747877514:web:d66905c4b8be9f9c58d173",
  measurementId: "G-XGEG65PSP3"
};


const app = initializeApp(firebaseConfig);


const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {auth, provider} 