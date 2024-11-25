import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDM5v51Kgz9zTybWuy3CKob8S0dOaDvBec",
    authDomain: "ecom-auth-150cf.firebaseapp.com",
    projectId: "ecom-auth-150cf",
    storageBucket: "ecom-auth-150cf.firebasestorage.app",
    messagingSenderId: "306514514067",
    appId: "1:306514514067:web:818cf18e400477d21fbd66",
  };

  
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);