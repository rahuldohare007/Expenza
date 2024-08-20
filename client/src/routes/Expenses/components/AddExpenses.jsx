import { useState, useEffect } from "react";
import axios from "axios";
import { toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddExpenses({
  _id,
  budgetAmount,
  remainingAmount,
  onExpenseAdded,
}) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const fetchUserEmail = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        try {
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
          // console.error("Error fetching user email:", error);
        }
      }
    };

    fetchUserEmail();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      toast.error("Access token not found.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    try {
      const response = await axios.post(
        `https://expenza-api.vercel.app/api/dashboard/expenses/${_id}/create`,
        {
          ExpenseName: name,
          ExpenseAmount: parseFloat(amount),
          createdBy: userEmail,
        },
        {
          headers: {
            Authorization: `${accessToken}`,
          },
        }
      );

      setName("");
      setAmount("");
      toast.success("Expense added successfully!", {
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
        if (onExpenseAdded) {
          onExpenseAdded(response.data);
        }
      }, 2000);
    } catch (error) {
      // console.error("Error adding expense:", error);
      toast.error("Error adding expense.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="border p-5 rounded-lg">
      <h2 className="text-lg font-bold">Add Expense</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="mt-2">
          <label htmlFor="ExpenseName" className="font-medium text-black my-1">
            Expense Name
          </label>
          <input
            id="ExpenseName"
            name="ExpenseName"
            type="text"
            required
            placeholder="e.g. Bedroom Decor"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mt-2">
          <label
            htmlFor="ExpenseAmount"
            className="font-medium text-black my-1"
          >
            Expense Amount
          </label>
          <input
            id="ExpenseAmount"
            name="ExpenseAmount"
            type="number"
            placeholder="e.g. 1000"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={
            !(name && amount) ||
            parseFloat(amount) > budgetAmount ||
            parseFloat(amount) > remainingAmount
          }
          className={`px-4 py-2 mt-3 w-full bg-indigo-700 text-white rounded-md ${
            !(name && amount) ||
            parseFloat(amount) > budgetAmount ||
            parseFloat(amount) > remainingAmount
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-indigo-800"
          }`}
        >
          Add New Expense
        </button>
      </form>
    </div>
  );
}
