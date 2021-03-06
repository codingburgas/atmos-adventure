import { useContext, useEffect, lazy, Suspense } from "react";
import { ThemeContext } from "../components/context/ThemeContext";
import { Parallax } from "react-parallax";
import { BsChevronCompactDown } from "react-icons/bs";
import useThemeMode from "../hooks/useThemeMode";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import AOS from "aos";
import "aos/dist/aos.css";
import DashboardShowcase from "../components/UI/Home/DashboardShowcase";
const Navbar = lazy(() => import("../components/UI/Navbar/Navbar"));
const FootageGrid = lazy(() => import("../components/UI/Home/FootageGrid"));
const DownloadSection = lazy(() =>
  import("../components/UI/Home/DownloadSection")
);
const GridSection = lazy(() => import("../components/UI/Home/GridSection"));
const Cards = lazy(() => import("../components/UI/Home/Cards"));
const Footage = lazy(() => import("../components/UI/Home/Footage"));
const Home = () => {
  const themeContext = useContext(ThemeContext);

  themeContext.theme ? useThemeMode() : null;

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div>
        <Navbar />

        <div className="flex flex-row items-center justify-center absolute w-screen h-screen text-[70px] font-dreamScape z-[10] desktop:text-[200px] el:!text-[350px]">
          <h1 className="text-white z-[0]">
            {themeContext.theme === "theme-dust" ? "DUST-2" : "NUCLEA"}
          </h1>
        </div>
        <div className="nuclea:bg-[url('https://i.imgur.com/hIUOMul.png')] tablet:nuclea:bg-[url('https://i.imgur.com/nrGRJTb.png')] h-screen bg-center bg-no-repeat bg-cover object-cover dust:bg-[url('https://i.imgur.com/K3KUSHX.png')] tablet:dust:bg-[url('https://i.imgur.com/4C0Z4BJ.png')] z-0"></div>
        <div className="flex flex-row items-center justify-center absolute bottom-0 w-screen mb-5">
          <BsChevronCompactDown className="text-white text-5xl animate-scrollEmoticon" />
        </div>
        <DashboardShowcase />
        <GridSection />
        <Cards />
        <Footage />
        <FootageGrid />
        <DownloadSection />
      </div>
    </Suspense>
  );
};

export default Home;
