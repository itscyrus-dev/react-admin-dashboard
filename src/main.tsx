import "./polyfills";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { initializeUiPreferences } from "./hooks/use-ui-preferences";
import "./styles/globals.css";

initializeUiPreferences();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
