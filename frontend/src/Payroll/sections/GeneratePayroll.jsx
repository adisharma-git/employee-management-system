import { monthOptions } from "../constants";

export default function GeneratePayroll({
  canGeneratePayroll,
  generateForm,
  setGenerateForm,
  handleGeneratePayroll,
  unassignedEmployees,
  loading,
}) {
  if (!canGeneratePayroll) {
    return (
      <section className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
        <h3 className="text-lg font-semibold text-[#021f54] mb-2">Generate Monthly Payroll</h3>
        <p className="text-sm text-gray-500">You do not have permission to generate monthly payroll.</p>
      </section>
    );
  }

  return (
    <section className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
      <h3 className="text-lg font-semibold text-[#021f54] mb-4">Generate Monthly Payroll</h3>
      <form onSubmit={handleGeneratePayroll} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
            <select
              value={generateForm.month}
              onChange={(event) => setGenerateForm((prev) => ({ ...prev, month: event.target.value }))}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#021f54]"
            >
              {monthOptions.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
            <input
              type="number"
              value={generateForm.year}
              onChange={(event) => setGenerateForm((prev) => ({ ...prev, year: event.target.value }))}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#021f54]"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2 rounded-lg bg-[#f97316] text-white hover:opacity-90 disabled:opacity-60"
        >
          Generate Payroll
        </button>
      </form>

      <div className="mt-6 border-t pt-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Employees Without Salary Structure</h4>
        {unassignedEmployees.length === 0 ? (
          <p className="text-sm text-gray-500">All employees have salary structure assigned.</p>
        ) : (
          <ul className="space-y-2 max-h-36 overflow-y-auto pr-1">
            {unassignedEmployees.map((item) => (
              <li key={item.id} className="text-sm text-gray-600 border border-gray-100 rounded-lg p-2 bg-gray-50">
                {item.name} {item.designation ? `• ${item.designation}` : ""}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
