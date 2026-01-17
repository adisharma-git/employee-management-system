import { useState } from "react";
import Sidebar from "./Sidebar";
import DashboardHome from "./DashboardHome";
// import Sidebar from "./components/Sidebar";


// Dummy components (rough)
// function DashboardHome() {
//   return <div>📊 Dashboard Home Content</div>;
// }

// function MyTeam() {
//   return <div>👥 My Team Content</div>;
// }

// function Performance() {
//   return <div>📈 Performance Content</div>;
// }

// function Expenses() {
//   return <div>💰 Expenses Content</div>;
// }

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("dashboard");

  const renderContent = () => {
    switch (selectedTab) {
      case "team":
      // return <DashboardHome />
      case "performance":
      // return <Performance />;
      case "expenses":
      // return <Expenses />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="flex bg-white min-h-screen">
      {/* Sidebar */}
      <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      {/* <Sidebar/> */}

      {/* <Sidebar/> */}

      {/* Right Side */}
      <div className="flex-1 flex flex-col">
        {/* <Header /> */}

        <main className="flex-1 overflow-auto bg-gray-50 p-8">
          {/* Static Header Text */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#021f54] mb-1">
              Good afternoon, Sourav!
            </h1>
            <p className="text-gray-600">
              Your performance is looking good!
            </p>
          </div>

          {/* 🔥 Dynamic Content */}
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
