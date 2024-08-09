import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import CardInfo from "./CardInfo";

const DashboardOverview = () => {
  const { userData } = useOutletContext();
  const [userEmail, setUserEmail] = useState(userData ? userData.email : "");
  const [budgetList, setBudgetList] = useState([]);

  useEffect(() => {
    const fetchUserEmail = async () => {
      if (userEmail) return;

      try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
          throw new Error("Access token not found");
        }

        const response = await axios.get(
          "http://localhost:8080/api/auth/dashboard",
          {
            headers: {
              Authorization: `${accessToken}`,
            },
          }
        );

        setUserEmail(response.data.email);
      } catch (error) {
        console.error("Error fetching user email:", error);
      }
    };

    fetchUserEmail();
  }, [userEmail]);

  useEffect(() => {
    const fetchBudgets = async () => {
      if (!userEmail) return;

      try {
        const response = await axios.get(
          "http://localhost:8080/api/dashboard/budgets/user",
          {
            params: { email: userEmail },
            headers: {
              Authorization: `${localStorage.getItem("accessToken")}`,
            },
          }
        );

        const sortedBudgets = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setBudgetList(sortedBudgets);
      } catch (error) {
        console.error("Error fetching budgets:", error);
      }
    };

    fetchBudgets();
  }, [userEmail]);

  return (
    <div className="p-8">
      {userData && (
        <h2 className="text-3xl font-bold">Hi, {userData.username} ✌</h2>
      )}
      <p className="mb-2 text-gray-500">
        {`Here's what's happening with your money, Let's manage your expenses.`}
      </p>
      <CardInfo budgetList={budgetList} />
    </div>
  );
};

export default DashboardOverview;
