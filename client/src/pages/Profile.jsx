import React, { Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState();
  const [role, setRole] = useState("user");
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/getUser", { withCredentials: true })
      .then((res) => {
        setUser(res.data.username);
        setRole(res.data.role);
      });
  }, []);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      {window.innerWidth > 820 ? navigate("*", { replace: true }) : null}
      <div>
        <div className="h-screen w-screen ">
          <div className="bg-profileBg h-[30%] w-full bg-no-repeat flex flex-row justify-start items-center">
            <div className="bg-white h-32 w-32 rounded-full mr-3 ml-10"></div>
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
              <h1 className="cursor-pointer">Change username</h1>
              <h1 className="cursor-pointer">Change profile picture</h1>
              <h1 className="cursor-pointer pb-2">Change profile banner</h1>
            </div>
            <hr />
          </div>
          <div className="space-x-3 space-y-3 font-raleway">
            <h1 className="text-[#6F65BF] font-bold text-3xl mt-3 pl-3">
              Credentials
            </h1>

            <div className="font-raleway font-light text-xl space-y-2 pb-3">
              <h1 className="cursor-pointer">Edit password</h1>
              <h1 className="cursor-pointer">Verify email</h1>
            </div>
            <hr />
          </div>
          <div className="flex flex-row justify-around relative bottom-0 font-raleway font-light text-xl mt-4 el:text-lg el:mt-0 xl:!text-xl xl:!mt-4">
            <h1 className="cursor-pointer">Sign out</h1>
            <h1 className="text-red cursor-pointer">Delete account</h1>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Profile;
