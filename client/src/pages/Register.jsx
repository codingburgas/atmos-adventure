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
    <div className="h-full">
      <Navbar />
      <div className=" bg-purple-300 laptop:h-screen bg-center bg-no-repeat bg-cover object-cover">
        <div className="flex h-screen items-end justify-end flex-col-reverse ">
          <div className="m-auto  bg-form bg-center bg-no-repeat bg-cover object-cover w-1/2 items-center justify-center h-4/6 rounded-3xl">
            <div className="flex flex-col items-center bg-white w-1/2 h-full ml-auto rounded-r-3xl">
              <h1 className="text-2xl font-serif font-bold mt-14 laptop:text-4xl laptop:mt-20">
                Don't have an account?
              </h1>
              <br />
              <form className="flex flex-col items-center justify-center mt-20 laptop:mt-20">
                <div className="border-b-4 border-black w-full bg-transparent laptop:w-full laptop:border-b-4">
                  <MdAccountCircle className="text-2xl inline-block laptop:text-3xl" />
                  <input
                    type="username"
                    name="username"
                    className="focus:border-none outline-none ml-3 placeholder:font-bold text-base laptop:placeholder:font-bold font-serif bg-transparent"
                    placeholder="Username"
                    required
                    ref={username}
                  />
                  <div className="mt-1"></div>
                </div>
                <br />
                <div className="border-b-4 border-black w-full bg-transparent laptop:w-full laptop:border-b-4">
                  <MdEmail className="text-2xl inline-block laptop:text-3xl" />
                  <input
                    type="Email"
                    name="username"
                    className="focus:border-none outline-none ml-3 placeholder:font-bold text-base laptop:placeholder:font-bold font-serif bg-transparent"
                    placeholder="Email"
                    required
                    ref={email}
                  />
                  <div className="mt-1"></div>
                </div>
                <div className="border-b-4 border-black w-full bg-transparent mt-5 laptop:w-full laptop:border-b-4 laptop:mt-6">
                  <BiLockAlt className="text-2xl inline-block laptop:text-3xl" />
                  <input
                    type="password"
                    name="username"
                    className="focus:border-none outline-none ml-3 placeholder:font-bold text-base laptop:placeholder:font-bold font-serif bg-transparent"
                    placeholder="Password"
                    required
                    ref={password}
                  />
                  <div className="mt-1"></div>
                </div>
                <div className="bg-blue-400 rounded-3xl text-white mt-14 laptop:mt-16 smallDesk:mt-28">
                  <button
                    className="font-serif font-bold text-2xl pr-24 pl-24 pt-2 pb-2 smallDesk:text-3xl smallDesk:pr-32 smallDesk:pl-32 smallDesk:pt-3 smallDesk:pb-3 laptop:text-2xl laptop:pr-32 laptop:pl-32 laptop:pt-3 laptop:pb-3"
                    onClick={registerHandler}
                  >
                    Register
                  </button>
                </div>
              </form>
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
