import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState, useEffect, useCallback } from "react";
import ProfilePopup from "../Profile/Popup/ProfilePopup";
import BurgerNavbar from "./BurgerNavbar";
import axios from "axios";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  /*
    Checks if the user is authenticated
  */
  useEffect(() => {
    authContext.setIsAuthenticated();
  }, []);

  /*
    Tries to logout the user
  */
  const logoutHandler = () => {
    if (authContext.isAuthenticated) {
      axios
        .get("http://localhost:3001/api/logout", { withCredentials: true })
        .then((res) => {
          if (res.data.message === "User logged out") {
            navigate(0);
          } else {
            alert(res.data.message);
          }
        });
    } else {
      navigate("/login", { replace: false });
    }
  };

  /*
    If the user is authenticated,
    the profile popup will be shown
    else the user will be redirected to the register page
  */
  const registerHandler = () => {
    authContext.isAuthenticated
      ? setIsOpen(!isOpen)
      : navigate("/register", { replace: false });
  };
  return (
    <div>
      <div className="hidden tablet:flex tablet:flex-row tablet:justify-between tablet:items-center tablet:pr-14 tablet:pt-4 w-full absolute text-white z-50">
        <div
          className="ml-16 font-sans text-4xl mt-1.5 w-full h-1/3 hover:cursor-pointer"
          onClick={() => navigate(0)}
        >
          ATMOS
        </div>

        <div>
          <ul className="flex space-x-10">
            {/* <li
              className="inline-block space-x-10 font-sans mt-1.5 text-xl hover:cursor-pointer"
              onClick={aboutHandler}
            >
              About
            </li> */}

            <li
              className="inline-block space-x-10 font-sans mt-1.5 text-xl hover:cursor-pointer transition duration-200 hover:ease-in hover:bg-white hover:text-[#111] rounded-full px-5 py-2"
              onClick={logoutHandler}
            >
              {authContext.isAuthenticated ? "Logout" : "LOGIN"}
            </li>
            <li
              className="inline-block space-x-10 font-sans mt-1.5 text-xl transition duration-200 hover:ease-in hover:cursor-pointer hover:bg-white hover:text-[#111] rounded-full px-5 py-2"
              onClick={registerHandler}
            >
              {authContext.isAuthenticated ? "Profile" : "REGISTER"}
            </li>
            {authContext.isAuthenticated ? (
              <button className="font-sans border-solid border-2 pt-1 pb-1 pl-2 pr-2 rounded-md text-xl transition duration-200 hover:ease-in hover:cursor-pointer hover:bg-white hover:text-[#111] hover:border-white">
                Download
              </button>
            ) : null}
          </ul>
        </div>
      </div>
      <BurgerNavbar />
      <ProfilePopup isOpen={isOpen} isAuth={authContext.isAuthenticated} />
    </div>
  );
};

export default Navbar;
