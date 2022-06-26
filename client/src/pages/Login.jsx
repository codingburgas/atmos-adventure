import { useNavigate } from "react-router-dom";
import { useRef, useEffect, Suspense } from "react";
import { useSnackbar } from "notistack";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
const Login = () => {
  const navigate = useNavigate();
  const username = useRef();
  const password = useRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  /*
    Initializes AOS library
  */
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  /*
    Tries to login hte user
  */
  const loginHandler = (e) => {
    e.preventDefault();
    const user = {
      username: username.current.value,
      password: password.current.value,
    };

    axios
      .post("http://localhost:3001/api/login", user, { withCredentials: true })
      .then((res) => {
        if (res.data.message === "User logged in") {
          navigate("/", { replace: true });
        } else if (res.data.message === "Wrong password") {
          enqueueSnackbar("Wrong password!", {
            variant: "error",
          });
          sleep(5000).then(() => {
            closeSnackbar();
          });
        } else if (res.data.message === "User not found") {
          enqueueSnackbar("User not found!", {
            variant: "error",
          });
          sleep(5000).then(() => {
            closeSnackbar();
          });
        }
      });
  };

  const forgotPasswordHandler = () => {
    const email = username.current.value;
    const EMAIL_REGEX = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/);

    const userData = {
      email: email,
    };
    if (!email.match(EMAIL_REGEX)) {
      enqueueSnackbar("Email must be valid!", {
        variant: "error",
      });
      sleep(5000).then(() => {
        closeSnackbar();
      });
    } else {
      axios
        .post("http://localhost:3001/api/sendForgotPasswordEmail", userData, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.message === "Sent a password reset email") {
            enqueueSnackbar("Email sent!", {
              variant: "success",
            });
            sleep(5000).then(() => {
              closeSnackbar();
            });
          } else if (res.data.message === "User doesn't exist") {
            enqueueSnackbar("User not found!", {
              variant: "error",
            });
            sleep(5000).then(() => {
              closeSnackbar();
            });
          }
        });
    }
  };
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="h-screen bg-form bg-center bg-no-repeat bg-cover object-cover">
        <div
          className="h-screen w-full backdrop-blur-sm desktop:w-half extra:backdrop-blur-md"
          data-aos="fade-right"
          data-aos-duration="1500"
        >
          <div className="flex flex-col">
            <h1 className="font-dreamScape text-7xl flex flex-col items-center justify-center relative pt-20 text-white extra:text-9xl">
              ATMOS
            </h1>
            <h1 className="font-dreamScapeSans flex flex-col items-center justify-center relative text-lightGreen text-2xl extra:text-4xl">
              Welcome back!
            </h1>
          </div>

          <div className="flex flex-row items-center justify-center pt-12 ">
            <input
              type="text"
              name=""
              className="border-solid border focus:border-2 border-stroke bg-account bg-no-repeat font-bold [background-position-x:1%] [background-position-y:48%] bg-45 w-9/12 py-5 px-14 text-lg extra:w-8/12 extra:py-6 extra:bg-70 extra:[background-position-x:-1%] extra:[background-position-y:60%] extra:placeholder:text-2xl extra:text-2xl leading-tight appearance-none box-border rounded-xl backdrop-blur-sm bg-darkBlue z-0 text-white placeholder:font-bold placeholder:text-lg placeholder:text-white focus:outline-none"
              placeholder="Username/Email"
              ref={username}
              required
              key={username}
            />
          </div>
          <div className="flex flex-row items-center justify-center pt-12 ">
            <input
              type="password"
              name=""
              className="border-solid border focus:border-2 border-stroke bg-lock bg-no-repeat font-bold [background-position-x:1%] [background-position-y:48%] bg-45 w-9/12 py-5 px-14 text-lg extra:w-8/12 extra:py-6 extra:bg-70 extra:[background-position-x:-1%] extra:[background-position-y:60%] extra:placeholder:text-2xl extra:text-2xl leading-tight appearance-none box-border rounded-xl backdrop-blur-sm bg-darkBlue z-0 text-white placeholder:font-bold placeholder:text-lg placeholder:text-white focus:outline-none"
              placeholder="Password"
              ref={password}
              required
              key={password}
            />
          </div>
          <div className="flex flex-row items-center justify-center pt-16 extra:pt-20 ">
            <button
              className="border-solid border border-stroke py-5 px-28 font-sans bg-darkBlue rounded-full extra:px-32 text-white font-bold text-xl extra:text-3xl"
              onClick={loginHandler}
            >
              Log in
            </button>
          </div>
          <div className="flex flex-col items-center justify-center text-white font-serif text-xl hover:cursor-pointer mt-2">
            <h1 onClick={() => navigate("/Register", { replace: false })}>
              Don't have an account?
            </h1>
            <h1 onClick={forgotPasswordHandler}>Forgot your password?</h1>
          </div>
        </div>
      </div>
    </Suspense>
  );
};
export default Login;
