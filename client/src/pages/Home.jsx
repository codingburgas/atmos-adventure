import { useContext, useEffect, lazy, Suspense } from "react";
import { ThemeContext } from "../components/context/ThemeContext";
import { Parallax } from "react-parallax";
import { BsChevronCompactDown } from "react-icons/bs";
import useThemeMode from "../hooks/useThemeMode";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import FootageGrid from "../components/UI/Home/FootageGrid";
import DownloadSection from "../components/UI/Home/DownloadSection";
import GridSection from "../components/UI/Home/GridSection";
import Cards from "../components/UI/Home/Cards";
import Footage from "../components/UI/Home/Footage";
import AOS from "aos";
import "aos/dist/aos.css";
import DashboardShowcase from "../components/UI/Home/DashboardShowcase";
const Navbar = lazy(() => import("../components/UI/Navbar/Navbar"));
const Home = () => {
  const themeContext = useContext(ThemeContext);

  themeContext.theme ? useThemeMode() : null;

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="">
        <Navbar />
        <Parallax
          strength={-500}
          bgImage={
            "https://bulgarianfood.ie/wp-content/uploads/2020/04/travel-landscape-01.jpg"
          }
          // bgImage={"https://i.imgur.com/qX3WGvS.jpg"}
          className="w-screen h-screen"
        >
          {/* <h1 className="text-[350px] h-screen w-screen flex items-center justify-center">
            NUCLEA
          </h1> */}
          <div className="flex flex-row items-center justify-center h-screen w-screen text-[70px] font-dreamScape z-[0] desktop:text-[200px] el:!text-[350px]">
            <h1 className="text-white z-[0]">
              {themeContext.theme === "theme-dust" ? "DUST-2" : "NUCLEA"}
            </h1>
          </div>
        </Parallax>

        <Navbar />
        <div className="flex flex-row items-center justify-center absolute bottom-0 w-screen mb-5">
          <BsChevronCompactDown className="text-white text-5xl animate-scrollEmoticon" />
        </div>
        {/* <div className="nuclea:bg-nuclea h-screen bg-center bg-no-repeat bg-cover object-cover dust:bg-dust z-0"></div> */}
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
