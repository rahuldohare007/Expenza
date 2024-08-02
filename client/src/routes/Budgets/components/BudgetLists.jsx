import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BudgetItem from "../components/BudgetItem";
import CreateBudget from "../components/CreateBudget";
import axios from "axios";

export default function BudgetLists() {
  const [budgetList, setBudgetList] = useState([]);
  const [userEmail, setUserEmail] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserEmail = async () => {
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
        setError("Error fetching user email.");
      }
    };

    fetchUserEmail();
  }, []);

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
        setBudgetList(response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      } catch (error) {
        console.error("Error fetching budgets:", error);
        setError("Error fetching budgets.");
      }
    };

    fetchBudgets();
  }, [userEmail]);

  const handleBudgetCreated = (newBudget) => {
    setBudgetList((prevList) =>
      [newBudget, ...prevList].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    );
  };

  const handleBudgetClick = (budget) => {
    navigate(`/dashboard/expenses/${budget._id}`, { state: { budget } });
  };

  return (
    <div className="mt-7">
      {error && <div className="text-red-500">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <CreateBudget onBudgetCreated={handleBudgetCreated} />
        {budgetList.length > 0
          ? budgetList.map((budget) => (
              <BudgetItem key={budget._id} budget={budget} onClick={() => handleBudgetClick(budget)} />
            ))
          : [1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="w-full bg-slate-200 rounded-lg h-[150px] animate-pulse"
              ></div>
            ))}
      </div>
    </div>
  );
}
