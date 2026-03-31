import React, { useEffect, useState } from "react";
import api from "../api/axios";

const STATUS_STYLE_MAP = {
  done: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  pending: "bg-amber-100 text-amber-700 border border-amber-200",
  overdue: "bg-rose-100 text-rose-700 border border-rose-200",
  "in-progress": "bg-sky-100 text-sky-700 border border-sky-200",
  todo: "bg-slate-100 text-slate-700 border border-slate-200",
  "code-review": "bg-indigo-100 text-indigo-700 border border-indigo-200",
  "qa-testing": "bg-cyan-100 text-cyan-700 border border-cyan-200",
};

const EmployeePerformance = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [taskError, setTaskError] = useState("");
  const [projectError, setProjectError] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      setLoadingTasks(true);
      setTaskError("");
      try {
        const response = await api.get("/tasks/my-tasks");
        setTasks(response.data?.data || []);
      } catch (error) {
        if (error?.response?.status === 404) {
          setTasks([]);
          setTaskError("");
        } else {
          setTaskError("Failed to load assigned tasks.");
        }
      } finally {
        setLoadingTasks(false);
      }
    };

    const fetchProjects = async () => {
      setLoadingProjects(true);
      setProjectError("");
      try {
        const response = await api.get("/projects");
        setProjects(response.data?.data || []);
      } catch {
        setProjectError("Failed to load project list.");
      } finally {
        setLoadingProjects(false);
      }
    };

    fetchTasks();
    fetchProjects();
  }, []);

  const formatStatus = (status) => {
    if (!status) return "Unknown";
    return status
      .toString()
      .replace(/-/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const formatDate = (dateValue) => {
    if (!dateValue) return "-";
    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) return "-";
    return date.toLocaleDateString();
  };

  const getStatusStyles = (status) => {
    const statusKey = (status || "").toLowerCase();
    return (
      STATUS_STYLE_MAP[statusKey] ||
      "bg-slate-100 text-slate-700 border border-slate-200"
    );
  };

  return (
    <section className="w-full bg-white">
      <div className="overflow-hidden rounded-xl border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full table-fixed text-left">
            <colgroup>
              <col className="w-[26%]" />
              <col className="w-[16%]" />
              <col className="w-[12%]" />
              <col className="w-[14%]" />
              <col className="w-[14%]" />
              <col className="w-[18%]" />
            </colgroup>
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em]">
                Task
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em]">
                Project
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em]">
                Priority
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em]">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em]">
                Due Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em]">
                Assigned By
              </th>
            </tr>
          </thead>
          <tbody>
            {loadingTasks ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-14 text-center text-sm font-medium text-slate-600"
                >
                  Loading performance tasks...
                </td>
              </tr>
            ) : taskError ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-14 text-center text-sm font-medium text-rose-600"
                >
                  {taskError}
                </td>
              </tr>
            ) : tasks.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-14 text-center text-sm font-medium text-slate-600"
                >
                  No task records available yet.
                </td>
              </tr>
            ) : (
              tasks.map((task, index) => (
                <tr
                  key={task.id || `${task.title}-${index}`}
                  className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50"
                >
                  <td className="px-6 py-4 text-sm font-medium text-slate-800">
                    <p>{task.title || "Untitled task"}</p>
                    <p className="mt-1 line-clamp-1 text-xs font-normal text-slate-500">
                      {task.description || "No description"}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {task.project?.name || "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {formatStatus(task.priority || "medium")}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyles(
                        task.status
                      )}`}
                    >
                      {formatStatus(task.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {formatDate(task.dueDate)}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {task.assigner?.email || "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
          </table>
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-xl border border-slate-200">
        <div className="border-b border-slate-200 bg-slate-50 px-6 py-3">
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-700">
            Project List
          </h3>
          <p className="text-xs text-slate-500">Source: /projects</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-fixed text-left">
            <colgroup>
              <col className="w-[30%]" />
              <col className="w-[42%]" />
              <col className="w-[14%]" />
              <col className="w-[14%]" />
            </colgroup>
            <thead>
              <tr className="bg-white text-slate-700">
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em]">
                  Project
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em]">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em]">
                  Tasks
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em]">
                  Created
                </th>
              </tr>
            </thead>
            <tbody>
              {loadingProjects ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-10 text-center text-sm font-medium text-slate-600"
                  >
                    Loading projects...
                  </td>
                </tr>
              ) : projectError ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-10 text-center text-sm font-medium text-rose-600"
                  >
                    {projectError}
                  </td>
                </tr>
              ) : projects.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-10 text-center text-sm font-medium text-slate-600"
                  >
                    No projects found.
                  </td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr
                    key={project.id}
                    className="border-t border-slate-100 hover:bg-slate-50"
                  >
                    <td className="px-6 py-4 text-sm font-semibold text-slate-800">
                      {project.name || "Untitled project"}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {project.description || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {project._count?.tasks ?? 0}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {formatDate(project.createdAt)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default EmployeePerformance;
