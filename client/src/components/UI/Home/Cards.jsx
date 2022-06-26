import { useState, useEffect } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

const Cards = () => {
  const [downloads, setDownloads] = useState();
  const [visitors, setVisitors] = useState();
  const [users, setUsers] = useState();

  /*
   * Initializes the AOS library
   */

  useEffect(() => {
    AOS.init();
    AOS.refresh();

    axios
      .get("http://localhost:3001/api/getStats", { withCredentials: true })
      .then((res) => {
        setDownloads(res.data.downloads);
        setVisitors(res.data.visitors);
        setUsers(res.data.users);
      });
  }, []);

  return (
    <div className="bg-[url('https://i.imgur.com/j4BLlbk.png')] h-[250vh] bg-no-repeat bg-cover z-50 w-screen mt-16 el:h-[170vh] el:mt-36 xl:!mt-0">
      <div
        className="flex flex-row justify-center text-white text-4xl pt-[100%] font-sans font-semibold desktop:pt-[40%] el:!pt-[20%] el:text-8xl"
        data-aos="fade-down"
        data-aos-duration="1500"
      >
        We got the stats.
      </div>

      <div className="flex flex-col justify-between items-center mt-10 el:flex-row el:justify-around el:mt-24">
        <div
          className="h-[40vh] w-[30vh] rounded-lg bg-cards backdrop-blur-xl mb-20 z-0 flex flex-col justify-evenly items-center text-white el:mb-0"
          data-aos="fade-down"
          data-aos-duration="1500"
        >
          <h1 className="font-raleway font-medium text-4xl">Downloads</h1>
          <h1 className="font-sans font-extrabold text-8xl">{downloads}</h1>
          <h1 className="font-sans font-light text-3xl">and counting...</h1>
        </div>
        <div
          className="h-[40vh] w-[30vh] rounded-lg bg-cards backdrop-blur-xl mb-20 z-0 flex flex-col justify-evenly items-center text-white el:mb-0"
          data-aos="fade-up"
          data-aos-duration="1500"
        >
          <h1 className="font-raleway font-medium text-4xl">Visitors</h1>
          <h1 className="font-sans font-extrabold text-8xl">{visitors}</h1>
          <h1 className="font-sans font-light text-3xl">and counting...</h1>
        </div>
        <div
          className="h-[40vh] w-[30vh] rounded-lg bg-cards backdrop-blur-xl z-0 flex flex-col justify-evenly items-center text-white el:mb-0"
          data-aos="fade-down"
          data-aos-duration="1500"
        >
          <h1 className="font-raleway font-medium text-4xl">Players</h1>
          <h1 className="font-sans font-extrabold text-8xl">{users}</h1>
          <h1 className="font-sans font-light text-3xl">and counting...</h1>
        </div>
      </div>
    </div>
  );
};

export default Cards;
