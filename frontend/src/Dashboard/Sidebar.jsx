export default function Sidebar({ selectedTab, setSelectedTab }) {

  const handleSettings = () => {
    setSelectedTab("settings");
  };

  const handleLogout = () => {
    window.location.href = "/login";
  };

  return (
    <div className="w-16 bg-[#021f54] border-r border-blue-900 flex flex-col items-center py-6 justify-between">

      <div className="flex flex-col gap-6">

        <button
          onClick={() => setSelectedTab("dashboard")}
          title="Dashboard"
          className={
            selectedTab === "dashboard"
              ? "w-12 h-12 bg-orange-500 text-white rounded-lg flex items-center justify-center shadow-lg"
              : "w-12 h-12 text-gray-400 rounded-lg flex items-center justify-center hover:bg-gray-100"
          }
        >
          <i className="fas fa-chart-line"></i>
        </button>

        <button
          onClick={() => setSelectedTab("EmployeeForm")}
          title="EmployeeForm"
          className={
            selectedTab === "EmployeeForm"
              ? "w-12 h-12 bg-orange-500 text-white rounded-lg flex items-center justify-center shadow-lg"
              : "w-12 h-12 text-gray-400 rounded-lg flex items-center justify-center hover:bg-gray-100"
          }
        >
          <i className="fas fa-people-group"></i>
        </button>

        <button
          onClick={() => setSelectedTab("performance")}
          title="Performance"
          className={
            selectedTab === "performance"
              ? "w-12 h-12 bg-orange-500 text-white rounded-lg flex items-center justify-center shadow-lg"
              : "w-12 h-12 text-gray-400 rounded-lg flex items-center justify-center hover:bg-gray-100"
          }
        >
          <i className="fas fa-clock"></i>
        </button>

        <button
          onClick={() => setSelectedTab("expenses")}
          title="Expenses"
          className={
            selectedTab === "expenses"
              ? "w-12 h-12 bg-orange-500 text-white rounded-lg flex items-center justify-center shadow-lg"
              : "w-12 h-12 text-gray-400 rounded-lg flex items-center justify-center hover:bg-gray-100"
          }
        >
          <i className="fas fa-money-bill"></i>
        </button>
      </div>
      <div className="flex flex-col gap-4">
    
        <button
          onClick={handleLogout}
          className="w-12 h-12 text-gray-400 rounded-lg flex items-center justify-center hover:bg-red-100 hover:text-red-500"
        >
          <i className="fas fa-sign-out-alt"></i>
        </button>
        <button
          onClick={handleSettings}
          className={
            selectedTab === "settings"
              ? "w-12 h-12 bg-orange-500 text-white rounded-lg flex items-center justify-center shadow-lg"
              : "w-12 h-12 text-gray-400 rounded-lg flex items-center justify-center hover:bg-gray-100"
          }
        >
          <i className="fas fa-gear"></i>
        </button>

      </div>
    </div>
  );
}
