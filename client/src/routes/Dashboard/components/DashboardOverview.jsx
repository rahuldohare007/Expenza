import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";
import CardInfo from "./CardInfo";
import { ToastContainer, toast } from "react-toastify";
import BarChartDashboard from "./BarChartDashboard";
import BudgetItem from "../../Budgets/components/BudgetItem";
import ExpenseListTable from "../../Expenses/components/ExpenseListTable";

const DashboardOverview = () => {
  const { userData } = useOutletContext();
  const [userEmail, setUserEmail] = useState(userData ? userData.email : "");
  const [budgetList, setBudgetList] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserEmail = async () => {
      if (userEmail) return;

      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) throw new Error("Access token not found");

        const response = await axios.get(
          "https://expenza-api.vercel.app/api/auth/dashboard",
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
          "https://expenza-api.vercel.app/api/dashboard/budgets/user",
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

        if (JSON.stringify(sortedBudgets) !== JSON.stringify(budgetList)) {
          setBudgetList(sortedBudgets);
        }
      } catch (error) {
        console.error("Error fetching budgets:", error);
      }
    };

    fetchBudgets();
  }, [userEmail, budgetList]);

  useEffect(() => {
    const fetchExpensesForBudgets = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) throw new Error("Access token not found");

      try {
        const allExpenses = await Promise.all(
          budgetList.map(async (budget) => {
            try {
              const response = await axios.get(
                `https://expenza-api.vercel.app/api/dashboard/expenses/${budget._id}`,
                {
                  headers: {
                    Authorization: `${accessToken}`,
                  },
                }
              );
              return { budgetId: budget._id, expenses: response.data };
            } catch (err) {
              console.error(
                `Error fetching expenses for budget ID: ${budget._id}`,
                err
              );
              return { budgetId: budget._id, expenses: [] };
            }
          })
        );

        const flattenedExpenses = allExpenses.flatMap((expenseData) => expenseData.expenses);
        setExpenses(flattenedExpenses);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    if (budgetList.length > 0) {
      fetchExpensesForBudgets();
    }
  }, [budgetList]);

  const handleBudgetClick = (budget) => {
    navigate(`/dashboard/expenses/${budget._id}`, { state: { budget } });
  };

  const handleExpenseDeleted = (deletedExpenseId, budgetId, expenseAmount) => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense._id !== deletedExpenseId)
    );

    // Update the corresponding budget
    setBudgetList((prevBudgets) =>
      prevBudgets.map((budget) => {
        if (budget._id === budgetId) {
          return {
            ...budget,
            totalSpend: budget.totalSpend - expenseAmount,
            remainingAmount: budget.remainingAmount + expenseAmount,
            totalItem: budget.totalItem - 1,
          };
        }
        return budget;
      })
    );
  };

  return (
    <div className="p-6 md:p-8 lg:p-10">
      {userData && (
        <h2 className="text-2xl md:text-3xl font-bold">Hi, {userData.username} ✌</h2>
      )}
      <p className="mb-2 text-gray-500 text-sm md:text-base">
        {`Here's what's happening with your money, Let's manage your expenses.`}
      </p>
      <CardInfo budgetList={budgetList} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <div className="md:col-span-2 lg:col-span-2">
          <BarChartDashboard budgetList={budgetList} />
          <h2 className="font-bold text-lg mt-3">Latest Expenses</h2>
          {expenses.length > 0 ? (
            <ExpenseListTable
              expenses={expenses}
              onExpenseDeleted={handleExpenseDeleted}
            />
          ) : (
            <p className="text-red-600">No expenses found</p>
          )}
        </div>
        <div className="grid gap-4 lg:gap-6">
          <h2 className="font-bold text-lg">Latest Budgets</h2>
          {budgetList.map((budget) => (
            <BudgetItem
              key={budget._id}
              budget={budget}
              onClick={() => handleBudgetClick(budget)}
            />
          ))}
        </div>
      </div>
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

export default DashboardOverview;
