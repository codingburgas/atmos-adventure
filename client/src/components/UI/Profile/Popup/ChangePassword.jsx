import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";
const ChangePassword = (props) => {
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  /*
   * Tries to change the password
   */
  const confirmHandler = () => {
    const oldPassword = oldPasswordRef.current.value;
    const newPassword = newPasswordRef.current.value;
    const PASSWORD_REGEX = new RegExp(/^(?=.*[a-z])(?=.{8,})/);

    const userData = {
      oldPassword,
      newPassword,
    };

    if (oldPassword.length > 0 && newPassword.length > 0) {
      if (!newPassword.match(PASSWORD_REGEX)) {
        enqueueSnackbar(
          "New password must be at least 8 characters long and contain at least one letter!",
          {
            variant: "error",
          }
        );
        sleep(5000).then(() => {
          closeSnackbar();
        });
      } else {
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
              enqueueSnackbar("Wrong password!", {
                variant: "error",
              });
              sleep(5000).then(() => {
                closeSnackbar();
              });
            }
          });
      }
    } else props.close(false);
  };

  return (
    <div
      className={
        props.isOpen
          ? "absolute h-screen w-screen flex flex-col items-center justify-center z-50"
          : "hidden"
      }
    >
      <div className="bg-[#1F1F1F] rounded-xl w-[60%] h-1/3 flex-col items-center justify-center extra:w-[46%] el:!w-[40%] z-50">
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
