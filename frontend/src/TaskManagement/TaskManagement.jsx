import { useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import ToastContainer from "../Toaster/Toast";
import CreateProjectModal from "./CreateProjectModal";
import CreateTaskModal from "./CreateTaskModal";

const KANBAN_COLUMNS = [
  { key: "todo", label: "To Do" },
  { key: "in-progress", label: "In Progress" },
  { key: "code-review", label: "Code Review" },
  { key: "qa-testing", label: "QA Testing" },
  { key: "done", label: "Done" },
];

const PRIORITY_STYLES = {
  low: "bg-blue-100 text-blue-700",
  medium: "bg-amber-100 text-amber-700",
  high: "bg-red-100 text-red-700",
};

export default function TaskManagement({ permission }) {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [boardData, setBoardData] = useState(null);
  const [myTasks, setMyTasks] = useState([]);
  const [profile, setProfile] = useState(null);

  const [loadingProjects, setLoadingProjects] = useState(false);
  const [loadingBoard, setLoadingBoard] = useState(false);
  const [loadingMyTasks, setLoadingMyTasks] = useState(false);

  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [activeView, setActiveView] = useState("board");

  const [toasts, setToasts] = useState([]);

  const addToast = (type, message) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  useEffect(() => {
    fetchProfile();
    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedProjectId) {
      fetchProjectBoard(selectedProjectId);
    }
  }, [selectedProjectId]);

  useEffect(() => {
    fetchMyTasks();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/employee/me");
      setProfile(res.data?.data || null);
    } catch {
      setProfile(null);
    }
  };

  const fetchProjects = async (preferredProjectId) => {
    try {
      setLoadingProjects(true);
      const res = await api.get("/projects");

      if (res.data?.success) {
        const projectList = res.data.data || [];
        setProjects(projectList);

        if (!projectList.length) {
          setSelectedProjectId("");
          setBoardData(null);
          return;
        }

        if (preferredProjectId) {
          const exists = projectList.some((project) => project.id === preferredProjectId);
          setSelectedProjectId(exists ? preferredProjectId : projectList[0].id);
          return;
        }

        if (!selectedProjectId) {
          setSelectedProjectId(projectList[0].id);
          return;
        }

        const existingSelected = projectList.some((project) => project.id === selectedProjectId);
        if (!existingSelected) {
          setSelectedProjectId(projectList[0].id);
        }
      }
    } catch (error) {
      addToast("error", error?.response?.data?.message || "Failed to load projects");
    } finally {
      setLoadingProjects(false);
    }
  };

  const fetchProjectBoard = async (projectId) => {
    if (!projectId) return;

    try {
      setLoadingBoard(true);
      const res = await api.get(`/projects/${projectId}`);
      if (res.data?.success) {
        setBoardData(res.data.data);
      }
    } catch (error) {
      addToast("error", error?.response?.data?.message || "Failed to load project board");
    } finally {
      setLoadingBoard(false);
    }
  };

  const fetchMyTasks = async () => {
    try {
      setLoadingMyTasks(true);
      const res = await api.get("/tasks/my-tasks");
      if (res.data?.success) {
        setMyTasks(res.data.data || []);
      }
    } catch (error) {
      if (error?.response?.status === 404) {
        setMyTasks([]);
        return;
      }
      addToast("error", error?.response?.data?.message || "Failed to load my tasks");
    } finally {
      setLoadingMyTasks(false);
    }
  };

  const tasksByStatus = useMemo(() => {
    const grouped = {
      todo: [],
      "in-progress": [],
      "code-review": [],
      "qa-testing": [],
      done: [],
    };

    (boardData?.tasks || []).forEach((task) => {
      if (grouped[task.status]) {
        grouped[task.status].push(task);
      }
    });

    Object.keys(grouped).forEach((status) => {
      grouped[status].sort((a, b) => a.position - b.position);
    });

    return grouped;
  }, [boardData]);

  const canMoveTask = (task) => {
    if (permission) return true;
    return task.assignedTo === profile?.id;
  };

  const handleDragStart = (event, task) => {
    if (!canMoveTask(task)) {
      event.preventDefault();
      addToast("error", "You can only move your own tasks");
      return;
    }

    event.dataTransfer.setData("taskId", task.id);
    event.dataTransfer.setData("sourceStatus", task.status);
  };

  const handleDropTask = async (event, targetStatus) => {
    event.preventDefault();

    const taskId = event.dataTransfer.getData("taskId");
    if (!taskId) return;

    const currentTask = (boardData?.tasks || []).find((task) => task.id === taskId);
    if (!currentTask) return;

    if (!canMoveTask(currentTask)) {
      addToast("error", "You can only move your own tasks");
      return;
    }

    const nextPosition = (tasksByStatus[targetStatus] || []).length;

    try {
      const res = await api.patch(`/tasks/${taskId}/status`, {
        status: targetStatus,
        position: nextPosition,
      });

      if (res.data?.success) {
        addToast("success", "Task status updated");
        await fetchProjectBoard(selectedProjectId);
        await fetchMyTasks();
      }
    } catch (error) {
      addToast("error", error?.response?.data?.message || "Failed to move task");
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Task Management</h1>
          <p className="text-gray-500 text-sm">
            Manage projects and track tasks across your team workflow.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setActiveView("board")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              activeView === "board"
                ? "bg-[#021f54] text-white"
                : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
            }`}
          >
            Project Board
          </button>

          <button
            type="button"
            onClick={() => setActiveView("myTasks")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              activeView === "myTasks"
                ? "bg-[#021f54] text-white"
                : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
            }`}
          >
            My Tasks
          </button>

          {permission && (
            <>
              <button
                onClick={() => setShowCreateProjectModal(true)}
                className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 text-sm font-medium px-4 py-2 rounded-md transition"
              >
                + Project
              </button>
              <button
                onClick={() => {
                  if (!selectedProjectId) {
                    addToast("error", "Create/select a project first");
                    return;
                  }
                  setShowCreateTaskModal(true);
                }}
                className="bg-[#021f54] text-white hover:bg-orange-400 hover:text-black text-sm font-medium px-4 py-2 rounded-md transition-colors duration-200"
              >
                + Task
              </button>
            </>
          )}
        </div>
      </div>

      {activeView === "board" && (
        <>
          <div className="bg-white rounded-xl p-4 shadow-sm mb-6 border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Project</p>
                <h2 className="text-lg font-semibold text-gray-800 mt-1">
                  {boardData?.name || "Select a project"}
                </h2>
              </div>

              <select
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                className="w-full md:w-80 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                disabled={loadingProjects || !projects.length}
              >
                {!projects.length && <option value="">No projects available</option>}
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name} {project?._count?.tasks ? `(${project._count.tasks} tasks)` : ""}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {loadingBoard ? (
            <div className="bg-white rounded-xl p-8 text-center text-gray-500 border border-gray-100">
              Loading project board...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
              {KANBAN_COLUMNS.map((column) => (
                <div
                  key={column.key}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm min-h-[420px]"
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => handleDropTask(event, column.key)}
                >
                  <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50 rounded-t-xl">
                    <h3 className="text-sm font-semibold text-gray-700">{column.label}</h3>
                    <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                      {tasksByStatus[column.key].length}
                    </span>
                  </div>

                  <div className="p-3 space-y-3">
                    {tasksByStatus[column.key].length === 0 && (
                      <div className="text-xs text-gray-400 border border-dashed border-gray-200 rounded-lg p-3 text-center">
                        Drop tasks here
                      </div>
                    )}

                    {tasksByStatus[column.key].map((task) => (
                      <div
                        key={task.id}
                        draggable={canMoveTask(task)}
                        onDragStart={(event) => handleDragStart(event, task)}
                        className={`rounded-lg border border-gray-200 p-3 bg-white hover:shadow-md transition ${
                          canMoveTask(task) ? "cursor-grab" : "cursor-not-allowed opacity-90"
                        }`}
                        title={
                          canMoveTask(task)
                            ? "Drag to change status"
                            : "Only assigned employee can move this task"
                        }
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-semibold text-gray-800 line-clamp-2">{task.title}</h4>
                          <span
                            className={`text-[10px] px-2 py-1 rounded-full font-medium capitalize ${
                              PRIORITY_STYLES[task.priority] || "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {task.priority || "medium"}
                          </span>
                        </div>

                        {task.description && (
                          <p className="text-xs text-gray-500 mt-2 line-clamp-3">{task.description}</p>
                        )}

                        <div className="mt-3 pt-3 border-t border-gray-100 space-y-1">
                          <p className="text-xs text-gray-600 font-medium">
                            Assignee: <span className="font-normal">{task.employee?.name || "Unknown"}</span>
                          </p>
                          {task.employee?.designation && (
                            <p className="text-xs text-gray-500">{task.employee.designation}</p>
                          )}
                          <p className="text-xs text-gray-500">
                            Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "Not set"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {activeView === "myTasks" && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">My Tasks</h3>
              <p className="text-xs text-gray-500">Tasks assigned to your profile</p>
            </div>
            <span className="text-xs bg-gray-200 text-gray-700 px-3 py-1 rounded-full">
              {myTasks.length} total
            </span>
          </div>

          {loadingMyTasks ? (
            <div className="p-6 text-sm text-gray-500">Loading your tasks...</div>
          ) : myTasks.length === 0 ? (
            <div className="p-6 text-sm text-gray-500">No tasks assigned yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="text-left px-6 py-3 font-semibold">Task</th>
                    <th className="text-left px-6 py-3 font-semibold">Project</th>
                    <th className="text-left px-6 py-3 font-semibold">Status</th>
                    <th className="text-left px-6 py-3 font-semibold">Priority</th>
                    <th className="text-left px-6 py-3 font-semibold">Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {myTasks.map((task) => (
                    <tr key={task.id} className="border-t border-gray-100 hover:bg-gray-50/60">
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-800">{task.title}</p>
                        {task.description && (
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{task.description}</p>
                        )}
                      </td>
                      <td className="px-6 py-4 text-gray-700">{task.project?.name || "-"}</td>
                      <td className="px-6 py-4">
                        <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700 capitalize">
                          {task.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-xs px-2 py-1 rounded-full capitalize ${
                            PRIORITY_STYLES[task.priority] || "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {task.priority || "medium"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "Not set"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {showCreateProjectModal && (
        <CreateProjectModal
          onClose={() => setShowCreateProjectModal(false)}
          addToast={addToast}
          onSuccess={async () => {
            setShowCreateProjectModal(false);
            await fetchProjects();
          }}
        />
      )}

      {showCreateTaskModal && (
        <CreateTaskModal
          selectedProjectId={selectedProjectId}
          onClose={() => setShowCreateTaskModal(false)}
          addToast={addToast}
          onSuccess={async (projectId) => {
            setShowCreateTaskModal(false);
            await fetchProjects(projectId);
            await fetchProjectBoard(projectId);
            await fetchMyTasks();
          }}
        />
      )}
    </div>
  );
}
