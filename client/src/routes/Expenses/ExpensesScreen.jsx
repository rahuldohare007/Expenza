import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import BudgetItem from "../Budgets/components/BudgetItem";
import AddExpenses from "./components/AddExpenses";

export default function ExpensesScreen() {
  const { _id } = useParams();
  const location = useLocation();
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(location.state?.budget);
  const updateBudgetItem = location.state?.updateBudget || (() => {});

  const fetchBudget = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        throw new Error("Access token not found");
      }

      const response = await axios.get(
        `http://localhost:8080/api/dashboard/budget/${_id}`
      );
      setBudget(response.data);
    } catch (error) {
      console.error("Error fetching budget:", error);
    }
  };

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
      const totalSpend = response.data.reduce(
        (sum, expense) => sum + expense.ExpenseAmount,
        0
      );
      const totalItem = response.data.length;
      const updatedBudget = { ...budget, totalSpend, totalItem };
      setBudget(updatedBudget);
      updateBudgetItem(updatedBudget);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    fetchBudget();
    fetchExpenses();
  }, [_id]);

  const refreshData = async () => {
    await fetchBudget();
    await fetchExpenses();
  };

  const handleAddExpense = (newExpense) => {
    const newExpenses = [...expenses, newExpense];
    setExpenses(newExpenses);
    const newTotalSpend = newExpenses.reduce(
      (sum, expense) => sum + expense.ExpenseAmount,
      0
    );
    const newTotalItem = newExpenses.length;
    const updatedBudget = {
      ...budget,
      totalSpend: newTotalSpend,
      totalItem: newTotalItem,
    };
    setBudget(updatedBudget);
    updateBudgetItem(updatedBudget);
  };
  return (
    <div className="p-10">
      <h2 className="font-bold text-3xl">My Expenses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-5">
        {budget ? (
          <BudgetItem budget={budget} />
        ) : (
          <div className="h-[150px] w-full bg-slate-200 rounded-lg animate-pulse"></div>
        )}
        <AddExpenses
          _id={_id}
          budgetAmount={budget?.budgetAmount}
          remainingAmount={budget ? budget.budgetAmount - budget.totalSpend : 0}
          onExpenseAdded={handleAddExpense}
          refreshData={refreshData}
        />
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
            <p className="text-red-500">No expenses found for this budget.</p>
          )}
        </div>
      </div>
    </div>
  );
}
