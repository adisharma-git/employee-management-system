import Loader from "../Loader/Loader";
import ToastContainer from "../Toaster/Toast";
import { usePermission } from "../hooks/usePermission";
import { usePayrollData } from "./hooks/usePayrollData";
import SummaryCards from "./sections/SummaryCards";
import SalaryStructure from "./sections/SalaryStructure";
import GeneratePayroll from "./sections/GeneratePayroll";
import CompanyPayroll from "./sections/CompanyPayroll";
import MyPayslips from "./sections/MyPayslips";

export default function Payroll() {
  const { can, canAny } = usePermission();

  const canViewCompanyPayroll = can("view_payroll");
  const canUpdatePayroll = can("update_payroll");
  const canGeneratePayroll = can("generate_payroll");
  const canViewAnyAdminPayrollData = canAny(["view_payroll", "update_payroll", "generate_payroll"]);

  const payrollData = usePayrollData(canViewAnyAdminPayrollData, canViewCompanyPayroll);

  if (payrollData.loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-2 md:p-0">
      <ToastContainer toasts={payrollData.toasts} onRemove={payrollData.removeToast} />

      {canViewAnyAdminPayrollData ? (
        <div className="space-y-6">
          {/* Summary Cards */}
          <SummaryCards
            totalRecords={payrollData.companyPayroll.length}
            totalNetPay={payrollData.totalCompanyNetPay}
            withoutSalary={payrollData.unassignedEmployees.length}
          />

          {/* Admin Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SalaryStructure
              canUpdatePayroll={canUpdatePayroll}
              employees={payrollData.employees}
              salaryForm={payrollData.salaryForm}
              handleEmployeeSelect={payrollData.handleEmployeeSelect}
              handleSalaryChange={payrollData.handleSalaryChange}
              handleSetSalary={payrollData.handleSetSalary}
              selectedEmployee={payrollData.selectedEmployee}
              loading={payrollData.loading}
            />

            <GeneratePayroll
              canGeneratePayroll={canGeneratePayroll}
              generateForm={payrollData.generateForm}
              setGenerateForm={payrollData.setGenerateForm}
              handleGeneratePayroll={payrollData.handleGeneratePayroll}
              unassignedEmployees={payrollData.unassignedEmployees}
              loading={payrollData.loading}
            />
          </div>

          {/* Company Payroll Table */}
          <CompanyPayroll
            canViewCompanyPayroll={canViewCompanyPayroll}
            companyPayroll={payrollData.companyPayroll}
            companyFilter={payrollData.companyFilter}
            setCompanyFilter={payrollData.setCompanyFilter}
            handleLoadCompanyPayroll={payrollData.handleLoadCompanyPayroll}
          />
        </div>
      ) : null}

      {/* My Payslips - Always visible */}
      <MyPayslips myPayslips={payrollData.myPayslips} loading={payrollData.loading} />
    </div>
  );
}
