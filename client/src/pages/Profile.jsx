import React, { Suspense, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/context/AuthContext";
import { useSnackbar } from "notistack";
import ChangeUsernameMobile from "../components/UI/Profile/Mobile/ChangeUsernameMobile";
import ChangePasswordMobile from "../components/UI/Profile/Mobile/ChangePasswordMobile";
import ChangeBannerMobile from "../components/UI/Profile/Mobile/ChangeBannerMobile";
import ChangeProfilePicMobile from "../components/UI/Profile/Mobile/ChangeProfilePicMobile";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import axios from "axios";

const Profile = () => {
  const [openChangeUsername, setOpenChangeUsername] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [openChangeBanner, setOpenChangeBanner] = useState(false);
  const [openChangePicture, setOpenChangePicture] = useState(false);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  /*
    Tries to logout the user
  */
  const logOutHandler = () => {
    axios
      .get("http://localhost:3001/api/logout", { withCredentials: true })
      .then((res) => {
        if (res.data.message === "User logged out") {
          navigate("/", { replace: true });
          window.location.reload();
        } else {
          enqueueSnackbar("User not authenticated", {
            variant: "error",
          });
          sleep(5000).then(() => {
            closeSnackbar();
          });
        }
      });
  };

  /*
    Tries to delete the user's account
  */
  const deleteAccountHandler = () => {
    axios
      .delete("http://localhost:3001/api/deleteUser", { withCredentials: true })
      .then((res) => {
        if (res.data.message === "User deleted") {
          navigate("/", { replace: true });
        }
      });
  };

  /*
    Sends a comfirmation email to the user
  */
  const verifyEmailHandler = () => {
    if (!authContext.verified) {
      axios
        .get("http://localhost:3001/api/sendConfirmationEmail", {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.message === "Created temporary verification token") {
            enqueueSnackbar("Verification email sent", {
              variant: "success",
            });
            sleep(5000).then(() => {
              closeSnackbar();
            });
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
            <div className="bg-[url('http://localhost:3001/api/getImage')] h-32 w-32 rounded-full bg-cover bg-center mr-3 ml-10 bg-no-repeat"></div>
            <div className="text-white font-raleway">
              <h1 className="font-semibold text-3xl">{authContext.username}</h1>
              <h1 className="font-normal text-xl">{authContext.role}</h1>
            </div>
          </div>
          <div className="space-x-3 space-y-3 font-raleway">
            <h1 className="text-[#6F65BF] font-bold text-3xl mt-3 pl-3">
              Account
            </h1>

            <div className="font-raleway font-light text-xl space-y-2">
              <h1
                className="cursor-pointer"
                onClick={() => setOpenChangeUsername(true)}
              >
                Change username
              </h1>
              <h1
                className="cursor-pointer"
                onClick={() => setOpenChangePicture(true)}
              >
                Change profile picture
              </h1>
              <h1
                className="cursor-pointer pb-2"
                onClick={() => setOpenChangeBanner(true)}
              >
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
              <h1
                className="cursor-pointer"
                onClick={() => setOpenChangePassword(true)}
              >
                Edit password
              </h1>
              <h1 className="cursor-pointer" onClick={verifyEmailHandler}>
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
      </div>
    </Suspense>
  );
};

export default Profile;
