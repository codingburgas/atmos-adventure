import { useContext, useEffect } from "react";
import useThemeMode from "./hooks/useThemeMode";
import { ThemeContext } from "./components/context/ThemeContext";
import Navbar from "./components/UI/Navbar";
import image from "./assets/tempBackground.svg";
import "./index.css";

function App() {
  const themeContext = useContext(ThemeContext);

  themeContext.theme ? useThemeMode() : null;

  return (
    <div className="z-10">
      <Navbar />
      <div className="bg-landing h-screen bg-center bg-no-repeat bg-cover object-cover"></div>
    </div>
  );
}

export default App;
