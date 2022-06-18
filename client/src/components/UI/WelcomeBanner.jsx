const WelcomeBanner = () => {
  return (
    <div className="h-[25vh] w-screen bg-dashboardBg bg-center bg-no-repeat bg-cover object-cover flex flex-col items-center justify-center desktop:items-start z-0">
      <h1 className="text-white font-raleway font-semibold text-2xl tablet:text-5xl extra:text-8xl">
        Welcome back, [username]!
      </h1>
    </div>
  );
};

export default WelcomeBanner;
