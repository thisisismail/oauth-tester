import { initializeApp } from "firebase/app"; // firebase important
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfVpVN0KFOOa4dDXOjoj5qqWiD1q4NpUg",
  authDomain: "portal-karir-a9b96.firebaseapp.com",
  projectId: "portal-karir-a9b96",
  storageBucket: "portal-karir-a9b96.appspot.com",
  messagingSenderId: "412593896113",
  appId: "1:412593896113:web:dfaf4b61c7ea462be00090",
  measurementId: "G-VCSQXF4XW2",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
export { db };
// this is method one ========================================================================
