import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function BarChartDashboard({ budgetList }) {
  return (
    <div className="border rounded-lg p-5">
    <h2 className="font-bold text-lg">Activity</h2>
      <BarChart
        width={500}
        height={300}
        data={budgetList}
        margin={{top:7}}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="budgetName" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalSpend" stackId="a" fill="#4845d2" />
        <Bar dataKey="budgetAmount" stackId="a" fill="#849dfc" />
      </BarChart>
    </div>
  );
}
