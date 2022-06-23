import { IoIosArrowForward } from "react-icons/io";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const FootageGrid = () => {
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
      <div className="flex flex-row justify-center items-center ml-32 mt-20 extra:mt-0 el:!mt-10">
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
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s. It has survived not only five centuries, but
              also the leap into electronic. Lorem Ipsum passages, and more
              recently with desktop publishing software
            </h1>
          </div>
        </div>
        <div
          className="w-[350%] extra:w-[300%] el:!w-[60%]"
          data-aos="fade-left"
          data-aos-duration="1500"
        >
          <img src="https://i.imgur.com/L98qD2x.png" alt="" />
        </div>
      </div>
      <div
        className="bg-[#5F57E2] w-[25%] text-white rounded-full text-center py-3 font-serif font-bold text-2xl ml-32 mt-5 el:w-[20%] xl:!w-[15%] xl:!mt-[-3%]"
        data-aos="fade-right"
        data-aos-duration="1500"
      >
        <button>
          Check it out
          <IoIosArrowForward className="text-white inline" />
        </button>
      </div>
    </div>
  );
};

export default FootageGrid;