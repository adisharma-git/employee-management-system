import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faSignOutAlt,
  faSync,
  faCoffee,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import api from "../api/axios";
import ToastContainer from "../Toaster/Toast";
import { usePermission } from "../hooks/usePermission";

const formatMinutes = (minutes) => {
  if (!minutes && minutes !== 0) return "0m";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
};

const AttendanceHeader = ({ refreshData }) => {
  const { can } = usePermission();

  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [isOnBreak, setIsOnBreak] = useState(false);
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
        setIsOnBreak(data.todayAttendance?.status === "break");
      }
    } catch (error) {
      console.log("Status check error:", error);
    }
  };

  const totalAllowedBreak = totalBreakTime + leftBreakTime;
  const progressPercent =
    totalAllowedBreak > 0
      ? Math.min((totalBreakTime / totalAllowedBreak) * 100, 100)
      : 0;

  const handleCheckIn = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await api.post("/attendance/mark", {});
      addToast("success", response?.data?.message || "Checked in successfully!");
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
    try {
      const response = await api.patch("/attendance/checkout", {});
      addToast("success", response?.data?.message || "Checked out successfully!");
      await checkPunchStatus();
      if (refreshData) refreshData();
    } catch (error) {
      addToast("error", error.response?.data?.message || "Check-out failed");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleBreak = async () => {
    if (loading || !isPunchedIn) return;
    setLoading(true);
    try {
      await api.post("/attendance/break", { isStarting: !isOnBreak });
      await checkPunchStatus();
      if (refreshData) refreshData();
    } catch (error) {
      addToast("error", error.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRefreshBreakTime = async () => {
    setLoading(true);
    await checkPunchStatus();
    setLoading(false);
  };

  return (
    <div className="sticky top-0 bg-gray-50 pb-4 z-20">
      <ToastContainer
        toasts={toasts}
        onRemove={removeToast}
        topOffset={72}
        rightOffset={24}
      />

      <header className="bg-white border-b shadow-sm px-8 py-5 flex justify-between items-center">

        {/* Left: Title */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Attendance</h1>
          <p className="text-gray-400 mt-1 text-sm">
            Track and manage your daily attendance & breaks
          </p>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-5">

          {/* Check-In / Check-Out */}
          {can("mark_attendance") && (
            <div className="flex items-center gap-3">
              {/* Check-In */}
              <button
                onClick={handleCheckIn}
                disabled={loading || isPunchedIn}
                title={isPunchedIn ? "Already checked in" : "Mark check-in"}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-md font-medium text-sm transition-all
                  ${!isPunchedIn
                    ? "bg-green-600 hover:bg-green-700 text-white shadow-sm"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
                  }`}
              >
                <FontAwesomeIcon icon={faSignInAlt} />
                {loading ? "..." : "Check-In"}
              </button>

              {/* Check-Out */}
              <button
                onClick={handleCheckOut}
                disabled={loading || !isPunchedIn}
                title={!isPunchedIn ? "Not checked in yet" : "Mark check-out"}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-md font-medium text-sm transition-all
                  ${isPunchedIn
                    ? "bg-red-500 hover:bg-red-600 text-white shadow-sm"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
                  }`}
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
                {loading ? "..." : "Check-Out"}
              </button>
            </div>
          )}

          {/* Divider */}
          <div className="h-10 w-px bg-gray-200" />

          {/* Break Section */}
          <div className="flex flex-col gap-2 min-w-[200px]">

            {/* Break toggle row */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faCoffee}
                  className={`text-sm ${isOnBreak ? "text-blue-500" : "text-gray-400"}`}
                />
                <span className="text-sm font-medium text-gray-600">
                  {isOnBreak ? "On Break" : "Working"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Toggle */}
                <button
                  onClick={handleToggleBreak}
                  disabled={loading || !isPunchedIn}
                  title={!isPunchedIn ? "Check in first" : isOnBreak ? "End break" : "Start break"}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200
                    ${isOnBreak ? "bg-blue-500" : "bg-gray-300"}
                    ${!isPunchedIn ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
                  `}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200
                      ${isOnBreak ? "translate-x-6" : "translate-x-1"}`}
                  />
                </button>

                {/* Refresh */}
                <button
                  onClick={handleRefreshBreakTime}
                  title="Refresh break time"
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FontAwesomeIcon
                    icon={faSync}
                    className={loading ? "animate-spin" : ""}
                  />
                </button>
              </div>
            </div>

            {/* Break time stats */}
            <div className="flex items-center justify-between text-xs text-gray-500 px-0.5">
              <span className="flex items-center gap-1">
                <FontAwesomeIcon icon={faClock} className="text-gray-400" />
                Used: <span className="font-semibold text-gray-700">{formatMinutes(totalBreakTime)}</span>
              </span>
              <span>
                Left: <span className={`font-semibold ${leftBreakTime <= 5 ? "text-red-500" : "text-gray-700"}`}>
                  {formatMinutes(leftBreakTime)}
                </span>
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full">
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    progressPercent >= 100
                      ? "bg-red-500"
                      : progressPercent >= 75
                      ? "bg-yellow-400"
                      : "bg-blue-500"
                  }`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-[11px] text-gray-400 mt-1 text-right">
                {totalAllowedBreak > 0
                  ? `${Math.round(progressPercent)}% of ${formatMinutes(totalAllowedBreak)} used`
                  : "No break data"}
              </p>
            </div>

          </div>
        </div>
      </header>
    </div>
  );
};

export default AttendanceHeader;