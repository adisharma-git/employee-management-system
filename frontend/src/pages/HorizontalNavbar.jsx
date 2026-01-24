export default function HorizontalNavbar({ selectedTab, setSelectedTab }) {
  const handleLogout = () => {
    window.location.href = '/login';
  }
  const handleNavigateHelpPage = () => {
    window.location.href = '/dashboardNew/help';
  }
  return (
    <nav className="bg-[#021f54] border-b border-[#021f54] shadow-sm sticky top-0 z-40">
      <div className="px-8">
        <div className="flex items-center justify-between h-14">
          <div className="font-semibold text-white">
          </div>

          
          <div className="flex items-center gap-10 text-sm font-medium text-white">

            <button
              onClick={() => setSelectedTab("employees")}
              className={
                selectedTab === "employees"
                  ? "text-orange-500 border-b-2 border-orange-500 pb-1"
                  : "text-white-500 hover:text-orange-500 pb-1"
              }
            >
              Employees
            </button>

            <button
              onClick={() => setSelectedTab("Attendance")}
              className={
                selectedTab === "Attendance"
                  ? "text-orange-500 border-b-2 border-orange-500 pb-1"
                  : "text-white-500 hover:text-orange-500 pb-1"
              }
            >
              Attendance
            </button>

            <button
              onClick={() => setSelectedTab("reports")}
              className={
                selectedTab === "reports"
                  ? "text-orange-500 border-b-2 border-orange-500 pb-1"
                  : "text-white-500 hover:text-orange-500 pb-1"
              }
            >
              Reports
            </button>

          </div>


          <div className="flex items-center gap-6 text-sm font-medium">
            <button className="text-white hover:text-orange-400 transition"onClick={handleNavigateHelpPage}>
              Help
            </button>

            <button
              className="text-white hover:text-orange-400 transition"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>


        </div>
      </div>
    </nav>
  )
}
