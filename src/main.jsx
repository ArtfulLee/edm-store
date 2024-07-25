// react
import React from "react";
import ReactDOM from "react-dom/client";

// hooks
import { AuthProvider } from "./hooks/useAuth";

// components
import App from "./App";

// css styles
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
