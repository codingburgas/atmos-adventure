const ChangePassword = (props) => {
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
          Change username
        </h1>

        <div className="flex flex-col items-center justify-center mt-5">
          <label htmlFor="" className="text-white text-3xl text-left">
            Change password:
          </label>
          <input
            type="text"
            className="w-9/12 px-4 py-1 rounded-md bg-[#383838] text-white font-sans text-xl mt-1"
            placeholder="Old password"
          />
          <input
            type="text"
            className="w-9/12 px-4 py-1 rounded-md bg-[#383838] text-white font-sans text-xl mt-1"
            placeholder="New password"
          />
        </div>
        <div className="flex flex-col items-center justify-center mt-1 xl:mt-8">
          <button
            className="text-white text-2xl font-sans font-bold bg-[#12B46F] rounded-full px-12 py-1"
            onClick={confirmHandler}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
