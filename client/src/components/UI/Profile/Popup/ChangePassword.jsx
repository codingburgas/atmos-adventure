import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const ChangePassword = (props) => {
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();
  const navigate = useNavigate();
  const confirmHandler = () => {
    const oldPassword = oldPasswordRef.current.value;
    const newPassword = newPasswordRef.current.value;

    const userData = {
      oldPassword,
      newPassword,
    };
    axios
      .post("http://localhost:3001/api/changePassword", userData, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.message === "Password changed") {
          navigate(0);
          props.close(false);
        }
        if (res.data.message === "Wrong password") {
          oldPasswordRef.current.classList.add(
            "border-red border-2 border-solid"
          );
        }
      });
  };

  return (
    <div
      className={
        props.isOpen
          ? "absolute h-screen w-screen flex flex-col items-center justify-center z-50"
          : "hidden"
      }
    >
      <div className="bg-[#1F1F1F] w-[60%] h-1/3 flex-col items-center justify-center extra:w-[46%] el:!w-[40%] z-50">
        <h1 className="text-white text-5xl font-josefin font-medium text-center pt-5 border-b-4 border-white z-50">
          Change username
        </h1>

        <div className="flex flex-col items-center justify-center mt-5">
          <label htmlFor="" className="text-white text-3xl text-left">
            Change password:
          </label>
          <input
            type="password"
            className="w-9/12 px-4 py-1 rounded-md bg-[#383838] text-white font-sans text-xl mt-1"
            placeholder="Old password"
            ref={oldPasswordRef}
          />
          <input
            type="password"
            className="w-9/12 px-4 py-1 rounded-md bg-[#383838] text-white font-sans text-xl mt-1"
            placeholder="New password"
            ref={newPasswordRef}
          />
        </div>
        <div className="flex flex-col items-center justify-center mt-1 xl:mt-8">
          <button
            className="text-white text-2xl font-sans font-bold bg-[#12B46F] rounded-full px-12 py-1"
            onClick={confirmHandler}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
