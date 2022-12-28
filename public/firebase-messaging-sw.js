import { getMessaging } from "firebase/messaging";
import { initializeApp } from "firebase/app";

const config = {
  apiKey: "AIzaSyBIm6INPn9jukEI2hMg5xjh1CaDFeOms-4",
  authDomain: "budget-tracker-4de96.firebaseapp.com",
  projectId: "budget-tracker-4de96",
  storageBucket: "budget-tracker-4de96.appspot.com",
  messagingSenderId: "448579468522",
  appId: "1:448579468522:web:25d91239b9df55b38e2b93",
  measurementId: "G-LLCXTFFRTR",
};

const app = initializeApp(config);
const messaging = getMessaging(app);

// const askUserForPermission = async () => {
//     try {
//       await Notification.requestPermission()
//     }
// }
