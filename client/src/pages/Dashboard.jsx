import React, { lazy, Suspense } from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner";
const WelcomeBanner = lazy(() => import("../components/UI/WelcomeBanner"));
const GridBoxes = lazy(() => import("../components/UI/GridBoxes"));
const MuiTable = lazy(() => import("../components/UI/MuiTable"));

const Dashboard = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div>
        <WelcomeBanner />
        <GridBoxes />
        <MuiTable />
      </div>
    </Suspense>
  );
};

export default Dashboard;
