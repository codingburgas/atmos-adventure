import { IoIosArrowForward } from "react-icons/io";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
const Footage = () => {
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
          className="bg-gradient-to-r from-[#687CC9] to-[#AA7DD0] text-transparent bg-clip-text font-serif font-bold text-lg"
          data-aos="fade-right"
          data-aos-duration="1500"
        >
          Clock is ticking. Moments last once.
        </div>
        <div
          className="font-serif font-bold text-3xl"
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
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s. It has survived not only five centuries, but also the
          leap into
        </div>
      </div>
      <div className="flex fles-row justify-center items-center text-center pt-5">
        <div
          className="bg-[#5F57E2] w-[60%] text-white rounded-full px-5 py-2 text-2xl font-serif font-bold"
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
        className="mt-10 flex flex-row justify-center items-center"
        data-aos="fade-right"
        data-aos-duration="1500"
      >
        <img src="https://i.imgur.com/L98qD2x.png" alt="" />
      </div>
    </div>
  );
};

export default Footage;
