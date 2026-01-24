import React, { useState } from 'react';
import AttendanceTable from './AttendenceTable';
import Tabs from './Tabs'; 
import AttendenceHeader from './attendenceheader';


const EMPLOYEES_DATA = [
  { id: 1, name: "Jamie Croquetas", email: "jamie@example.com", initials: "JC", date: "Jan 21, 2026", role: "Chief Editor", status: "Present", checkIn: "9:00 AM", checkOut: "6:00 PM", type: "Employment" },
  { id: 2, name: "Encarna Homie", email: "encarna@example.com", initials: "EH", date: "Jan 21, 2026", role: "Account Manager", status: "Present", checkIn: "8:45 AM", checkOut: "5:45 PM", type: "Employment" },
  { id: 3, name: "Cibeles Veterinario", email: "cibeles@example.com", initials: "CV", date: "Jan 21, 2026", role: "Brand Designer", status: "Late", checkIn: "10:15 AM", checkOut: "6:15 PM", type: "Contractor" },
  { id: 4, name: "Esteban BBVA", email: "esteban@example.com", initials: "EB", date: "Jan 21, 2026", role: "Client Support", status: "Present", checkIn: "9:05 AM", checkOut: "6:10 PM", type: "Employment" },
  { id: 5, name: "Iver Make Up", email: "iver@example.com", initials: "IM", date: "Jan 21, 2026", role: "Account Director", status: "Absent", checkIn: "--", checkOut: "--", type: "Contractor" },
];

const Attendance = () => {
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredEmployees = EMPLOYEES_DATA.filter((employee) => {
    if (filterStatus === 'All') return true; 
    return employee.status === filterStatus; 
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <AttendenceHeader/>
      <Tabs currentFilter={filterStatus} onFilterChange={setFilterStatus} />
      <main className="p-8">
        <AttendanceTable employees={filteredEmployees} />
      </main>
    </div>
  );
};

export default Attendance;