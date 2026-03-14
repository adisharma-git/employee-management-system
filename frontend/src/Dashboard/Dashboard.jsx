import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import DashboardHome from "./DashboardHome";
import HorizontalNavbar from "../pages/HorizontalNavbar";
import Employees from "./Employees";
import Reports from "./Reports";
import EmployeeForm from "../User/User";
import Attendance from "../Attendence/Attendence";
import api from "../api/axios";
import TimeLogDashboard from "../DailyLogs/TimeLog";
import Settings from "./Settings";
import EmployeeRegistration from "../Admin/EmployeeRegistration";
import LeavesPage from "../LeavesSection/LeavesPage";
import AnnouncementPage from "../Announcement/Announcement";


export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [userName, setUserName] = useState("Login");
  const [permission,setPermission]=useState(false);

useEffect(() => {
  const fetchUser = async () => {
    try {
      const response = await api.get("/employee/me");
      const userData = response.data.data;

      if (userData?.name) {
        setUserName(userData.name);
      }

      if (userData?.user?.role === "admin") {
        setPermission(true);  
      } else {
        setPermission(false);  
      }

    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  fetchUser();
}, []);


  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const renderContent = () => {
    switch (selectedTab) {
      case "employees":
        return <Employees permission={permission}/>;
      case "reports":
        return <Reports permission={permission}/>;
      case "EmployeeForm":
        return <EmployeeForm/>;
      case "Attendance":
        return <Attendance/>;
      case "performance":
        return <TimeLogDashboard/>;
      case "adminRegistration":
        return <EmployeeRegistration permission={permission}/>;
      case "settings":
        return <Settings/>;
      case "LeavesPage":
        return <LeavesPage/>;
      case "Announcement":
        return <AnnouncementPage permission={permission}/>;
      default:
        return <DashboardHome/>;
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-white">
      <HorizontalNavbar
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-auto bg-gray-50 p-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {getGreeting()}, {userName}!
              </h2>
              {permission && (
                <button
                  onClick={() => setSelectedTab("adminRegistration")}
                  className="bg-[#021f54] text-white hover:bg-orange-400
    hover:text-black text-sm font-medium px-4 py-1.5
    rounded-md transition-colors duration-200"
                >
                  + Add Employee
                </button>
              )}
            </div>

            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
}
