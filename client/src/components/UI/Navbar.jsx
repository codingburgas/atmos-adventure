const Navbar = () => {
  return (
    <div className="flex flex-row justify-between items-center pr-14 pt-4 text-purple-500 z-0 w-full absolute">
      <div className="ml-16 font-sans text-4xl mt-1.5 w-full h-1/3">ATMOS</div>

      <div>
        <ul className="flex space-x-10">
          <li className="inline-block space-x-10 font-sans mt-1.5">About</li>
          <li className="inline-block space-x-10 font-sans mt-1.5">Register</li>
          <button
            onSubmit={(e) => e.preventDefault}
            className="font-sans border-solid border-2 pt-1 pb-1 pl-2 pr-2 rounded-md"
          >
            Download
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
