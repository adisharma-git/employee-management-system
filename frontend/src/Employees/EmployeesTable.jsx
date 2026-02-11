// import TableRow from '../Attendence/TableRow';

// const EmployeesTable = ({ employees }) => {
//   return (
//     <div className="overflow-x-auto shadow-sm rounded-lg border border-gray-200 bg-white">
//       <table className="min-w-full text-sm text-left">
        
        
//         <thead className="bg-[#021f54] text-white uppercase text-xs font-semibold tracking-wider">
//           <tr>
//             <th className="px-6 py-4 w-12">
//               <input type="checkbox" className="rounded text-[#f97316] focus:ring-[#f97316] cursor-pointer" />
//             </th>
//             <th className="px-6 py-4">Employee Name11</th>
//             <th className="px-6 py-4">Date</th>
//             <th className="px-6 py-4">Job Title</th>
//             <th className="px-6 py-4">Status</th>
//             <th className="px-6 py-4">Check-In/Out</th>
//             <th className="px-6 py-4">Employment Type</th>
//             <th className="px-6 py-4 text-center">Action</th>
//           </tr>
//         </thead>

        
//         <tbody>
          
//           {employees && employees.length > 0 ? (
//             employees.map((employee) => (
//               <TableRow key={employee.id} employee={employee} />
//             ))
//           ) : (
//             <tr>
//               <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
//                 No employees found.
//               </td>
//             </tr>
//           )}
//         </tbody>
        
//       </table>

  
//       <div className="bg-white px-6 py-4 border-t border-gray-100 flex justify-between items-center">
//         <span className="text-sm text-gray-500">Showing {employees ? employees.length : 0} entries</span>
//         <div className="flex gap-2">
//            <button className="px-3 py-1 text-sm border rounded hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
//            <button className="px-3 py-1 text-sm bg-[#021f54] text-white rounded">1</button>
//            <button className="px-3 py-1 text-sm border rounded hover:bg-gray-50">2</button>
//            <button className="px-3 py-1 text-sm border rounded hover:bg-gray-50">Next</button>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default EmployeesTable;