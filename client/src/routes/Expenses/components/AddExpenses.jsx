import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function AddExpenses({ _id, onExpenseAdded }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserEmail = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (accessToken) {
        try {
          const response = await axios.get(
            "http://localhost:8080/api/auth/dashboard",
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
      }
    };

    fetchUserEmail();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      toast.error("Access token not found.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/api/dashboard/expenses/${_id}/create`,
        {
          ExpenseName:name,
          ExpenseAmount:amount,
          createdBy: userEmail,
        },
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );

      onExpenseAdded(response.data);
      setName("");
      setAmount("");
      toast.success("Expense added successfully!");
    } catch (error) {
      console.error("Error adding expense:", error);
      toast.error("Error adding expense.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <label htmlFor="ExpenseName" className="text-sm font-medium text-gray-700">
          Expense Name
        </label>
        <input
          id="ExpenseName"
          name="ExpenseName"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="ExpenseAmount" className="text-sm font-medium text-gray-700">
        Expense Amount
        </label>
        <input
          id="ExpenseAmount"
          name="ExpenseAmount"
          type="number"
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Expense"}
      </button>
    </form>
  );
}
