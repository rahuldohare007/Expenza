// export default function BudgetItem({ budget, onClick }) {
//   return (
//     <div
//       className="p-5 border rounded-lg hover:shadow-md cursor-pointer h-[170px]"
//       onClick={onClick}
//     >
//       <div className="flex gap-2 items-center justify-between">
//         <div className="flex gap-2 items-center">
//           <h2 className="text-2xl p-3 px-4 bg-slate-100 rounded-full">
//             {budget?.icon}
//           </h2>
//           <div>
//             <h2 className="font-bold">{budget.budgetName}</h2>
//             <h2 className="text-sm text-grey-500">{budget.totalItem} Item{budget.totalItem > 1 ? 's' : ''}</h2>
//           </div>
//         </div>
//         <h2 className="font-bold text-indigo-700 text-lg">
//           ₹{budget.budgetAmount}
//         </h2>
//       </div>
//       <div className="mt-5">
//         <div className="flex justify-between items-center mb-3">
//           <h2 className="text-xs text-slate-400">
//             ₹{budget.totalSpend ? budget.totalSpend : 0} Spend
//           </h2>
//           <h2 className="text-xs text-slate-400">
//             ₹{budget.budgetAmount - budget.totalSpend} Remaining
//           </h2>
//         </div>
//         <div className="w-full bg-slate-300 h-2 rounded-full">
//           <div className="w-[50%] bg-indigo-700 h-2 rounded-full"></div>
//         </div>
//       </div>
//     </div>
//   );
// }
























export default function BudgetItem({ budget, onClick }) {
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
            <h2 className="text-sm text-grey-500">{budget.totalItem} Item{budget.totalItem > 1 ? 's' : ''}</h2>
          </div>
        </div>
        <h2 className="font-bold text-indigo-700 text-lg">
          ₹{budget.budgetAmount}
        </h2>
      </div>
      <div className="mt-5">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xs text-slate-400">
            ₹{budget.totalSpend ? budget.totalSpend : 0} Spent
          </h2>
          <h2 className="text-xs text-slate-400">
            ₹{budget.budgetAmount - budget.totalSpend} Remaining
          </h2>
        </div>
        <div className="w-full bg-slate-300 h-2 rounded-full">
          <div
            className="w-full bg-indigo-700 h-2 rounded-full"
            style={{ width: `${(budget.totalSpend / budget.budgetAmount) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
