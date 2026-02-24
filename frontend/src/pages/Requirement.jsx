import React from "react";
import { useNavigate } from "react-router-dom";

const Requirement = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white py-16 px-6">
      <div className="text-center mb-12">
        <span className="bg-orange-100 text-orange-600 px-4 py-1 rounded-full text-sm font-semibold">
          CORE MODULES
        </span>

        <h2 className="text-4xl font-bold mt-4 text-gray-800">
          Our Three Essential HR Modules
        </h2>

        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Everything you need to manage your essential HR practices in an
          efficient manner. More modules are on the way!
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
 
        <div className="bg-blue-50 border border-blue-100 rounded-2xl shadow-md p-8 hover:shadow-xl transition">
          <div className="bg-[#021f54] w-14 h-14 flex items-center justify-center rounded-xl text-white text-xl">
            📅
          </div>

          <h3 className="text-xl font-semibold mt-6 text-gray-800">
            Attendance Management
          </h3>

          <p className="text-gray-600 mt-2">
            Track employee attendance, work hours, overtime worked, and late
            arrivals with great precision.
          </p>

          <h4 className="mt-5 font-semibold text-gray-800">
            Key Features:
          </h4>

          <ul className="mt-3 space-y-2 text-gray-700">
            <li className="text-blue-600">✔ Location Tracking</li>
            <li className="text-blue-600">✔ Real-time Reports</li>
            <li className="text-blue-600">✔ Shift Management</li>
          </ul>

          <div className="mt-6">
            <p className="font-bold text-lg text-gray-800">FREE</p>
            <p className="text-sm text-gray-500">
              First month • Then 50₹/employee
            </p>

            <button
              onClick={() => navigate("/AttendanceModule")}
              className="bg-[#021f54] hover:bg-[#021f54] w-full mt-4 text-white py-3 rounded-lg font-semibold transition"
            >
              Explore Attendance Module
            </button>
          </div>
        </div>

        <div className="bg-white border border-orange-200 rounded-2xl shadow-md p-8 hover:shadow-xl transition">
          <div className="bg-orange-500 w-14 h-14 flex items-center justify-center rounded-xl text-white text-xl">
            ⚖️
          </div>

          <h3 className="text-xl font-semibold mt-6 text-gray-800">
            Leave Management
          </h3>

          <p className="text-gray-600 mt-2">
            Streamline leave requests, approvals, and tracking with automated
            workflows and policies.
          </p>

          <h4 className="mt-5 font-semibold text-gray-800">
            Key Features:
          </h4>

          <ul className="mt-3 space-y-2 text-gray-700">
            <li className="text-orange-600">✔ Automated Approval Workflows</li>
            <li className="text-orange-600">✔ Leave Balance Tracking</li>
            <li className="text-orange-600">✔ Calendar Integration</li>
          </ul>

          <div className="mt-6">
            <p className="font-bold text-lg text-gray-800">FREE</p>
            <p className="text-sm text-gray-500">
              First month • Then 50₹/employee
            </p>

            <button
            onClick={() => navigate("/LeaveModule")} 
            className="bg-orange-500 hover:bg-orange-600 w-full mt-4 text-white py-3 rounded-lg font-semibold transition">
              Explore Leave Module
            </button>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-2xl shadow-md p-8 hover:shadow-xl transition">
          <div className="bg-[#021f54] w-14 h-14 flex items-center justify-center rounded-xl text-white text-xl">
            💰
          </div>

          <h3 className="text-xl font-semibold mt-6 text-gray-800">
            Salary Management
          </h3>

          <p className="text-gray-600 mt-2">
            Accurately process payroll, manage deductions, bonuses, and tax
            laws.
          </p>

          <h4 className="mt-5 font-semibold text-gray-800">
            Key Features:
          </h4>

          <ul className="mt-3 space-y-2 text-gray-700">
            <li className="text-blue-600">✔ Automated Payroll Processing</li>
            <li className="text-blue-600">✔ Tax Compliance</li>
            <li className="text-blue-600">✔ Salary Slip Generation</li>
          </ul>

          <div className="mt-6">
            <p className="font-bold text-lg text-gray-800">FREE</p>
            <p className="text-sm text-gray-500">
              First month • Then 50₹/employee
            </p>

            <button
            onClick={() => navigate("/SaleryModule")}
            className="bg-[#021f54] hover:bg-[#021f54] w-full mt-4 text-white py-3 rounded-lg font-semibold transition">
              Explore Salary Module
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Requirement;