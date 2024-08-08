import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import BudgetItem from "../Budgets/components/BudgetItem";
import AddExpenses from "./components/AddExpenses";
import ExpenseListTable from "./components/ExpenseListTable";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { IoArrowBackOutline } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ExpensesScreen() {
  const { _id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(location.state?.budget);
  const updateBudgetItem = location.state?.updateBudget || (() => {});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchBudget = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) throw new Error("Access token not found");

      const response = await axios.get(
        `http://localhost:8080/api/dashboard/budgets/${_id}`
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
      // toast.error("Error fetching expenses");
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

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleDeleteBudget = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) throw new Error("Access token not found");

      await axios.delete(
        `http://localhost:8080/api/dashboard/budgets/${_id}/delete`,
        {
          headers: {
            Authorization: `${accessToken}`,
          },
        }
      );

      toast.success("Budget deleted successfully", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setTimeout(() => {
        navigate("/dashboard/budgets");
      }, 3000);
    } catch (error) {
      // toast.error("Error deleting budget");
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="p-10">
      <h2 className="font-bold text-3xl flex justify-between items-center">
        <span className="flex gap-2 items-center">
          <IoArrowBackOutline
            className="cursor-pointer"
            onClick={() => {
              navigate("/dashboard/budgets");
            }}
          />
          My Expenses
        </span>
        <div className="flex gap-2 items-center">
          <button
            type="button"
            className="flex gap-2 text-white bg-indigo-700 hover:bg-indigo-800 font-medium rounded-lg text-sm px-3 py-2.5 me-2 mb-2"
            // onClick={handleEditClick}
          >
            <FaRegEdit className="text-lg" />
            Edit
          </button>
          <button
            type="button"
            className="flex gap-2 text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-3 py-2.5 me-2 mb-2"
            onClick={handleDeleteClick}
          >
            <FaRegTrashAlt className="text-lg" />
            Delete
          </button>
        </div>
      </h2>
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
            <p className="text-red-600">No expenses found for this budget.</p>
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
      {isModalOpen && (
        <div
          id="popup-modal"
          tabIndex="-1"
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow">
              <button
                type="button"
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                onClick={handleModalClose}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <svg
                  className="mx-auto mb-4 text-gray-400 w-12 h-12"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500">
                  Are you sure you want to delete this budget?
                </h3>
                <button
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                  onClick={handleDeleteBudget}
                >
                  Yes, I'm sure
                </button>
                <button
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-white bg-indigo-700 rounded-lg  hover:bg-indigo-800 focus:z-10 "
                  onClick={handleModalClose}
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
