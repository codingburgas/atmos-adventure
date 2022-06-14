import Navbar from "../components/UI/Navbar";
import { useNavigate } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { BiLockAlt } from "react-icons/bi";
import { useRef, useEffect } from "react";
const Login = () => {
  const navigate = useNavigate();
  const redirectHandler = () => {
    navigate("/Register", { replace: false });
  };

  const username = useRef();
  const password = useRef();
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
      .then((data) => console.log(data.message))
      .catch((err) => {
        console.log(err);
      });
  };

  // useEffect(() => {
  //   const resize = () => {
  //     console.log(window.innerWidth);
  //   };
  //   window.addEventListener("resize", resize);
  // });

  return (
    <div className="h-full">
      <Navbar />
      <div className="bg-purple-300  h-screen bg-center bg-no-repeat bg-cover object-cover">
        <div className="flex h-screen items-end justify-end flex-col-reverse ">
          <div className="m-auto bg-white bigTablet:bg-form bg-center bg-no-repeat bg-cover object-cover w-1/2 items-center justify-center h-4/6 rounded-3xl">
            <div className="flex flex-col items-center bg-white w-1/2 h-full ml-auto rounded-r-3xl">
              <h1 className="mt-8 text-xl bigTablet:mt-14 bigTablet:text-4xl smallLaptop:text-4xl font-serif font-bold smallDesk:text-4xl smallDesk:mt-20 laptop:text-3xl laptop:mt-16">
                Welcome back!
              </h1>
              <h1 className="text-lg bigTablet:text-2xl smallLaptop:text-3xl font-serif smallDesk:text-3xl laptop:text-2xl ">
                Did you miss us?
              </h1>
              <br />
              <form className="flex flex-col items-center justify-center mt-0 bigTablet:mt-18 laptop:mt-20 smallDesk:mt-20 smallLaptop:mt-20">
                <div className="border-b-2 border-black w-3/4 bigTablet:w-full bigTablet:border-b-4">
                  <MdAccountCircle className="text-sm inline-block bigTablet:text-3xl" />
                  <input
                    type="username"
                    name="username"
                    className="focus:border-none outline-none ml-3 placeholder:font-bold text-xs bigTablet:ml-3 bigTablet:placeholder:font-bold bigTablet:font-serif bigTablet:placeholder:text-base"
                    placeholder="Username"
                    required
                    ref={username}
                  />
                  <div className="mt-1"></div>
                </div>
                <br />
                <div className="border-b-2 border-black w-3/4 bigTablet:w-full bigTablet:border-b-4">
                  <BiLockAlt className="text-sm inline-block bigTablet:text-3xl" />
                  <input
                    type="password"
                    name="username"
                    className="focus:border-none outline-none ml-3 placeholder:font-bold text-xs bigTablet:ml-3 bigTablet:placeholder:font-bold bigTablet:font-serif bigTablet:placeholder:text-base"
                    placeholder="Password"
                    required
                    ref={password}
                  />
                  <div className="mt-1"></div>
                </div>
                <div className="bg-blue-400 rounded-3xl mt-12 text-white bigTablet:mt-20 smallDesk:mt-32 laptop:mt-28 smallLaptop:mt-72">
                  <button
                    className="font-serif font-bold text-lg pl-20 pr-20 pt-1 ppb-1 bigTablet:pr-28 bigTablet:pl-28 bigTablet:pt-1 bigTablet:pb-1 smallLaptop:pr-28 smallLaptop:pl-28 smallLaptop:pt-2 smallLaptop:pb-2 smallDesk:text-3xl smallDesk:pr-32 smallDesk:pl-32 smallDesk:pt-3 smallDesk:pb-3 laptop:text-2xl laptop:pr-32 laptop:pl-32 laptop:pt-3 laptop:pb-3 smallLaptop:3xl"
                    onClick={loginHandler}
                  >
                    Log in
                  </button>
                </div>
                <div
                  className="mt-4 text-blue-400 border-b-2 border-blue-300 cursor-pointer "
                  onClick={redirectHandler}
                >
                  <p>Don't have an account?</p>
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
export default Login;
