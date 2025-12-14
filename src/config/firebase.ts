import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Firebase configuration
// TODO: Replace with your actual Firebase config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyD-lol5rNoUPZso4tp5qhcp3MRYn5sPSAc",
  authDomain: "techwise-4dbcf.firebaseapp.com",
  projectId: "techwise-4dbcf",
  storageBucket: "techwise-4dbcf.firebasestorage.app",
  messagingSenderId: "966492367964",
  appId: "1:966492367964:web:2ecb8f2d769c5ae35d0a99",
  measurementId: "G-KERH9SHKG2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app;
