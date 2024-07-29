import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import BudgetItem from "../Budgets/components/BudgetItem";

export default function ExpensesScreen() {
  const { _id } = useParams();
  const location = useLocation();
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const budget = location.state?.budget; // Retrieve the budget from location state

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
          throw new Error("Access token not found");
        }

        const response = await axios.get(
          `http://localhost:8080/api/dashboard/expenses/${_id}`,
          {
            headers: {
              Authorization: accessToken,
            },
          }
        );

        setExpenses(response.data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
        setError("Error fetching expenses.");
        toast.error("Error fetching expenses.");
      }
    };

    fetchExpenses();
  }, [_id]);

  return (
    <div className="p-10">
      <h2 className="font-bold text-3xl">Budget & Expenses</h2>
      {error && <div className="text-red-500">{error}</div>}
      {budget && <BudgetItem budget={budget} />}
      <div className="mt-5">
        <h3 className="font-bold text-xl">Expenses</h3>
        <div>
          {expenses.length > 0 ? (
            expenses.map((expense) => (
              <div key={expense._id} className="expense-item mb-4 p-4 border rounded-lg">
                <p>Date: {new Date(expense.date).toLocaleDateString()}</p>
                <p>Amount: ₹{expense.amount}</p>
                <p>Category: {expense.category}</p>
                <p>Description: {expense.description}</p>
              </div>
            ))
          ) : (
            <p>No expenses found for this budget.</p>
          )}
        </div>
      </div>
    </div>
  );
}
