import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";
import CardInfo from "./CardInfo";
import BarChartDashboard from "./BarChartDashboard";
import BudgetItem from "../../Budgets/components/BudgetItem";
import ExpenseListTable from "../../Expenses/components/ExpenseListTable";

const DashboardOverview = () => {
  const { userData } = useOutletContext();
  const [userEmail, setUserEmail] = useState(userData ? userData.email : "");
  const [budgetList, setBudgetList] = useState([]);
  const navigate = useNavigate();

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

  const handleBudgetClick = (budget) => {
    navigate(`/dashboard/expenses/${budget._id}`, { state: { budget } });
  };

  return (
    <div className="p-8">
      {userData && (
        <h2 className="text-3xl font-bold">Hi, {userData.username} ✌</h2>
      )}
      <p className="mb-2 text-gray-500">
        {`Here's what's happening with your money, Let's manage your expenses.`}
      </p>
      <CardInfo budgetList={budgetList} />
      <div className="grid grid-cols-1 md:grid-cols-3 mt-6 gap-5">
        <div className="md:col-span-2">
          <BarChartDashboard budgetList={budgetList} />
          <ExpenseListTable />
        </div>
        <div className="grid gap-3">
          <h2 className="font-bold text-lg">Latest Budgets</h2>
          {budgetList.map((budget) => (
            <BudgetItem
              key={budget._id}
              budget={budget}
              onClick={() => handleBudgetClick(budget)}
            />
          ))}
          {/* {budgetList.slice(0, 2).map((budget) => (
            <BudgetItem
              key={budget._id}
              budget={budget}
              onClick={() => handleBudgetClick(budget)}
            />
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
