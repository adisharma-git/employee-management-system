// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

const EmployeeTableRow = ({ employee }) => {
  console.log(employee);
  console.log(employee.email);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Present":
        return "bg-green-100 text-green-700";
      case "Late":
        return "bg-orange-100 text-orange-700";
      case "Absent":
        return "bg-red-100 text-red-700";
      case "On Leave":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-green-100 text-green-700";
    }
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
        <div className="font-bold text-gray-900">{employee.name}</div>
      </td>

      <td className="px-6 py-4">
        <div className="font-bold text-gray-900">{employee.email}</div>
      </td>

      <td className="px-6 py-4 text-gray-600 font-medium">{employee.date}</td>

      <td className="px-6 py-4 text-gray-600">{employee.role}</td>

      <td className="px-6 py-4 text-gray-600">{employee.department}</td>
    </tr>
  );
};

export default EmployeeTableRow;
