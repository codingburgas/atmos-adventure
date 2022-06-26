import { useRef, useEffect, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

const Register = () => {
  const navigate = useNavigate();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  /*
    Initializes AOS library
  */
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  /*
    Tries to register the user
  */
  const registerHandler = (e) => {
    e.preventDefault();
    const USERNAME_REGEX = new RegExp(/^[a-zA-Z0-9.-_$@*!]{4,10}$/);
    const EMAIL_REGEX = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/);
    const PASSWORD_REGEX = new RegExp(/^(?=.*[a-z])(?=.{8,})/);

    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!username.match(USERNAME_REGEX)) {
      alert("Username must be 4-10 characters long");
    } else if (!email.match(EMAIL_REGEX)) {
      alert("Email must be valid");
    } else if (!password.match(PASSWORD_REGEX)) {
      alert(
        "Password must be at least 8 characters long and contain at least one letter"
      );
    }
    const user = {
      username: username,
      email: email,
      password: email,
    };
    if (
      username.match(USERNAME_REGEX) &&
      email.match(EMAIL_REGEX) &&
      password.match(PASSWORD_REGEX)
    ) {
      axios
        .post("http://localhost:3001/api/register", user, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.message === "User created") {
            navigate("/", { replace: true });
          } else {
            console.log(res.data.message);
          }
        });
    }
  };

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="h-screen bg-form bg-center bg-no-repeat bg-cover object-cover">
        <div
          className="h-screen w-full backdrop-blur-sm desktop:w-half extra:backdrop-blur-md relative top-0 left-0"
          data-aos="fade-right"
          data-aos-duration="1500"
        >
          <div className="flex flex-col">
            <h1 className="font-dreamScape text-7xl flex flex-col items-center justify-center relative pt-20 text-white extra:text-9xl">
              ATMOS
            </h1>
            <h1 className="font-dreamScapeSans flex flex-col items-center justify-center relative text-lightGreen text-2xl extra:text-4xl">
              Sign up!
            </h1>
          </div>

          <div className="flex flex-row items-center justify-center pt-10 ">
            <input
              type="text"
              name=""
              className="border-solid border focus:border-2 border-stroke bg-account bg-no-repeat font-bold [background-position-x:1%] [background-position-y:48%] bg-45 w-9/12 py-5 px-14 text-lg extra:w-8/12 extra:py-6 extra:bg-70 extra:[background-position-x:-1%] extra:[background-position-y:60%] extra:placeholder:text-2xl extra:text-2xl leading-tight appearance-none box-border rounded-xl backdrop-blur-sm bg-darkBlue z-0 text-white placeholder:font-bold placeholder:text-lg placeholder:text-white focus:outline-none"
              placeholder="Username"
              ref={usernameRef}
              required
              key={usernameRef}
            />
          </div>
          <div className="flex flex-row items-center justify-center pt-10 ">
            <input
              type="password"
              name=""
              className="border-solid border focus:border-2 border-stroke bg-lock bg-no-repeat font-bold [background-position-x:1%] [background-position-y:48%] bg-45 w-9/12 py-5 px-14 text-lg extra:w-8/12 extra:py-6 extra:bg-70 extra:[background-position-x:-1%] extra:[background-position-y:60%] extra:placeholder:text-2xl extra:text-2xl leading-tight appearance-none box-border rounded-xl backdrop-blur-sm bg-darkBlue z-0 text-white placeholder:font-bold placeholder:text-lg placeholder:text-white focus:outline-none"
              placeholder="Password"
              ref={passwordRef}
              required
              key={passwordRef}
            />
          </div>
          <div className="flex flex-row items-center justify-center pt-10 ">
            <input
              type="text"
              name=""
              className="border-solid border focus:border-2 border-stroke bg-email bg-no-repeat font-bold [background-position-x:1%] [background-position-y:48%] bg-45 w-9/12 py-5 px-14 text-lg extra:w-8/12 extra:py-6 extra:bg-70 extra:[background-position-x:-1%] extra:[background-position-y:60%] extra:placeholder:text-2xl extra:text-2xl leading-tight appearance-none box-border rounded-xl backdrop-blur-sm bg-darkBlue z-0 text-white placeholder:font-bold placeholder:text-lg placeholder:text-white focus:outline-none"
              placeholder="Email"
              ref={emailRef}
              required
            />
          </div>
          <div className="flex flex-row items-center justify-center pt-16 extra:!pt-12 ">
            <button
              className="border-solid border border-stroke py-5 px-28 font-sans bg-darkBlue rounded-full extra:px-32 text-white font-bold text-xl extra:text-3xl"
              onClick={registerHandler}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Register;
