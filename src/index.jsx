import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header.jsx";
import App from "./App.jsx";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <div className="container">
      <Header />
      <App />
    </div>
  </React.StrictMode>
);
