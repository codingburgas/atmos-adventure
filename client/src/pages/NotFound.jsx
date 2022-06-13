import { useNavigate } from "react-router-dom";
import { useState } from "react";
const NotFound = () => {
  const [time, setTime] = useState(5);

  const navigate = useNavigate();

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const automaticRedirect = () => {
    for (let i = 0; i < 5; i++) {
      sleep(1000).then(() => {
        setTime(time - 1);
      });

      time === 0 ? navigate("/", { replace: true }) : null;
    }
  };
  return (
    <div className="flex items-center justify-center flex-col">
      <h1 className="text-3xl">Error 404</h1>
      <br />
      <h1 className="text-xl">
        Oops you entered the wrong ATMOS page! Please go to [link]
      </h1>
      <br />
      <h1>Page not found</h1>
      {automaticRedirect()}
      <p>Redirecting to the Home page in: {time}</p>
    </div>
  );
};
export default NotFound;
