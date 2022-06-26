import { useState, createContext, useEffect } from "react";
import axios from "axios";
export const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  username: "",
  role: "",
  email: "",
  id: "",
  verified: 0,
});

const AuthContextProvider = (props) => {
  const [isAuth, setIsAuth] = useState(false);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("user");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [verified, setVerified] = useState(0);

  /*
   * Tries to check if
   * the user is authenticated
   * and if so, sets the state
   * to true
   */

  const setIsAuthenticatedHandler = () => {
    axios
      .get("http://localhost:3001/api/getUser", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.message === "User not authenticated") {
          setIsAuth(false);
        } else {
          setIsAuth(true);
          setUsername(res.data.username);
          setRole(res.data.role);
          setEmail(res.data.email);
          setId(res.data.id);
          setVerified(res.data.verified);
        }
      });
  };

  const context = {
    isAuthenticated: isAuth,
    setIsAuthenticated: setIsAuthenticatedHandler,
    username: username,
    role: role,
    email: email,
    id: id,
    verified: verified,
  };

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
