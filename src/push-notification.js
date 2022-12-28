import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const initFirebaseConfig = () => {
  const config = {
    apiKey: "AIzaSyBIm6INPn9jukEI2hMg5xjh1CaDFeOms-4",
    authDomain: "budget-tracker-4de96.firebaseapp.com",
    projectId: "budget-tracker-4de96",
    storageBucket: "budget-tracker-4de96.appspot.com",
    messagingSenderId: "448579468522",
    appId: "1:448579468522:web:25d91239b9df55b38e2b93",
    measurementId: "G-LLCXTFFRTR",
  };

  initializeApp(config);
};

// Initialize Firebase
