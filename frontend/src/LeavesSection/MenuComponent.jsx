import React, { useState } from "react";

const AttendanceNav = () => {
  const [activeTab, setActiveTab] = useState("leaves");
  const isAdmin = false; 

  const tabs = [
    { key: "PendingLeaves", label: "PendingLeaves", adminOnly: false },
    { key: "leaves", label: "Leaves", adminOnly: false },
    { key: "reports", label: "Reports", adminOnly: true },
  ];

  const visibleTabs = tabs.filter(
    (tab) => !tab.adminOnly || isAdmin
  );

  const renderComponent = () => {
    switch (activeTab) {
      case "PendingLeaves":
        return <PendingLeaves />;
      case "attendance":
        return <ActiveLeaves />;
      case "leaves":
        return <Leaves />;
      case "reports":
        return <Reports />;
      default:
        return <Leaves />;
    }
  };

  return (
    <div>
      <div className="bg-white border-b border-gray-200">
        <div className="flex gap-6 h-8 items-center px-5 text-[13px]">

          {visibleTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="relative pb-1 whitespace-nowrap transition-colors duration-200"
            >
              <span
                className={`font-medium ${
                  activeTab === tab.key
                    ? "text-orange-500"
                    : "text-gray-700 hover:text-orange-500"
                }`}
              >
                {tab.label}
              </span>

              <span
                className={`absolute left-0 bottom-0 h-[2px] bg-orange-500 transition-all duration-300 ${
                  activeTab === tab.key ? "w-full" : "w-0"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {renderComponent()}
      </div>
    </div>
  );
};

export default AttendanceNav;
const PendingLeaves = () => <div>Pending Leaves</div>;
const ActiveLeaves = () => <div>ActiveLeaves</div>;
const Leaves = () => <div>Leaves Component</div>;
const Reports = () => <div>Reports Component</div>;