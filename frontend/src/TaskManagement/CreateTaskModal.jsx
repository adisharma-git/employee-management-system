import { useEffect, useState } from "react";
import api from "../api/axios";

const STATUS_OPTIONS = [
  { value: "todo", label: "To Do" },
  { value: "in-progress", label: "In Progress" },
  { value: "code-review", label: "Code Review" },
  { value: "qa-testing", label: "QA Testing" },
  { value: "done", label: "Done" },
];

export default function CreateTaskModal({
  selectedProjectId,
  onClose,
  onSuccess,
  addToast,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [loadingEmployees, setLoadingEmployees] = useState(false);

  const [formData, setFormData] = useState({
    projectId: selectedProjectId || "",
    assignedTo: "",
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
    status: "todo",
  });

  useEffect(() => {
    setFormData((prev) => ({ ...prev, projectId: selectedProjectId || "" }));
  }, [selectedProjectId]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoadingEmployees(true);
        const res = await api.get("/admin/employees");
        if (res.data?.success) {
          const mapped = (res.data.data || [])
            .map((item) => ({
              userId: item.id,
              employeeId: item.employee?.id,
              name: item.employee?.name,
              designation: item.employee?.designation,
            }))
            .filter((employee) => employee.employeeId && employee.name);

          setEmployees(mapped);
        }
      } catch (error) {
        addToast("error", error?.response?.data?.message || "Failed to load employees");
      } finally {
        setLoadingEmployees(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.projectId || !formData.assignedTo || !formData.title.trim()) {
      addToast("error", "Project, assignee, and title are required");
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = {
        projectId: formData.projectId,
        assignedTo: formData.assignedTo,
        title: formData.title.trim(),
        description: formData.description.trim() || undefined,
        priority: formData.priority,
        dueDate: formData.dueDate || undefined,
        status: formData.status,
      };

      const res = await api.post("/tasks", payload);

      if (res.data?.success) {
        addToast("success", res.data?.message || "Task created successfully");
        onSuccess(formData.projectId);
      }
    } catch (error) {
      addToast("error", error?.response?.data?.message || "Failed to create task");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Create Task</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500 text-lg">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Project ID</label>
              <input
                type="text"
                name="projectId"
                value={formData.projectId}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Select project first"
                readOnly
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Assign To</label>
              <select
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                required
                disabled={loadingEmployees}
              >
                <option value="">Select Employee</option>
                {employees.map((employee) => (
                  <option key={employee.employeeId} value={employee.employeeId}>
                    {employee.name}
                    {employee.designation ? ` (${employee.designation})` : ""}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Task Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title"
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              placeholder="Add task details"
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">Initial Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {STATUS_OPTIONS.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-100"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#021f54] text-white hover:bg-orange-400 hover:text-black text-sm font-medium px-4 py-2 rounded-md transition-colors duration-200 disabled:opacity-60"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
