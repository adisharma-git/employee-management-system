import React, { useState } from 'react';
import AttendanceTable from './AttendenceTable';
import Tabs from './Tabes'; 
import AttendenceHeader from './attendenceheader';

// Data
const EMPLOYEES_DATA = [
  { id: 1, name: "Jamie Croquetas", email: "jamie@example.com", initials: "JC", date: "Jan 21, 2026", role: "Chief Editor", status: "Present", checkIn: "9:00 AM", checkOut: "6:00 PM", type: "Employment" },
  { id: 2, name: "Encarna Homie", email: "encarna@example.com", initials: "EH", date: "Jan 21, 2026", role: "Account Manager", status: "Present", checkIn: "8:45 AM", checkOut: "5:45 PM", type: "Employment" },
  { id: 3, name: "Cibeles Veterinario", email: "cibeles@example.com", initials: "CV", date: "Jan 21, 2026", role: "Brand Designer", status: "Late", checkIn: "10:15 AM", checkOut: "6:15 PM", type: "Contractor" },
  { id: 4, name: "Esteban BBVA", email: "esteban@example.com", initials: "EB", date: "Jan 21, 2026", role: "Client Support", status: "Present", checkIn: "9:05 AM", checkOut: "6:10 PM", type: "Employment" },
  { id: 5, name: "Iver Make Up", email: "iver@example.com", initials: "IM", date: "Jan 21, 2026", role: "Account Director", status: "Absent", checkIn: "--", checkOut: "--", type: "Contractor" },
  { id: 6, name: "Agustin Trabajo", email: "agustin@example.com", initials: "AT", date: "Jan 21, 2026", role: "Motion Designer", status: "Present", checkIn: "8:50 AM", checkOut: "5:55 PM", type: "Employment" },
  { id: 7, name: "Iyanmis Santander", email: "iyanmis@example.com", initials: "IS", date: "Jan 21, 2026", role: "Marketing Director", status: "On Leave", checkIn: "--", checkOut: "--", type: "Employment" },
  { id: 8, name: "Robert Fox", email: "robert@example.com", initials: "RF", date: "Jan 21, 2026", role: "Client Support", status: "Present", checkIn: "9:10 AM", checkOut: "6:05 PM", type: "Contractor" },
  { id: 9, name: "Darlene Robertson", email: "darlene@example.com", initials: "DR", date: "Jan 21, 2026", role: "Product Manager", status: "Late", checkIn: "9:45 AM", checkOut: "6:45 PM", type: "Employment" },
  { id: 10, name: "Theresa Webb", email: "theresa@example.com", initials: "TW", date: "Jan 21, 2026", role: "UX Researcher", status: "Present", checkIn: "9:00 AM", checkOut: "6:00 PM", type: "Employment" },
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