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
    { id: "LeavesPage", label: "Leaves" },
    { id: "reports", label: "Reports" },
    { id: "Announcement", label: "Announcement" },
    
    
  ];

  return (
    <nav className="bg-[#021f54] sticky top-0 z-40 w-full border-b border-blue-900">
      <div className="flex h-14 items-center">
        <div className="w-16 flex-shrink-0" />

        <div className="flex-1 flex items-center justify-between px-0 relative h-full">

          
          <div className="flex items-center ">
            <img 
                src="/logo.png" 
                alt="Worlaligner Logo" 
                className="w-11 h-11 object-contain rounded-lg" 
                
              /> 
              <span className="text-base font-semibold tracking-wide px-2">
                <span className="text-white">Work</span>
                <span className="text-orange-500">Alignr</span>
              </span>
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

          
          <div className="flex items-center gap-4 text-sm font-medium text-white">
            <button
              className="hover:text-orange-400 transition-colors"
              onClick={handleNavigateHelpPage}
            >
              Help
            </button>

            <button
              className="hover:text-orange-400 p-4 transition-colors"
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