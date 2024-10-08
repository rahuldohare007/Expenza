import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import BudgetItem from "../Budgets/components/BudgetItem";
import AddExpenses from "./components/AddExpenses";
import ExpenseListTable from "./components/ExpenseListTable";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditBudget from "./components/EditBudget";
import DeleteBudget from "./components/DeleteBudget";
import { ArrowLeft } from "lucide-react";

export default function ExpensesScreen() {
  const { _id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(location.state?.budget || {});
  const updateBudgetItem = location.state?.updateBudget || (() => {});

  const fetchBudget = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) throw new Error("Access token not found");

      const response = await axios.get(
        `https://expenza-api.vercel.app/api/dashboard/budgets/${_id}`
      );
      setBudget(response.data);
    } catch (error) {
      // toast.error("Error fetching budget");
    }
  };

  const fetchExpenses = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) throw new Error("Access token not found");

      const response = await axios.get(
        `https://expenza-api.vercel.app/api/dashboard/expenses/${_id}`,
        {
          headers: {
            Authorization: `${accessToken}`,
          },
        }
      );

      const fetchedExpenses = response.data;
      setExpenses(fetchedExpenses);
      updateBudgetAndExpenses(fetchedExpenses);
    } catch (error) {
      // console.error("Error fetching expenses:", error);
    }
  };

  const updateBudgetAndExpenses = (expenses) => {
    const totalSpend = expenses.reduce(
      (sum, expense) => sum + (expense.ExpenseAmount || 0),
      0
    );
    const totalItem = expenses.length || 0;

    const remainingAmount =
      budget?.budgetAmount !== undefined ? budget.budgetAmount - totalSpend : 0;

    const updatedBudget = {
      ...budget,
      totalSpend,
      totalItem,
      remainingAmount,
    };

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

  const handleDeleteExpense = (expenseId) => {
    const newExpenses = expenses.filter(expense => expense._id !== expenseId);
    setExpenses(newExpenses);
    updateBudgetAndExpenses(newExpenses);
  };
  
  

  return (
    <div className="p-10">
      <div className=" flex justify-between items-center">
        <h2 className="font-bold text-2xl">
          <span className="flex gap-2 items-center">
            <ArrowLeft
              className="cursor-pointer"
              onClick={() => {
                navigate(-1);
              }}
            />
            My Expenses
          </span>
        </h2>
        <div className="flex items-center">
          <EditBudget
            _id={_id}
            budget={budget}
            updateBudgetItem={(updatedBudget) => {
              setBudget(updatedBudget);
            }}
          />
          <DeleteBudget />
        </div>
      </div>
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
        <h3 className="font-bold text-xl">Latest Expenses</h3>
        <div>
          {expenses.length > 0 ? (
            <ExpenseListTable
              expenses={expenses}
              onExpenseDeleted={handleDeleteExpense}
            />
          ) : (
            <p className="text-red-600">No expenses found</p>
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
