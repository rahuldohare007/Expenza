import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import BudgetItem from "../Budgets/components/BudgetItem";
import AddExpenses from "./components/AddExpenses";

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

  const handleAddExpense = async (newExpense) => {
    try {
      const response = await axios.post(`/api/dashboard/expenses/${_id}/create`, newExpense);
      setExpenses([...expenses, response.data]);
      toast.success('Expense added successfully');
    } catch (error) {
      toast.error('Failed to add expense');
    }
  };

  return (
    <div className="p-10">
      <h2 className="font-bold text-3xl">My Expenses</h2>
      {/* {error && <div className="text-red-500">{error}</div>} */}
      <div className="grid grid-cols-1 md:grid-cols-2 mt-6">
        {budget ? (
          <BudgetItem budget={budget} />
        ) : (
          <div className="h-[150px] w-full bg-slate-200  rounded-lg animate-pulse"></div>
        )}
        <AddExpenses _id={_id} onExpenseAdded={handleAddExpense} />
      </div>
      <div className="mt-5">
        <h3 className="font-bold text-xl">Expenses</h3>
        <div>
          {expenses.length > 0 ? (
            expenses.map((expense) => (
              <div
                key={expense._id}
                className="expense-item mb-4 p-4 border rounded-lg"
              >
                <p>Date: {new Date(expense.date).toLocaleDateString()}</p>
                <p>Name: {expense.ExpenseName}</p>
                <p>Amount: ₹{expense.ExpenseAmount}</p>
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
