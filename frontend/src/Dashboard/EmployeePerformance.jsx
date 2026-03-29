import React from "react";

const STATUS_STYLE_MAP = {
  Completed: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  Pending: "bg-amber-100 text-amber-700 border border-amber-200",
  Overdue: "bg-rose-100 text-rose-700 border border-rose-200",
  "In Progress": "bg-sky-100 text-sky-700 border border-sky-200",
};

const EmployeePerformance = ({
  employee = {},
  tasks = [],
  summary = {},
  loading = false,
}) => {
  const {
    name = "Employee",
    employeeCode = "--",
    role = "Role not available",
    avatar,
  } = employee;

  const assignedCount =
    summary.assigned ?? (Array.isArray(tasks) ? tasks.length : 0);
  const completedCount =
    summary.completed ??
    (Array.isArray(tasks)
      ? tasks.filter((task) => task.status === "Completed").length
      : 0);
  const pendingCount =
    summary.pending ??
    (Array.isArray(tasks)
      ? tasks.filter((task) => ["Pending", "In Progress"].includes(task.status))
          .length
      : 0);

  const getStatusStyles = (status) => {
    return (
      STATUS_STYLE_MAP[status] ||
      "bg-slate-100 text-slate-700 border border-slate-200"
    );
  };

  return (
    <section className="w-full bg-white">
      <div className="p-5 sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-blue-900 text-lg font-semibold text-white">
              {avatar ? (
                <img src={avatar} alt={name} className="h-full w-full object-cover" />
              ) : (
                name
                  .split(" ")
                  .slice(0, 2)
                  .map((item) => item[0])
                  .join("")
                  .toUpperCase()
              )}
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                Performance Overview
              </p>
              <h2 className="text-2xl font-semibold text-slate-900">{name}</h2>
              <p className="text-sm text-slate-600">
                {employeeCode} | {role}
              </p>
            </div>
          </div>

          <div className="grid w-full max-w-[420px] grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Assigned
              </p>
              <p className="mt-1 text-xl font-semibold text-slate-900">{assignedCount}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Completed
              </p>
              <p className="mt-1 text-xl font-semibold text-slate-900">{completedCount}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Open
              </p>
              <p className="mt-1 text-xl font-semibold text-slate-900">{pendingCount}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full table-fixed text-left">
            <colgroup>
              <col className="w-[55%]" />
              <col className="w-[25%]" />
              <col className="w-[20%]" />
            </colgroup>
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em]">
                Task
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em]">
                Due Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em]">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-14 text-center text-sm font-medium text-slate-600"
                >
                  Loading performance tasks...
                </td>
              </tr>
            ) : tasks.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
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
                    {task.title || "Untitled task"}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {task.dueDate || "-"}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyles(
                        task.status
                      )}`}
                    >
                      {task.status || "Unknown"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
          </table>
        </div>
      </div>

      <div className="px-6 py-3 text-xs font-medium text-slate-500">
        Showing {tasks.length} task{tasks.length === 1 ? "" : "s"}
      </div>
    </section>
  );
};

export default EmployeePerformance;
