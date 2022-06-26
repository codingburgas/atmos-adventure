import { IoIosArrowForward } from "react-icons/io";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
const GridSection = () => {
  /*
   * Initializes the AOS library
   */
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <div className="hidden desktop:h-screen desktop:block z-[-10]">
      <div
        className="flex flex-row justify-center items-center font-sans font-semibold text-7xl pt-8 z-[-10]"
        data-aos="fade-bottom"
        data-aos-duration="1500"
      >
        We got the web.
      </div>
      <br />

      <div>
        <div className="ml-28 mt-4 z-[-10]">
          <div
            className="bg-gradient-to-r from-[#687CC9] to-[#AA7DD0] text-transparent bg-clip-text font-serif font-bold text-2xl z-[-10] extraXl:text-4xl"
            data-aos="fade-right"
            data-aos-duration="1500"
          >
            One platform. Three worlds.
          </div>
          <div
            className="font-serif font-bold text-4xl max-w-md extraXl:text-5xl extraXl:max-w-xl"
            data-aos="fade-right"
            data-aos-duration="1500"
          >
            A decked out supply of system management.
          </div>
        </div>
      </div>
      <dir className="grid grid-cols-2 grid-rows-1 !p-0 ml-28 gap-x-10 el:gap-x-40 z-[-10] extraXl:!gap-x-64">
        <h1
          className="text-lg text-justify extraXl:text-2xl"
          data-aos="fade-right"
          data-aos-duration="1500"
        >
          We’ve built a full stack application from the ground up, that manages
          to balance perfectly backend and frontend. To accomplish this, we’ve
          built used React as our web framework of choice, Tailwind CSS as our
          style components library, as well as other technologies that you can
          learn more about in our repository.
        </h1>
        <h1
          className="max-w-sm text-lg text-justify el:max-w-xl extraXl:text-2xl"
          data-aos="fade-left"
          data-aos-duration="1500"
        >
          Our powerful express-based backend pairs flawlessly with the mySQL
          database. Admins can easily add, promote and delete users from the
          admin panel.
        </h1>
      </dir>
      <div
        className="ml-28 bg-[#5F57E2] rounded-full w-[25%] text-center py-3 text-white text-2xl font-serif font-bold el:w-[15%] z-[-10]"
        data-aos="fade-right"
        data-aos-duration="1500"
      >
        <button>
          Check it out <IoIosArrowForward className="inline mb-1 text-3xl" />
        </button>
      </div>
      <div className="flex flex-row justify-between z-[-10]">
        <img
          src="https://i.imgur.com/w1xKYrd.png"
          className="h-[18%] w-[18%] ml-28 mt-6 z-[-10]"
          alt=""
          data-aos="fade-right"
          data-aos-duration="1500"
        />
        <img
          src="https://i.imgur.com/GiV0H77.png"
          className="h-[40%] w-[40%] pt-10 mr-16 z-[-10]"
          alt=""
          data-aos="fade-left"
          data-aos-duration="1500"
        />
      </div>
    </div>
  );
};

export default GridSection;
