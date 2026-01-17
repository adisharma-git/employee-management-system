
import AnnouncementsCard from "./AnnouncementsCard"
import TaskCompletionCard from "./TaskCard"

const DashboardHome = () => {
  const announcementsData = [
    {
      title: "Zoho Support Process Update – Important Announcement",
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
  ]
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
          // percentage={1}
          label="Coming Soon"
          icon="fa-clipboard-check"
          accentColor="teal"
        />
      </div>
      <div className="w-1/2">
        <AnnouncementsCard
          title="Announcements"
          announcements={announcementsData}
          height="h-[420px]"
        />
      </div>

    </div>
  )
}

export default DashboardHome
