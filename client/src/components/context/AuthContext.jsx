import { useState, createContext, useEffect } from "react";

export const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

const AuthContextProvider = (props) => {
  const [isAuth, setIsAuth] = useState(false);

  fetch("http://localhost:3001/api/isAuthenticated")
    .then((res) => res.json())
    .then((data) => {
      data.message === "User is authenticated"
        ? setIsAuth(true)
        : setIsAuth(false);
    });

  const setIsAuthenticated = (isAuthenticated) => {
    setIsAuth(isAuthenticated);
  };
  const context = {
    isAuthenticated: isAuth,
    setIsAuthenticated: setIsAuthenticated,
  };

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
