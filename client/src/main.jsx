import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import SignUpPage from "./components/SignUpPage.jsx";
import SignInPage from "./components/SignInPage.jsx";
import Hero from "./pages/Hero.jsx";
import ErrorPage from "./pages/Page404.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Hero /> },
      { path: "signup", element: <SignUpPage /> },
      { path: "signin", element: <SignInPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
);
