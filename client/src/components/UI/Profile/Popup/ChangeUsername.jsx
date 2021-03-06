import { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { useSnackbar } from "notistack";
import axios from "axios";

const ChangeUsername = (props) => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const usernameRef = useRef();

  /*
   * Tries to change the username
   */
  const confirmHandler = () => {
    const USERNAME_REGEX = new RegExp(/^[a-zA-Z0-9.-_$@*!]{4,16}$/);
    const username = usernameRef.current.value;
    const userData = {
      newUsername: username,
    };
    if (username.length > 0) {
      if (username.match(USERNAME_REGEX)) {
        axios
          .post("http://localhost:3001/api/changeUsername", userData, {
            withCredentials: true,
          })
          .then((res) => {
            if (res.data.message === "Username changed") {
              props.close(false);
              navigate(0, { replace: true });
            } else if (res.data.message === "Username already exists") {
              enqueueSnackbar("Username already exists", {
                variant: "error",
              });
              sleep(5000).then(() => {
                closeSnackbar();
              });
            }
          });
      } else {
        enqueueSnackbar("Username must be 4-16 characters long!", {
          variant: "error",
        });
        sleep(5000).then(() => {
          closeSnackbar();
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
            New username:
          </label>
          <input
            type="text"
            className="w-9/12 px-4 py-3 rounded-md bg-[#383838] text-white font-sans text-xl mt-1"
            placeholder={authContext.username}
            ref={usernameRef}
          />
        </div>
        <div className="flex flex-col items-center justify-center mt-8">
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

export default ChangeUsername;
