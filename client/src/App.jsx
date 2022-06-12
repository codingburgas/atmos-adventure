import { useContext, useEffect } from "react";
import useThemeMode from "./hooks/useThemeMode";
import { ThemeContext } from "./components/context/ThemeContext";
function App() {
  const themeContext = useContext(ThemeContext);

  if (themeContext.theme) {
    useThemeMode();
  }
  console.log(themeContext.theme);

  return (
    <div className="flex justify-center">
      <h1 className="font-bold text-2xl  nuclea:text-pink-500 dust:text-purple-700">
        React and Tailwind with Vitejs!
      </h1>
    </div>
  );
}

export default App;
