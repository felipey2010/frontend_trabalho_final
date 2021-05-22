import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import axios from "axios";
import App from "./App";

axios.defaults.baseURL = "http://localhost:5000/api/";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
