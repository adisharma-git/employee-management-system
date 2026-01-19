export default function Sidebar({ selectedTab, setSelectedTab }) {
  return (
    <div className="w-16 bg-[#021f54] border-r border-gray-200 flex flex-col items-center py-8">


      <div className="w-12 h-12 bg-gradient-to-br from-white to-white 
                      rounded-lg flex items-center justify-center text-black
                      font-bold mb-8 text-lg">
        L
      </div>


      <div className="flex flex-col gap-6">

        <button
          onClick={() => setSelectedTab("dashboard")}
          title="Dashboard"
          className={
            selectedTab === "dashboard"
              ? "w-12 h-12 rounded-lg flex items-center justify-center text-lg bg-orange-500 text-white shadow-lg"
              : "w-12 h-12 rounded-lg flex items-center justify-center text-lg text-gray-400 hover:bg-gray-100"
          }
        >
          <i className="fas fa-chart-line"></i>
        </button>

        <button
          onClick={() => setSelectedTab("team")}
          title="My Team"
          className={
            selectedTab === "team"
              ? "w-12 h-12 rounded-lg flex items-center justify-center text-lg bg-orange-500 text-white shadow-lg"
              : "w-12 h-12 rounded-lg flex items-center justify-center text-lg text-gray-400 hover:bg-gray-100"
          }
        >
          <i className="fas fa-people-group"></i>
        </button>

        <button
          onClick={() => setSelectedTab("performance")}
          title="Performance"
          className={
            selectedTab === "performance"
              ? "w-12 h-12 rounded-lg flex items-center justify-center text-lg bg-orange-500 text-white shadow-lg"
              : "w-12 h-12 rounded-lg flex items-center justify-center text-lg text-gray-400 hover:bg-gray-100"
          }
        >
          <i className="fas fa-clock"></i>
        </button>

        <button
          onClick={() => setSelectedTab("expenses")}
          title="Expenses"
          className={
            selectedTab === "expenses"
              ? "w-12 h-12 rounded-lg flex items-center justify-center text-lg bg-orange-500 text-white shadow-lg"
              : "w-12 h-12 rounded-lg flex items-center justify-center text-lg text-gray-400 hover:bg-gray-100"
          }
        >
          <i className="fas fa-money-bill"></i>
        </button>

      </div>
    </div>
  );
}
