import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import axios from "axios";
import App from "./App";
import { SnackbarProvider } from "notistack";

axios.defaults.baseURL = "https://backend-blogs.herokuapp.com/api/";

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider
      maxSnack={1}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}>
      <App />
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
