import WelcomeBanner from "../components/UI/WelcomeBanner";
import GridBoxes from "../components/UI/GridBoxes";
import MuiTable from "../components/UI/MuiTable";
import { BsGlobe } from "react-icons/bs";

const Dashboard = () => {
  return (
    <div>
      {/* <div className="bg-[#F3F9FF] h-screen absolute w-2/12 z-50 flex flex-col">
        <div className="absolute w-full h-full flex flex-col items-center">
          <div className="bg-dust w-1/2 h-1/6 rounded-full text-center flex flex-row items-center justify-center mt-10">
            Prof pic
          </div>
          <div className="text-lg font-semibold font-serif">Username</div>
        </div>

        <div className="font-sans font-semibold text-5xl mt-64 flex flex-col items-center">
          LINKS:
        </div>

        <ul className="text-xl font-sans font-semibold mt-5">
          <li className="py-4 px-4">
            <BsGlobe className="inline" />
            Nuclea
          </li>
          <li className="py-4 px-4">
            <BsGlobe className="inline" />
            Dust-2
          </li>
          <li className="py-4 px-4">
            <BsGlobe className="inline" />
            Frostbite
          </li>
          <li className="py-4 px-4">
            <BsGlobe className="inline" />
            Boundary
          </li>
          <li className="py-4 px-4">
            <BsGlobe className="inline" />
            Profile
          </li>
          <li className="py-4 px-4">
            <BsGlobe className="inline" />
            Log in
          </li>
          <li className="py-4 px-4">
            <BsGlobe className="inline" />
            Log out
          </li>
        </ul>
      </div> */}
      <WelcomeBanner />
      <GridBoxes />
      <MuiTable />
    </div>
  );
};

export default Dashboard;
