import Navbar from "../components/UI/Navbar";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const redirectHandler = () => {
    navigate("/Register", { replace: false });
  };

  return (
    <div className="bg-blue-500 h-full">
      <Navbar />
      <div className="bg-blue-300  h-screen bg-center bg-no-repeat bg-cover object-coverl">
        <div className="flex items-center justify-center relative top-96">
          <div>
            <label htmlFor="username" className="block">
              Username
            </label>
            <input type="text" className="block" name="username" />
            <label htmlFor="password" className="block">
              Password
            </label>
            <input type="password" className="block" name="password" />
            <button className="block mt-4 border-solid border-black border-2">
              Login
            </button>

            <p className="cursor-pointer" onClick={() => redirectHandler()}>
              Dont't have an account? Register
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
