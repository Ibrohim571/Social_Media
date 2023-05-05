import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";

if (process.env.NODE_ENV !== "development") {
  axios.defaults.baseURL = "https://vercel.com/ibrohim571/bm-backend/";
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
