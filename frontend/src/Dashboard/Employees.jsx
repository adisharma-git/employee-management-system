import React, { useState, useEffect } from 'react';
import api from "../api/axios";
import AttendanceTable from '../Attendence/AttendenceTable';
import Loader from '../Loader/Loader';
import AccessRestricted from '../Components/AccessRestricted';

const Attendance = ({ permission }) => {
  console.log(permission);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPunchStatus();
  }, []);

  const fetchPunchStatus = async () => {
    setLoading(true);
    try {
      const response = await api.get("/attendance/punch-status");
      const data = response.data?.data;
      console.log("Fetched punch status data:", data);

      if (!data || !data.employee) {
        setEmployees([]);
        return;
      }

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
        department: data.employee.department,
      };

      setEmployees([formattedEmployee]);
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
          {loading ? <Loader /> : <AttendanceTable employees={employees} />}
        </main>
      ) : (
        <AccessRestricted />
      )}
    </div>
  );
};

export default Attendance;
