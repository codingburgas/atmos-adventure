import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";

const GridBoxes = () => {
  const [downloads, setDownloads] = useState();
  const [visitors, setVisitors] = useState();
  const [users, setUsers] = useState();
  const [stars, setStars] = useState("0");

  /*
   * Tries to get the number of stars
   * from the Github API and sets it to the state
   */

  useEffect(() => {
    fetch(
      "https://api.github.com/repos/codingburgas/2122-the-games--adventures-atmos-final-project-2022"
    )
      .then((res) => res.json())
      .then((data) => setStars(data.stargazers_count));

    axios
      .get("http://localhost:3001/api/getStats", { withCredentials: true })
      .then((res) => {
        setDownloads(res.data.downloads);
        setVisitors(res.data.visitors);
        setUsers(res.data.users);
      });
  }, []);

  return (
    <div className="z-0 grid grid-cols-2 grid-rows-2 w-full h-full mt-5 gap-x-5 gap-y-5 px-5 mb-10 desktop:mb-5 desktop:grid-cols-4 desktop:grid-rows-1">
      <div className="col-span-1 row-span-1 bg-[#F3F9FF] text-center py-3 rounded-xl outline outline-2 outline-[#B9B9B9]">
        <h1 className="underline font-dreamScapeSans font-normal">Downloads</h1>
        <h1 className="font-dreamScapeSans font-normal text-3xl">
          {downloads}
          <MdOutlineKeyboardArrowUp className="inline text-[#009E06]" />
        </h1>
        <h1 className="font-serif text-xs">increase 10%</h1>
      </div>

      <div className="col-span-1 row-span-1 bg-[#F3F9FF] text-center py-3 rounded-xl outline outline-2 outline-[#B9B9B9]">
        <h1 className="underline font-dreamScapeSans font-normal">Visitors</h1>
        <h1 className="font-dreamScapeSans font-normal text-3xl">
          {visitors}
          <MdOutlineKeyboardArrowUp className="inline text-[#009E06]" />
        </h1>
        <h1 className="font-serif text-xs">decrease 10%</h1>
      </div>

      <div className="col-span-1 row-span-1 bg-[#F3F9FF] text-center py-3 rounded-xl outline outline-2 outline-[#B9B9B9]">
        <h1 className="underline font-dreamScapeSans font-normal">Users</h1>
        <h1 className="font-dreamScapeSans font-normal text-3xl">
          {users}
          <MdOutlineKeyboardArrowUp className="inline text-[#009E06]" />
        </h1>
        <h1 className="font-serif text-xs">increase 10%</h1>
      </div>

      <div className="col-span-1 row-span-1 bg-[#F3F9FF] text-center py-3 rounded-xl outline outline-2 outline-[#B9B9B9]">
        <h1 className="underline font-dreamScapeSans font-normal">
          Github stars
        </h1>
        <h1 className="font-dreamScapeSans font-normal text-3xl">
          {stars}
          <MdOutlineKeyboardArrowUp className="inline text-[#009E06]" />
        </h1>
        <h1 className="font-serif text-xs">increase 10%</h1>
      </div>
    </div>
  );
};

export default GridBoxes;
