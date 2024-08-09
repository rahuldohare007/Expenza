import { PiggyBank, ReceiptText, Wallet } from "lucide-react";

export default function CardInfo({ budgetList }) {
  const totalBudget = budgetList.reduce(
    (acc, budget) => acc + budget.budgetAmount,
    0
  );
  const totalSpend = budgetList.reduce(
    (acc, budget) => acc + budget.totalSpend,
    0
  );
  const numberOfBudgets = budgetList.length;

  return (
    <div>
      {budgetList?.length > 0 ? (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="p-7 border rounded-lg flex items-center justify-between">
            <div>
              <h2 className="text-sm">Total Budget</h2>
              <h2 className="font-bold text-2xl">₹ {totalBudget}</h2>
            </div>
            <PiggyBank className="p-3 h-12 w-12 bg-indigo-600 rounded-full text-white" />
          </div>
          <div className="p-7 border rounded-lg flex items-center justify-between">
            <div>
              <h2 className="text-sm">Total Spend</h2>
              <h2 className="font-bold text-2xl">₹ {totalSpend}</h2>
            </div>
            <ReceiptText className="p-3 h-12 w-12 bg-indigo-600 rounded-full text-white" />
          </div>
          <div className="p-7 border rounded-lg flex items-center justify-between">
            <div>
              <h2 className="text-sm">Number Of Budgets</h2>
              <h2 className="font-bold text-2xl">{numberOfBudgets}</h2>
            </div>
            <Wallet className="p-3 h-12 w-12 bg-indigo-600 rounded-full text-white" />
          </div>
        </div>
      ) : (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((item, index) => (
            <div className="h-[110px] w-full bg-slate-200 animate-pulse rounded-lg"></div>
          ))}
        </div>
      )}
    </div>
  );
}
