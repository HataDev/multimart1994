
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBhR84qP7IJnFHi5gUV67ogDcpfsFp5JZQ",
  authDomain: "maltimart1994.firebaseapp.com",
  projectId: "maltimart1994",
  storageBucket: "maltimart1994.appspot.com",
  messagingSenderId: "631223107236",
  appId: "1:631223107236:web:b075eafc1e97a67452f031"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;