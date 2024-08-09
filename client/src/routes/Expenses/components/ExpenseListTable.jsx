import { format } from "date-fns";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export default function ExpenseListTable({ expenses, onExpenseDeleted }) {
  const [deleting, setDeleting] = useState(null);

  const deleteExpense = async (expenseId) => {
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
      setDeleting(expenseId); // Mark the expense as being deleted
      await axios.delete(
        `http://localhost:8080/api/dashboard/expenses/${expenseId}/delete`,
        {
          headers: {
            Authorization: `${accessToken}`,
          },
        }
      );

      toast.success("Expense deleted!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      if (onExpenseDeleted) {
        onExpenseDeleted(expenseId);
      }
    } catch (error) {
      toast.error("Failed to delete expense.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setDeleting(null); // Reset the deleting state
    }
  };

  const handleDelete = (expense) => {
    if (!deleting) {
      deleteExpense(expense._id);
    }
  };

  return (
    <div className="mt-3">
      <div className="grid grid-cols-4 bg-slate-300 p-2 mt-3">
        <h2 className="font-bold">Name</h2>
        <h2 className="font-bold">Amount</h2>
        <h2 className="font-bold">Date</h2>
        <h2 className="font-bold">Action</h2>
      </div>
      {expenses.map((expense) => (
        <div
          key={expense._id}
          className={`grid grid-cols-4 bg-slate-100 p-2 ${
            deleting === expense._id ? "opacity-50" : ""
          }`}
        >
          <h2>{expense.ExpenseName}</h2>
          <h2>₹{expense.ExpenseAmount}</h2>
          <h2>{format(new Date(expense.date), "dd-MM-yyyy")}</h2>
          <Trash2
            onClick={() => handleDelete(expense)}
            className={`text-red-600 cursor-pointer ${
              deleting ? "cursor-not-allowed" : ""
            }`}
          />
        </div>
      ))}
    </div>
  );
}
