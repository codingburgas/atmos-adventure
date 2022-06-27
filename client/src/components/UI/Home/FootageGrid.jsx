import { IoIosArrowForward } from "react-icons/io";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const FootageGrid = () => {
  /*
   * Initializes the AOS library
   */
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <div className="hidden desktop:h-screen desktop:block">
      <div className="flex flex-col justify-center items-center pt-10">
        <h1
          className="font-sans font-semibold text-7xl"
          data-aos="fade-down"
          data-aos-duration="1500"
        >
          We got a game changer.
        </h1>
        <h1
          className="font-sans font-base text-4xl pt-5"
          data-aos="fade-up"
          data-aos-duration="1500"
        >
          Literally.
        </h1>
      </div>
      <div className="ml-32">
        <div className="flex flex-row justify-center items-center mt-20 extra:mt-0 el:!mt-10">
          <div>
            <div
              className="bg-gradient-to-r from-[#687CC9] to-[#AA7DD0] text-transparent bg-clip-text text-xl font-serif font-bold extra:text-3xl"
              data-aos="fade-right"
              data-aos-duration="1500"
            >
              <h1>Clock is ticking. Moments last once.</h1>
            </div>
            <h1
              className="font-serif font-bold text-5xl extra:text-6xl"
              data-aos="fade-right"
              data-aos-duration="1500"
            >
              Look around. Chill out.
            </h1>
            <br />
            <div
              className="font-serif font-base text-lg text-justify extra:text-xl el:max-w-3xl xl:!text-2xl"
              data-aos="fade-right"
              data-aos-duration="1500"
            >
              <h1>
                You play as an amnesiac astronaut. Your goal is to collect every
                stranded part of your ship and head back home. While doing that,
                you can admire the local scenery of these strange new worlds -
                Nuclea and Dust-2. You find yourself alone on these planets.
                Perhaps they are hiding something long forgotten? Only one way
                to find out…
              </h1>
            </div>
          </div>
          <div
            className="w-[350%] extra:w-[300%] el:!w-[60%]"
            data-aos="fade-left"
            data-aos-duration="1500"
          >
            <img src="https://i.imgur.com/QjOjVCm.png" alt="" />
          </div>
        </div>
        <div
          className="bg-[#5F57E2] w-[25%] text-white rounded-full text-center py-3 font-serif font-bold text-2xl mt-5 el:w-[20%] xl:!w-[15%] xl:!mt-[-3%] extraXl:ml-16"
          data-aos="fade-right"
          data-aos-duration="1500"
        >
          <a
            href="https://github.com/codingburgas/2122-the-games--adventures-atmos-final-project-2022"
            target="_blank"
          >
            <button>
              Check it out
              <IoIosArrowForward className="text-white inline" />
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FootageGrid;
