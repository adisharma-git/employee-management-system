import { monthOptions } from "../constants";
import { currency, monthLabel } from "../utils";

export default function CompanyPayroll({
  canViewCompanyPayroll,
  companyPayroll,
  companyFilter,
  setCompanyFilter,
  handleLoadCompanyPayroll,
}) {
  if (!canViewCompanyPayroll) {
    return (
      <section className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
        <h3 className="text-lg font-semibold text-[#021f54] mb-2">Company Payroll</h3>
        <p className="text-sm text-gray-500">You do not have permission to view company payroll records.</p>
      </section>
    );
  }

  return (
    <section className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-4">
        <div>
          <h3 className="text-lg font-semibold text-[#021f54]">Company Payroll</h3>
          <p className="text-sm text-gray-500">View generated payroll for selected month and year.</p>
        </div>

        <form onSubmit={handleLoadCompanyPayroll} className="flex flex-wrap items-end gap-3">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Month</label>
            <select
              value={companyFilter.month}
              onChange={(event) => setCompanyFilter((prev) => ({ ...prev, month: event.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              {monthOptions.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Year</label>
            <input
              type="number"
              value={companyFilter.year}
              onChange={(event) => setCompanyFilter((prev) => ({ ...prev, year: event.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm w-28"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-[#021f54] text-white text-sm hover:bg-[#0a368c]"
          >
            Load
          </button>
        </form>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-[#021f54] text-white uppercase text-xs tracking-wider">
            <tr>
              <th className="px-4 py-3">Employee</th>
              <th className="px-4 py-3">Month</th>
              <th className="px-4 py-3">Payable Days</th>
              <th className="px-4 py-3">LOP Days</th>
              <th className="px-4 py-3">Gross</th>
              <th className="px-4 py-3">Tax</th>
              <th className="px-4 py-3">Net Pay</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {companyPayroll.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-4 py-8 text-center text-gray-500">
                  No payroll records found for selected month.
                </td>
              </tr>
            ) : (
              companyPayroll.map((row) => (
                <tr key={row.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-800">{row.employee?.name || "-"}</p>
                    <p className="text-xs text-gray-500">{row.employee?.department || "-"}</p>
                  </td>
                  <td className="px-4 py-3">{monthLabel(row.month)} {row.year}</td>
                  <td className="px-4 py-3">{row.payableDays}</td>
                  <td className="px-4 py-3">{row.lopDays}</td>
                  <td className="px-4 py-3">{currency(row.grossEarnings)}</td>
                  <td className="px-4 py-3">{currency(row.taxDeduction)}</td>
                  <td className="px-4 py-3 font-semibold text-[#021f54]">{currency(row.netPay)}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
