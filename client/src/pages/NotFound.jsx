import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
const NotFound = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <h1 className="text-3xl">Error 404</h1>
      <br />
      <h1 className="text-xl">
        Oops you entered the wrong ATMOS page! Please go to ...
      </h1>
      <br />
      <h1>Page not found</h1>
    </div>
  );
};
export default NotFound;
