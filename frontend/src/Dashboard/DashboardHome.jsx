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
  const [holidays, setHolidays] = useState([]);
  const [scheduledMeetings, setScheduledMeetings] = useState([]);

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

  // Fetch punched-in status
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

  // Fetch holidays
  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const res = await api.get("/holidays/upcoming-holidays");
        if (res.data.success) {
          const formatted = res.data.data.map(item => ({
            title: item.name,
            time: new Date(item.date).toLocaleDateString(),
            avatar: "https://ui-avatars.com/api/?name=" + item.name
          }));
          setHolidays(formatted);
        }
      } catch (error) {
        console.log("Holidays fetch error:", error);
      }
    };
    fetchHolidays();
  }, []);

  // Fetch new employees
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
          .filter(emp => emp.employee?.dateOfJoining)
          .filter(emp => {
            const joiningDate = new Date(emp.employee.dateOfJoining);
            joiningDate.setHours(0, 0, 0, 0);
            const diffDays = (today - joiningDate) / (1000 * 60 * 60 * 24);
            return diffDays >= 0 && diffDays <= 15;
          })
          .map(emp => ({
            title: emp.employee.name,
            time: `Joined on ${new Date(emp.employee.dateOfJoining).toLocaleDateString()}`,
            avatar: "https://i.pravatar.cc/40",
          }));
        setNewEmployeesData(filteredEmployees);
      } catch (error) {
        console.log("Employees fetch error:", error);
      }
    };
    fetchEmployees();
  }, []);

  // Fetch announcements
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

  // Fetch upcoming meetings
  useEffect(() => {
    const fetchUpcomingMeetings = async () => {
      try {
        const res = await api.get("/meetings/upcoming-meetings");
        if (res.data.success) {
          const formatted = res.data.data.map(item => ({
            title: item.title,
            time: new Date(item.date).toLocaleString(),
            avatar: "https://ui-avatars.com/api/?name=" + encodeURIComponent(item.title),
          }));
          setScheduledMeetings(formatted);
        }
      } catch (error) {
        console.log("Meetings fetch error:", error);
      }
    };
    fetchUpcomingMeetings();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {/* 🔹 Task Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
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

      {/* 🔹 Announcement & Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-6">
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
        <div className="flex flex-col gap-6">
          <AnnouncementsCard
            title="Upcoming Holidays"
            announcements={holidays}
            height="h-[320px]"
          />
          <AnnouncementsCard
            title="Scheduled Meetings"
            announcements={scheduledMeetings}
            height="h-[320px]"
          />
        </div>
      </div>

      {/* 🔹 Commit Graph */}
      <div className="mt-6 w-full overflow-x-auto">
        <CommitGraph />
      </div>
    </div>
  );
};

export default DashboardHome;