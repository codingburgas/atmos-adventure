import { useEffect, useContext } from "react";
import { ThemeContext } from "../components/context/ThemeContext";
export default function useThemeMode() {
  const themeContext = useContext(ThemeContext);

  useEffect(() => {
    const root = document.getElementById("root");
    themeContext.theme === "theme-nuclea"
      ? (document.title = "ATMOS | Nuclea Theme")
      : (document.title = "ATMOS | Dust Theme");
    root.classList.add(`${themeContext.theme}`);
  }, []);
}
