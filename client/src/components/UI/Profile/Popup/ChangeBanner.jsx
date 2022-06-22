const ChangeBanner = (props) => {
  const confirmHandler = () => {
    props.close(false);
  };

  return (
    <div
      className={
        props.isOpen
          ? "absolute h-screen w-screen flex flex-col items-center justify-center"
          : "hidden"
      }
    >
      <div className="bg-[#1F1F1F] w-[60%] h-1/3 flex-col items-center justify-center extra:w-[46%] el:!w-[40%]">
        <h1 className="text-white text-5xl font-josefin font-medium text-center pt-5 border-b-4 border-white">
          Change profile banner
        </h1>
        <div className="flex flex-row justify-center items-center text-white cursor-pointer"></div>
        <div className="w-full rounded-lg">
          <div className="m-4">
            <label className="inline-block mb-2 text-white">File Upload</label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col w-full border-4 border-white border-dashed cursor-pointer">
                <div className="flex flex-col items-center justify-center pt-7">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="pt-1 text-sm tracking-wider text-white font-raleway font-semibold xl:pb-2">
                    Attach a file (jpg, png)
                  </p>
                </div>
                <input type="file" className="hidden" />
              </label>
            </div>
          </div>
          <div className="flex flex-row justify-center items-start">
            <button
              className="text-white text-sm font-sans font-bold bg-[#12B46F] rounded-full px-12 py-1 xl:text-xl"
              onClick={confirmHandler}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeBanner;
