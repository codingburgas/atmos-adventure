import { React, useContext, useEffect, useState, Suspense, lazy } from "react";
import { Routes, Route, Router } from "react-router-dom";
import { AuthContext } from "./components/context/AuthContext";
const Home = lazy(() => import("./pages/Home"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Profile = lazy(() => import("./pages/Profile"));
import LoadingSpinner from "./components/UI/LoadingSpinner";
import "./index.css";
import axios from "axios";
function App() {
  const authContext = useContext(AuthContext);
  const [role, setRole] = useState("user");

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/getUser", { withCredentials: true })
      .then((res) => {
        setRole(res.data.role);
      });
  }, []);
  useEffect(() => {
    authContext.setIsAuthenticated();
  }, []);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="z-10">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          {authContext.isAuthenticated ? null : (
            <Route path="Login" element={<Login />}></Route>
          )}
          {authContext.isAuthenticated ? null : (
            <Route path="Register" element={<Register />}></Route>
          )}
          {authContext.isAuthenticated ? (
            <Route path="Profile" element={<Profile />}></Route>
          ) : null}
          {role === "admin" ? (
            <Route path="Dashboard" element={<Dashboard />}></Route>
          ) : null}
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
