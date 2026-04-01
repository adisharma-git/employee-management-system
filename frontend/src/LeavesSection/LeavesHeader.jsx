import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import CalendarComponent from "./CalendarComponent";
import ApplyLeaveForm from "./LeaveForm";
import AttendanceNav from "./MenuComponent";
import CreateLeave from "./CreateLeave";
import { usePermission } from "../hooks/usePermission"; // 🔥 ADD

const LeavesHeader = () => {
  const [activeSection, setActiveSection] = useState("menu");

  const { can, canAny } = usePermission(); // 🔥 ADD

  const handleApplyLeave = () => {
    setActiveSection("applyLeave");
  };
  const handleCreateLeave = () => {
    setActiveSection("createLeave");
    }

  return (
    <div className="sticky top-0 bg-gray-50 z-20">
      <header className="bg-white border-b shadow-sm px-6 py-3 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">
            People
          </h1>
          <p className="text-gray-500 text-xs">
            Manage and track employee attendance
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveSection("menu")}
            className="p-2 rounded-md border hover:bg-gray-100 transition"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>

          <button
            onClick={() => setActiveSection("calendar")}
            className="p-2 rounded-md border hover:bg-gray-100 transition"
          >
            <FontAwesomeIcon icon={faCalendarAlt} />
          </button>

          {/* 🔥 APPLY LEAVE */}
          {can("apply_leave") && (
            <button
              onClick={handleApplyLeave}
              className="bg-[#021f54] text-white hover:bg-orange-400
              hover:text-black text-xs font-medium px-3 py-1.5
              rounded-md transition-colors duration-200"
            >
              Apply Leave
            </button>
          )}

          
            <button
              onClick={handleCreateLeave}
              className="bg-[#021f54] text-white hover:bg-orange-400
              hover:text-black text-xs font-medium px-3 py-1.5
              rounded-md transition-colors duration-200"
            >
              Create Leave
            </button>
         
        </div>
      </header>

      <div className="bg-white shadow px-6 py-4">
        {activeSection === "menu" && <AttendanceNav />}
        {activeSection === "calendar" && <CalendarComponent />}

      
        {activeSection === "applyLeave" && can("apply_leave") && (
          <ApplyLeaveForm />
        )}

        {activeSection === "createLeave" &&
         
            <CreateLeave onClose={() => setActiveSection("menu")} />
          }
      </div>
    </div>
  );
};

export default LeavesHeader;