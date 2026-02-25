import React, { useState, useEffect } from 'react';
import api from "../api/axios";
import Loader from '../Loader/Loader';
import AccessRestricted from '../Components/AccessRestricted';
import EmployeeTable from './EmployeeTable';

const Attendance = ({ permission }) => {
  console.log(permission);
  const [Employee, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAllEmployees();
  }, []);

  const fetchAllEmployees = async () => {
  setLoading(true);
  try {
    const response = await api.get("/admin/employees");
    const data = response.data?.data;

    console.log("Fetched employee data:", data);

    if (!data || data.length === 0) {
      setEmployees([]);
      return;
    }

    const formattedEmployees = data.map((emp) => ({
      id: emp.id,
      email: emp.email,
      role: emp.employee?.designation || "-",
      department: emp.employee?.department || "-",
      date: emp.employee?.dateOfJoining
        ? new Date(emp.employee.dateOfJoining).toLocaleDateString()
        : "-",
      name:emp.employee?.name ||"-",
    }));

    setEmployees(formattedEmployees);
  } catch (error) {
    console.log("Punch status error:", error);
    setEmployees([]);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gray-50">
      {permission ? (
        <main className="p-8">
          {loading ? <Loader /> : <EmployeeTable Employee={Employee} />}
        </main>
      ) : (
        <AccessRestricted />
      )}
    </div>
  );
};

export default Attendance;
