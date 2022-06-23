import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const DownloadSection = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <div className="h-full bg-[url('https://i.imgur.com/XlUu24Q.png')] tablet:bg-[url('https://i.imgur.com/8cn2eEF.png')] bg-cover bg-no-repeat object-cover mt-20">
      <div
        className="flex flex-row justify-center items-center pt-20 text-white font-sans font-semibold text-4xl desktop:pt-60 desktop:text-6xl el:!text-8xl"
        data-aos="fade-down"
        data-aos-duration="1500"
      >
        You on board?
      </div>
      <div
        className="flex flex-col justify-center items-center h-[80vh] mt-20 desktop:mt-0"
        data-aos="fade-up"
        data-aos-duration="1500"
      >
        <button className="bg-button outline outline-[.0001px] text-white outline-white px-10 py-4 rounded-full font-sans font-bold text-2xl">
          DOWNLOAD
        </button>
      </div>
    </div>
  );
};

export default DownloadSection;
