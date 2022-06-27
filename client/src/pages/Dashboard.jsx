import React, { lazy, Suspense, useEffect } from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner";
const WelcomeBanner = lazy(() =>
  import("../components/UI/Dashboard/WelcomeBanner")
);
const GridBoxes = lazy(() => import("../components/UI/Dashboard/GridBoxes"));
const MuiTable = lazy(() => import("../components/UI/Dashboard/MuiTable"));

const Dashboard = () => {
  useEffect(() => {
    document.title = "ATMOS | Dashboard";
  }, []);

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
