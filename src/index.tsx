import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "antd/dist/antd.less";
import './less/custom.css'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAtF3S0gj1faqyo0E1Nz6ffMSgkX8tHAnU",
    authDomain: "toki-9c1c3.firebaseapp.com",
    projectId: "toki-9c1c3",
    storageBucket: "toki-9c1c3.appspot.com",
    messagingSenderId: "649301164794",
    appId: "1:649301164794:web:0f82d4c6dc2fdf65c93f43",
    measurementId: "G-1KD9G6S57J",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
ReactDOM.render(<App />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
