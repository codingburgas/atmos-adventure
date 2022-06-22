import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChangeUsername = (props) => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/getUser", { withCredentials: true })
      .then((res) => {
        setUsername(res.data.username);
      });
  }, []);

  const usernameRef = useRef();
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
          navigate("/", { replace: true });
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
      <div className="bg-[#1F1F1F] w-[60%] h-1/3 flex-col items-center justify-center extra:w-[46%] el:!w-[40%] z-50">
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

export default ChangeUsername;
