import { useEffect, useState } from "react";
import BudgetItems from "./BudgetItems";
import CreateBudget from "./CreateBudget";
import axios from "axios";

export default function BudgetLists() {
  const [budgetList, setBudgetList] = useState([]);
  const [userEmail, setUserEmail] = useState(null);
  const [error, setError] = useState(null);

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
              Authorization: accessToken,
            }
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
        const response = await axios.get('http://localhost:8080/api/dashboard/budgets/user', {
          params: { email: userEmail },
        });
        setBudgetList(response.data);
      } catch (error) {
        console.error("Error fetching budgets:", error);
        setError("Error fetching budgets.");
      }
    };

    fetchBudgets();
  }, [userEmail]);

  const handleBudgetCreated = (newBudget) => {
    setBudgetList((prevList) => [...prevList, newBudget]);
  };

  return (
    <div className="mt-7">
      {error && <div className="text-red-500">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <CreateBudget onBudgetCreated={handleBudgetCreated} />
        {budgetList.map((budget) => (
          <BudgetItems key={budget.id} budget={budget} />
        ))}
      </div>
    </div>
  );
}
