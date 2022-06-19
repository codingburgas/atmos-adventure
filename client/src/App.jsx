import {
  React,
  useContext,
  useEffect,
  useCallback,
  Suspense,
  lazy,
} from "react";
import { Routes, Route, Router } from "react-router-dom";
import { AuthContext } from "./components/context/AuthContext";
// import Home from "./pages/Home";
// import NotFound from "./pages/NotFound";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
const Home = lazy(() => import("./pages/Home"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
import LoadingSpinner from "./components/UI/LoadingSpinner";
import "./index.css";

function App() {
  const authContext = useContext(AuthContext);

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
          <Route path="Dashboard" element={<Dashboard />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
