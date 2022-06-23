import { useContext, useEffect, lazy, Suspense } from "react";
import { ThemeContext } from "../components/context/ThemeContext";
import useThemeMode from "../hooks/useThemeMode";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { BsChevronCompactDown } from "react-icons/bs";
import GridSection from "../components/UI/Home/GridSection";
import AOS from "aos";
import "aos/dist/aos.css";
import Cards from "../components/UI/Home/Cards";
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
        <div className="flex flex-row items-center justify-center absolute h-screen w-screen text-[70px] font-dreamScape z-0 desktop:text-[200px]">
          <h1 className="text-white z-0">
            {themeContext.theme === "theme-dust" ? "DUST-2" : "NUCLEA"}
          </h1>
        </div>
        <div className="flex flex-row items-center justify-center absolute bottom-0 w-screen mb-5">
          <BsChevronCompactDown className="text-white text-5xl animate-scrollEmoticon" />
        </div>
        <div className="nuclea:bg-nuclea h-screen bg-center bg-no-repeat bg-cover object-cover dust:bg-dust z-0"></div>
        <div className="h-[150vh] w-screen desktop:hidden">
          <div className="flex flex-col items-center justify-center pt-10">
            <h1
              className="font-sans font-semibold text-3xl text-[#121745]"
              data-aos="fade-right"
              data-aos-duration="1500"
            >
              We got the web.
            </h1>

            <div className="flex flex-col justify-center items-center mt-5">
              <div
                className="bg-gradient-to-r from-[#687CC9] to-[#AA7DD0] text-transparent bg-clip-text"
                data-aos="fade-left"
                data-aos-duration="1500"
              >
                <h1 className="font-serif font-bold text-xl">
                  One platform. Three worlds.
                </h1>
              </div>
              <div
                className="max-w-xs mt-5"
                data-aos="fade-right"
                data-aos-duration="1500"
              >
                <h1 className="font-serif font-bold text-2xl text-center break-normal">
                  A decked out supply of system management.
                </h1>
              </div>
              <div
                className="max-w-[15rem] mt-5"
                data-aos="fade-left"
                data-aos-duration="1500"
              >
                <h1 className="text-justify break-normal">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s. It has survived not
                  only five centuries, but also the leap into electronic. Lorem
                  Ipsum passages, and more recently with desktop publishing
                  software
                </h1>
              </div>
              <div
                className="max-w-[15rem] mt-5"
                data-aos="fade-right"
                data-aos-duration="1500"
              >
                <h1 className="text-justify break-normal">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since.
                </h1>
              </div>
              <div
                className="mt-7 bg-[#5F57E2] rounded-full"
                data-aos="fade-top"
                data-aos-duration="1500"
              >
                <button className="text-white font-serif font-bold px-8 py-2">
                  Check it out
                </button>
              </div>
              <img
                src="https://i.imgur.com/w1xKYrd.png"
                alt=""
                className="h-[40%] w-[40%] mt-5"
                data-aos="fade-left"
                data-aos-duration="1500"
              />
            </div>
            <div className="max-w-xs ">
              <img
                src="https://i.imgur.com/jdRg3kV.png"
                alt=""
                className="mt-5"
                data-aos="fade-right"
                data-aos-duration="1500"
              />
            </div>
          </div>
        </div>
        <GridSection />
        <Cards />
        <div className="h-screen"></div>
      </div>
    </Suspense>
  );
};

export default Home;
