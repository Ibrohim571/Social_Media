import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import axios from "axios";

if (process.env.NODE_ENV !== "development") {
  axios.defaults.baseURL = "https://bm-backend-topaz.vercel.app/";
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
