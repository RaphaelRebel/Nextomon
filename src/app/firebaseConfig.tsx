import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAH6PMM72UHZgUpWXUxFTCmU08QjRr8W3w",
    authDomain: "nextomon.firebaseapp.com",
    projectId: "nextomon",
    storageBucket: "nextomon.appspot.com",
    messagingSenderId: "269604967862",
    appId: "1:269604967862:web:d8ddaabc4b0f43f2951d17",
    measurementId: "G-8LB3VRHT75",
  };
  
  
  const app = initializeApp(firebaseConfig);
  const dbFirestore = getFirestore(app);


  export default function getFirestoreConfig(){
    return dbFirestore;
  }