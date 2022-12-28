import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import { initFirebaseConfig } from "./push-notification.js";
// import serviceWorker from "./service-worker.js";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// initFirebaseConfig();

// Notification.requestPermission().then((result) => {
//   if (result === "granted") {
//     console.log("Notification access granted");
//   }
// });
