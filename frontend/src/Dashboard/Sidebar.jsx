import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Sidebar({ selectedTab, setSelectedTab }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("permissions");
      localStorage.removeItem("isSuperAdmin");
      navigate("/login");
    }
  };

  const menuItems = [
    { key: "dashboard", icon: "fas fa-chart-line", label: "Dashboard" },
    // { key: "EmployeeForm", icon: "fas fa-people-group", label: "Profile" },
    { key: "performance", icon: "fas fa-clock", label: "Performance" },
    { key: "adminRegistration", icon: "fas fa-user-plus", label: "Add Employee" },
    { key: "Pull Requests", icon: "fab fa-github", label: "Pull Requests" },
    { key: "Meetings", icon: "fa-solid fa-calendar-check", label: "Meetings" },
    { key: "Holidays", icon: "fa-solid fa-calendar-days", label: "Holidays" },
    {key: "Permissions", icon: "fas fa-shield-alt", label: "Permissions"},
  ];

  return (
    <>
      
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-[#021f54] text-white p-2 rounded shadow"
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
          transition-all duration-300 ease-in-out overflow-hidden
          ${isOpen ? "md:w-56" : "md:w-16"}
          ${mobileOpen ? "w-56 left-0" : "w-56 -left-56"}
          md:left-0
        `}
      >

        <div className="flex flex-col flex-1 gap-6 p-2 mt-10 md:mt-0 justify-start">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                setSelectedTab(item.key);
                setMobileOpen(false);
              }}
              className={`flex items-center justify-center md:justify-start gap-3 p-3 rounded-lg transition-colors duration-200
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

        <div className="p-3">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center md:justify-start gap-3 p-3 rounded-lg hover:bg-white hover:text-black transition-colors duration-200"
          >
            <i className="fas fa-sign-out-alt min-w-[20px] text-lg"></i>
            {(isOpen || mobileOpen) && <span className="whitespace-nowrap">Logout</span>}
          </button>
        </div>
      </div>
    </>
  );
}