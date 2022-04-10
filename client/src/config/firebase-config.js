// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAIplHH35nXys6onmleOmD0v0pbsUBRM24",
  authDomain: "hillybilly-4ad21.firebaseapp.com",
  projectId: "hillybilly-4ad21",
  storageBucket: "hillybilly-4ad21.appspot.com",
  messagingSenderId: "1094877091089",
  appId: "1:1094877091089:web:9c5278afa3d803900328b0",
  measurementId: "G-CFSXRJ5VGK"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app);
//const analytics = getAnalytics(app);
