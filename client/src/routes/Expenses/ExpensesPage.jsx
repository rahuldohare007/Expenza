import { useEffect, useState } from "react";
import axios from "axios";
import ExpenseListTable from "./components/ExpenseListTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useOutletContext } from "react-router-dom";

const ExpensesPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [budgetList, setBudgetList] = useState([]);
  const { userData } = useOutletContext();

  useEffect(() => {
    const fetchBudgets = async () => {
      if (!userData?.email) return;

      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) throw new Error("Access token not found");

        const response = await axios.get(
          "https://expenza-api.vercel.app/dashboard/budgets/user",
          {
            params: { email: userData.email },
            headers: {
              Authorization: `${accessToken}`,
            },
          }
        );
        setBudgetList(
          response.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        );
      } catch (error) {
        // console.error("Error fetching budgets:", error.response || error);
      }
    };

    fetchBudgets();

    const intervalId = setInterval(fetchBudgets, 2000); // Fetch budgets every 2 seconds
    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [userData]);

  useEffect(() => {
    const fetchExpenses = async () => {
      if (!budgetList.length) return;

      try {
        const accessToken = localStorage.getItem("accessToken");
        const expensesPromises = budgetList.map(async (budget) => {
          try {
            const response = await axios.get(
              `https://expenza-api.vercel.app/dashboard/expenses/${budget._id}`,
              {
                headers: {
                  Authorization: `${accessToken}`,
                },
              }
            );
            return response.data; // This should be an array of expenses
          } catch (error) {
            // console.error(
            //   `Error fetching expenses for budget ID: ${budget._id}`,
            //   error.response || error
            // );
            return [];
          }
        });

        const allExpensesData = await Promise.all(expensesPromises);
        const flattenedExpenses = allExpensesData.flat(); // Use flat() to flatten the array

        setExpenses(flattenedExpenses);
      } catch (error) {
        // console.error("Error fetching expenses:", error.response || error);
      }
    };

    fetchExpenses();

    const intervalId = setInterval(fetchExpenses, 2000); // Fetch expenses every 2 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [budgetList]);

  const handleExpenseDeleted = async (deletedExpenseId) => {

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      return;
    }

    try {
      await axios.delete(
        `https://expenza-api.vercel.app/dashboard/expenses/${deletedExpenseId}/delete`,
        {
          headers: {
            Authorization: `${accessToken}`,
          },
        }
      );

      // Update expenses state only after successful deletion
      setExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense._id !== deletedExpenseId)
      );
    } catch (error) {
      // console.error("Error deleting expense:", error.response || error);
    }
  };

  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl">Latest Expenses</h2>
      {expenses.length > 0 ? (
        <ExpenseListTable
          expenses={expenses}
          onExpenseDeleted={handleExpenseDeleted}
        />
      ) : (
        <p className="text-red-600">No expenses found</p>
      )}
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
  );
};

export default ExpensesPage;
