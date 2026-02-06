import React from "react";

const EmployeePerformance = () => {
  const tasks = [
    { id: 1, title: "Design new landing page concept", status: "Completed" },
    { id: 2, title: "Create wireframes for signup flow", status: "Pending" },
    { id: 3, title: "User feedback analysis", status: "Completed" },
    { id: 4, title: "Prepare UI presentation stladies", status: "Overdue" },
    { id: 5, title: "Update component library in Figma", status: "Completed" },
    { id: 6, title: "Team meeting for feedback discussion", status: "Pending" },
    { id: 7, title: "Prepare UI presentation slides", status: "Overdue" },
  ];

  const getStatusStyles = (status) => {
    switch (status) {
      case "Completed":
        return "bg-[#E8F5E9] text-[#2E7D32]";
      case "Pending":
        return "bg-[#FFF8E1] text-[#F57F17]";
      case "Overdue":
        return "bg-[#FFEBEE] text-[#C62828]";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl p-6 shadow-sm border border-gray-100 font-sans">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-100">
          <img
            src="https://ui-avatars.com/api/?name=Akriti+Singh&background=random"
            alt="Akriti Singh"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="ml-4">
          <h2 className="text-lg font-bold text-gray-800 leading-tight">
            Akriti Singh
          </h2>
          <p className="text-xs text-gray-400 font-medium">
            EMP-2824-089 • Senior UI/UX Designer
          </p>
        </div>
      </div>
      <div className="flex gap-4 mb-8">
        <div className="flex-1 bg-[#F0F7FF] py-3 px-4 rounded-xl text-center border border-blue-50">
          <span className="text-blue-600 font-bold text-sm">Assigned: 6</span>
        </div>
        <div className="flex-1 bg-[#E8F5E9] py-3 px-4 rounded-xl text-center border border-green-50">
          <span className="text-green-600 font-bold text-sm">Completed: 4</span>
        </div>
        <div className="flex-1 bg-[#FFF8E1] py-3 px-4 rounded-xl text-center border border-yellow-50">
          <span className="text-yellow-600 font-bold text-sm">Pending: 2</span>
        </div>
      </div>
      <div className="overflow-hidden">
        <div className="flex justify-between items-center mb-4 px-2">
          <h3 className="text-sm font-bold text-gray-700">Tasks</h3>
          <h3 className="text-sm font-bold text-gray-700">Status</h3>
        </div>

        <div className="space-y-1">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors rounded-lg"
            >
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                <span className="text-sm text-gray-600 font-medium">
                  {task.title}
                </span>
              </div>
              <div
                className={`px-4 py-1 rounded-full text-[11px] font-bold min-w-[90px] text-center ${getStatusStyles(task.status)}`}
              >
                {task.status}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 px-2">
        <p className="text-xs text-gray-400 font-medium">
          Showing 6 out of 6 tasks
        </p>
      </div>
    </div>
  );
};

export default EmployeePerformance;
