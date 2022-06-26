import { useNavigate } from "react-router-dom";
import { useState, Suspense } from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner";
const VerificationEmail = () => {
  const [time, setTime] = useState(5);

  const navigate = useNavigate();

  /*
    Creates a new promise that resolves timeout ends
  */
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  /*
    Redirects the user to the home page after 5 seconds
  */
  const automaticRedirect = () => {
    for (let i = 0; i < 5; i++) {
      sleep(1000).then(() => {
        setTime(time - 1);
      });

      time === 0 ? navigate("/", { replace: true }) : null;
    }
  };
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="h-screen w-screen bg-404 bg-center bg-no-repeat bg-cover object-cover backdrop-blur overflow-hidden">
        <div className="flex flex-col items-center justify-center font-serif font-black pt-10 bg-gradient-to-b from-smoothWhite to-smoothPurple text-transparent bg-clip-text text-3xl desktop:text-5xl tablet:text-6xl">
          <h1>Email</h1>
          <h1>Verified successfully</h1>
        </div>
        <div className="flex flex-row items-center justify-center font-raleway font-normal text-white text-xl mt-10 tablet:text-3xl">
          {automaticRedirect()}
          <h1>Redirecting to home in: {time}</h1>
        </div>
        <div className="h-full object-cover bg-Blobs bg-no-repeat bg-center bg-300 -mt-20 tablet:bg-700 tablet:-mt-32"></div>
      </div>
    </Suspense>
  );
};
export default VerificationEmail;
