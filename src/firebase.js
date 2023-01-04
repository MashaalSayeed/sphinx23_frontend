// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrP71L1gaqj53PvnME8cis8iw7eJkZvsA",
  authDomain: "sphinx-bucket.firebaseapp.com",
  projectId: "sphinx-bucket",
  storageBucket: "sphinx-bucket.appspot.com",
  messagingSenderId: "514697849232",
  appId: "1:514697849232:web:aab1babb3295656713eb15",
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
