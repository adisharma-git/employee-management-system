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
    <section className="w-full mb-6">
      

      
        <div className="space-y-5">
          <div className="relative overflow-hidden rounded-2xl border border-[#D9E3F5] bg-gradient-to-r from-[#021f54] via-[#0A2E74] to-[#0F3C95] p-5 shadow-sm">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-orange-400/20" />
            <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-white/10" />

            <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Reports Overview</h2>
                <p className="mt-1 text-sm text-blue-100">
                  Analyze employee output, department trends, and weekly progress.
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 p-1 backdrop-blur-sm">
                {["Daily", "Weekly"].map((item) => (
                  <button
                    key={item}
                    onClick={() => setView(item)}
                    className={`min-w-[92px] rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                      view === item
                        ? "bg-orange-400 text-[#1F2937] shadow-sm"
                        : "text-white hover:bg-white/15"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
              <div className="relative flex-grow xl:max-w-lg">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 pointer-events-none">
                  <FontAwesomeIcon icon={faSearch} />
                </div>
                <input
                  type="text"
                  placeholder="Search employee name..."
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-11 pr-11 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#021f54]"
                />
                <button className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 transition-colors hover:text-[#021f54]">
                  <FontAwesomeIcon icon={faMicrophone} />
                </button>
              </div>

              <div className="relative min-w-[220px]">
                <select className="w-full appearance-none cursor-pointer rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 pr-10 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#021f54]">
                  <option>Select Department</option>
                  <option>Design</option>
                  <option>Development</option>
                  <option>HR</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 text-[10px] text-gray-400 pointer-events-none">
                  <FontAwesomeIcon icon={faChevronDown} />
                </div>
              </div>

              <div className="w-full xl:w-auto xl:ml-auto">
                <button className="flex w-full xl:w-auto items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 transition-all hover:border-[#021f54]/40">
                  <span className="flex items-center">
                    <FontAwesomeIcon icon={faCalendarAlt} className="mr-3 text-[#021f54]" />
                    <span className="font-medium whitespace-nowrap">February 04, 2026</span>
                  </span>
                  <FontAwesomeIcon icon={faChevronDown} className="ml-4 text-[10px] text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-[#D9E3F5] bg-[#F5F8FF] px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#021f54]">View</p>
              <p className="mt-1 text-sm font-semibold text-gray-700">{view} Analytics</p>
            </div>
            <div className="rounded-xl border border-orange-100 bg-orange-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-orange-600">Action</p>
              <p className="mt-1 text-sm font-semibold text-gray-700">Top performers highlighted</p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-600">Refresh</p>
              <p className="mt-1 text-sm font-semibold text-gray-700">Synced every 24 hours</p>
            </div>
          </div>

          <EmployeePerformance />
        </div>
     
    </section>
  );
};

export default DashboardHeader;
