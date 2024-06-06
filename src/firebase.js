import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD64Fp7DVgGj_EECrjgPJKC1QAgdINMx08",
  authDomain: "invoice-flow-570fd.firebaseapp.com",
  projectId: "invoice-flow-570fd",
  storageBucket: "invoice-flow-570fd.appspot.com",
  messagingSenderId: "47328111295",
  appId: "1:47328111295:web:ca2a3d50c382ae547ef40a",
  measurementId: "G-SGLB5FZ2C2",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getDatabase(app);
