import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

const TableRow = ({ employee }) => {
  
  // Logic 1: Get Badge Color based on status
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Present': return 'bg-green-100 text-green-700';
      case 'Late': return 'bg-orange-100 text-orange-700';
      case 'Absent': return 'bg-red-100 text-red-700';
      case 'On Leave': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // Logic 2: Get Avatar Color based on initials
  const getAvatarColor = (initials) => {
    const colors = ['bg-orange-500', 'bg-blue-600', 'bg-purple-600', 'bg-teal-600'];
    // Pick a color based on the character code of the first letter
    return colors[initials.charCodeAt(0) % colors.length];
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0">
      
      {/* 1. Checkbox */}
      <td className="px-6 py-4">
        <input type="checkbox" className="rounded text-[#f97316] focus:ring-[#f97316] cursor-pointer" />
      </td>

      {/* 2. Employee Detail (Avatar + Name) */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${getAvatarColor(employee.initials)}`}>
            {employee.initials}
          </div>
          <div>
            <div className="font-bold text-gray-900">{employee.name}</div>
            <div className="text-gray-400 text-xs">{employee.email}</div>
          </div>
        </div>
      </td>

      {/* 3. Date */}
      <td className="px-6 py-4 text-gray-600 font-medium">
        {employee.date}
      </td>

      {/* 4. Job Title */}
      <td className="px-6 py-4 text-gray-600">
        {employee.role}
      </td>

      {/* 5. Status Badge */}
      <td className="px-6 py-4">
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusBadge(employee.status)}`}>
          {employee.status}
        </span>
      </td>

      {/* 6. Check-In/Out */}
      <td className="px-6 py-4">
        <div className="text-gray-700 text-xs">
          <span className="font-semibold text-gray-500">In:</span> {employee.checkIn}
        </div>
        <div className="text-gray-700 text-xs mt-1">
          <span className="font-semibold text-gray-500">Out:</span> {employee.checkOut}
        </div>
      </td>

      {/* 7. Employment Type */}
      <td className="px-6 py-4 text-gray-600">
        {employee.type}
      </td>

      {/* 8. Action Button */}
      <td className="px-6 py-4 text-center">
        <button className="text-gray-400 hover:text-gray-600 p-2">
          <FontAwesomeIcon icon={faEllipsisV} />
        </button>
      </td>

    </tr>
  );
};

export default TableRow;