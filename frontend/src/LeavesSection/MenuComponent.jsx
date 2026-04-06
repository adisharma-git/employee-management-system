import React, { useEffect, useState } from "react";
import TotalLeaves from "./totalLeaves";
import api from "../api/axios";
import LeavesHistory from "./LeavesHistory";
import ApproveLeaves from "./ApproveLeaves";
import { usePermission } from "../hooks/usePermission";

const AttendanceNav = () => {
  const [activeTab, setActiveTab] = useState("leave-types");
  const [leaves, setLeaves] = useState([]);
  const { can } = usePermission();

  const tabs = [
    { key: "leave-types", label: "Leave Types", visible: true },
    { key: "requests", label: "Leave Requests", visible: can("view_all_leaves") },
    { key: "history", label: "Leave History", visible: can("apply_leave") }
  ];

  const visibleTabs = tabs.filter((tab) => tab.visible);
  const effectiveActiveTab = visibleTabs.some((tab) => tab.key === activeTab)
    ? activeTab
    : visibleTabs[0]?.key ?? "leave-types";

  useEffect(() => {
    let isMounted = true;

    const loadLeaves = async () => {
      try {
        const [typesResult, balancesResult] = await Promise.allSettled([
          api.get("/leave-types"),
          api.get("/leaves/my-balances")
        ]);

        const leaveTypes =
          typesResult.status === "fulfilled"
            ? typesResult.value.data?.data || []
            : [];

        const balances =
          balancesResult.status === "fulfilled"
            ? balancesResult.value.data?.data || []
            : [];

        const balanceMap = new Map(
          balances.map((balance) => [String(balance.leaveTypeId), balance])
        );

        const mergedLeaves = leaveTypes.map((leaveType) => {
          const balance = balanceMap.get(String(leaveType.id));

          return {
            ...leaveType,
            allocated: balance?.allocated ?? leaveType.defaultDays ?? 0,
            used: balance?.used ?? 0,
            remaining:
              balance?.remaining ??
              (balance ? balance.allocated - balance.used : leaveType.defaultDays ?? 0)
          };
        });

        if (isMounted) {
          setLeaves(mergedLeaves);
        }
      } catch (error) {
        console.error("Error fetching leaves", error);
      }
    };

    void loadLeaves();

    return () => {
      isMounted = false;
    };
  }, []);

  const renderComponent = () => {
    switch (effectiveActiveTab) {
      case "requests":
        return <ApproveLeaves />;
      case "leave-types":
        return <TotalLeaves leaves={leaves}/>;
      case "history":
        return <LeavesHistory/>;
      default:
        return <LeavesHistory />;
    }
  };

  return (
    <div>
      <div className="bg-white border-b border-gray-200">
        <div className="flex gap-6 h-8 items-center px-5 text-[13px]">

          {visibleTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="relative pb-1 whitespace-nowrap transition-colors duration-200"
            >
              <span
                className={`font-medium ${
                  effectiveActiveTab === tab.key
                    ? "text-orange-500"
                    : "text-gray-700 hover:text-orange-500"
                }`}
              >
                {tab.label}
              </span>

              <span
                className={`absolute left-0 bottom-0 h-[2px] bg-orange-500 transition-all duration-300 ${
                  effectiveActiveTab === tab.key ? "w-full" : "w-0"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">{renderComponent()}</div>
    </div>
  );
};

export default AttendanceNav;
