import React, { useState } from "react";
const EMPLOYEE_DATA = {
  id: "EMP-2024-089",
  name: "Akriti",
  role: "Senior UI/UX Designer",
  dept: "Product Design",
  avatarUrl: "https://i.pravatar.cc/150?img=32",
  performance: {
    status: "Excellent",
    score: 92,
    consistency: "High Consistency",
    attendancePct: 96,
    summary:
      "Akriti has demonstrated exceptional consistency this month. Her adherence to core working hours is in the top 5% of the department, though minor adjustments to break timings could optimize availability for cross-team syncs.",
  },
  metrics: {
    totalHours: 168,
    requiredHours: 160,
    lateArrivals: 1,
    lateImpact: "Low Impact",
    leavesTaken: 2,
    leavesAllowed: 12,
    overtime: 8.5,
  },
};

const EmployeePerformance = () => {
  const [timeRange, setTimeRange] = useState("Monthly");

  const getStatusColor = (status) => {
    switch (status) {
      case "Excellent":
        return "bg-green-100 text-green-700 border-green-200";
      case "Good":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Needs Improvement":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return "text-green-600";
    if (score >= 75) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative">
              <img
                src={EMPLOYEE_DATA.avatarUrl}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-100 shadow-sm"
              />
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {EMPLOYEE_DATA.name}
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-xs">
                  {EMPLOYEE_DATA.id}
                </span>
                <span>•</span>
                <span>{EMPLOYEE_DATA.role}</span>
              </div>
              <div className="mt-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(EMPLOYEE_DATA.performance.status)}`}
                >
                  {EMPLOYEE_DATA.performance.status}
                </span>
              </div>
            </div>
          </div>

          <div className="flex bg-gray-100 p-1 rounded-lg">
            {["Daily", "Weekly", "Monthly"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  timeRange === range
                    ? "bg-white text-gray-800 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-blue-500 flex flex-col items-center justify-center text-center h-full">
            <h3 className="text-gray-500 font-semibold mb-4 uppercase text-xs tracking-wider">
              Overall Performance
            </h3>

            <div className="relative flex items-center justify-center">
              <svg className="w-40 h-40 transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="currentColor"
                  strokeWidth="10"
                  fill="transparent"
                  className="text-gray-100"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="currentColor"
                  strokeWidth="10"
                  fill="transparent"
                  strokeDasharray={440}
                  strokeDashoffset={
                    440 - (440 * EMPLOYEE_DATA.performance.score) / 100
                  }
                  className={`${getScoreColor(EMPLOYEE_DATA.performance.score)} transition-all duration-1000 ease-out`}
                />
              </svg>
              <span
                className={`absolute text-5xl font-bold ${getScoreColor(EMPLOYEE_DATA.performance.score)}`}
              >
                {EMPLOYEE_DATA.performance.score}
              </span>
            </div>

            <p className="mt-4 text-gray-400 text-sm font-medium">
              Top Performer (Top 5%)
            </p>
          </div>

          {/* 2. Work & Hours Details */}
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between space-y-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-gray-700 font-bold text-lg">
                <i className="fa-regular fa-clock mr-2 text-blue-500"></i> Work
                Hours
              </h3>
              <span className="text-xs text-gray-400">
                Target: {EMPLOYEE_DATA.metrics.requiredHours}h
              </span>
            </div>

            <div className="space-y-6">
              {/* Total Hours */}
              <div>
                <div className="flex justify-between items-end mb-1">
                  <span className="text-sm text-gray-500">Total Worked</span>
                  <span className="text-2xl font-bold text-gray-800">
                    {EMPLOYEE_DATA.metrics.totalHours}{" "}
                    <span className="text-sm font-normal text-gray-400">
                      hrs
                    </span>
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: "100%" }}
                  ></div>
                </div>
              </div>

              {/* Overtime */}
              <div className="bg-blue-50 p-4 rounded-lg flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-blue-800 uppercase tracking-wide">
                    Overtime Contribution
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    Positive impact on project delivery
                  </p>
                </div>
                <div className="text-xl font-bold text-blue-700">
                  +{EMPLOYEE_DATA.metrics.overtime}h
                </div>
              </div>
            </div>
          </div>

          {/* 3. Attendance & Leaves */}
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between space-y-6">
            <h3 className="text-gray-700 font-bold text-lg">
              <i className="fa-regular fa-calendar-check mr-2 text-orange-500"></i>{" "}
              Attendance
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {/* Late Arrivals */}
              <div className="border border-gray-100 rounded-lg p-4 text-center hover:shadow-sm transition">
                <div className="text-red-500 text-2xl font-bold mb-1">
                  {EMPLOYEE_DATA.metrics.lateArrivals}
                </div>
                <div className="text-xs text-gray-500 font-medium">
                  Late Arrivals
                </div>
                <div className="mt-2 text-[10px] bg-red-100 text-red-600 py-0.5 px-2 rounded-full inline-block">
                  {EMPLOYEE_DATA.metrics.lateImpact}
                </div>
              </div>

              {/* Leaves */}
              <div className="border border-gray-100 rounded-lg p-4 text-center hover:shadow-sm transition">
                <div className="text-gray-800 text-2xl font-bold mb-1">
                  {EMPLOYEE_DATA.metrics.leavesTaken}
                  <span className="text-gray-300 text-lg">
                    /{EMPLOYEE_DATA.metrics.leavesAllowed}
                  </span>
                </div>
                <div className="text-xs text-gray-500 font-medium">
                  Leaves Used
                </div>
                <div className="mt-2 text-[10px] bg-green-100 text-green-600 py-0.5 px-2 rounded-full inline-block">
                  Within Limit
                </div>
              </div>
            </div>

            {/* Attendance Progress */}
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-gray-500 font-semibold">
                  Consistency Rating
                </span>
                <span className="text-green-600 font-bold">
                  {EMPLOYEE_DATA.performance.consistency}
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full shadow-inner"
                  style={{
                    width: `${EMPLOYEE_DATA.performance.attendancePct}%`,
                  }}
                ></div>
              </div>
              <div className="text-right text-xs text-gray-400 mt-1">
                {EMPLOYEE_DATA.performance.attendancePct}% Attendance
              </div>
            </div>
          </div>
        </div>

        {/* --- Insights Section --- */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl shadow-lg p-6 text-white flex items-start gap-4">
          <div className="mt-1 bg-white/20 p-2 rounded-full">
            <i className="fa-solid fa-lightbulb text-yellow-300 text-xl"></i>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-1">Performance Insight</h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              {EMPLOYEE_DATA.performance.summary}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeePerformance;
