import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
const BurgerNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      once: true,
      easing: "ease-in-out",
    });
    AOS.refresh();
  }, []);

  const logOutInHandler = () => {
    if (authContext.isAuthenticated) {
      axios
        .get("http://localhost:3001/api/logout", { withCredentials: true })
        .then((res) => {
          if (res.data.message === "User logged out") {
            authContext.setIsAuthenticated(false);
            navigate("/", { replace: true });
          } else {
            console.log(res.data.message);
          }
        });
    } else {
      navigate("/login", { replace: false });
    }
  };

  const registerHandler = () => {
    authContext.isAuthenticated
      ? navigate("*", { replace: true })
      : navigate("/Register", { replace: false });
  };

  const downloadButtonHandler = () => {
    authContext.isAuthenticated ? null : navigate("/login", { replace: false });
  };

  const aboutHandler = () => {
    navigate("*", { replace: false });
  };

  const burgerHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="">
      <div className="absolute h-11/12 flex flex-row justify-between w-11/12 mt-5 mb-10 tablet:hidden">
        <h1 className="font-dreamScape text-3xl text-white ml-7 z-50">ATMOS</h1>

        <div className={isOpen ? "hidden" : "flex flex-row-reverse w-[36.7%]"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-9 h-9 text-white hover:cursor-pointer z-50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={burgerHandler}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </div>

        <div
          className={isOpen ? "flex flex-row-reverse w-[36.7%] mt-1" : "hidden"}
          onClick={burgerHandler}
        >
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="z-50 hover:cursor-pointer"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20.7761 24.1803C21.4604 24.8918 22.5699 24.8918 23.2542 24.1803C23.9385 23.4687 23.9385 22.315 23.2542 21.6034L14.499 12.4994L23.2528 3.39696C23.9371 2.68538 23.9371 1.53168 23.2528 0.820103C22.5685 0.108524 21.459 0.108524 20.7746 0.820103L12.0209 9.92257L2.99184 0.533806C2.30752 -0.177773 1.19802 -0.177772 0.513703 0.533806C-0.170614 1.24539 -0.170615 2.39908 0.513702 3.11066L9.54277 12.4994L0.512261 21.8897C-0.172057 22.6013 -0.172055 23.755 0.512262 24.4665C1.19658 25.1781 2.30608 25.1781 2.99039 24.4665L12.0209 15.0763L20.7761 24.1803Z"
              fill="#E2EDF8"
            />
          </svg>
        </div>
      </div>
      <div
        className={
          isOpen
            ? "animate-trX opacity-50 flex flex-row-reverse justify-center absolute top-0 backdrop-blur-3xl bg-[#150636] h-full w-full tablet:hidden"
            : "hidden"
        }
      >
        <ul className="font-raleway backdrop-blur-3xl font-semibold text-2xl text-center uppercase text-white flex flex-col items-center justify-start w-full">
          <li
            className="hover:cursor-pointer mt-16 py-4 border-b border-t-2 w-full text-center border-b-solid border-white"
            onClick={aboutHandler}
          >
            About
          </li>
          <li
            className="hover:cursor-pointer py-4 border-b border-t w-full text-center border-b-solid border-white backdrop-blur-3xl"
            onClick={logOutInHandler}
          >
            {authContext.isAuthenticated ? "Log out" : "Log in"}
          </li>
          <li
            className="hover:cursor-pointer py-4 border-b border-t w-full text-center border-b-solid border-white backdrop-blur-3xl"
            onClick={registerHandler}
          >
            {authContext.isAuthenticated ? "Profile" : "Register"}
          </li>
          <li
            className="hover:cursor-pointer py-4 border-b-2 border-t w-full text-center border-b-solid border-white backdrop-blur-3xl"
            onClick={downloadButtonHandler}
          >
            Download
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BurgerNavbar;
