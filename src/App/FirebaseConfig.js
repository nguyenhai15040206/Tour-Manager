// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6ARWvFMl5XGhSA-fOtnnu3_e0F1l2VG8",
  authDomain: "qlsinhvien-cf866.firebaseapp.com",
  projectId: "qlsinhvien-cf866",
  storageBucket: "qlsinhvien-cf866.appspot.com",
  messagingSenderId: "599389725364",
  appId: "1:599389725364:web:f3a2803780270fe0d42de1",
  measurementId: "G-LGEYGNKJEX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
