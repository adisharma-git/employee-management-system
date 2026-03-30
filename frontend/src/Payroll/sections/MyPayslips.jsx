import Loader from "../../Loader/Loader";
import { currency, monthLabel } from "../utils";

export default function MyPayslips({ myPayslips, loading }) {
  return (
    <section className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-[#021f54]">My Payslips</h3>
        <p className="text-sm text-gray-500">View your monthly payroll history.</p>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-[#021f54] text-white uppercase text-xs tracking-wider">
              <tr>
                <th className="px-4 py-3">Month</th>
                <th className="px-4 py-3">Base Salary</th>
                <th className="px-4 py-3">Allowances</th>
                <th className="px-4 py-3">Payable Days</th>
                <th className="px-4 py-3">Tax</th>
                <th className="px-4 py-3">Net Pay</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {myPayslips.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                    No payslips available.
                  </td>
                </tr>
              ) : (
                myPayslips.map((slip) => (
                  <tr key={slip.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3">{monthLabel(slip.month)} {slip.year}</td>
                    <td className="px-4 py-3">{currency(slip.basicSalary)}</td>
                    <td className="px-4 py-3">{currency(slip.allowances)}</td>
                    <td className="px-4 py-3">{slip.payableDays}</td>
                    <td className="px-4 py-3">{currency(slip.taxDeduction)}</td>
                    <td className="px-4 py-3 font-semibold text-[#021f54]">{currency(slip.netPay)}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                        {slip.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
