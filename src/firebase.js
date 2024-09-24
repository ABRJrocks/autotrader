import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDev4RQE8xownGXNDOB9oDuvA8Q5-Gmk_s",
  authDomain: "ai-auto-trader-380.firebaseapp.com",
  projectId: "ai-auto-trader-380",
  storageBucket: "ai-auto-trader-380.appspot.com",
  messagingSenderId: "507683727201",
  appId: "1:507683727201:web:638fbe008a2f42c0c20720",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { app, auth };
