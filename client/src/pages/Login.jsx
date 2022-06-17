import { useNavigate } from "react-router-dom";
import { useRef, useEffect, useContext } from "react";
import { AuthContext } from "./../components/context/AuthContext";
import AOS from "aos";
import "aos/dist/aos.css";
const Login = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const username = useRef();
  const password = useRef();
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const redirectHandler = () => {
    navigate("/Register", { replace: false });
  };

  const loginHandler = (e) => {
    e.preventDefault();
    const user = {
      username: username.current.value,
      password: password.current.value,
    };

    fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        switch (data.message) {
          case "User logged in":
            fetch("http://localhost:3001/api/isAuthenticated")
              .then((res) => res.json())
              .then((data) => {
                data.message === "User is authenticated"
                  ? authContext.setIsAuthenticated(true)
                  : null;
              });

            navigate("/", { replace: true });
            break;
          case "Wrong password":
            alert(data.message);
            break;
          case "User not found":
            alert(data.message);
            break;
          default:
            alert(data.message);
            break;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
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
            placeholder="Username"
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
        <div
          className="flex flex-row items-center justify-center text-white font-serif text-xl hover:cursor-pointer mt-2"
          onClick={redirectHandler}
        >
          <h1>Don't have an account?</h1>
        </div>
      </div>
    </div>
  );
};
export default Login;
