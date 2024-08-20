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
import ExpensesScreen from "./routes/Expenses/ExpensesScreen.jsx";
import Upgrades from "./routes/Upgrades/Upgrades.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import DashboardOverview from "./routes/Dashboard/components/DashboardOverview.jsx";
import ExpensesPage from "./routes/Expenses/ExpensesPage.jsx";

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
          { index: true, element: <DashboardOverview /> },
          { path: "budgets", element: <Budgets /> },
          { path: "expenses", element: <ExpensesPage /> },
          { path: "expenses/:_id", element: <ExpensesScreen /> },
          { path: "upgrades", element: <Upgrades /> },
          { path: "*", element: <div>404 Not Found</div> },
        ],
      },
      { path: "*", element: <div>404 Not Found</div> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
);
