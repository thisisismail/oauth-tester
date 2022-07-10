import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createStore } from "redux";
import allReducers from "./Store/Reducer/index.js";
import { Provider } from "react-redux";
import { initializeApp } from "firebase/app"; // firebase important
import firebase from "firebase/compat/app"; // firebase important

const store = createStore(allReducers); //store the state manipulated by reducer
// this is method one ========================================================================

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBfVpVN0KFOOa4dDXOjoj5qqWiD1q4NpUg",
//   authDomain: "portal-karir-a9b96.firebaseapp.com",
//   projectId: "portal-karir-a9b96",
//   storageBucket: "portal-karir-a9b96.appspot.com",
//   messagingSenderId: "412593896113",
//   appId: "1:412593896113:web:dfaf4b61c7ea462be00090",
//   measurementId: "G-VCSQXF4XW2",
// };

// firebase.initializeApp(firebaseConfig);
// // this is method one ========================================================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* attach the stored state to parent, so it can be given to its child */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
