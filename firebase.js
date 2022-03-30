// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZxccbs8DZk8XPuaDYdpT7x0rWdgMV0PQ",
  authDomain: "projetmaker-bcf18.firebaseapp.com",
  projectId: "projetmaker-bcf18",
  storageBucket: "projetmaker-bcf18.appspot.com",
  messagingSenderId: "1012908387037",
  appId: "1:1012908387037:web:6d379aafd15010eff9c934",
  measurementId: "G-ERM024K3D0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function useAuth() {
  const [ currentUser, setCurrentUser ] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub;
  },[])

  return currentUser;
}