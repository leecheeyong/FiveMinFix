import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "fiveminfix-eee79.firebaseapp.com",
  projectId: "fiveminfix-eee79",
  storageBucket: "fiveminfix-eee79.firebasestorage.app",
  messagingSenderId: "343965938254",
  appId: "1:343965938254:web:48c7f737a05393789c091f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
