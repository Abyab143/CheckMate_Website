import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqCqDRmUIAW5lbbCbT1xG7aFFbp5OmAyY",
  authDomain: "checkmate-c2a98.firebaseapp.com",
  projectId: "checkmate-c2a98",
  storageBucket: "checkmate-c2a98.appspot.com",
  messagingSenderId: "1071695372145",
  appId: "1:1071695372145:web:a1bc64d0417ff988d9e0d0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
