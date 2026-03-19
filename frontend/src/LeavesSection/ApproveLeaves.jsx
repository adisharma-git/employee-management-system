import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../api/axios";

const ApproveLeaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("pending");

  const fetchLeaves = async () => {
    try {
      setLoading(true);
      const res = await api.get(
        `/all${filter ? `?status=${filter}` : ""}`
      );
      setLeaves(res.data.data);
    } catch (error) {
      console.error("Error fetching leaves:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, [filter]);

  const handleStatusUpdate = async (id, status) => {
    try {
      await api.patch(`/${id}/status`, { status });
      fetchLeaves();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (

      <div>
        
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl font-bold text-gray-800">
            Leave Requests
          </h1>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border px-3 py-2 rounded-lg focus:outline-none"
          >
            <option value="pending">Pending</option>
            <option value="">All</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            
            <thead>
              <tr className="bg-gray-200 text-gray-700 text-sm">
                <th className="p-3 text-left">Employee</th>
                <th className="p-3 text-left">Department</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">From</th>
                <th className="p-3 text-left">To</th>
                <th className="p-3 text-left">Days</th>
                <th className="p-3 text-left">Reason</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="9" className="text-center p-5">
                    Loading...
                  </td>
                </tr>
              ) : leaves.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center p-5 text-gray-500">
                    No leave requests found
                  </td>
                </tr>
              ) : (
                leaves.map((leave) => (
                  <tr
                    key={leave.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-3 font-medium">
                      {leave.employee.name}
                      <div className="text-xs text-gray-500">
                        {leave.employee.designation}
                      </div>
                    </td>

                    <td className="p-3">
                      {leave.employee.department}
                    </td>

                    <td className="p-3">{leave.leaveType}</td>

                    <td className="p-3">
                      {new Date(leave.fromDate).toLocaleDateString()}
                    </td>

                    <td className="p-3">
                      {new Date(leave.toDate).toLocaleDateString()}
                    </td>

                    <td className="p-3">{leave.appliedDays}</td>

                    <td className="p-3 max-w-xs truncate">
                      {leave.reason}
                    </td>

                    {/* Status */}
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 text-xs rounded-full font-medium ${
                          leave.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : leave.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {leave.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="p-3 text-center">
                      {leave.status === "pending" ? (
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() =>
                              handleStatusUpdate(leave.id, "approved")
                            }
                            className="px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600"
                          >
                            Approve
                          </button>

                          <button
                            onClick={() =>
                              handleStatusUpdate(leave.id, "rejected")
                            }
                            className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">
                          No Action
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>
      </div>

  );
};

export default ApproveLeaves;