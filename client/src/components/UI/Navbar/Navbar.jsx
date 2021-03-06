import { lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import LoadingSpinner from "../LoadingSpinner";
const ProfilePopup = lazy(() => import("../Profile/Popup/ProfilePopup"));
const BurgerNavbar = lazy(() => import("./BurgerNavbar"));
import axios from "axios";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

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
            enqueueSnackbar("User not authenticated", {
              variant: "error",
            });
            sleep(5000).then(() => {
              closeSnackbar();
            });
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
    <Suspense fallback={<LoadingSpinner />}>
      <div>
        <div className="hidden tablet:flex tablet:flex-row tablet:justify-between tablet:items-center tablet:pr-14 tablet:pt-4 w-full absolute text-white z-50">
          <div
            className="ml-16 font-dreamScape text-4xl mt-1.5 w-full h-1/3 hover:cursor-pointer"
            onClick={() => navigate(0)}
          >
            ATMOS
          </div>

          <div>
            <ul className="flex space-x-10">
              {authContext.role === "admin" ||
              authContext.role === "moderator" ? (
                <li
                  className="inline-block space-x-10 font-sans mt-1.5 text-xl hover:cursor-pointer transition duration-200 hover:ease-in hover:bg-white hover:text-[#111] rounded-full px-5 py-2"
                  onClick={() => navigate("/dashboard")}
                >
                  Dashboard
                </li>
              ) : null}
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
                <button
                  className="font-sans border-solid border-2 pt-1 pb-1 pl-2 pr-2 rounded-full text-xl transition duration-200 hover:ease-in hover:cursor-pointer hover:bg-white hover:text-[#111] hover:border-white"
                  onClick={downloadHandler}
                >
                  Download
                </button>
              ) : null}
            </ul>
          </div>
        </div>
        <BurgerNavbar />
        <ProfilePopup isOpen={isOpen} isAuth={authContext.isAuthenticated} />
      </div>
    </Suspense>
  );
};

export default Navbar;
