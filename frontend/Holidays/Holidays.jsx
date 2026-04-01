import React, { useEffect, useState } from "react";
import api from "../src/api/axios";
import HolidayModal from "./HolidaysModal";
import { usePermission } from "../src/hooks/usePermission";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

const Holidays = () => {
  const { can } = usePermission();

  const [holidays, setHolidays] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchUpcomingHolidays();
  }, []);

  const fetchUpcomingHolidays = async () => {
    try {
      setIsLoading(true);
      const res = await api.get("/holidays/upcoming-holidays");
      if (res.data.success) {
        setHolidays(res.data.data);
      }
    } catch (error) {
      console.error("Fetch holidays error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccess = () => {
    fetchUpcomingHolidays();
    setShowModal(false);
  };

  return (
    <div className="p-6 md:p-8 bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
            <FontAwesomeIcon icon={faCalendarAlt} className="text-[#021f54]" />
            Holidays
          </h1>
          <p className="text-gray-500 text-sm">
            Upcoming company holidays
          </p>
        </div>

        {can("create_holidays") && (
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#021f54] text-white hover:bg-orange-400 hover:text-black px-4 py-2 rounded-lg transition flex items-center gap-2 shadow"
          >
            <span className="text-lg">+</span> Add Holiday
          </button>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* 🔥 Skeleton Loader */}
        {isLoading &&
          [1, 2, 3, 4, 5, 6].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow p-5 flex items-center gap-4 animate-pulse"
            >
              {/* Date skeleton */}
              <div className="bg-gray-300 rounded-lg w-[60px] h-[50px]" />

              {/* Text skeleton */}
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          ))}

        {/* Empty State */}
        {!isLoading && holidays.length === 0 && (
          <div className="col-span-full text-center text-gray-400">
            No upcoming holidays.
          </div>
        )}

        {/* Cards */}
        {!isLoading &&
          holidays.map((item) => {
            const date = new Date(item.date);
            const day = date.getDate();
            const month = date.toLocaleString("default", { month: "short" });
            const fullDate = date.toLocaleDateString();

            return (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition p-5 flex items-center gap-4"
              >
                {/* 📅 Date Box */}
                <div className="bg-[#021f54] text-white rounded-lg px-4 py-2 text-center min-w-[60px]">
                  <div className="text-lg font-bold leading-none">
                    {day}
                  </div>
                  <div className="text-xs uppercase tracking-wide">
                    {month}
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="text-gray-800 font-semibold text-base">
                    {item.name}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {fullDate}
                  </p>
                </div>
              </div>
            );
          })}
      </div>

      {/* Modal */}
      {showModal && (
        <HolidayModal
          onClose={() => setShowModal(false)}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
};

export default Holidays;