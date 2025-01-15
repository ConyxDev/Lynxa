import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjurpwIkFexz3q2uLxrpg7knHENc5rBio",
  authDomain: "saasadomicile.firebaseapp.com",
  databaseURL: "https://saasadomicile-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "saasadomicile",
  storageBucket: "saasadomicile.firebasestorage.app",
  messagingSenderId: "738283799011",
  appId: "1:738283799011:web:cd6e0f606b3640fa92e0d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Authentication
const db = getFirestore(app);
const auth = getAuth(app); // Ajouter l'initialisation d'auth

// Exporter les instances de Firestore et Auth
export { db, auth };
