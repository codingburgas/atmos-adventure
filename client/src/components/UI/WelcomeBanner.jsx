const WelcomeBanner = () => {
  return (
    <div className="h-[25vh] w-screen bg-dashboardBg bg-center bg-no-repeat bg-cover object-cover flex flex-col items-center justify-center">
      <h1 className="text-white font-raleway font-semibold text-2xl">
        Welcome back, [username]!
      </h1>
    </div>
  );
};

export default WelcomeBanner;
