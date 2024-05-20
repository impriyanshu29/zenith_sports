// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "ekyam-akgecfc.firebaseapp.com",
    projectId: "ekyam-akgecfc",
    storageBucket: "ekyam-akgecfc.appspot.com",
    messagingSenderId: "521124301610",
    appId: import.meta.env.VITE_API_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
