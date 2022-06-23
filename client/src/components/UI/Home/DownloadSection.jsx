const DownloadSection = () => {
  return (
    <div className="h-screen bg-[url('https://i.imgur.com/if55Cdl.png')] bg-cover mt-20">
      <div className="flex flex-row justify-center items-center pt-20 text-white font-sans font-semibold text-4xl">
        You on board?
      </div>
      <div className="flex flex-col justify-center items-center h-[80vh]">
        <button className="bg-button outline outline-[.0001px] text-white outline-white px-10 py-4 rounded-full font-sans font-bold text-2xl">
          DOWNLOAD
        </button>
      </div>
    </div>
  );
};

export default DownloadSection;
