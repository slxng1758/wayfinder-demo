// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  // import Firestore
import { getAnalytics } from "firebase/analytics";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCvUEleFv71-hKhga6pGC8AxDXPpV4aY7w",
  authDomain: "wayfinder-demo-1bdae.firebaseapp.com",
  projectId: "wayfinder-demo-1bdae",
  storageBucket: "wayfinder-demo-1bdae.appspot.com",
  messagingSenderId: "23140037849",
  appId: "1:23140037849:web:ab284a89b0157dc932bac8",
  measurementId: "G-TC67BF5BCN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);  // Create Firestore instance

// Export what you need
export { db, analytics};
