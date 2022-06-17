import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState, useEffect } from "react";
import BurgerNavbar from "./BurgerNavbar";
const Navbar = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  console.log(authContext.isAuthenticated);

  const logoutHandler = () => {
    if (authContext.isAuthenticated) {
      fetch("http://localhost:3001/api/logout")
        .then((res) => res.json())
        .then((data) => {
          data.message === "User logged out"
            ? authContext.setIsAuthenticated(false)
            : null;
        });

      navigate("/", { replace: true });
    } else {
      navigate("/login", { replace: false });
    }
  };

  const buttonHandler = () => {
    authContext.isAuthenticated ? null : navigate("/login", { replace: false });
  };

  return (
    <div>
      <div className="hidden tablet:flex tablet:flex-row tablet:justify-between tablet:items-center tablet:pr-14 tablet:pt-4 z-0 w-full absolute text-white">
        <div
          className="ml-16 font-sans text-4xl mt-1.5 w-full h-1/3 hover:cursor-pointer"
          onClick={() => {
            navigate("/", { replace: false });
          }}
        >
          ATMOS
        </div>

        <div>
          <ul className="flex space-x-10">
            <li
              className="inline-block space-x-10 font-sans mt-1.5 text-xl hover:cursor-pointer"
              onClick={() => navigate("*", { replace: false })}
            >
              About
            </li>

            <li
              className="inline-block space-x-10 font-sans mt-1.5 text-xl hover:cursor-pointer"
              onClick={logoutHandler}
            >
              {authContext.isAuthenticated ? "Logout" : "Login"}
            </li>
            <button
              onClick={buttonHandler}
              className="font-sans border-solid border-2 pt-1 pb-1 pl-2 pr-2 rounded-md text-xl hover:cursor-pointer"
            >
              Download
            </button>
          </ul>
        </div>
      </div>
      <BurgerNavbar />
    </div>
  );
};

export default Navbar;
