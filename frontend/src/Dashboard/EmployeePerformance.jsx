import React, { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faClock,
  faTriangleExclamation,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import api from "../api/axios";

const EmployeePerformance = () => {
  const [employeeName, setEmployeeName] = useState("Employee");
  const [employeeDesignation, setEmployeeDesignation] = useState("Team Member");

  const tasks = [
    { id: 1, title: "Design new landing page concept", status: "Completed" },
    { id: 2, title: "Create wireframes for signup flow", status: "Pending" },
    { id: 3, title: "User feedback analysis", status: "Completed" },
    { id: 4, title: "Prepare UI presentation stladies", status: "Overdue" },
    { id: 5, title: "Update component library in Figma", status: "Completed" },
    { id: 6, title: "Team meeting for feedback discussion", status: "Pending" },
    { id: 7, title: "Prepare UI presentation slides", status: "Overdue" },
  ];

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await api.get("/employee/me");
        const employee = response?.data?.data;

        setEmployeeName(employee?.name || "Employee");
        setEmployeeDesignation(employee?.designation || "Team Member");
      } catch (error) {
        console.error("Error fetching employee profile:", error);
      }
    };

    fetchEmployee();
  }, []);

  const getStatusStyles = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-50 text-green-700 border border-green-100";
      case "Pending":
        return "bg-orange-50 text-orange-700 border border-orange-100";
      case "Overdue":
        return "bg-red-50 text-red-700 border border-red-100";
      default:
        return "bg-gray-100 text-gray-600 border border-gray-200";
    }
  };

  const taskSummary = useMemo(() => {
    const assigned = tasks.length;
    const completed = tasks.filter((task) => task.status === "Completed").length;
    const pending = tasks.filter((task) => task.status === "Pending").length;
    const overdue = tasks.filter((task) => task.status === "Overdue").length;

    return { assigned, completed, pending, overdue };
  }, [tasks]);

  return (
    <section className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="relative border-b border-[#D9E3F5] bg-gradient-to-r from-[#021f54] via-[#0A2E74] to-[#0F3C95] px-6 py-5">
        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-orange-400/20" />
        <div className="absolute -left-8 -bottom-8 h-20 w-20 rounded-full bg-white/10" />

        <div className="relative flex flex-wrap items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/15 text-white">
            <FontAwesomeIcon icon={faUser} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-white leading-tight">{employeeName}</h2>
            <p className="text-xs font-medium text-blue-100">{employeeDesignation}</p>
          </div>

          <span className="ml-auto rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white">
            Weekly Snapshot
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-[#D9E3F5] bg-[#F5F8FF] px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#021f54]">Assigned</p>
            <p className="mt-1 text-xl font-bold text-[#021f54]">{taskSummary.assigned}</p>
          </div>

          <div className="rounded-xl border border-green-100 bg-green-50 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-green-700">Completed</p>
            <p className="mt-1 text-xl font-bold text-green-700">{taskSummary.completed}</p>
          </div>

          <div className="rounded-xl border border-orange-100 bg-orange-50 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-orange-700">Pending</p>
            <p className="mt-1 text-xl font-bold text-orange-700">{taskSummary.pending}</p>
          </div>

          <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-red-700">Overdue</p>
            <p className="mt-1 text-xl font-bold text-red-700">{taskSummary.overdue}</p>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200">
          <div className="grid grid-cols-[1fr_auto] bg-[#021f54] px-4 py-3 text-xs font-semibold uppercase tracking-wide text-white">
            <h3>Tasks</h3>
            <h3>Status</h3>
          </div>

          <div className="divide-y divide-gray-100">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="grid grid-cols-[1fr_auto] items-center gap-4 px-4 py-3 transition-colors hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[10px]">
                    <FontAwesomeIcon
                      icon={
                        task.status === "Completed"
                          ? faCircleCheck
                          : task.status === "Pending"
                          ? faClock
                          : faTriangleExclamation
                      }
                      className={
                        task.status === "Completed"
                          ? "text-green-500"
                          : task.status === "Pending"
                          ? "text-orange-500"
                          : "text-red-500"
                      }
                    />
                  </span>
                  <span className="text-sm font-medium text-gray-700">{task.title}</span>
                </div>

                <div
                  className={`rounded-full px-3 py-1 text-[11px] font-bold min-w-[95px] text-center ${getStatusStyles(task.status)}`}
                >
                  {task.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs font-medium text-gray-500">
          <p>Showing {taskSummary.assigned} of {taskSummary.assigned} tasks</p>
          <p className="text-[#021f54]">Updated from latest activity logs</p>
        </div>
      </div>
    </section>
  );
};

export default EmployeePerformance;
