import { useEffect, useState } from "react";
import AnnouncementsCard from "./AnnouncementsCard";
import TaskCompletionCard from "./TaskCard";
import api from "../api/axios";
import CommitGraph from "../../ProjectActivity/CommitGraph";

const DashboardHome = () => {
  const [punchedIn, setPunchedIn] = useState(false);
  const [newEmployeesData, setNewEmployeesData] = useState([]);
  const [totalEmployees, setTotalEmployees] = useState(0);
   const [announcements, setAnnouncements] = useState([]);

  const announcementsData = [
    {
      title: "Workalingr Support Process Update – Important Announcement",
      time: "13 January 10:53 AM",
      avatar: "https://i.pravatar.cc/40?img=12",
    },
    {
      title: "Special Festival Permission – Lohri & Makar Sankranti",
      time: "13 January 10:41 AM",
      avatar: "https://i.pravatar.cc/40?img=32",
    },
    {
      title: "Update on Leave Policy",
      time: "12 January 4:34 PM",
      avatar: "https://i.pravatar.cc/40?img=22",
    },
  ];

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await api.get("/attendance/punch-status");
        setPunchedIn(response.data.data.isPunchedIn);
      } catch (error) {
        console.log("Punch status error:", error);
      }
    };

    fetchStatus();
  }, []);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await api.get("/admin/employees");
        const employees = response.data?.data || [];
        const count = response.data?.count || 0;

        setTotalEmployees(count);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const filteredEmployees = employees
          .filter((emp) => {
            if (!emp.employee?.dateOfJoining) return false;

            const joiningDate = new Date(emp.employee.dateOfJoining);
            joiningDate.setHours(0, 0, 0, 0);

            const diffTime = today.getTime() - joiningDate.getTime();
            const diffDays = diffTime / (1000 * 60 * 60 * 24);

            return diffDays >= 0 && diffDays <= 15;
          })
          .map((emp) => ({
            title: emp.employee.name,
            time: `Joined on ${new Date(
              emp.employee.dateOfJoining,
            ).toLocaleDateString()}`,
            avatar: "https://i.pravatar.cc/40",
          }));

        setNewEmployeesData(filteredEmployees);
      } catch (error) {
        console.log("Employees fetch error:", error);
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    api.get("/announcements?page=1&limit=10").then(res => {
      const formatted = res.data.data.map(item => ({
        title: item.title,
        time: new Date(item.createdAt).toLocaleString(),
        avatar: "https://ui-avatars.com/api/?name=" + item.author.email.split("@")[0]
      }));
      setAnnouncements(formatted);
    });
  }, []);

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4">
        <TaskCompletionCard
          title="Task Completion"
          percentage={98.57}
          label="Coming Soon"
          icon="fa-clipboard-check"
          accentColor="teal"
        />
        <TaskCompletionCard
          title="Task Assigned"
          percentage={98.56}
          label="Coming Soon"
          icon="fa-clipboard-check"
          accentColor="teal"
        />
        <TaskCompletionCard
          title="Attendance"
          percentage={98.56}
          label="Coming Soon"
          icon="fa-clipboard-check"
          accentColor="teal"
        />
        <TaskCompletionCard
          title="Leaves Report"
          percentage={1}
          label="Coming Soon"
          icon="fa-clipboard-check"
          accentColor="teal"
        />

        <TaskCompletionCard
          title="Total Employees"
          value={totalEmployees}
          label="Employees"
          icon="fa-users"
          accentColor="teal"
          isCount
        />

        <TaskCompletionCard
          title="Status"
          label={punchedIn ? "Punched In" : "Punched Out"}
          icon="fa-clipboard-check"
          isPunchedIn={punchedIn}
        />
      </div>

      <div className="flex w-full mt-6 gap-6">
        <div className="w-1/2">
          <AnnouncementsCard
            title="Announcements"
            announcements={announcementsData}
            height="h-[320px]"
          />

          <AnnouncementsCard
            title="New Employees (Last 15 Days)"
            announcements={newEmployeesData}
            height="h-[320px]"
          />
        </div>

        <div className="w-1/2">
          <AnnouncementsCard
            title="Upcoming Holidays Coming"
            announcements={announcements}
            height="h-[320px]"
          />

          <AnnouncementsCard
            title="Scheduled Meetings"
            announcements={announcementsData}
            height="h-[320px]"
          />
        </div>
      </div>
      <div className="mt-6">
        <CommitGraph />
      </div>
    </div>
  );
};

export default DashboardHome;
