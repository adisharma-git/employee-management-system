import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faMicrophone,
  faCalendarAlt,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

import EmployeePerformance from "./EmployeePerformance";
import AccessRestricted from "../Components/AccessRestricted";

const DashboardHeader = () => {
  const [view, setView] = useState("Daily");

  return (
   
    <div className="w-full bg-white p-5 rounded-xl shadow-sm border border-gray-100 mb-6">
     
    
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        <div className="relative flex-grow lg:max-w-md">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
            <FontAwesomeIcon icon={faSearch} />
          </div>
          <input
            type="text"
            placeholder="Search employee name..."
            className="w-full bg-[#F8F9FA] border border-gray-200 py-2.5 pl-11 pr-11 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-900 text-sm text-gray-600 placeholder:text-gray-400"
          />
          <button className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-blue-900 transition-colors">
            <FontAwesomeIcon icon={faMicrophone} />
          </button>
        </div>
        <div className="relative min-w-[200px]">
          <select className="w-full appearance-none bg-[#F8F9FA] border border-gray-200 text-gray-600 py-2.5 px-4 pr-10 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-900 text-sm cursor-pointer">
            <option>Select Department</option>
            <option>Design</option>
            <option>Development</option>
            <option>HR</option>
          </select>
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400 text-[10px]">
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
        </div>

        <div className="flex bg-[#F1F3F5] p-1 rounded-lg shrink-0">
          {["Daily", "Weekly"].map((item) => (
            <button
              key={item}
              onClick={() => setView(item)}
              className={`px-6 py-1.5 rounded-md text-sm font-semibold transition-all duration-200 ${
                view === item
                  ? "bg-white text-blue-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="lg:ml-auto w-full lg:w-auto">
          <div className="flex items-center justify-between bg-[#F8F9FA] border border-gray-200 py-2.5 px-4 rounded-lg cursor-pointer hover:border-gray-300 transition-all">
            <div className="flex items-center text-gray-600">
              <FontAwesomeIcon
                icon={faCalendarAlt}
                className="mr-3 text-gray-400"
              />
              <span className="text-sm font-medium whitespace-nowrap">
                February 04, 2026
              </span>
            </div>
            <div className="ml-4 text-gray-400 text-[10px]">
              <FontAwesomeIcon icon={faChevronDown} />
            </div>
          </div>
        </div>
      </div>
    
      <EmployeePerformance />
      
    </div>
        
  );
};

export default DashboardHeader;
