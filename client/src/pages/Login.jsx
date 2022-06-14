import Navbar from "../components/UI/Navbar";
import { useNavigate } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { BiLockAlt } from "react-icons/bi";
import { useRef } from "react";
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

  return (
    <div className="h-full">
      <Navbar />
      <div className="bg-purple-300  h-screen bg-center bg-no-repeat bg-cover object-cover">
        <div className="flex h-screen items-end justify-end flex-col-reverse ">
          <div className="m-auto  bg-form bg-center bg-no-repeat bg-cover object-cover w-1/2 items-center justify-center h-4/6 rounded-3xl">
            <div className="flex flex-col items-center bg-white w-1/2 h-full ml-auto rounded-r-3xl">
              <h1 className="mt-10 text-2xl font-serif font-bold smallDesk:text-4xl smallDesk:mt-20 laptop:text-3xl laptop:mt-16">
                Welcome back!
              </h1>
              <h1 className="text-xl font-serif font-light smallDesk:text-3xl laptop:2xl">
                Did you miss us?
              </h1>
              <br />
              <form className="flex flex-col items-center justify-center mt-20">
                <div className="border-b-4 border-black w-full">
                  <MdAccountCircle className="text-3xl inline-block" />
                  <input
                    type="username"
                    name="username"
                    className="focus:border-none outline-none ml-3 placeholder:font-bold font-serif"
                    placeholder="Username"
                    required
                    ref={username}
                  />
                  <div className="mt-1"></div>
                </div>
                <br />
                <div className="border-b-4 border-black w-full">
                  <BiLockAlt className="text-3xl inline-block" />
                  <input
                    type="password"
                    name="username"
                    className="focus:border-none outline-none ml-3 placeholder:font-bold font-serif"
                    placeholder="Password"
                    required
                    ref={password}
                  />
                  <div className="mt-1"></div>
                </div>
                <div className="bg-blue-400 rounded-3xl mt-20 text-white smallDesk:mt-32 laptop:mt-28">
                  <button
                    className="font-serif font-bold text-2xl pr-28 pl-28 pt-2 pb-2 smallDesk:text-3xl smallDesk:pr-32 smallDesk:pl-32 smallDesk:pt-3 smallDesk:pb-3 laptop:text-2xl laptop:pr-32 laptop:pl-32 laptop:pt-3 laptop:pb-3"
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
