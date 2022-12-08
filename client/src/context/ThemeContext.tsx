import React, { useEffect, useMemo, useState } from "react";
import { Theme } from "./../../consts";

export const ThemeContext = React.createContext<Theme>({
  theme: "",
});

const ThemeContextProvider = (props: any) => {
  const [theme, setTheme] = useState<string>("");
  const randomTheme = Math.floor(Math.random() * 2);

  useMemo(() => {
    randomTheme === 0 ? setTheme("nuclea") : setTheme("dust");
  }, []);
  useEffect(() => {
    const root = document.querySelector<HTMLDivElement>("#root");
    root?.classList.add(theme);
    theme === "nuclea"
      ? (document.title = "Nuclea")
      : (document.title = "Dust");
  }, [theme]);

  const context = {
    theme: theme,
  };

  return (
    <ThemeContext.Provider value={context}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
