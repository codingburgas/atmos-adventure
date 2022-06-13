import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./index.css";

function App() {
  return (
    <div className="z-10">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="Login" element={<Login />}></Route>
        <Route path="Register" element={<Register />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
