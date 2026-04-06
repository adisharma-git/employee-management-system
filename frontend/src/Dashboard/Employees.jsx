import React, { useState, useEffect } from 'react';
import api from "../api/axios";
import Loader from '../Loader/Loader';
import EmployeeTable from './EmployeeTable';

const Attendance = ({ highlightQuery = "", searchTrigger = 0 }) => {
  const [Employee, setEmployees] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAllEmployees();
  }, []);

  const fetchAllEmployees = async () => {
  setLoading(true);
  try {
    const response = await api.get("/admin/employees");
    const data = response.data?.data;
    const roleData = response.data?.roles;

    console.log("Fetched employee data:", data);

    if (!data || data.length === 0) {
      setEmployees([]);
    } else {
      const formattedEmployees = data.map((emp) => ({
        id: emp.id,
        email: emp.email,
        role: emp.role?.name || "-",
        designation: emp.employee?.designation || "-",
        department: emp.employee?.department || "-",
        date: emp.employee?.dateOfJoining
          ? new Date(emp.employee.dateOfJoining).toLocaleDateString()
          : "-",
        name: emp.employee?.name || emp.email || "-",
      }));

      setEmployees(formattedEmployees);
    }

    setRoles(Array.isArray(roleData) ? roleData : []);
  } catch (error) {
    console.log("Punch status error:", error);
    setEmployees([]);
    setRoles([]);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gray-50">
      <main className="p-8">
        {!loading && roles.length > 0 && (
          <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                  Available Roles
                </h2>
                <p className="text-sm text-gray-400">
                  Roles loaded from the backend role catalog
                </p>
              </div>
              <span className="text-sm font-medium text-gray-600">
                {roles.length} total
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {roles.map((role) => (
                <span
                  key={role.id}
                  className="rounded-full bg-[#021f54] px-3 py-1 text-xs font-semibold text-white"
                >
                  {role.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {loading ? (
          <Loader />
        ) : (
          <EmployeeTable
            Employee={Employee}
            highlightQuery={highlightQuery}
            searchTrigger={searchTrigger}
          />
        )}
      </main>
    </div>
  );
};

export default Attendance;
