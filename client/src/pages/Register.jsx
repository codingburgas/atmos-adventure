import Navbar from "../components/UI/Navbar";
import { MdAccountCircle } from "react-icons/md";
import { BiLockAlt } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { useRef, useEffect } from "react";

const Register = () => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const registerHandler = (e) => {
    e.preventDefault();
    const user = {
      username: username.current.value,
      email: email.current.value,
      password: password.current.value,
    };

    fetch("http://localhost:3001/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then(() => console.log("User registered"));
  };

  return (
    <div className="h-screen bg-form bg-center bg-no-repeat bg-cover object-cover">
      <div className="h-full w-full backdrop-blur-sm desktop:w-half extra:backdrop-blur-md">
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
            id=""
            className="bg-account bg-no-repeat font-bold [background-position-x:1%] [background-position-y:48%] bg-45 w-9/12 py-5 px-14 text-lg extra:w-8/12 extra:py-6 extra:bg-70 extra:[background-position-x:-1%] extra:[background-position-y:60%] extra:placeholder:text-2xl extra:text-2xl leading-tight appearance-none box-border rounded-xl backdrop-blur-sm bg-darkBlue z-0 text-white placeholder:font-bold placeholder:text-lg placeholder:text-white focus:outline-none"
            placeholder="Username"
            ref={username}
            required
          />
        </div>
        <div className="flex flex-row items-center justify-center pt-10 ">
          <input
            type="password"
            name=""
            id=""
            className="bg-lock bg-no-repeat font-bold [background-position-x:1%] [background-position-y:48%] bg-45 w-9/12 py-5 px-14 text-lg extra:w-8/12 extra:py-6 extra:bg-70 extra:[background-position-x:-1%] extra:[background-position-y:60%] extra:placeholder:text-2xl extra:text-2xl leading-tight appearance-none box-border rounded-xl backdrop-blur-sm bg-darkBlue z-0 text-white placeholder:font-bold placeholder:text-lg placeholder:text-white focus:outline-none"
            placeholder="Password"
            ref={password}
            required
          />
        </div>
        <div className="flex flex-row items-center justify-center pt-10 ">
          <input
            type="text"
            name=""
            id=""
            className="bg-email bg-no-repeat font-bold [background-position-x:1%] [background-position-y:48%] bg-45 w-9/12 py-5 px-14 text-lg extra:w-8/12 extra:py-6 extra:bg-70 extra:[background-position-x:-1%] extra:[background-position-y:60%] extra:placeholder:text-2xl extra:text-2xl leading-tight appearance-none box-border rounded-xl backdrop-blur-sm bg-darkBlue z-0 text-white placeholder:font-bold placeholder:text-lg placeholder:text-white focus:outline-none"
            placeholder="Email"
            ref={email}
            required
          />
        </div>
        <div className="flex flex-row items-center justify-center pt-16 extra:pt-20 ">
          <button
            className="py-5 px-28 font-sans bg-darkBlue rounded-full extra:px-32 text-white font-bold text-xl extra:text-3xl"
            onClick={registerHandler}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
