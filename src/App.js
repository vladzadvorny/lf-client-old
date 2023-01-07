import react from "react";
import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.scss";
import Main from "./pages/Main";
import Index from "./pages/Index";
import Category, { loader as categoryLoader } from "./pages/Category";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { index: true, element: <Index /> },
      {
        path: "category",
        element: <Category />,
        loader: categoryLoader,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
