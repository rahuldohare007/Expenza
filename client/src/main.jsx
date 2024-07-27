// import React from "react";
// import ReactDOM from "react-dom/client";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import App from "./App.jsx";
// import "./index.css";
// import SignUpPage from "./pages/SignUpPage.jsx";
// import SignInPage from "./pages/SignInPage.jsx";
// import HomePage from "./pages/HomePage.jsx";
// import Dashboard from "./routes/Dashboard/Dashboard.jsx";
// import Budgets from "./routes/Budgets/Budgets.jsx";
// import Expenses from "./routes/Expenses/Expenses.jsx";
// import Upgrades from "./routes/Upgrades/Upgrades.jsx";
// import ErrorPage from "./pages/Page404.jsx";
// import ProtectedRoute from "./components/ProtectedRoute.jsx";

// const routes = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     errorElement: <ErrorPage />,
//     children: [
//       { path: "/", element: <HomePage /> },
//       { path: "signup", element: <SignUpPage /> },
//       { path: "signin", element: <SignInPage /> },
//       {
//         path: "dashboard",
//         element: (
//           <ProtectedRoute>
//             <Dashboard />
//           </ProtectedRoute>
//         ),
//         children: [
//           { path: "budgets", element: <Budgets /> },
//           { path: "expenses", element: <Expenses /> },
//           { path: "upgrades", element: <Upgrades /> },
//         ],
//       },
//     ],
//   },
// ]);

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <RouterProvider router={routes} />
//   </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import SignUpPage from "./pages/SignUpPage.jsx";
import SignInPage from "./pages/SignInPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import Dashboard from "./routes/Dashboard/Dashboard.jsx";
import Budgets from "./routes/Budgets/Budgets.jsx";
import Expenses from "./routes/Expenses/Expenses.jsx";
import Upgrades from "./routes/Upgrades/Upgrades.jsx";
import ErrorPage from "./pages/Page404.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

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
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        children: [
          { path: "budgets", element: <Budgets /> },
          { path: "expenses", element: <Expenses /> },
          { path: "upgrades", element: <Upgrades /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <RouterProvider router={routes} />
  </React.StrictMode>
);
