import React from 'react';

export default function HorizontalNavbar({ selectedTab, setSelectedTab }) {

  const handleLogout = () => {
    window.location.href = "/login";
  };

  const handleNavigateHelpPage = () => {
    window.location.href = '/dashboardNew/help';
    window.open("/dashboardNew/help", "_blank");
  };

  
  const navTabs = [
    { id: "employees", label: "Employees" },
    { id: "Attendance", label: "Attendance" },
    { id: "reports", label: "Reports" }
  ];

  return (
    <nav className="bg-[#021f54] sticky top-0 z-40 w-full border-b border-blue-900">
      <div className="flex h-14 items-center">
        <div className="w-16 flex-shrink-0" />

        <div className="flex-1 flex items-center justify-between px-6 relative h-full">

          
          <div className="flex items-center">
            <img 
                src="/logo.png" 
                alt="Worlaligner Logo" 
                className="w-10 h-10 object-contain rounded-lg" 
              /> 
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-10 text-sm font-medium text-white">
            {navTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`transition-all duration-200 pb-1 border-b-2 ${
                  selectedTab === tab.id
                    ? "text-orange-500 border-orange-500"
                    : "text-white border-transparent hover:text-orange-400"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          
          <div className="flex items-center gap-6 text-sm font-medium text-white">
            <button
              className="hover:text-orange-400 transition-colors"
              onClick={handleNavigateHelpPage}
            >
              Help
            </button>

            <button
              className="hover:text-orange-400 transition-colors"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}