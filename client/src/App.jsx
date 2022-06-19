import { Routes, Route } from "react-router-dom";
import { AuthContext } from "./components/context/AuthContext";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { useContext, useEffect, useCallback } from "react";
import "./index.css";

function App() {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.setIsAuthenticated();
  }, []);

  return (
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
  );
}

export default App;
