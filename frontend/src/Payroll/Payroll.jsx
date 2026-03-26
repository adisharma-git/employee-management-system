import { useCallback, useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import Loader from "../Loader/Loader";
import ToastContainer from "../Toaster/Toast";
import AccessRestricted from "../Components/AccessRestricted";

const monthOptions = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];

const currentDate = new Date();

export default function Payroll() {
  const [loading, setLoading] = useState(false);
  const [toasts, setToasts] = useState([]);

  const [employees, setEmployees] = useState([]);
  const [unassignedEmployees, setUnassignedEmployees] = useState([]);
  const [companyPayroll, setCompanyPayroll] = useState([]);
  const [myPayslips, setMyPayslips] = useState([]);

  const [salaryForm, setSalaryForm] = useState({
    employeeId: "",
    baseSalary: "",
    allowances: "",
    taxRate: "",
  });

  const [companyFilter, setCompanyFilter] = useState({
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear(),
  });

  const [generateForm, setGenerateForm] = useState({
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear(),
  });

  const addToast = (type, message) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  };

  

  const currency = (value) => {
    const number = Number(value || 0);
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(number);
  };

  const monthLabel = (month) => {
    return monthOptions.find((item) => item.value === month)?.label || "-";
  };

  const totalCompanyNetPay = useMemo(() => {
    return companyPayroll.reduce((sum, item) => sum + Number(item.netPay || 0), 0);
  }, [companyPayroll]);

  const fetchAdminBootstrap = useCallback(async () => {
    setLoading(true);
    try {
      const [employeesRes, unassignedRes] = await Promise.all([
        api.get("/admin/employees"),
        api.get("/payroll/unassigned"),
      ]);

      const employeeList = employeesRes.data?.data || [];
      setEmployees(employeeList);
      setUnassignedEmployees(unassignedRes.data?.data || []);

      setSalaryForm((prev) => {
        const currentSelected = employeeList.find(
          (employee) => employee.employee?.id === prev.employeeId
        );

        const defaultSelected = employeeList[0];
        const target = currentSelected || defaultSelected;

        if (!target?.employee?.id) {
          return prev;
        }

        const structure = target.employee.salaryStructure;

        return {
          employeeId: target.employee.id,
          baseSalary: structure?.baseSalary?.toString() || "",
          allowances: structure?.allowances?.toString() || "",
          taxRate: structure?.taxRate?.toString() || "",
        };
      });
    } catch (error) {
      addToast("error", error?.response?.data?.message || "Failed to load payroll data.");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCompanyPayroll = useCallback(async (month, year) => {
    try {
      const res = await api.get(`/payroll/company?month=${month}&year=${year}`);
      setCompanyPayroll(res.data?.data || []);
    } catch (error) {
      addToast("error", error?.response?.data?.message || "Failed to load company payroll.");
      setCompanyPayroll([]);
    }
  }, []);

  const fetchMyPayslips = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/payroll/my-payslips");
      setMyPayslips(res.data?.data || []);
    } catch (error) {
      addToast("error", error?.response?.data?.message || "Failed to load payslips.");
      setMyPayslips([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    
      fetchAdminBootstrap();
      fetchCompanyPayroll(companyFilter.month, companyFilter.year);
      fetchMyPayslips();
    
  }, [
   
    companyFilter.month,
    companyFilter.year,
    fetchAdminBootstrap,
    fetchCompanyPayroll,
    fetchMyPayslips,
  ]);

  const selectedEmployee = useMemo(() => {
    return employees.find((employee) => employee.employee?.id === salaryForm.employeeId) || null;
  }, [employees, salaryForm.employeeId]);

  const handleSalaryChange = (event) => {
    const { name, value } = event.target;
    setSalaryForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmployeeSelect = (event) => {
    const selectedEmployeeId = event.target.value;
    const target = employees.find((employee) => employee.employee?.id === selectedEmployeeId);
    const structure = target?.employee?.salaryStructure;

    setSalaryForm({
      employeeId: selectedEmployeeId,
      baseSalary: structure?.baseSalary?.toString() || "",
      allowances: structure?.allowances?.toString() || "",
      taxRate: structure?.taxRate?.toString() || "",
    });
  };

  const handleSetSalary = async (event) => {
    event.preventDefault();

    if (!salaryForm.employeeId || !salaryForm.baseSalary) {
      addToast("error", "Employee and base salary are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/payroll/structure", {
        employeeId: salaryForm.employeeId,
        baseSalary: Number(salaryForm.baseSalary),
        allowances: salaryForm.allowances ? Number(salaryForm.allowances) : 0,
        taxRate: salaryForm.taxRate ? Number(salaryForm.taxRate) : 0,
      });

      const updated = res.data?.data;
      addToast("success", res.data?.message || "Salary structure saved successfully.");
      if (updated) {
        setSalaryForm((prev) => ({
          ...prev,
          baseSalary: updated.baseSalary?.toString() || "",
          allowances: updated.allowances?.toString() || "",
          taxRate: updated.taxRate?.toString() || "",
        }));
      }
      await fetchAdminBootstrap();
    } catch (error) {
      addToast("error", error?.response?.data?.message || "Failed to save salary structure.");
    } finally {
      setLoading(false);
    }
  };

  const handleGeneratePayroll = async (event) => {
    event.preventDefault();

    if (!generateForm.month || !generateForm.year) {
      addToast("error", "Month and year are required.");
      return;
    }

    setLoading(true);
    try {
      const generatedMonth = Number(generateForm.month);
      const generatedYear = Number(generateForm.year);

      const res = await api.post("/payroll/generate", {
        month: generatedMonth,
        year: generatedYear,
      });

      addToast("success", res?.data?.message || "Payroll generated.");
      setCompanyFilter({ month: generatedMonth, year: generatedYear });
      await fetchCompanyPayroll(generatedMonth, generatedYear);
    } catch (error) {
      addToast("error", error?.response?.data?.message || "Payroll generation failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoadCompanyPayroll = async (event) => {
    event.preventDefault();
    await fetchCompanyPayroll(Number(companyFilter.month), Number(companyFilter.year));
  };

 

  if (loading ) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-2 md:p-0">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      {loading ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SummaryCard title="Total Records" value={companyPayroll.length} />
            <SummaryCard title="Total Net Pay" value={currency(totalCompanyNetPay)} />
            <SummaryCard title="Without Salary" value={unassignedEmployees.length} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
          </div>

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
        </div>
      ) : (
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
      )}
    </div>
  );
}

function SummaryCard({ title, value }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl font-semibold text-[#021f54] mt-1">{value}</p>
    </div>
  );
}

function InputField({ label, name, value, onChange, required = false }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type="number"
        min="0"
        step="0.01"
        name={name}
        value={value}
        required={required}
        onChange={onChange}
        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#021f54]"
      />
    </div>
  );
}
