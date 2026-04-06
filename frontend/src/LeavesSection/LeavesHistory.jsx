import React, { useEffect, useState } from "react";
import api from "../api/axios";

const LeavesHistory = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchLeaveHistory = async () => {
        try {
            setLoading(true);
            const response = await api.get("/leaves/my-history");

            if (response.data.success) {
                setHistory(response.data.data || []);
            }
        } catch (error) {
            console.error("Error fetching leave history:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeaveHistory();
    }, []);

    return (
        <div className="max-w-5xl mx-auto">
            <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Leave History</h2>
                <p className="text-gray-500 text-sm">Your submitted leave requests</p>
            </div>

            {loading ? (
                <div className="text-center py-10 text-gray-500">Loading leave history...</div>
            ) : history.length === 0 ? (
                <div className="text-center py-10 bg-white rounded-xl border">
                    No leave requests found
                </div>
            ) : (
                <div className="space-y-4">
                    {history.map((leave) => (
                        <div key={leave.id} className="bg-white border rounded-xl p-5 shadow-sm">
                            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-700">
                                        {leave.leaveType?.name || "Leave"}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {new Date(leave.fromDate).toLocaleDateString()} to {new Date(leave.toDate).toLocaleDateString()}
                                    </p>
                                </div>
                                <span
                                    className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-medium ${
                                        leave.status === "approved"
                                            ? "bg-green-100 text-green-700"
                                            : leave.status === "rejected"
                                            ? "bg-red-100 text-red-700"
                                            : "bg-yellow-100 text-yellow-700"
                                    }`}
                                >
                                    {leave.status}
                                </span>
                            </div>

                            <div className="mt-4 grid gap-3 sm:grid-cols-3 text-sm">
                                <div>
                                    <p className="text-gray-400">Days</p>
                                    <p className="font-semibold text-gray-700">{leave.appliedDays}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400">Half Day</p>
                                    <p className="font-semibold text-gray-700">{leave.isHalfDay ? "Yes" : "No"}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400">Requested On</p>
                                    <p className="font-semibold text-gray-700">
                                        {leave.createdAt ? new Date(leave.createdAt).toLocaleDateString() : "-"}
                                    </p>
                                </div>
                            </div>

                            {leave.reason && (
                                <p className="mt-4 text-sm text-gray-600">{leave.reason}</p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LeavesHistory;