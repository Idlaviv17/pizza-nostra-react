import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.js";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';


// The App component needs to be wrapped in a Router component in order to use routing
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
        <App />
    </Router>
  </React.StrictMode>
);