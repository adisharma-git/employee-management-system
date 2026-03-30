import { useCallback, useEffect, useMemo, useState } from "react";
import api from "../../api/axios";
import { currentDate } from "../constants";

export const usePayrollData = (canViewAnyAdminPayrollData, canViewCompanyPayroll) => {
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
    try {
      setLoading(true);
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
    // 🔥 If user has ADMIN payroll permissions, load admin data
    if (canViewAnyAdminPayrollData) {
      fetchAdminBootstrap();
      if (canViewCompanyPayroll) {
        fetchCompanyPayroll(companyFilter.month, companyFilter.year);
      }
    }
    // 🔥 All users (admin & non-admin) load their own payslips
    fetchMyPayslips();
  }, [
    companyFilter.month,
    companyFilter.year,
    canViewAnyAdminPayrollData,
    canViewCompanyPayroll,
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
    if (!canViewCompanyPayroll) return;
    await fetchCompanyPayroll(Number(companyFilter.month), Number(companyFilter.year));
  };

  return {
    loading,
    setLoading,
    toasts,
    addToast,
    removeToast,
    employees,
    unassignedEmployees,
    companyPayroll,
    myPayslips,
    salaryForm,
    setSalaryForm,
    companyFilter,
    setCompanyFilter,
    generateForm,
    setGenerateForm,
    selectedEmployee,
    handleSalaryChange,
    handleEmployeeSelect,
    handleSetSalary,
    handleGeneratePayroll,
    handleLoadCompanyPayroll,
    totalCompanyNetPay,
  };
};
