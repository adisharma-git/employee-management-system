// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

const TableRow = ({ employee }) => {


  const getStatusBadge = (status) => {
   
    switch (status) {
      case 'Present': return 'bg-green-100 text-green-700';
      case 'Late': return 'bg-orange-100 text-orange-700';
      case 'Absent': return 'bg-red-100 text-red-700';
      case 'On Leave': return 'bg-blue-100 text-blue-700';
      default: return 'bg-green-100 text-green-700';
    }
   
  };



  return (
    
    <tr className="hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0">


      <td className="px-6 py-4">
        <input type="checkbox" className="rounded text-[#f97316] focus:ring-[#f97316] cursor-pointer" />
      </td>


      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div>
            <div className="font-bold text-gray-900">{employee.name}</div>
            <div className="text-gray-400 text-xs">hp4758646@gmail.com</div>
          </div>
        </div>
      </td>

      <td className="px-6 py-4 text-gray-600 font-medium">
        {employee.date}
      </td>


      <td className="px-6 py-4 text-gray-600">
        {employee.role}
      </td>

      <td className="px-6 py-4">
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusBadge(employee.status)}`}>
          {employee.status}
        </span>
      </td>


      <td className="px-6 py-4">
        <div className="text-gray-700 text-xs">
          <span className="font-semibold text-gray-500">In:</span> {employee.checkIn}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-gray-700 text-xs mt-1">
          <span className="font-semibold text-gray-500">Out:</span> {employee.checkOut}
        </div>
      </td>
      


      <td className="px-6 py-4 text-gray-600">
        {employee.department}
      </td>
      <td className="px-6 py-4 text-gray-600 font-medium">
        {/* {totalTime} */}
      </td>


      {/* <td className="px-6 py-4 text-center">
        <button className="text-gray-400 hover:text-gray-600 p-2">
          <FontAwesomeIcon icon={faEllipsisV} />
        </button>
      </td> */}

    </tr>
  );
};

export default TableRow;