import Navbar from "../components/UI/Navbar";
import { MdAccountCircle } from "react-icons/md";
import { BiLockAlt } from "react-icons/bi";
import { MdEmail } from "react-icons/md";

const Register = () => {
  return (
    <div className="h-full">
      <Navbar />
      <div className="bg-purple-300  h-screen bg-center bg-no-repeat bg-cover object-cover">
        <div className="flex h-screen items-end justify-end flex-col-reverse ">
          <div className="m-auto  bg-form bg-center bg-no-repeat bg-cover object-cover w-1/2 items-center justify-center h-4/6 rounded-3xl">
            <div className="flex flex-col items-center bg-white w-1/2 h-full ml-auto rounded-r-3xl">
              <h1 className="text-4xl font-serif font-bold mt-20">
                Don't have an account?
              </h1>
              {/* <h1 className="text-3xl font-serif font-light">
                Did you miss us?
              </h1> */}
              <br />
              <form className="flex flex-col items-center justify-center mt-20">
                <div className="border-b-4 border-black w-full bg-transparent">
                  <MdAccountCircle className="text-3xl inline-block" />
                  <input
                    type="username"
                    name="username"
                    className="focus:border-none outline-none ml-3 placeholder:font-bold font-serif bg-transparent"
                    placeholder="Username"
                    required
                  />
                  <div className="mt-1"></div>
                </div>
                <br />
                <div className="border-b-4 border-black w-full bg-transparent">
                  <MdEmail className="text-3xl inline-block" />
                  <input
                    type="Email"
                    name="username"
                    className="focus:border-none outline-none ml-3 placeholder:font-bold font-serif bg-transparent"
                    placeholder="Email"
                    required
                  />
                  <div className="mt-1"></div>
                </div>
                <div className="border-b-4 border-black w-full mt-6 bg-transparent">
                  <BiLockAlt className="text-3xl inline-block" />
                  <input
                    type="password"
                    name="username"
                    className="focus:border-none outline-none ml-3 placeholder:font-bold font-serif bg-transparent"
                    placeholder="Password"
                    required
                  />
                  <div className="mt-1"></div>
                </div>
                <div className="mt-32 bg-blue-400 rounded-3xl text-white">
                  <button className="font-serif font-bold text-3xl pr-32 pl-32 pt-3 pb-3  ">
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
