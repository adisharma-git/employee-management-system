import SummaryCard from "../components/SummaryCard";
import { currency } from "../utils";

export default function SummaryCards({ totalRecords, totalNetPay, withoutSalary }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <SummaryCard title="Total Records" value={totalRecords} />
      <SummaryCard title="Total Net Pay" value={currency(totalNetPay)} />
      <SummaryCard title="Without Salary" value={withoutSalary} />
    </div>
  );
}
