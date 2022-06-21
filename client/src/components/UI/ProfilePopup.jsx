import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import ChangeUsername from "./ChangeUsername";
import ChangeBanner from "./ChangeBanner";
import ChangeProfilePic from "./ChangeProfilePic";
import ChangePassword from "./ChangePassword";
const ProfilePopup = (props) => {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [openChangeUsername, setOpenChangeUsername] = useState(false);
  const [openChangePicture, setOpenChangePicture] = useState(false);
  const [openChangeBanner, setOpenChangeBanner] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/getUser", { withCredentials: true })
      .then((res) => {
        setUsername(res.data.username);
        setRole(res.data.role);
      });
  }, []);

  const changeUsernameHandler = (e) => {
    setOpenChangeUsername(true);
  };

  const changeBannerHandler = (e) => {
    setOpenChangeBanner(true);
  };

  const changeProfilePicHandler = (e) => {
    setOpenChangePicture(true);
  };

  const changePasswordHandler = (e) => {
    setOpenChangePassword(true);
  };

  const logOutHandler = () => {
    axios
      .get("http://localhost:3001/api/logout", { withCredentials: true })
      .then((res) => {
        if (res.data.message === "User logged out") {
          authContext.setIsAuthenticated(false);
        } else {
          console.log(res.data.message);
        }
      });
  };
  return (
    <div
      className={
        props.isOpen && props.isAuth
          ? "hidden tablet:flex tablet:flex-column tablet:justify-end tablet:rounded-xl"
          : "hidden"
      }
    >
      <div className="absolute bg-[#F1F1F1] h-1/2 w-1/2 mt-16 mr-3 rounded-xl extra:w-[30%] xl:!w-[20%]">
        <div className="bg-profileBg h-1/3 rounded-tl-xl rounded-tr-xl flex flex-row justify-start items-center bg-no-repeat">
          {/* <div className="bg-white h-24 w-24 rounded-full"></div> */}
          <div className=" bg-white h-24 w-24 rounded-full mr-3 ml-10"></div>
          <div className="text-white">
            <h1 className="font-raleway font-semibold text-3xl el:text-2xl xl:!text-3xl">
              {username}
            </h1>
            <h1 className="font-raleway font-normal text-xl">{role}</h1>
          </div>
        </div>
        <div className="space-y-2 space-x-3">
          <h1 className="pl-3 text-[#6F65BF] font-raleway font-bold text-3xl mt-3 el:text-2xl xl-!text-3xl">
            Account
          </h1>
          <div className="font-raleway font-light text-xl el:text-sm xl:!text-xl">
            <h1 className="cursor-pointer" onClick={changeUsernameHandler}>
              Change username
            </h1>
            <h1 className="cursor-pointer" onClick={changeProfilePicHandler}>
              Change profile picture
            </h1>
            <h1 className="cursor-pointer" onClick={changeBannerHandler}>
              Change profile banner
            </h1>
          </div>
          <hr className="h-1" />
          <h1 className="text-[#6F65BF] font-raleway font-bold text-3xl cursor-pointer el:text-2xl xl-!text-3xl">
            Credentials
          </h1>
          <div className="font-raleway font-light text-xl el:text-sm xl:!text-xl">
            <h1 className="cursor-pointer" onClick={changePasswordHandler}>
              Edit password
            </h1>
            <h1 className="cursor-pointer">Verify email</h1>
          </div>
          <hr />
        </div>
        <div className="flex flex-row justify-around relative bottom-0 font-raleway font-light text-xl mt-4 el:text-lg el:mt-0 xl:!text-xl xl:!mt-4">
          <h1 className="cursor-pointer" onClick={logOutHandler}>
            Sign out
          </h1>
          <h1 className="text-red cursor-pointer">Delete account</h1>
        </div>
      </div>
      <ChangeUsername
        isOpen={openChangeUsername}
        close={setOpenChangeUsername}
      />
      <ChangeBanner isOpen={openChangeBanner} close={setOpenChangeBanner} />
      <ChangeProfilePic
        isOpen={openChangePicture}
        close={setOpenChangePicture}
      />
      <ChangePassword
        isOpen={openChangePassword}
        close={setOpenChangePassword}
      />
    </div>
  );
};

export default ProfilePopup;
