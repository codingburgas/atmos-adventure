import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const GridBoxes = () => {
  return (
    <div className="grid grid-cols-2 grid-rows-2 w-full h-full mt-5 gap-x-5 gap-y-5 px-5">
      <div className="col-span-1 row-span-1 bg-[#F3F9FF] text-center py-3 rounded-xl outline outline-2 outline-[#B9B9B9]">
        <h1 className="underline font-dreamScapeSans font-normal">Downloads</h1>
        <h1 className="font-dreamScapeSans font-normal text-3xl">
          420
          <MdOutlineKeyboardArrowUp className="inline text-[#009E06]" />
        </h1>
        <h1 className="font-serif text-xs">increase 10%</h1>
      </div>

      <div className="col-span-1 row-span-1 bg-[#F3F9FF] text-center py-3 rounded-xl outline outline-2 outline-[#B9B9B9]">
        <h1 className="underline font-dreamScapeSans font-normal">Views</h1>
        <h1 className="font-dreamScapeSans font-normal text-3xl">
          100
          <MdOutlineKeyboardArrowDown className="inline text-[#9E0000]" />
        </h1>
        <h1 className="font-serif text-xs">decrease 10%</h1>
      </div>

      <div className="col-span-1 row-span-1 bg-[#F3F9FF] text-center py-3 rounded-xl outline outline-2 outline-[#B9B9B9]">
        <h1 className="underline font-dreamScapeSans font-normal">Players</h1>
        <h1 className="font-dreamScapeSans font-normal text-3xl">
          1000
          <MdOutlineKeyboardArrowUp className="inline text-[#009E06]" />
        </h1>
        <h1 className="font-serif text-xs">increase 10%</h1>
      </div>

      <div className="col-span-1 row-span-1 bg-[#F3F9FF] text-center py-3 rounded-xl outline outline-2 outline-[#B9B9B9]">
        <h1 className="underline font-dreamScapeSans font-normal">
          Github stars
        </h1>
        <h1 className="font-dreamScapeSans font-normal text-3xl">
          420
          <MdOutlineKeyboardArrowUp className="inline text-[#009E06]" />
        </h1>
        <h1 className="font-serif text-xs">increase 10%</h1>
      </div>
    </div>
  );
};

export default GridBoxes;