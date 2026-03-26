import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ selectedTab, setSelectedTab }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    navigate("/login");
  };

  const menuItems = [
    { key: "dashboard", icon: "fas fa-chart-line", label: "Dashboard" },
    // { key: "EmployeeForm", icon: "fas fa-people-group", label: "Profile" },
    { key: "performance", icon: "fas fa-clock", label: "Performance" },
    { key: "adminRegistration", icon: "fas fa-user-plus", label: "Add Employee" },
    { key: "Pull Requests", icon: "fab fa-github", label: "Pull Requests" },
    { key: "Meetings", icon: "fa-solid fa-calendar-check", label: "Meetings" },
    { key: "Holidays", icon: "fa-solid fa-calendar-days", label: "Holidays" },
  ];

  return (
    <>
      
      <button
        className={`md:hidden fixed top-4 left-4 z-50 bg-[#021f54] text-white p-2 rounded shadow ${
          mobileOpen ? "hidden" : "block"
        }`}
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        ☰
      </button>

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}

      <div
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className={`
          fixed md:static z-50 h-full bg-[#021f54] text-white flex flex-col
          transition-all duration-300 ease-in-out overflow-y-auto md:overflow-hidden
          ${isOpen ? "md:w-56" : "md:w-16"}
          ${mobileOpen ? "w-56 left-0" : "w-56 -left-56"}
          md:left-0
        `}
      >

        <div className="flex flex-col flex-1 gap-4 p-3 pt-16 md:pt-3 justify-start">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                setSelectedTab(item.key);
                setMobileOpen(false);
              }}
              className={`flex items-center justify-start gap-3 p-3 rounded-lg transition-colors duration-200
                ${
                  selectedTab === item.key
                    ? "bg-orange-500 text-white"
                    : "hover:bg-white hover:text-black"
                }`}
            >
              <i className={`${item.icon} min-w-[20px] text-lg`}></i>
              <span
                className={`transition-all duration-300 ease-in-out whitespace-nowrap
                  ${isOpen || mobileOpen ? "opacity-100 translate-x-0" : "hidden md:block opacity-0"}
                `}
              >
                {item.label}
              </span>
            </button>
          ))}
        </div>

        <div className="p-3 mt-auto">
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-start gap-3 p-3 rounded-lg hover:bg-white hover:text-black transition-colors duration-200"
          >
            <i className="fas fa-sign-out-alt min-w-[20px] text-lg"></i>
            {(isOpen || mobileOpen) && <span className="whitespace-nowrap">Logout</span>}
          </button>
        </div>
      </div>
    </>
  );
}