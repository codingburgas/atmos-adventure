import { useContext, useEffect } from "react";
import useThemeMode from "../hooks/useThemeMode";
import { ThemeContext } from "../components/context/ThemeContext";
import Navbar from "../components/UI/Navbar";
const Home = () => {
  const themeContext = useContext(ThemeContext);

  themeContext.theme ? useThemeMode() : null;

  return (
    <div>
      <Navbar />
      <div className="nuclea:bg-nuclea h-screen bg-center bg-no-repeat bg-cover object-cover dust:bg-dust"></div>
    </div>
  );
};

export default Home;
