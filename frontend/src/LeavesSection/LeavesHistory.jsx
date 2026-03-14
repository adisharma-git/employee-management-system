import React, { useEffect, useState } from "react";
import api from "../api/axios";

const LeavesHistory = () => {
    const [balances, setBalances] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchLeaveBalances = async () => {
        try {
            setLoading(true);

            const response = await api.get("/leaves/my-balances");

            if (response.data.success) {
                setBalances(response.data.data);
            }

        } catch (error) {
            console.error("Error fetching leave balances:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeaveBalances();
    }, []);

    return (
        <div className="max-w-5xl mx-auto">

            <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                    Leave Balances
                </h2>
                <p className="text-gray-500 text-sm">
                    Overview of your available leaves
                </p>
            </div>


            {loading ? (
                <div className="text-center py-10 text-gray-500">
                    Loading leave balances...
                </div>
            ) : balances.length === 0 ? (

                <div className="text-center py-10 bg-white rounded-xl border">
                    No leave data found
                </div>

            ) : (

                <div className="grid md:grid-cols-2 gap-6">

                    {balances.map((leave) => {

                        const usedPercent =
                            (leave.used / leave.allocated) * 100;

                        return (

                            <div
                                key={leave.leaveTypeId}
                                className="bg-white border rounded-xl p-6 shadow-sm"
                            >
                                <div className="flex justify-between items-center mb-3">

                                    <h3 className="text-lg font-semibold text-gray-700">
                                        {leave.leaveType} Leave
                                    </h3>

                                    <span className="text-sm text-gray-400">
                                        {leave.remaining} remaining
                                    </span>

                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">

                                    <div
                                        className="bg-orange-500 h-2 rounded-full"
                                        style={{ width: `${usedPercent}%` }}
                                    />

                                </div>
                                <div className="flex justify-between text-sm">

                                    <div className="text-center">
                                        <p className="text-gray-400">Allocated</p>
                                        <p className="font-semibold text-gray-700">
                                            {leave.allocated}
                                        </p>
                                    </div>

                                    <div className="text-center">
                                        <p className="text-gray-400">Used</p>
                                        <p className="font-semibold text-red-500">
                                            {leave.used}
                                        </p>
                                    </div>

                                    <div className="text-center">
                                        <p className="text-gray-400">Remaining</p>
                                        <p className="font-semibold text-green-600">
                                            {leave.remaining}
                                        </p>
                                    </div>

                                </div>

                            </div>

                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default LeavesHistory;