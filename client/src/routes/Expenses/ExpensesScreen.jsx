import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import BudgetItem from "../Budgets/components/BudgetItem";
import AddExpenses from "./components/AddExpenses";
import ExpenseListTable from "./components/ExpenseListTable";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function ExpensesScreen() {
  const { _id } = useParams();
  const location = useLocation();
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(location.state?.budget);
  const updateBudgetItem = location.state?.updateBudget || (() => {});

  const fetchBudget = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) throw new Error("Access token not found");

      const response = await axios.get(
        `http://localhost:8080/api/dashboard/budgets/${_id}`
      );
      setBudget(response.data);
    } catch (error) {
      // console.error("Error fetching budget:", error);
    }
  };

  const fetchExpenses = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) throw new Error("Access token not found");

      const response = await axios.get(
        `http://localhost:8080/api/dashboard/expenses/${_id}`,
        {
          headers: {
            Authorization: `${accessToken}`,
          },
        }
      );

      setExpenses(response.data);
      updateBudgetAndExpenses(response.data);
    } catch (error) {
      // console.error("Error fetching expenses:", error);
    }
  };

  const updateBudgetAndExpenses = (expenses) => {
    const totalSpend = expenses.reduce(
      (sum, expense) => sum + expense.ExpenseAmount,
      0
    );
    const totalItem = expenses.length;
    const updatedBudget = { ...budget, totalSpend, totalItem };
    setBudget(updatedBudget);
    updateBudgetItem(updatedBudget);
  };

  useEffect(() => {
    fetchBudget();
    fetchExpenses();
  }, [_id]);

  const handleAddExpense = (newExpense) => {
    const newExpenses = [...expenses, newExpense];
    setExpenses(newExpenses);
    updateBudgetAndExpenses(newExpenses);
  };

  const handleDeleteExpense = (deletedExpense) => {
    const newExpenses = expenses.filter(
      (expense) => expense._id !== deletedExpense._id
    );
    setExpenses(newExpenses);
    updateBudgetAndExpenses(newExpenses);
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
        />
      </div>
      <div className="mt-5">
        <h3 className="font-bold text-xl">Expenses</h3>
        <div>
          {expenses.length > 0 ? (
            <ExpenseListTable
              expenses={expenses}
              onExpenseDeleted={handleDeleteExpense}
            />
          ) : (
            <p className="text-red-500">No expenses found for this budget.</p>
          )}
        </div>
      </div>
      <div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      </div>
    </div>
  );
}
