// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFXp_-cGEm5CCoEK85d8eFk3H2xE-TpRY",
  authDomain: "quiz---react-web-application.firebaseapp.com",
  projectId: "quiz---react-web-application",
  storageBucket: "quiz---react-web-application.appspot.com",
  messagingSenderId: "369860027386",
  appId: "1:369860027386:web:9cf3adca28d55c86173a43",
  measurementId: "G-THN48Y94PJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;