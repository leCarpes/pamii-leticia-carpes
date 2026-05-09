import { initializeApp } from 'firebase/app';

import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAV4EyHO4NgRFvexVfbLFSa8RmM9b0daQ8",
  authDomain: "bookspace-b83e6.firebaseapp.com",
  projectId: "bookspace-b83e6",
  storageBucket: "bookspace-b83e6.firebasestorage.app",
  messagingSenderId: "320357359200",
  appId: "1:320357359200:web:ebd30d11a09c825470ed05"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);