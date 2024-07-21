// index.jsx (or main entry point file)

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import SignUpPage from "./components/SignUpPage.jsx";
import SignInPage from "./components/SignInPage.jsx";
import HomePage from "./pages/HomePage.jsx"; 
import Dashboard from "./components/Dashboard.jsx";
import ErrorPage from "./pages/Page404.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const isAuthenticated = () => {
  return !!localStorage.getItem("accessToken");
};

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> }, 
      { path: "signup", element: <SignUpPage /> },
      { path: "signin", element: <SignInPage /> },
      {
        path: "dashboard", // Updated to /dashboard
        element: (
          <ProtectedRoute
            element={<Dashboard />}
            isAuthenticated={isAuthenticated()}
          />
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
);
