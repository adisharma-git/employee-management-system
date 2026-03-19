import { useState } from 'react';

export default function HorizontalNavbar({ selectedTab, setSelectedTab }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => window.location.href = "/login";
  const handleNavigateHelpPage = () => window.open("/dashboardNew/help", "_blank");

  const navTabs = [
    { id: "employees", label: "Employees" },
    { id: "Attendance", label: "Attendance" },
    { id: "LeavesPage", label: "Leaves" },
    { id: "reports", label: "Reports" },
    { id: "Announcement", label: "Announcement" },
    { id: "ProjectActivity", label: "ProjectActivity" },
  ];

  return (
    <nav className="bg-[#021f54] sticky top-0 z-50 w-full border-b border-blue-900">
      <div className="flex items-center justify-between h-14 px-4 md:px-6 relative">
        
        {/* Left: Logo */}
        <div className="flex items-center gap-2 z-20">
          <img
            src="/logo.png"
            alt="WorkAligner Logo"
            className="w-11 h-11 object-contain rounded-lg"
          />
          <span className="hidden md:flex text-base font-semibold tracking-wide">
            <span className="text-white">Work</span>
            <span className="text-orange-500">Alignr</span>
          </span>
        </div>

        {/* Center Nav Tabs (hidden on small screens) */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-10 text-sm font-medium text-white">
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

        {/* Right: Help, Logout, Mobile Hamburger */}
        <div className="flex items-center gap-4 ml-auto">
          <button
            className="hover:text-orange-400 transition-colors text-sm md:text-base"
            onClick={handleNavigateHelpPage}
          >
            Help
          </button>

          <button
            className="hover:text-orange-400 transition-colors text-sm md:text-base"
            onClick={handleLogout}
          >
            Logout
          </button>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden ml-2 p-2 rounded text-white hover:bg-blue-800 transition z-30 relative"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#021f54] border-t border-blue-900 z-10 relative">
          {navTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setSelectedTab(tab.id);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-4 py-3 text-white hover:bg-blue-800 ${
                selectedTab === tab.id ? "bg-blue-700" : ""
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}