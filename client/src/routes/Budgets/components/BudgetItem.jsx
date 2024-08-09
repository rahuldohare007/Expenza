export default function BudgetItem({ budget, onClick }) {
  const totalSpend = budget.totalSpend || 0;
  const totalItem = budget.totalItem || 0;
  const budgetAmount = budget.budgetAmount || 0;

  const progressBarWidth = budgetAmount ? (totalSpend / budgetAmount) * 100 : 0;
  const remainingAmount = budgetAmount - totalSpend;
  
  return (
    <div
      className="p-5 border rounded-lg hover:shadow-md cursor-pointer h-[170px]"
      onClick={onClick}
    >
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <h2 className="text-2xl p-3 px-4 bg-slate-100 rounded-full">
            {budget?.icon}
          </h2>
          <div>
            <h2 className="font-bold">{budget.budgetName}</h2>
            <h2 className="text-sm text-grey-500">
              {totalItem} Item{totalItem > 1 ? "s" : ""}
            </h2>
          </div>
        </div>
        <h2 className="font-bold text-indigo-700 text-lg">₹{budgetAmount}</h2>
      </div>
      <div className="mt-5">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xs text-slate-400">
            ₹{Number(totalSpend)} Spent
          </h2>
          <h2 className="text-xs text-slate-400">
            ₹{remainingAmount} Remaining
          </h2>
        </div>
        <div className="w-full bg-slate-300 h-2 rounded-full">
          <div
            className="bg-indigo-700 h-2 rounded-full"
            style={{ width: `${progressBarWidth}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
