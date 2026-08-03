import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";

import "./styles/globals.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
  <Toaster
    position="top-right"
    reverseOrder={false}
    toastOptions={{
      duration: 3000,
      style: {
        borderRadius: "12px",
        background: "#243b53",
        color: "#fff",
      },
      success: {
        iconTheme: {
          primary: "#22c55e",
          secondary: "#fff",
        },
      },
      error: {
        iconTheme: {
          primary: "#ef4444",
          secondary: "#fff",
        },
      },
    }}
  />

  <App />
</AuthProvider>
  </StrictMode>
);