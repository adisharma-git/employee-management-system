import { useState } from "react";

export default function Sidebar({ selectedTab, setSelectedTab }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { key: "dashboard", icon: "fas fa-chart-line", label: "Dashboard" },
    { key: "EmployeeForm", icon: "fas fa-people-group", label: "Employees" },
    { key: "performance", icon: "fas fa-clock", label: "Performance" },
    { key: "adminRegistration", icon: "fas fa-user-plus", label: "Add Employee" },
    { key: "Pull Requests", icon: "fab fa-github", label: "Pull Requests" },
    { key: "Meetings", icon: "fa-solid fa-calendar-check", label: "Meetings" },
    { key: "Holidays", icon: "fa-solid fa-calendar-days", label: "Holidays" },
  ];

  return (
    <>
      {/* 🔹 Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-[#021f54] text-white p-2 rounded shadow"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        ☰
      </button>

      {/* 🔹 Overlay (mobile) */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}

      {/* 🔹 Sidebar */}
      <div
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className={`
          fixed md:static z-50 h-full bg-[#021f54] text-white flex flex-col justify-between
          transition-all duration-300 ease-in-out overflow-hidden
          ${isOpen ? "md:w-56" : "md:w-16"}
          ${mobileOpen ? "w-56 left-0" : "w-56 -left-56"}
          md:left-0
        `}
      >
        {/* Top Menu Items */}
        <div className="flex flex-col gap-2 p-3 mt-10 md:mt-0">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                setSelectedTab(item.key);
                setMobileOpen(false);
              }}
              className={`flex items-center gap-3 p-3 rounded-lg
                ${
                  selectedTab === item.key
                    ? "bg-orange-500 text-white"
                    : "hover:bg-white hover:text-black"
                } transition-colors duration-200`}
            >
              <i className={`${item.icon} min-w-[20px] text-lg`}></i>
              <span
                className={`transition-all duration-300 ease-in-out
                  ${isOpen || mobileOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"}
                `}
              >
                {item.label}
              </span>
            </button>
          ))}
        </div>

        {/* Bottom Settings */}
        <div className="p-3">
          <button
            onClick={() => setSelectedTab("settings")}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-white hover:text-black transition-colors duration-200"
          >
            <i className="fas fa-gear min-w-[20px] text-lg"></i>
            {(isOpen || mobileOpen) && <span>Settings</span>}
          </button>
        </div>
      </div>
    </>
  );
}