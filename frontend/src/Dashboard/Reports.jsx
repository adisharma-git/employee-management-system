import React, { useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faClock,
  faUmbrellaBeach,
  faCheckCircle,
  faTimesCircle,
  faCalendarAlt,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

import EmployeePerformance from "./EmployeePerformance";

const DashboardHeader = () => {
  const [view, setView] = useState("Daily");
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [loadingEmployees, setLoadingEmployees] = useState(false);

  const [attendanceState, setAttendanceState] = useState({
    status: "No record",
    checkIn: "--",
    checkOut: "--",
    isPunchedIn: false,
    sourceLabel: "",
  });
  const [loadingAttendance, setLoadingAttendance] = useState(false);
  const [currentUserEmployeeId, setCurrentUserEmployeeId] = useState("");

  const [leaveRows, setLeaveRows] = useState([]);
  const [leaveMeta, setLeaveMeta] = useState({ sourceLabel: "" });
  const [loadingLeaves, setLoadingLeaves] = useState(false);

  const selectedEmployee = useMemo(
    () => employees.find((item) => item.employeeId === selectedEmployeeId),
    [employees, selectedEmployeeId]
  );

  const todayIso = useMemo(() => new Date().toISOString().split("T")[0], []);

  const formatTime = (value) => {
    if (!value) return "--";
    const dateValue = new Date(value);
    if (Number.isNaN(dateValue.getTime())) return "--";
    return dateValue.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const toTitleCaseStatus = (status) => {
    if (!status) return "No record";
    return status
      .toString()
      .replace("-", " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoadingEmployees(true);
      try {
        const response = await api.get("/admin/employees");
        const list = (response.data?.data || [])
          .map((item) => ({
            userId: item.id,
            employeeId: item.employee?.id,
            name: item.employee?.name || "Unnamed",
            department: item.employee?.department || "Unassigned",
            designation: item.employee?.designation || "Not assigned",
            email: item.email || "",
          }))
          .filter((item) => item.employeeId);

        setEmployees(list);
        setSelectedEmployeeId((prev) => prev || list[0]?.employeeId || "");
      } catch (error) {
        console.error("Failed to fetch employees:", error);
        setEmployees([]);
      } finally {
        setLoadingEmployees(false);
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    if (!selectedEmployeeId) return;

    const fetchAttendanceStatus = async () => {
      setLoadingAttendance(true);
      try {
        const [punchRes, allAttendanceRes] = await Promise.allSettled([
          api.get("/attendance/punch-status"),
          api.get(`/attendance/all-employees-attendance?date=${todayIso}`),
        ]);

        const punchData =
          punchRes.status === "fulfilled" ? punchRes.value.data?.data : null;
        if (punchData?.employee?.id) {
          setCurrentUserEmployeeId(punchData.employee.id);
        }

        const attendanceRecords =
          allAttendanceRes.status === "fulfilled"
            ? allAttendanceRes.value.data?.data || []
            : [];

        const selectedRecord = attendanceRecords.find(
          (record) => record.employeeId === selectedEmployeeId
        );

        const selectedIsCurrentUser =
          punchData?.employee?.id && punchData.employee.id === selectedEmployeeId;

        if (selectedRecord) {
          setAttendanceState({
            status: toTitleCaseStatus(selectedRecord.status),
            checkIn: formatTime(selectedRecord.checkInTime),
            checkOut: formatTime(selectedRecord.checkOutTime),
            isPunchedIn:
              Boolean(selectedRecord.checkInTime) && !selectedRecord.checkOutTime,
            sourceLabel: "Attendance source: /attendance/all-employees-attendance",
          });
          return;
        }

        if (selectedIsCurrentUser) {
          setAttendanceState({
            status: toTitleCaseStatus(punchData?.todayAttendance?.status),
            checkIn: formatTime(punchData?.todayAttendance?.checkInTime),
            checkOut: formatTime(punchData?.todayAttendance?.checkOutTime),
            isPunchedIn: Boolean(punchData?.isPunchedIn),
            sourceLabel: "Attendance source: /attendance/punch-status",
          });
          return;
        }

        setAttendanceState({
          status: "Absent",
          checkIn: "--",
          checkOut: "--",
          isPunchedIn: false,
          sourceLabel: "No attendance record found for today",
        });
      } catch (error) {
        console.error("Failed to fetch attendance status:", error);
        setAttendanceState({
          status: "Unavailable",
          checkIn: "--",
          checkOut: "--",
          isPunchedIn: false,
          sourceLabel: "Failed to load attendance",
        });
      } finally {
        setLoadingAttendance(false);
      }
    };

    fetchAttendanceStatus();
  }, [selectedEmployeeId, todayIso]);

  useEffect(() => {
    if (!selectedEmployeeId) return;

    const fetchLeaveStatus = async () => {
      setLoadingLeaves(true);
      try {
        const [leaveTypesRes, myBalancesRes, allLeavesRes] =
          await Promise.allSettled([
            api.get("/leave-types"),
            api.get("/leaves/my-balances"),
            api.get("/leaves/all"),
          ]);

        const leaveTypes =
          leaveTypesRes.status === "fulfilled"
            ? leaveTypesRes.value.data?.data || []
            : [];

        if (allLeavesRes.status === "fulfilled") {
          const allLeaves = allLeavesRes.value.data?.data || [];
          const selectedEmployeeLeaves = allLeaves.filter(
            (leave) => leave.employeeId === selectedEmployeeId
          );

          const rows = leaveTypes.map((type) => {
            const matchingLeaves = selectedEmployeeLeaves.filter(
              (leave) => leave.leaveTypeId === type.id
            );

            const used = matchingLeaves
              .filter((leave) => leave.status === "approved")
              .reduce((sum, leave) => sum + (leave.appliedDays || 0), 0);

            const pending = matchingLeaves
              .filter((leave) => leave.status === "pending")
              .reduce((sum, leave) => sum + (leave.appliedDays || 0), 0);

            const allocated = type.defaultDays || 0;

            return {
              leaveType: type.name,
              allocated,
              used,
              pending,
              remaining: Math.max(0, allocated - used),
            };
          });

          setLeaveRows(rows);
          setLeaveMeta({ sourceLabel: "Leave source: /leave-types + /leaves/all" });
          return;
        }

        if (
          myBalancesRes.status === "fulfilled" &&
          currentUserEmployeeId === selectedEmployeeId
        ) {
          const fallbackRows = (myBalancesRes.value.data?.data || []).map((item) => ({
            leaveType: item.leaveType,
            allocated: item.allocated || 0,
            used: item.used || 0,
            pending: 0,
            remaining: item.remaining || 0,
          }));

          setLeaveRows(fallbackRows);
          setLeaveMeta({ sourceLabel: "Leave source: /leave-types + /leaves/my-balances" });
          return;
        }

        setLeaveRows([]);
        setLeaveMeta({ sourceLabel: "Leave records are not available for this employee." });
      } catch (error) {
        console.error("Failed to fetch leave status:", error);
        setLeaveRows([]);
        setLeaveMeta({ sourceLabel: "Failed to load leave details" });
      } finally {
        setLoadingLeaves(false);
      }
    };

    fetchLeaveStatus();
  }, [selectedEmployeeId, currentUserEmployeeId]);

  const selectedEmployeeCard = selectedEmployee
    ? {
        name: selectedEmployee.name,
        employeeCode: selectedEmployee.employeeId,
        role: `${selectedEmployee.designation} | ${selectedEmployee.department}`,
      }
    : {};

  return (
    <section className="w-full bg-gradient-to-b from-slate-50 to-white p-1 sm:p-2">
      <div className="mb-5 flex flex-col gap-1 pb-2">
        <h1 className="text-xl font-semibold text-slate-900">Reports</h1>
        <p className="text-sm text-slate-600">
          Track employee performance with attendance and leave intelligence.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-3 xl:grid-cols-[minmax(280px,1fr)_auto_auto] xl:items-center">
        <div className="relative w-full">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
            <FontAwesomeIcon icon={faUsers} />
          </div>
          <select
            value={selectedEmployeeId}
            onChange={(event) => setSelectedEmployeeId(event.target.value)}
            className="w-full cursor-pointer appearance-none rounded-md border border-slate-200 bg-white px-4 py-2.5 pl-11 pr-10 text-sm text-slate-700 focus:border-blue-900 focus:outline-none"
            disabled={loadingEmployees}
          >
            {!employees.length && (
              <option value="">No employees available</option>
            )}
            {employees.map((employee) => (
              <option key={employee.employeeId} value={employee.employeeId}>
                {employee.name} ({employee.designation})
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-[10px] text-slate-400">
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
        </div>

        <div className="grid grid-cols-2 rounded-md border border-slate-200 p-1">
          {["Daily", "Weekly"].map((item) => (
            <button
              key={item}
              onClick={() => setView(item)}
              className={`rounded-md px-5 py-1.5 text-sm font-semibold transition-colors ${
                view === item
                  ? "bg-blue-900 text-white"
                  : "text-slate-600 hover:text-slate-800"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <button className="flex w-full items-center justify-between rounded-md border border-slate-200 px-4 py-2.5 text-left transition-colors hover:border-slate-300 xl:w-auto">
          <div className="flex items-center text-slate-700">
            <span className="mr-3 text-slate-400">
              <FontAwesomeIcon
                icon={faCalendarAlt}
              />
            </span>
            <span className="text-sm font-medium whitespace-nowrap">
              February 04, 2026
            </span>
          </div>
          <span className="ml-4 text-[10px] text-slate-400">
            <FontAwesomeIcon icon={faChevronDown} />
          </span>
        </button>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 xl:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-500">
                Attendance Status
              </p>
              <h3 className="mt-1 text-base font-semibold text-slate-900">
                {selectedEmployee?.name || "Select employee"}
              </h3>
            </div>
            <span className="rounded-full bg-blue-50 p-2 text-blue-900">
              <FontAwesomeIcon icon={faClock} />
            </span>
          </div>

          {loadingAttendance ? (
            <p className="text-sm text-slate-500">Loading attendance status...</p>
          ) : (
            <>
              <div className="mb-4 flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
                <p className="text-sm font-medium text-slate-600">Current status</p>
                <p className="text-sm font-semibold text-slate-900">
                  {attendanceState.status}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-slate-200 p-3">
                  <p className="text-xs text-slate-500">Check In</p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {attendanceState.checkIn}
                  </p>
                </div>
                <div className="rounded-lg border border-slate-200 p-3">
                  <p className="text-xs text-slate-500">Check Out</p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {attendanceState.checkOut}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                <FontAwesomeIcon
                  icon={attendanceState.isPunchedIn ? faCheckCircle : faTimesCircle}
                  className={
                    attendanceState.isPunchedIn ? "text-emerald-500" : "text-rose-500"
                  }
                />
                <span>
                  {attendanceState.isPunchedIn ? "Punched in" : "Not punched in"}
                </span>
              </div>
              <p className="mt-2 text-[11px] text-slate-400">{attendanceState.sourceLabel}</p>
            </>
          )}
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-500">
                Leave Status Detail
              </p>
              <h3 className="mt-1 text-base font-semibold text-slate-900">
                {selectedEmployee?.name || "Select employee"}
              </h3>
            </div>
            <span className="rounded-full bg-amber-50 p-2 text-amber-700">
              <FontAwesomeIcon icon={faUmbrellaBeach} />
            </span>
          </div>

          {loadingLeaves ? (
            <p className="text-sm text-slate-500">Loading leave details...</p>
          ) : leaveRows.length === 0 ? (
            <p className="text-sm text-slate-500">No leave details available.</p>
          ) : (
            <div className="max-h-[220px] space-y-2 overflow-y-auto pr-1">
              {leaveRows.map((row) => (
                <div
                  key={row.leaveType}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-800">{row.leaveType}</p>
                    <p className="text-xs text-slate-500">
                      {row.remaining} remaining
                    </p>
                  </div>
                  <div className="mt-1 grid grid-cols-3 text-xs text-slate-600">
                    <p>Allocated: {row.allocated}</p>
                    <p>Used: {row.used}</p>
                    <p>Pending: {row.pending}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          <p className="mt-2 text-[11px] text-slate-400">{leaveMeta.sourceLabel}</p>
        </div>
      </div>

      <EmployeePerformance employee={selectedEmployeeCard} />

    </section>
  );
};

export default DashboardHeader;
