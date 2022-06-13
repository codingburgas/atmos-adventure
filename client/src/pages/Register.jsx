import Navbar from "../components/UI/Navbar";

const Register = () => {
  return (
    <div className="bg-blue-500 h-full">
      <Navbar />
      <div className="bg-blue-300  h-screen bg-center bg-no-repeat bg-cover object-coverl">
        <div className="flex items-center justify-center relative top-96">
          <div>
            <label htmlFor="email" className="block">
              Email
            </label>
            <input type="text" className="block" name="username" />
            <label htmlFor="username" className="block">
              Username
            </label>
            <input type="password" className="block" name="username" />
            <label htmlFor="password" className="block">
              Password
            </label>
            <input type="password" className="block" name="username" />
            <button className="block mt-4 border-solid border-black border-2">
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
