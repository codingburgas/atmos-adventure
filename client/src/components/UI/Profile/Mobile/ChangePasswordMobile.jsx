import { useRef } from "react";
import axios from "axios";

const ChangePasswordMobile = (props) => {
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();

  /*
   * Handles the change password request
   */
  const confirmHandler = () => {
    const oldPassword = oldPasswordRef.current.value;
    const newPassword = newPasswordRef.current.value;

    const userData = {
      oldPassword,
      newPassword,
    };
    if (oldPassword.length > 0 && newPassword.length > 0) {
      axios
        .post("http://localhost:3001/api/changePassword", userData, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.message === "Password changed") {
            props.close(false);
          }
          if (res.data.message === "Wrong password") {
            oldPasswordRef.current.classList.add(
              "border-red border-2 border-solid"
            );
          }
        });
    } else props.close(false);
  };

  return (
    <div
      className={
        props.isOpen
          ? "absolute h-screen w-screen flex flex-col items-center justify-center"
          : "hidden"
      }
    >
      <div className="bg-[#1F1F1F] w-[80%] h-1/3 flex-col items-center justify-center extra:w-[46%] el:!w-[40%]">
        <h1 className="text-white text-2xl font-josefin font-medium text-center pt-5 border-b-4 border-white">
          Change passoword
        </h1>

        <div className="flex flex-col items-center justify-center mt-5">
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
            className="text-white text-xl font-sans font-bold bg-[#12B46F] rounded-full px-12 py-1 mt-3"
            onClick={confirmHandler}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordMobile;
