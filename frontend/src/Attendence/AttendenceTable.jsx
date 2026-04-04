import React from 'react';
import TableRow from './TableRow';

const AttendanceTable = ({ employees, currentPage = null, totalPages = null, totalRecords = 0, onPageChange = null }) => {
  const isPaginated = currentPage !== null && totalPages !== null;

  const handlePrevPage = () => {
    if (onPageChange && currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (onPageChange && currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageButtons = () => {
    if (!isPaginated) return null;

    const buttons = [];
    const maxButtons = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);

    if (endPage - startPage < maxButtons - 1) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-3 py-1 text-sm rounded ${
            i === currentPage
              ? 'bg-[#021f54] text-white'
              : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

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
            <th className="px-6 py-4">Email</th>
            <th className="px-6 py-4">Date</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Check-In</th>
            <th className="px-6 py-4">Check-Out</th>
            <th className="px-6 py-4">Breaks</th>
            <th className="px-6 py-4">Total Hours</th>
          </tr>
        </thead>

        <tbody>
          {employees && employees.length > 0 ? (
            employees.map((employee) => (
              <TableRow key={employee.id} employee={employee} />
            ))
          ) : (
            <tr>
              <td colSpan="9" className="px-6 py-8 text-center text-gray-500">
                No employees found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {isPaginated && (
        <div className="bg-white px-6 py-4 border-t border-gray-100 flex justify-between items-center">
          <span className="text-sm text-gray-500">
            Showing {employees ? employees.length : 0} of {totalRecords} entries
          </span>
          <div className="flex gap-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage <= 1}
              className="px-3 py-1 text-sm border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {renderPageButtons()}
            <button
              onClick={handleNextPage}
              disabled={currentPage >= totalPages}
              className="px-3 py-1 text-sm border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceTable;
