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
import GithubCommits from "../ProjectActivity/ProjectCommits";
import PullRequests from "../ProjectActivity/Pull Requests";
import UpcomingMeetings from "../../ScheduledMeetings/UpcomingMeetings";
import Holidays from "../../Holidays/Holidays";
import Payroll from "../Payroll/Payroll";
import TaskManagement from "../TaskManagement/TaskManagement";


export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [userName, setUserName] = useState("Login");
  const [permission,setPermission]=useState(false);
  const [, setUserRole] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [employeeSearchQuery, setEmployeeSearchQuery] = useState("");
  const [searchTrigger, setSearchTrigger] = useState(0);

  const handleFilterSearch = () => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return;

    setEmployeeSearchQuery(searchTerm.trim());
    setSelectedTab("employees");
    setSearchTrigger((prev) => prev + 1);
  };

useEffect(() => {
  const fetchUser = async () => {
    try {
      const response = await api.get("/employee/me");
      const userData = response.data.data;

      if (userData?.name) {
        setUserName(userData.name);
      }

      setUserRole(userData?.user?.role || "");

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
        return (
          <Employees
            permission={permission}
            highlightQuery={employeeSearchQuery}
            searchTrigger={searchTrigger}
          />
        );
      case "reports":
        return <Reports />;
      case "EmployeeForm":
        return <EmployeeForm/>;
      case "Attendance":
        return <Attendance/>;
      case "performance":
        return <TimeLogDashboard/>;
      case "adminRegistration":
        return <EmployeeRegistration />;
      case "settings":
        return <Settings/>;
      case "LeavesPage":
        return <LeavesPage/>;
      case "Announcement":
        return <AnnouncementPage />;
        case "ProjectActivity":
        return <GithubCommits />;
        case "Pull Requests":
        return <PullRequests />;
        case "Meetings":
          return <UpcomingMeetings />
        case "Holidays":
          return <Holidays />;
      case "Payroll":
        return <Payroll />;
      case "TaskManagement":
        return <TaskManagement />;
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

              <div className="flex items-center gap-2">
                {selectedTab === "employees" && (
                  <>
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleFilterSearch();
                        }
                      }}
                      placeholder="Search employee"
                      className="w-28 sm:w-40 border border-gray-300 rounded-md px-2 py-1 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#021f54]"
                    />
                    
                  </>
                )}

                {permission && (
                  <button
                    onClick={() => setSelectedTab("adminRegistration")}
                    className="bg-[#021f54] text-white hover:bg-orange-400
    hover:text-black text-sm font-medium px-4 py-1.5
    rounded-md transition-colors duration-200"
                  >
                    <span className="hidden sm:inline">Add Employee</span>
                  </button>
                )}
              </div>
            </div>

            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
}
