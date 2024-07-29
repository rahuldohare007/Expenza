import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';

export default function Expenses() {
  const { _id } = useParams();
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
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
              Authorization: accessToken 
            }
          }
        );

        setExpenses(response.data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
        setError("Error fetching expenses.");
        toast.error("Error fetching expenses.");
      }
    };

    fetchExpenses();
  }, [_id]);

  return (
    <div className="p-10">
      <h2 className="font-bold text-3xl">Expenses</h2>
      {error && <div className="text-red-500">{error}</div>}
      <div>
        {expenses.map((expense) => (
          <div key={expense._id} className="expense-item">
            <p>Date: {new Date(expense.date).toLocaleDateString()}</p>
            <p>Amount: {expense.amount}</p>
            <p>Category: {expense.category}</p>
            <p>Description: {expense.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
