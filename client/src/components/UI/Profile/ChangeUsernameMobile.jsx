import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ChangeUsernameMobile = (props) => {
  const [username, setUsername] = useState("");
  const usernameRef = useRef();
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/getUser", { withCredentials: true })
      .then((res) => {
        setUsername(res.data.username);
      });
  }, []);

  const confirmHandler = () => {
    const username = {
      newUsername: usernameRef.current.value,
    };
    axios
      .post("http://localhost:3001/api/changeUsername", username, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.message === "Username changed") {
          props.close(false);
        } else if (res.data.message === "Username already exists") {
          alert("Username already exists");
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
      <div className="bg-[#1F1F1F] w-[70%] h-[40%] flex-col items-center justify-center extra:w-[46%] el:!w-[40%]">
        <h1 className="text-white text-3xl font-josefin font-medium text-center pt-5 border-b-4 border-white">
          Change username
        </h1>

        <div className="flex flex-col items-center justify-center mt-5">
          <label htmlFor="" className="text-white text-2xl text-left">
            New username:
          </label>
          <input
            type="text"
            className="w-9/12 px-4 py-3 rounded-md bg-[#383838] text-white font-sans text-xl mt-1"
            placeholder={username}
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

export default ChangeUsernameMobile;
