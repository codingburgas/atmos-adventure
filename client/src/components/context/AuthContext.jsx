import { useState, createContext, useEffect } from "react";
import axios from "axios";
export const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

const AuthContextProvider = (props) => {
  const [isAuth, setIsAuth] = useState(false);

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
        }
      });
  };

  const context = {
    isAuthenticated: isAuth,
    setIsAuthenticated: setIsAuthenticatedHandler,
  };

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
