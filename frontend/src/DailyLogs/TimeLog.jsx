import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMagnifyingGlass,
  faDownload,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import TimeLogForm from "./TimeLogForm";
import api from "../api/axios";
import ToastContainer from "../Toaster/Toast";
import { usePermission } from "../hooks/usePermission";

export default function TimeLogDashboard() {
  const { can } = usePermission();

  const [timeLogs, setTimeLogs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingLog, setEditingLog] = useState(null);
  const [selectedLog, setSelectedLog] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const [toasts, setToasts] = useState([]);
  const [pendingDeleteKey, setPendingDeleteKey] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  // 🔥 Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 6;

  const addToast = (type, message) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const fetchLogs = async () => {
    try {
      setIsLoading(true);

      const res = await api.get("/logs");
      const apiData = res?.data?.data || [];

      const formattedLogs = apiData.flatMap((dayLog) =>
        (dayLog?.workItems || []).map((item) => ({
          logId: dayLog?.id || "",
          taskId: item?.id || "",
          date: dayLog?.date
            ? new Date(dayLog.date).toISOString().split("T")[0]
            : "",
          workName: item?.title || "",
          description: item?.description || "",
          status: item?.status || "",
          timeTaken: item?.timeTaken || 0,
        }))
      );

      setTimeLogs(formattedLogs);
    } catch (error) {
      console.error("Error fetching logs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  // ================= FILTER =================
  const filteredLogs = timeLogs.filter((log) => {
    const matchesSearch =
      log.workName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.date.includes(searchTerm);

    const matchesStatus =
      filterStatus === "All" || log.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // ================= PAGINATION =================
  const indexOfLast = currentPage * logsPerPage;
  const indexOfFirst = indexOfLast - logsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);

  // ================= DELETE =================
  const handleDeleteLog = async (log) => {
    const deleteKey = `${log.logId}-${log.taskId}`;

    if (pendingDeleteKey !== deleteKey) {
      setPendingDeleteKey(deleteKey);
      addToast("error", "Click delete again to confirm");
      setTimeout(() => setPendingDeleteKey(null), 3000);
      return;
    }

    try {
      await api.delete("/logs/delete", {
        data: { logId: log.logId, taskId: log.taskId },
      });

      setTimeLogs((prev) =>
        prev.filter(
          (l) => !(l.logId === log.logId && l.taskId === log.taskId)
        )
      );

      addToast("success", "Deleted successfully");
    } catch {
      addToast("error", "Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Time Logs
      </h1>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow mb-6 flex flex-wrap gap-4 items-center">

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option>All</option>
          <option>Pending</option>
          <option>Completed</option>
          <option>Rejected</option>
        </select>

        <div className="relative flex-1 min-w-[200px]">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="absolute left-3 top-3 text-gray-400"
          />
          <input
            className="w-full pl-10 border rounded px-3 py-2"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {can("create_daily_log") && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-[#021f54] text-white px-4 py-2 rounded-lg hover:bg-orange-400 hover:text-black transition"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add
          </button>
        )}

        <button className="bg-[#021f54] text-white px-4 py-2 rounded-lg hover:bg-orange-400 hover:text-black transition">
          <FontAwesomeIcon icon={faDownload} className="mr-2" />
          Export
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">

        {isLoading ? (
          <div className="p-6 space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-10 bg-gray-200 animate-pulse rounded" />
            ))}
          </div>
        ) : currentLogs.length === 0 ? (
          <p className="p-6 text-gray-500">No records found</p>
        ) : (
          <>
            <table className="w-full text-sm">
              <thead className="bg-[#021f54] text-white">
                <tr>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Work</th>
                  <th className="p-3 text-left">Time</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {currentLogs.map((log, i) => (
                  <tr
                    key={i}
                    onClick={() => setSelectedLog(log)}
                    className="border-t hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="p-3">{log.date}</td>
                    <td className="p-3">{log.workName}</td>
                    <td className="p-3">{log.timeTaken} hrs</td>
                    <td className="p-3">
                      <span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-600">
                        {log.status}
                      </span>
                    </td>

                    <td
                      className="p-3 text-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => handleDeleteLog(log)}
                        className="text-red-500 hover:scale-110 transition"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between items-center p-4">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Prev
              </button>

              <span className="text-sm">
                Page {currentPage} / {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      {/* 🔥 MODAL */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSelectedLog(null)}
          />

          <div className="relative bg-white w-full max-w-md mx-4 rounded-xl shadow-2xl p-6">
            <button
              onClick={() => setSelectedLog(null)}
              className="absolute top-3 right-4 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4">
              Time Log Details
            </h2>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Work</p>
                <p className="font-medium">{selectedLog.workName}</p>
              </div>

              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p>{selectedLog.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p>{selectedLog.timeTaken} hrs</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500">Status</p>
                <span className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded">
                  {selectedLog.status}
                </span>
              </div>

              <div>
                <p className="text-sm text-gray-500">Description</p>
                <p>
                  {selectedLog.description || "No description"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FORM */}
      {showForm && (
        <TimeLogForm
          onClose={() => setShowForm(false)}
          onSubmit={() => {
            fetchLogs();
            setShowForm(false);
          }}
          editingLog={editingLog}
        />
      )}
    </div>
  );
}