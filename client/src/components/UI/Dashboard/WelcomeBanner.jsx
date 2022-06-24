import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
const WelcomeBanner = () => {
  const [username, setUsername] = useState("");
  const authContext = useContext(AuthContext);

  return (
    <div className="h-[25vh] w-screen bg-dashboardBg bg-center bg-no-repeat bg-cover object-cover flex flex-col items-center justify-center desktop:items-start z-0">
      <h1 className="text-white font-raleway font-semibold text-2xl tablet:text-5xl extra:text-8xl">
        Welcome back, {authContext.username}!
      </h1>
    </div>
  );
};

export default WelcomeBanner;
