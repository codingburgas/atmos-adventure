import { useState, createContext, useMemo } from "react";
import React from "react";
export const ThemeContext = createContext({
  theme: "",
});

const ThemeContextProvider = (props) => {
  const [userTheme, setUserTheme] = useState("");

  const random = Math.floor(Math.random() * 2);

  /*
   *Chooses a random theme for the user
   *and sets it to the state
   */
  useMemo(() => {
    random === 0 ? setUserTheme("theme-dust") : setUserTheme("theme-nuclea");
  }, []);

  const context = {
    theme: userTheme,
  };

  return (
    <ThemeContext.Provider value={context}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
