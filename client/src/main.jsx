import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import ThemeContextProvider from "./components/context/ThemeContext";
import AuthContextProvider from "./components/context/AuthContext";
import { SnackbarProvider } from "notistack";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeContextProvider>
    <SnackbarProvider maxSnack={3}>
      <AuthContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthContextProvider>
    </SnackbarProvider>
  </ThemeContextProvider>
);
