const LoadingSpinner = () => {
  return (
    <div className="flex flex-row items-center justify-center h-screen">
      <div className="animate-spin border-solid border-[16px] rounded-full border-[#f3f3f3] border-t-[#3498db] w-[120px] h-[120px]"></div>
    </div>
  );
};

export default LoadingSpinner;
