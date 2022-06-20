import React, { Suspense } from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const Profile = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div>
        <h1>Profile</h1>
      </div>
    </Suspense>
  );
};

export default Profile;
