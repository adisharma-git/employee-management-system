import React, { useState, useEffect } from 'react';
import AttendanceTable from './AttendenceTable';
import Tabs from './Tabs'; 
import AttendenceHeader from './Attendenceheader';
import api from "../api/axios";  
import Loader from '../Loader/Loader';

const Attendance = () => {
  const [employees, setEmployees] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [loading, setLoading] = useState(false);


  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const response = await api.get("/attendance/punch-status");
      const data = response.data.data;
      const formattedEmployee = {
        id: data.employee.id,
        name: data.employee.name,
        date: data.todayAttendance?.date
          ? new Date(data.todayAttendance.date).toLocaleDateString()
          : "-",
        role: data.employee.designation,
        status: data.todayAttendance?.status || "Absent",
        checkIn: data.todayAttendance?.checkInTime
          ? new Date(data.todayAttendance.checkInTime).toLocaleTimeString()
          : "--",
        checkOut: data.todayAttendance?.checkOutTime
          ? new Date(data.todayAttendance.checkOutTime).toLocaleTimeString()
          : "--",
        department: data.employee.department || "Not Assigned",
      };

      setEmployees([formattedEmployee]);
      console.log("Employees set:", [formattedEmployee]);
    } catch (error) {
      console.error("Failed to fetch attendance:", error);
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const filteredEmployees = employees.filter((employee) => {
    if (filterStatus === 'All') return true;
    return employee.status === filterStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <AttendenceHeader refreshData={fetchAttendance} />

      <Tabs currentFilter={filterStatus} onFilterChange={setFilterStatus} />

      <main className="p-8">
        {loading ? (
           <Loader/>
        ) : (
          <AttendanceTable employees={filteredEmployees} />
        )}
      </main>
    </div>
  );
};

export default Attendance;
