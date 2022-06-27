import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { AuthContext } from "../../context/AuthContext";
const DashboardShowcase = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  /*
   * Initializes the AOS library
   */

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const buttonHandler = () => {
    if (!authContext.isAuthenticated) {
      enqueueSnackbar("You must authenticate first!", {
        variant: "error",
      });
      sleep(5000).then(() => {
        closeSnackbar();
      });
    } else {
      navigate("/dashboard");
    }
  };
  return (
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
              We’ve built a full stack application from the ground up, that
              manages to balance perfectly backend and frontend. To accomplish
              this, we’ve built used React as our web framework of choice,
              Tailwind CSS as our style components library, as well as other
              technologies that you can learn more about in our repository.
            </h1>
          </div>
          <div
            className="max-w-[15rem] mt-5"
            data-aos="fade-right"
            data-aos-duration="1500"
          >
            <h1 className="text-justify break-normal">
              Our powerful express-based backend pairs flawlessly with the mySQL
              database. Admins can easily add, promote and delete users from the
              admin panel.
            </h1>
          </div>
          <div
            className="mt-7 bg-[#5F57E2] rounded-full"
            data-aos="fade-top"
            data-aos-duration="1500"
          >
            <button
              className="text-white font-serif font-bold px-8 py-2"
              onClick={buttonHandler}
            >
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
            src="https://i.imgur.com/GiV0H77.png"
            alt=""
            className="mt-5"
            data-aos="fade-right"
            data-aos-duration="1500"
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardShowcase;
