import BudgetLists from "./components/BudgetLists";

export default function Budgets() {
  return (
    <div className="p-10 ">
      <h2 className="font-bold text-3xl">My Budgets</h2>
      <BudgetLists />
    </div>
  )
}
