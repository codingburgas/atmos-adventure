import { useContext, useEffect, lazy, Suspense } from "react";
import { ThemeContext } from "../components/context/ThemeContext";
import useThemeMode from "../hooks/useThemeMode";
import LoadingSpinner from "../components/UI/LoadingSpinner";
const Navbar = lazy(() => import("../components/UI/Navbar"));
const Home = () => {
  const themeContext = useContext(ThemeContext);

  themeContext.theme ? useThemeMode() : null;

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div>
        <Navbar />
        <div className="nuclea:bg-nuclea h-screen bg-center bg-no-repeat bg-cover object-cover dust:bg-dust"></div>
      </div>
    </Suspense>
  );
};

export default Home;
