import { Routes, Route } from "react-router-dom";
import { AuthContext } from "./components/context/AuthContext";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { useContext } from "react";
import "./index.css";

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="z-10">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        {isAuthenticated ? null : (
          <Route path="Login" element={<Login />}></Route>
        )}
        {isAuthenticated ? null : (
          <Route path="Register" element={<Register />}></Route>
        )}
        <Route path="Dashboard" element={<Dashboard />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
