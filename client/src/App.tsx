import React from "react";
import { useRoutes } from "react-router-dom";
function App() {
  let routes = useRoutes([
    { path: "/", element: <h1>Home</h1> },
    { path: "*", element: <h1>404 page</h1> },
  ]);
  return routes;
}

export default App;
