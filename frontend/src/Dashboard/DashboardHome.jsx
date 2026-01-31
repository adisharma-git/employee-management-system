
import { useEffect, useState } from "react"
import AnnouncementsCard from "./AnnouncementsCard"
import TaskCompletionCard from "./TaskCard"
import api from "../api/axios";

  const DashboardHome = () => {
  const [punchedIn,setPunchedIn]=useState(false);
  const announcementsData = [
    {
      title: "Aaah Support Process Update – Important Announcement",
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
    {
      title: "Update on Leave Policy",
      time: "12 January 4:34 PM",
      avatar: "https://i.pravatar.cc/40?img=22",
    },
    {
      title: "Update on Leave Policy",
      time: "12 January 4:34 PM",
      avatar: "https://i.pravatar.cc/40?img=22",
    },
  ]
useEffect(() => {
  const fetchStatus = async () => {
    try {
      const response = await api.get("/attendance/punch-status");
      setPunchedIn(response.data.data.isPunchedIn);
      console.log("Punched in data",punchedIn)
    } catch (error) {
      console.log("Punch status error:", error);
    }
  };

  fetchStatus();
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
      title="New Employees"
      announcements={announcementsData}
      height="h-[320px]"
    />
  </div>

  <div className="w-1/2">
    <AnnouncementsCard
      title="Upcoming Holidays"
      announcements={announcementsData}
      height="h-[320px]"
    />
    <AnnouncementsCard
      title="Scheduled Meetings"
      announcements={announcementsData}
      height="h-[320px]"
    />
  </div>
</div>


    </div>
  )
}

export default DashboardHome
