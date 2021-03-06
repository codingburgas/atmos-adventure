import { IoIosArrowForward } from "react-icons/io";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
const Footage = () => {
  /*
   * Initializes the AOS library
   */
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <div className="h-screen block desktop:hidden">
      <div
        className="flex flex-row justify-center items-center font-sans font-semibold text-3xl pt-10"
        data-aos="fade-down"
        data-aos-duration="1500"
      >
        We got a game changer.
      </div>
      <div
        className="flex flex-row justify-center items-center font-sans font-normal text-3xl"
        data-aos="fade-up"
        data-aos-duration="1500"
      >
        Literally.
      </div>

      <div className="mt-16 flex flex-col items-center justify-center">
        <div
          className="nuclea:bg-gradient-to-r from-[#687CC9] to-[#AA7DD0] dust:bg-[#F67E0F] text-transparent bg-clip-text font-serif font-bold text-lg"
          data-aos="fade-right"
          data-aos-duration="1500"
        >
          Clock is ticking. Moments last once.
        </div>
        <div
          className="font-serif font-bold text-3xl nuclea:text-[#111] dust:text-[#F6620F]"
          data-aos="fade-left"
          data-aos-duration="1500"
        >
          Look around. Chill out.
        </div>
        <div
          className="font-serif font-normal max-w-xs text-center pt-6"
          data-aos="fade-right"
          data-aos-duration="1500"
        >
          You play as an amnesiac astronaut. Your goal is to collect every
          stranded part of your ship and head back home. While doing that, you
          can admire the local scenery of these strange new worlds - Nuclea and
          Dust-2. You find yourself alone on these planets. Perhaps they are
          hiding something long forgotten? Only one way to find out…
        </div>
      </div>
      <div className="flex fles-row justify-center items-center text-center pt-5">
        <div
          className="nuclea:bg-[#5F57E2] dust:bg-[#F6A70F] w-[60%] text-white rounded-full px-5 py-2 text-2xl font-serif font-bold"
          data-aos="fade-left"
          data-aos-duration="1500"
        >
          <button>
            Check it out
            <IoIosArrowForward className="text-white inline" />
          </button>
        </div>
      </div>
      <div
        className="mt-10 flex flex-row justify-center items-center select-none"
        data-aos="fade-right"
        data-aos-duration="1500"
      >
        <img src="https://i.imgur.com/QjOjVCm.png" alt="" />
      </div>
    </div>
  );
};

export default Footage;
