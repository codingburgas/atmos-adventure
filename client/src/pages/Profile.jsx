import React, { Suspense, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/context/AuthContext";
import ChangeUsernameMobile from "../components/UI/Profile/Mobile/ChangeUsernameMobile";
import ChangePasswordMobile from "../components/UI/Profile/Mobile/ChangePasswordMobile";
import ChangeBannerMobile from "../components/UI/Profile/Mobile/ChangeBannerMobile";
import ChangeProfilePicMobile from "../components/UI/Profile/Mobile/ChangeProfilePicMobile";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState();
  const [role, setRole] = useState("user");
  const [openChangeUsername, setOpenChangeUsername] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [openChangeBanner, setOpenChangeBanner] = useState(false);
  const [openChangePicture, setOpenChangePicture] = useState(false);
  const [verified, setVerified] = useState(0);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/getUser", { withCredentials: true })
      .then((res) => {
        setUser(res.data.username);
        setRole(res.data.role);
        setVerified(res.data.verified);
      });
  }, []);

  const usernameChangeHandler = (e) => {
    setOpenChangeUsername(true);
  };

  const changePasswordHandler = (e) => {
    setOpenChangePassword(true);
  };

  const changeBannerHandler = (e) => {
    setOpenChangeBanner(true);
  };

  const changePictureHandler = (e) => {
    setOpenChangePicture(true);
  };
  const logOutHandler = () => {
    axios
      .get("http://localhost:3001/api/logout", { withCredentials: true })
      .then((res) => {
        if (res.data.message === "User logged out") {
          navigate("/", { replace: true });
          authContext.setIsAuthenticated(false);
        } else {
          console.log(res.data.message);
        }
      });
  };

  const deleteAccountHandler = () => {
    axios
      .delete("http://localhost:3001/api/deleteUser", { withCredentials: true })
      .then((res) => {
        if (res.data.message === "User deleted") {
          navigate("/", { replace: true });
          authContext.setIsAuthenticated(false);
        }
      });
  };

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
    <Suspense fallback={<LoadingSpinner />}>
      {window.innerWidth > 820 ? navigate("*", { replace: true }) : null}
      <div>
        <ChangeUsernameMobile
          isOpen={openChangeUsername}
          close={setOpenChangeUsername}
        />
        <ChangePasswordMobile
          isOpen={openChangePassword}
          close={setOpenChangePassword}
        />
        <ChangeBannerMobile
          isOpen={openChangeBanner}
          close={setOpenChangeBanner}
        />
        <ChangeProfilePicMobile
          isOpen={openChangePicture}
          close={setOpenChangePicture}
        />
        <div className="h-screen w-screen ">
          <div className="bg-[url('http://localhost:3001/api/getBanner')] h-[30%] w-full bg-cover bg-no-repeat flex flex-row justify-start items-center">
            <div className="bg-[url('http://localhost:3001/api/getImage')] h-32 w-32 rounded-full bg-cover bg-center mr-3 ml-10"></div>
            <div className="text-white font-raleway">
              <h1 className="font-semibold text-3xl">{user}</h1>
              <h1 className="font-normal text-xl">{role}</h1>
            </div>
          </div>
          <div className="space-x-3 space-y-3 font-raleway">
            <h1 className="text-[#6F65BF] font-bold text-3xl mt-3 pl-3">
              Account
            </h1>

            <div className="font-raleway font-light text-xl space-y-2">
              <h1 className="cursor-pointer" onClick={usernameChangeHandler}>
                Change username
              </h1>
              <h1 className="cursor-pointer" onClick={changePictureHandler}>
                Change profile picture
              </h1>
              <h1 className="cursor-pointer pb-2" onClick={changeBannerHandler}>
                Change profile banner
              </h1>
            </div>
            <hr />
          </div>
          <div className="space-x-3 space-y-3 font-raleway">
            <h1 className="text-[#6F65BF] font-bold text-3xl mt-3 pl-3">
              Credentials
            </h1>

            <div className="font-raleway font-light text-xl space-y-2 pb-3">
              <h1 className="cursor-pointer" onClick={changePasswordHandler}>
                Edit password
              </h1>
              <h1 className="cursor-pointer" onClick={verifyEmailHandler}>
                {verified === 0 ? "Verify email" : "Verified"}
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
      </div>
    </Suspense>
  );
};

export default Profile;
