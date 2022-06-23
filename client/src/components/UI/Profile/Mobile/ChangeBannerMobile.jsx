import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const ChangeBannerMobile = (props) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("Attach a file (jpg, png)");
  const navigate = useNavigate();
  const confirmHandler = () => {
    props.close(false);
  };

  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const uploadImageHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);

    axios
      .post("http://localhost:3001/api/changeBanner", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        // console.log(res);
        if (res.data.message === "Image changed") {
          navigate(0);
        } else {
          console.error(res.data.message);
        }
      });
  };

  return (
    <div
      className={
        props.isOpen
          ? "absolute h-screen w-screen flex flex-col items-center justify-center z-50"
          : "hidden"
      }
    >
      <div className="bg-[#1F1F1F] w-[80%] h-1/2 flex-col items-center justify-center extra:w-[46%] el:!w-[40%]">
        <h1 className="text-white text-3xl font-josefin font-medium text-center pt-5 border-b-4 border-white">
          Change profile banner
        </h1>
        <div className="flex flex-row justify-center items-center text-white cursor-pointer"></div>
        <div className="w-full rounded-lg">
          <form onSubmit={uploadImageHandler}>
            <div className="m-4">
              <label className="inline-block mb-2 text-white">
                File Upload
              </label>
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
                    <p className="pt-1 text-sm tracking-wider text-white font-raleway pb-2 font-semibold xl:pb-2">
                      {fileName}
                    </p>
                  </div>
                  <input type="file" className="hidden" onChange={saveFile} />
                </label>
              </div>
            </div>
            <div className="flex flex-row justify-center items-start">
              <button
                className="text-white text-sm font-sans font-bold bg-[#12B46F] rounded-full px-12 py-2 xl:text-xl"
                onClick={confirmHandler}
              >
                Confirm
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangeBannerMobile;
