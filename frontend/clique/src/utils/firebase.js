// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZcN29zFnRwsSBT9jtVRCWaE7ELKlIuQE",
  authDomain: "clique-c543c.firebaseapp.com",
  projectId: "clique-c543c",
  storageBucket: "clique-c543c.appspot.com",
  messagingSenderId: "1010134567377",
  appId: "1:1010134567377:web:a72c3e00747ec927a078f0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);