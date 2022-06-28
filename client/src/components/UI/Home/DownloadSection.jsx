import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useSnackbar } from "notistack";
import axios from "axios";

const DownloadSection = () => {
  /*
   * Initializes the AOS library
   */
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const downloadHandler = () => {
    axios
      .get("http://localhost:3001/api/downloadCounter", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.message === "User not authenticated") {
          enqueueSnackbar("You must be logged in to download the file!", {
            variant: "error",
          });
          sleep(5000).then(() => {
            closeSnackbar();
          });
        } else {
          window.location.href =
            "https://github.com/codingburgas/2122-the-games--adventures-atmos-final-project-2022/releases/download/v1.0.1/Atmos.-.v1.0.1.zip";
        }
      });
  };

  return (
    <div className="h-full bg-[url('https://i.imgur.com/3mB1W0d.png')] tablet:bg-[url('https://i.imgur.com/F8ntcMm.png')] bg-cover bg-no-repeat object-cover mt-20">
      <div
        className="flex flex-row justify-center items-center pt-20 text-white font-sans font-semibold text-4xl desktop:pt-60 desktop:text-6xl el:!text-8xl"
        data-aos="fade-down"
        data-aos-duration="1500"
      >
        You on board?
      </div>
      <div
        className="flex flex-col justify-center items-center h-[80vh] mt-20 desktop:mt-0"
        data-aos="fade-left"
        data-aos-duration="1500"
      >
        <button
          className="bg-button outline outline-[.0001px] text-white outline-white px-10 py-4 rounded-full font-sans font-bold text-2xl tablet:px-16 el:!px-24 el:text-3xl"
          onClick={downloadHandler}
        >
          DOWNLOAD
        </button>
      </div>
    </div>
  );
};

export default DownloadSection;
