import { useEffect, useContext } from "react";
import { ThemeContext } from "../components/context/ThemeContext";
export default function useThemeMode() {
  const themeContext = useContext(ThemeContext);

  useEffect(() => {
    const root = document.getElementById("root");
    root.classList.add(`${themeContext.theme}`);
  }, []);
}
