import React, { useState, useEffect } from 'react';
import AttendanceTable from './AttendenceTable';
// import Tabs from './Tabs'; 
import AttendenceHeader from './AttendenceHeader';
import api from "../api/axios";  
import Loader from '../Loader/Loader';

const Attendance = () => {
  // Today's Status
  const [todayEmployee, setTodayEmployee] = useState(null);
  const [employeeProfile, setEmployeeProfile] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [loadingToday, setLoadingToday] = useState(false);

  // Attendance History
  const [historyData, setHistoryData] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);

  // Fetch Today's Punch Status
  const fetchTodayAttendance = async () => {
    setLoadingToday(true);
    try {
      const response = await api.get("/attendance/punch-status");
      const data = response.data.data;
      const profile = {
        id: data.employee.id,
        name: data.employee.name,
        email: data.employee.email || "N/A",
        role: data.employee.designation || "",
        department: data.employee.department || "Not Assigned",
      };

      setEmployeeProfile(profile);

      const formattedEmployee = {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        date: data.todayAttendance?.date
          ? new Date(data.todayAttendance.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            })
          : "-",
        role: profile.role,
        status: data.todayAttendance?.status || "absent",
        checkIn: data.todayAttendance?.checkInTime
          ? new Date(data.todayAttendance.checkInTime).toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: true 
            })
          : "--",
        checkOut: data.todayAttendance?.checkOutTime
          ? new Date(data.todayAttendance.checkOutTime).toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: true 
            })
          : "--",
        department: profile.department,
        totalBreakMinutes: data.todayAttendance?.totalBreakMinutes || 0,
        breakHistory: data.todayAttendance?.breakHistory || [],
        totalHoursWorked: data.todayAttendance?.totalHoursWorked || 0,
      };

      setTodayEmployee([formattedEmployee]);
      return profile;
    } catch (error) {
      console.error("Failed to fetch today's attendance:", error);
      setTodayEmployee([]);
      return null;
    } finally {
      setLoadingToday(false);
    }
  };

  // Fetch Attendance History with Pagination
  const fetchAttendanceHistory = async (page = 1, profileOverride = null) => {
    setLoadingHistory(true);
    try {
      const response = await api.get("/attendance/my-attendance-history", {
        params: {
          page: page,
          pageSize: pageSize
        }
      });

      const data = response.data.data || [];
      const pagination = response.data.pagination || {};
      const profile = profileOverride || employeeProfile;

      const formattedHistory = data.map((record) => ({
        id: record.id,
        name: profile?.name || "N/A",
        email: profile?.email || "N/A",
        date: record.date ? new Date(record.date).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        }) : "-",
        role: profile?.role || "",
        status: record.status || "absent",
        checkIn: record.checkInTime
          ? new Date(record.checkInTime).toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: true 
            })
          : "--",
        checkOut: record.checkOutTime
          ? new Date(record.checkOutTime).toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: true 
            })
          : "--",
        department: profile?.department || "",
        totalBreakMinutes: record.totalBreakMinutes || 0,
        breakHistory: record.breakHistory || [],
        totalHoursWorked: record.totalHoursWorked || 0,
      }));

      setHistoryData(formattedHistory);
      setCurrentPage(pagination.currentPage || 1);
      setTotalPages(pagination.totalPages || 1);
      setTotalRecords(pagination.totalRecords || 0);
    } catch (error) {
      console.error("Failed to fetch attendance history:", error);
      setHistoryData([]);
    } finally {
      setLoadingHistory(false);
    }
  };

  useEffect(() => {
    const initAttendance = async () => {
      const profile = await fetchTodayAttendance();
      await fetchAttendanceHistory(1, profile);
    };

    initAttendance();
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchAttendanceHistory(newPage, employeeProfile);
    }
  };

  const refreshAttendanceData = async () => {
    const profile = await fetchTodayAttendance();
    await fetchAttendanceHistory(currentPage, profile || employeeProfile);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AttendenceHeader refreshData={refreshAttendanceData} />

      {/* <Tabs currentFilter={filterStatus} onFilterChange={setFilterStatus} /> */}

      <main className="p-8 space-y-8">
        {/* TODAY'S ATTENDANCE SECTION */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Today's Status</h2>
          {loadingToday ? (
            <Loader />
          ) : todayEmployee && todayEmployee.length > 0 ? (
            <div className="overflow-x-auto">
              <AttendanceTable employees={todayEmployee} />
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No attendance data for today</p>
          )}
        </div>

        {/* ATTENDANCE HISTORY SECTION */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Attendance History</h2>
          {loadingHistory ? (
            <Loader />
          ) : (
            <div>
              <AttendanceTable 
                employees={historyData} 
                currentPage={currentPage}
                totalPages={totalPages}
                totalRecords={totalRecords}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
        </main>
        
    </div>
  );
};

export default Attendance;
