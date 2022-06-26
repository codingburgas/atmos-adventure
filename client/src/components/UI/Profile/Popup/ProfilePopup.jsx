import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import ChangeUsername from "./ChangeUsername";
import ChangeBanner from "./ChangeBanner";
import ChangeProfilePic from "./ChangeProfilePic";
import ChangePassword from "./ChangePassword";
const ProfilePopup = (props) => {
  const [openChangeUsername, setOpenChangeUsername] = useState(false);
  const [openChangePicture, setOpenChangePicture] = useState(false);
  const [openChangeBanner, setOpenChangeBanner] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  /*
    Tries to logout the user
  */
  const logOutHandler = () => {
    axios
      .get("http://localhost:3001/api/logout", { withCredentials: true })
      .then((res) => {
        if (res.data.message === "User logged out") {
          navigate(0);
        } else {
          console.log(res.data.message);
        }
      });
  };

  /*
    Tries to delete the user's account
  */
  const deleteAccountHandler = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      axios
        .delete("http://localhost:3001/api/deleteUser", {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.message === "User deleted") {
            navigate(0);
          }
        });
    }
  };

  /*
    Sends a confirmation email to the user
  */
  const verifyEmailHandler = () => {
    if (!verified) {
      axios
        .get("http://localhost:3001/api/sendConfirmationEmail", {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.message === "Created temporary verification token") {
            alert("Verification email sent");
          }
        });
    }
  };

  return (
    <div
      className={
        props.isOpen && props.isAuth
          ? "hidden tablet:flex tablet:flex-column tablet:justify-end tablet:rounded-xl z-50"
          : "hidden"
      }
    >
      <div className="absolute bg-[#F1F1F1] h-1/2 w-1/2 mt-16 mr-3 rounded-xl extra:w-[30%] desktop:h-[80%] extra:!h-1/2 xl:!w-[20%] z-50">
        <div className="bg-[url('http://localhost:3001/api/getBanner')] h-1/3 bg-cover rounded-tl-xl rounded-tr-xl flex flex-row justify-start items-center bg-no-repeat z-50">
          {/* <div className="bg-white h-24 w-24 rounded-full"></div> */}
          <div
            className={
              `bg-[url('http://localhost:3001/api/getImage')]` +
              " h-24 w-24 rounded-full mr-3 ml-10 bg-center bg-cover"
            }
          ></div>
          <div className="text-white">
            <h1 className="font-raleway font-semibold text-3xl el:text-2xl xl:!text-3xl">
              {authContext.username}
            </h1>
            <h1 className="font-raleway font-normal text-xl">
              {authContext.role}
            </h1>
          </div>
        </div>
        <div className="space-y-2 space-x-3">
          <h1 className="pl-3 text-[#6F65BF] font-raleway font-bold text-3xl mt-3 el:text-2xl xl-!text-3xl">
            Account
          </h1>
          <div className="font-raleway font-light text-xl el:text-sm xl:!text-xl">
            <h1
              className="cursor-pointer"
              onClick={() => setOpenChangeUsername}
            >
              Change username
            </h1>
            <h1 className="cursor-pointer" onClick={() => setOpenChangePicture}>
              Change profile picture
            </h1>
            <h1 className="cursor-pointer" onClick={() => setOpenChangeBanner}>
              Change profile banner
            </h1>
          </div>
          <hr className="h-1" />
          <h1 className="text-[#6F65BF] font-raleway font-bold text-3xl cursor-pointer el:text-2xl xl-!text-3xl">
            Credentials
          </h1>
          <div className="font-raleway font-light text-xl el:text-sm xl:!text-xl">
            <h1
              className="cursor-pointer"
              onClick={() => setOpenChangePassword}
            >
              Edit password
            </h1>
            <h1
              className={authContext.verified ? "" : "cursor-pointer"}
              onClick={verifyEmailHandler}
            >
              {authContext.verified === 0 ? "Verify email" : "Verified"}
            </h1>
          </div>
          <hr />
        </div>
        <div className="flex flex-row justify-around relative bottom-0 font-raleway font-light text-xl mt-4 el:text-lg el:mt-0 xl:!text-xl xl:!mt-4">
          <h1 className="cursor-pointer" onClick={logOutHandler}>
            Sign out
          </h1>
          <h1
            className="text-red cursor-pointer"
            onClick={deleteAccountHandler}
          >
            Delete account
          </h1>
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
