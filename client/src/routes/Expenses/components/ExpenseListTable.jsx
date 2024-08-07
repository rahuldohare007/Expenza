import { FaRegTrashAlt } from "react-icons/fa";
import { format } from "date-fns";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ExpenseListTable({ expenses, onExpenseDeleted }) {
  const deleteExpense = async (expense) => {
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
      await axios.delete(
        `http://localhost:8080/api/dashboard/expenses/${expense._id}/delete`,
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
      setTimeout(() => {
        if (onExpenseDeleted) {
          onExpenseDeleted(expense);
        }
      }, 2000);
    } catch (error) {
      console.error("Error deleting expense:", error);
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
    }
  };

  return (
    <div className="mt-3">
      <div className="grid grid-cols-4 bg-slate-300 p-2">
        <h2 className="font-bold">Name</h2>
        <h2 className="font-bold">Amount</h2>
        <h2 className="font-bold">Date</h2>
        <h2 className="font-bold">Action</h2>
      </div>
      {expenses.map((expense) => (
        <div key={expense._id} className="grid grid-cols-4 bg-slate-100 p-2">
          <h2>{expense.ExpenseName}</h2>
          <h2>₹{expense.ExpenseAmount}</h2>
          <h2>{format(new Date(expense.date), "dd/MM/yyyy")}</h2>
          <h2>
            <FaRegTrashAlt
              className="text-red-600 hover:cursor-pointer"
              onClick={() => deleteExpense(expense)}
            />
          </h2>
        </div>
      ))}
    </div>
  );
}
