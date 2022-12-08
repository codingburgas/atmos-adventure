import React, { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`text-center ${
        theme === "nuclea" ? "text-red-500" : "text-blue-500"
      }`}
    >
      {theme.toUpperCase()}
    </div>
  );
}

export default App;
