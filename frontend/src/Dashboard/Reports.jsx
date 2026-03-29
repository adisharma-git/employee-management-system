import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faMicrophone,
  faCalendarAlt,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

import EmployeePerformance from "./EmployeePerformance";

const DashboardHeader = () => {
  const [view, setView] = useState("Daily");

  return (
    <section className="w-full bg-white p-1 sm:p-2">
      <div className="mb-5 flex flex-col gap-1 pb-2">
        <h1 className="text-xl font-semibold text-slate-900">Reports</h1>
        <p className="text-sm text-slate-600">
          Track employee performance and review task completion status.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-3 xl:grid-cols-[minmax(280px,1fr)_220px_auto_auto] xl:items-center">
        <div className="relative w-full">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
            <FontAwesomeIcon icon={faSearch} />
          </div>
          <input
            type="text"
            placeholder="Search employee name..."
            className="w-full rounded-md border border-slate-200 bg-white py-2.5 pl-11 pr-11 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-900 focus:outline-none"
          />
          <button className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 transition-colors hover:text-blue-900">
            <FontAwesomeIcon icon={faMicrophone} />
          </button>
        </div>

        <div className="relative w-full">
          <select className="w-full cursor-pointer appearance-none rounded-md border border-slate-200 bg-white px-4 py-2.5 pr-10 text-sm text-slate-700 focus:border-blue-900 focus:outline-none">
            <option>Select Department</option>
            <option>Design</option>
            <option>Development</option>
            <option>HR</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-[10px] text-slate-400">
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
        </div>

        <div className="grid grid-cols-2 rounded-md border border-slate-200 p-1">
          {["Daily", "Weekly"].map((item) => (
            <button
              key={item}
              onClick={() => setView(item)}
              className={`rounded-md px-5 py-1.5 text-sm font-semibold transition-colors ${
                view === item
                  ? "bg-blue-900 text-white"
                  : "text-slate-600 hover:text-slate-800"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <button className="flex w-full items-center justify-between rounded-md border border-slate-200 px-4 py-2.5 text-left transition-colors hover:border-slate-300 xl:w-auto">
          <div className="flex items-center text-slate-700">
            <span className="mr-3 text-slate-400">
              <FontAwesomeIcon
                icon={faCalendarAlt}
              />
            </span>
            <span className="text-sm font-medium whitespace-nowrap">
              February 04, 2026
            </span>
          </div>
          <span className="ml-4 text-[10px] text-slate-400">
            <FontAwesomeIcon icon={faChevronDown} />
          </span>
        </button>
      </div>

      <EmployeePerformance />

    </section>
  );
};

export default DashboardHeader;
