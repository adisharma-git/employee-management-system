import React, { useEffect, useMemo } from "react";
import EmployeeTableRow from "./EmployeeTableRow";
// import TableRow from './TableRow';

const EmployeeTable = ({ Employee, highlightQuery = "", searchTrigger = 0 }) => {
  const normalizedQuery = highlightQuery.trim().toLowerCase();

  const highlightedIds = useMemo(() => {
    if (!normalizedQuery) return [];

    return (Employee || [])
      .filter((em) => {
        const name = (em.name || "").toLowerCase();
        const email = (em.email || "").toLowerCase();
        const role = (em.role || "").toLowerCase();
        const designation = (em.designation || "").toLowerCase();
        const department = (em.department || "").toLowerCase();
        return (
          name.includes(normalizedQuery) ||
          email.includes(normalizedQuery) ||
          role.includes(normalizedQuery) ||
          designation.includes(normalizedQuery) ||
          department.includes(normalizedQuery)
        );
      })
      .map((em) => em.id);
  }, [Employee, normalizedQuery]);

  useEffect(() => {
    if (!normalizedQuery || highlightedIds.length === 0) return;

    const firstMatchEl = document.getElementById(`employee-row-${highlightedIds[0]}`);
    if (firstMatchEl) {
      firstMatchEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [highlightedIds, normalizedQuery, searchTrigger]);

  return (
    <div className="overflow-x-auto shadow-sm rounded-lg border border-gray-200 bg-white">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-[#021f54] text-white uppercase text-xs font-semibold tracking-wider">
          <tr>
            <th className="px-6 py-4 w-12">
              <input
                type="checkbox"
                className="rounded text-[#f97316] focus:ring-[#f97316] cursor-pointer"
              />
            </th>
            <th className="px-6 py-4">Employee Name</th>
            <th className="px-6 py-4">Employee Email</th>
            <th className="px-6 py-4">Date</th>
            <th className="px-6 py-4">Role / Designation</th>
            <th className="px-6 py-4">Department</th>
          </tr>
        </thead>

        <tbody>
          {Employee && Employee.length > 0 ? (
            Employee.map((em) => (
              <EmployeeTableRow
                key={em.id}
                employee={em}
                isHighlighted={highlightedIds.includes(em.id)}
              />
            ))
          ) : (
            <tr>
              <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                No employees found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="bg-white px-6 py-4 border-t border-gray-100 flex justify-between items-center">
        <span className="text-sm text-gray-500">
          Showing {Employee ? Employee.length : 0} entries
        </span>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 text-sm border rounded hover:bg-gray-50 disabled:opacity-50"
            disabled
          >
            Previous
          </button>
          <button className="px-3 py-1 text-sm bg-[#021f54] text-white rounded">
            1
          </button>
          <button className="px-3 py-1 text-sm border rounded hover:bg-gray-50">
            2
          </button>
          <button className="px-3 py-1 text-sm border rounded hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTable;
