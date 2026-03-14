import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faSignOutAlt,
   faSync ,
} from "@fortawesome/free-solid-svg-icons";
import api from "../api/axios";
import ToastContainer from "../Toaster/Toast";

const AttendenceHeader = ({ refreshData }) => {
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalBreakTime, setTotalBreakTime] = useState(0);
  const [leftBreakTime, setLeftBreakTime] = useState(0);
  const [toasts, setToasts] = useState([]);

  const addToast = (type, message) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };


  useEffect(() => {
    checkPunchStatus();
  }, []);

const checkPunchStatus = async () => {
  try {
    const response = await api.get("/attendance/punch-status");

    if (response.data?.data) {
      const data = response.data.data;

      setIsPunchedIn(data.isPunchedIn);

      setTotalBreakTime(data.breakStats?.totalBreakTime || 0);
      setLeftBreakTime(data.breakStats?.leftBreakTime || 0);
      const isBreakActive =
        data.todayAttendance?.status === "break";

      setIsEnabled(isBreakActive);
    }
  } catch (error) {
    console.log("Status check error:", error);
  }
};

  const progressPercent =
    totalBreakTime + leftBreakTime > 0
      ? (totalBreakTime / (totalBreakTime + leftBreakTime)) * 100
      : 0;

  const handleCheckIn = async () => {
    if (loading) return;
    setLoading(true);

    try {
      await api.post("/attendance/mark", {});
      addToast("success", "Checked in successfully!");

      await checkPunchStatus();
      if (refreshData) refreshData();
    } catch (error) {
      addToast("error", error.response?.data?.message || "Check-in failed");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async () => {
    if (loading) return;
    setLoading(true);

    const now = new Date();
    const checkOutTime = now.toLocaleTimeString("en-GB", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    try {
      await api.patch("/attendance/checkout", { checkOutTime });
      addToast("success", "Checked out successfully!");

      await checkPunchStatus();
      if (refreshData) refreshData();
    } catch (error) {
      addToast("error", error.response?.data?.message || "Check-out failed");
    } finally {
      setLoading(false);
    }
  };

const handleToggle = async () => {
  if (loading) return;

  setLoading(true);

  try {
    const statusRes = await api.get("/attendance/punch-status");
    const currentStatus =
      statusRes.data?.data?.todayAttendance?.status;

    const isCurrentlyOnBreak = currentStatus === "break";

    
    const response = await api.post("/attendance/break", {
      isStarting: !isCurrentlyOnBreak,
    });

    const breakData = response.data.data;



    setIsEnabled(!isCurrentlyOnBreak);

    if (refreshData) refreshData();
  } catch (error) {
    addToast("error", error.response?.data?.message || "Operation failed");
  } finally {
    setLoading(false);
  }
};
const handleRefreshBreakTime=()=>{
  setLoading(true);
  checkPunchStatus();
  setLoading(false);
}
 

  return (
    <div className="sticky top-0 bg-gray-50 pb-4 z-20">
      <ToastContainer toasts={toasts} onRemove={removeToast} topOffset={72} rightOffset={24} />

      <header className="bg-white border-b shadow-sm px-8 py-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">People</h1>
          <p className="text-gray-500 mt-2 text-sm">
            Manage and track employee attendance within your organization
          </p>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={handleCheckIn}
            disabled={loading || isPunchedIn}
            className="flex items-center gap-2 px-6 py-3 text-white rounded-md font-medium bg-green-600 hover:bg-green-700 disabled:opacity-50"
          >
            <FontAwesomeIcon icon={faSignInAlt} />
            {loading ? "Processing..." : "Check-In"}
          </button>

          <button
            onClick={handleCheckOut}
            disabled={loading || !isPunchedIn}
            className="flex items-center gap-2 px-6 py-3 text-white rounded-md font-medium bg-red-600 hover:bg-red-700 disabled:opacity-50"
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
            {loading ? "Processing..." : "Check-Out"}
          </button>

          {/* Break Section */}
          <div className="flex flex-col items-end gap-2">
            {/* Toggle */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-600">
                {isEnabled ? "On Break" : "Working"}
              </span>

              <button
                onClick={handleToggle}
                disabled={loading || !isPunchedIn}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                  isEnabled ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                    isEnabled ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <button
                onClick={handleRefreshBreakTime}
                className="flex items-center gap-2"
              >
                {loading ? (
                  <FontAwesomeIcon icon={faSync} spin />
                ) : (
                  <FontAwesomeIcon icon={faSync} />
                )}
                Refresh
              </button>
            </div>

            <div className="w-52">
              {loading ? (
                <div className="flex items-center justify-center h-6">
                  <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Break Used</span>
                  <span>{Math.round(progressPercent)}%</span>
                </div>
              )}

              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    progressPercent > 100 ? "bg-red-500" : "bg-blue-500"
                  }`}
                  style={{ width: `${Math.min(progressPercent, 100)}%` }}
                />
              </div>

              <div className="text-xs text-gray-400 mt-1 text-right">
                {totalBreakTime}m used • {leftBreakTime}m left
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default AttendenceHeader;