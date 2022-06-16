import { useState, createContext, useMemo } from "react";

export const AuthContext = createContext({
  isAuthenticated: false,
});

const AuthContextProvider = (props) => {
  const [isAuth, setIsAuth] = useState(false);

  const context = {
    isAuthenticated: isAuth,
  };

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
