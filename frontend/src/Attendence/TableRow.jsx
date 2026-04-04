const TableRow = ({ employee }) => {
  const formatStatus = (status) => {
    const statusLower = status?.toLowerCase();
    switch (statusLower) {
      case 'present':
        return 'Present';
      case 'half-day':
        return 'Half-Day';
      case 'absent':
        return 'Absent';
      case 'break':
        return 'Break';
      case 'leave':
      case 'on-leave':
        return 'On Leave';
      default:
        return status;
    }
  };

  const formatHours = (hours) => {
    if (!hours || hours === 0) return '--';
    const wholeHours = Math.floor(hours);
    const minutes = Math.round((hours - wholeHours) * 60);
    return `${wholeHours}h ${minutes}min`;
  };

  const formatBreaks = (totalBreakMinutes = 0, breakHistory = []) => {
    const breakCount = Array.isArray(breakHistory) ? breakHistory.length : 0;
    const leftBreakTime = Math.max(0, 40 - totalBreakMinutes);
    
    return `${breakCount} break${breakCount !== 1 ? 's' : ''} • ${totalBreakMinutes}/40 mins • ${leftBreakTime} mins left`;
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0">
      <td className="px-6 py-4">
        <input
          type="checkbox"
          className="rounded text-[#f97316] focus:ring-[#f97316] cursor-pointer"
        />
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div>
            <div className="font-bold text-gray-900">{employee.name}</div>
          </div>
        </div>
      </td>

      <td className="px-6 py-4 text-gray-600 text-sm">
        {employee.email}
      </td>

      <td className="px-6 py-4 text-gray-600 font-medium">
        {employee.date}
      </td>

      <td className="px-6 py-4">
        <span className="px-3 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
          {formatStatus(employee.status)}
        </span>
      </td>

      <td className="px-6 py-4">
        <div className="text-gray-700 text-xs">
          <span className="font-semibold text-gray-500">In:</span> {employee.checkIn}
        </div>
      </td>

      <td className="px-6 py-4">
        <div className="text-gray-700 text-xs">
          <span className="font-semibold text-gray-500">Out:</span> {employee.checkOut}
        </div>
      </td>

      <td className="px-6 py-4 text-gray-600 text-xs">
        {formatBreaks(employee.totalBreakMinutes, employee.breakHistory)}
      </td>

      <td className="px-6 py-4 text-gray-600 font-medium">
        {formatHours(employee.totalHoursWorked)}
      </td>
    </tr>
  );
};

export default TableRow;