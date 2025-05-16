// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCh7X5i70F0IEI0CM7GoIlbcCRHFl4Ftsk",
  authDomain: "my-first-project-7a7eb.firebaseapp.com",
  projectId: "my-first-project-7a7eb",
  storageBucket: "my-first-project-7a7eb.firebasestorage.app",
  messagingSenderId: "126396699404",
  appId: "1:126396699404:web:e84305e32efad09fcbaf29",
  measurementId: "G-F9KPZK21B7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Export both auth and RecaptchaVerifier for use in components
export { auth, RecaptchaVerifier, signInWithPhoneNumber };