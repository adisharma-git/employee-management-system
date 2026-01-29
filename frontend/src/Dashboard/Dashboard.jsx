import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import DashboardHome from "./DashboardHome";
import HorizontalNavbar from "../pages/HorizontalNavbar";
import Employees from "./Employees";
import Reports from "./Reports";
import EmployeeForm from "../User/User";
import Attendance from "../Attendence/attendence";
import api from "../api/axios";

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [userName, setUserName] = useState("User");

  useEffect(() => {
   const fetchUser = async () => {
  try {
    const response = await api.get("/employee/me");
    const userData = response.data.data; 
    if (userData?.name) {
      setUserName(userData.name);
    }
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};

    fetchUser();
  }, []);

  const handleEmployee = () => {
    alert("Coming Soon Stay Updated");
  };

  const renderContent = () => {
    switch (selectedTab) {
      case "employees":
        return <Employees/>;
      case "reports":
        return <Reports/>;
      case "EmployeeForm":
        return <EmployeeForm/>;
      case "Attendance":
        return <Attendance/>;
      case "performance":
      case "expenses":
      default:
        return <DashboardHome/>;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

      <div className="flex-1 flex flex-col">
        <HorizontalNavbar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

        <main className="flex-1 overflow-auto bg-gray-50 p-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Good afternoon, {userName}!
            </h2>

            <button
              onClick={handleEmployee}
              className="
                bg-[#021f54] text-white hover:bg-orange-400
                hover:text-black text-sm font-medium
                px-4 py-1.5
                rounded-md
                transition-colors duration-200
              "
            >
              + Add Employee
            </button>
          </div>

          {renderContent()}
        </main>
      </div>
    </div>
  );
}