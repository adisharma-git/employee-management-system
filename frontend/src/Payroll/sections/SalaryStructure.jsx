import InputField from "../components/InputField";
import { currency } from "../utils";

export default function SalaryStructure({
  canUpdatePayroll,
  employees,
  salaryForm,
  handleEmployeeSelect,
  handleSalaryChange,
  handleSetSalary,
  selectedEmployee,
  loading,
}) {
  if (!canUpdatePayroll) {
    return (
      <section className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
        <h3 className="text-lg font-semibold text-[#021f54] mb-2">Set Salary Structure</h3>
        <p className="text-sm text-gray-500">You do not have permission to update salary structure.</p>
      </section>
    );
  }

  return (
    <section className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
      <h3 className="text-lg font-semibold text-[#021f54] mb-4">Set Salary Structure</h3>
      <form onSubmit={handleSetSalary} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Employee</label>
          <select
            name="employeeId"
            value={salaryForm.employeeId}
            onChange={handleEmployeeSelect}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#021f54]"
          >
            {(employees || []).map((employee) => (
              <option key={employee.employee?.id} value={employee.employee?.id || ""}>
                {employee.employee?.name || "-"} ({employee.email})
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <InputField
            label="Base Salary"
            name="baseSalary"
            value={salaryForm.baseSalary}
            onChange={handleSalaryChange}
            required
          />
          <InputField
            label="Allowances"
            name="allowances"
            value={salaryForm.allowances}
            onChange={handleSalaryChange}
          />
          <InputField
            label="Tax Rate (%)"
            name="taxRate"
            value={salaryForm.taxRate}
            onChange={handleSalaryChange}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2 rounded-lg bg-[#021f54] text-white hover:bg-[#0a368c] disabled:opacity-60"
        >
          Save Salary
        </button>
      </form>

      <div className="mt-6 border-t pt-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Current Salary Structure</h4>
        {selectedEmployee?.employee?.salaryStructure ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div className="bg-gray-50 border border-gray-100 rounded-lg p-3">
              <p className="text-gray-500">Base Salary</p>
              <p className="font-semibold text-[#021f54]">
                {currency(selectedEmployee.employee.salaryStructure.baseSalary)}
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-lg p-3">
              <p className="text-gray-500">Allowances</p>
              <p className="font-semibold text-[#021f54]">
                {currency(selectedEmployee.employee.salaryStructure.allowances)}
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-lg p-3">
              <p className="text-gray-500">Tax Rate</p>
              <p className="font-semibold text-[#021f54]">
                {selectedEmployee.employee.salaryStructure.taxRate}%
              </p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500">No salary structure assigned to this employee yet.</p>
        )}
      </div>
    </section>
  );
}
