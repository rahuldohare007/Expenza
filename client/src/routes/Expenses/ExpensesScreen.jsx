// import { useEffect, useState } from "react";
// import { useParams, useLocation } from "react-router-dom";
// import axios from "axios";
// import BudgetItem from "../Budgets/components/BudgetItem";
// import AddExpenses from "./components/AddExpenses";

// export default function ExpensesScreen() {
//   const { _id } = useParams();
//   const location = useLocation();
//   const [expenses, setExpenses] = useState([]);
//   const budget = location.state?.budget;

//   useEffect(() => {
//     const fetchExpenses = async () => {
//       try {
//         const accessToken = localStorage.getItem("accessToken");

//         if (!accessToken) {
//           throw new Error("Access token not found");
//         }

//         const response = await axios.get(
//           `http://localhost:8080/api/dashboard/expenses/${_id}`,
//           {
//             headers: {
//               Authorization: accessToken,
//             },
//           }
//         );

//         setExpenses(response.data);
//       } catch (error) {
//         console.error("Error fetching expenses:", error);
//       }
//     };

//     fetchExpenses();
//   }, [_id]);

//   const handleAddExpense = async (newExpense) => {
//     try {
//       const response = await axios.post(
//         `/api/dashboard/expenses/${_id}/create`,
//         newExpense
//       );
//       setExpenses([...expenses, response.data]);
//     } catch (error) {
//       console.error("Failed to add expense", error);
//     }
//   };

//   return (
//     <div className="p-10">
//       <h2 className="font-bold text-3xl">My Expenses</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-5">
//         {budget ? (
//           <BudgetItem budget={budget} />
//         ) : (
//           <div className="h-[150px] w-full bg-slate-200  rounded-lg animate-pulse"></div>
//         )}
//         <AddExpenses _id={_id} onExpenseAdded={handleAddExpense} />
//       </div>
//       <div className="mt-5">
//         <h3 className="font-bold text-xl">Expenses</h3>
//         <div>
//           {expenses.length > 0 ? (
//             expenses.map((expense) => (
//               <div
//                 key={expense._id}
//                 className="expense-item mb-4 p-4 border rounded-lg"
//               >
//                 <p>Date: {new Date(expense.date).toLocaleDateString()}</p>
//                 <p>Name: {expense.ExpenseName}</p>
//                 <p>Amount: ₹{expense.ExpenseAmount}</p>
//               </div>
//             ))
//           ) : (
//             <p className="text-red-500">No expenses found for this budget.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


































































import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import BudgetItem from "../Budgets/components/BudgetItem";
import AddExpenses from "./components/AddExpenses";

export default function ExpensesScreen() {
  const { _id } = useParams();
  const location = useLocation();
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(location.state?.budget);
  const updateBudgetItem = location.state?.updateBudget;

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
            Authorization: accessToken,
          },
        }
      );

      setExpenses(response.data);
      const totalSpend = response.data.reduce((sum, expense) => sum + expense.ExpenseAmount, 0);
      const totalItem = response.data.length;
      const updatedBudget = { ...budget, totalSpend, totalItem };
      setBudget(updatedBudget);
      updateBudgetItem(updatedBudget);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [_id]);

  const handleAddExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]);
    const newTotalSpend = expenses.reduce((sum, expense) => sum + expense.ExpenseAmount, 0) + newExpense.ExpenseAmount;
    const newTotalItem = expenses.length + 1;
    const updatedBudget = { ...budget, totalSpend: newTotalSpend, totalItem: newTotalItem };
    setBudget(updatedBudget);
    updateBudgetItem(updatedBudget);
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
        <AddExpenses _id={_id} budgetAmount={budget.budgetAmount} remainingAmount={budget.budgetAmount - budget.totalSpend} onExpenseAdded={handleAddExpense} refreshData={fetchExpenses} />
      </div>
      <div className="mt-5">
        <h3 className="font-bold text-xl">Expenses</h3>
        <div>
          {expenses.length > 0 ? (
            expenses.map((expense) => (
              <div
                key={expense._id}
                className="expense-item mb-4 p-4 border rounded-lg"
              >
                <p>Date: {new Date(expense.date).toLocaleDateString()}</p>
                <p>Name: {expense.ExpenseName}</p>
                <p>Amount: ₹{expense.ExpenseAmount}</p>
              </div>
            ))
          ) : (
            <p className="text-red-500">No expenses found for this budget.</p>
          )}
        </div>
      </div>
    </div>
  );
}
