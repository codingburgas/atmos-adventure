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
      .get("http://localhost:3001/api/isAuthenticated", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.message === "User is authenticated") {
          setIsAuth(true);
        } else {
          setIsAuth(false);
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
