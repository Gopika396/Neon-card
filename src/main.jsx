import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./assets/style/global.css";
import "./assets/style/background.css";
import "./assets/style/card.css";
import "./assets/style/panels.css";
import "./assets/style/link.css";
import "./assets/style/toast.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);