import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import axios from "axios";
import DashboardLayout from "./components/DashboardLayout";
import { RotatingLines } from "react-loader-spinner";

const Dashboard = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        navigate("/signin");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:8080/api/auth/dashboard",
          {
            headers: {
              Authorization: accessToken,
            },
          }
        );

        setUserData(response.data);
      } catch (err) {
        console.error("Authentication Error:", err);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setError("Session expired. Please sign in again.");
        navigate("/signin");
      }
    };

    checkAuthentication();
  }, [navigate]);

  return (
    <DashboardLayout userData={userData}>
      <div>
        {error ? (
          <div>{error}</div>
        ) : userData ? (
          <div>
            <Outlet />
          </div>
        ) : (
          <div className="flex justify-center items-center min-h-screen">
            <div>
              <RotatingLines
                type="RotatingLines"
                height="60"
                width="60"
                color="#00BFFF"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
              />
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
