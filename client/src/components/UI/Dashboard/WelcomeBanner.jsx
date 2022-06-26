import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const WelcomeBanner = () => {
  const authContext = useContext(AuthContext);

  return (
    <div className="h-[25vh] w-screen bg-dashboardBg bg-center bg-no-repeat bg-cover object-cover flex flex-col items-center justify-center desktop:items-start desktop:pl-20">
      <h1 className="text-white font-raleway font-semibold text-2xl tablet:text-5xl extra:text-8xl">
        Welcome back, {authContext.username}!
      </h1>
      <br />
      <h1 className="text-white font-raleway font-semibold text-xl tablet:text-3xl extra:text-5xl">
        Take a look at the changes!
      </h1>
    </div>
  );
};

export default WelcomeBanner;
