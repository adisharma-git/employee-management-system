import React, { useEffect, useState } from "react";
import api from "../src/api/axios";
import HolidayModal from "./HolidaysModal";
import { usePermission } from "../src/hooks/usePermission";


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
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-3 sm:gap-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
            Holidays
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Upcoming company holidays
          </p>
        </div>

        {can("create_holidays") && (
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#021f54] text-white hover:bg-orange-400 hover:text-black text-sm sm:text-base font-medium px-3 py-1.5 rounded-md transition-colors duration-200 flex items-center gap-1"
          >
            <span className="text-base">+</span> Holiday
          </button>
            )}
        
      </div>

      {/* Holidays Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {isLoading && (
          <div className="bg-white p-4 sm:p-5 rounded-xl shadow text-gray-500 text-sm sm:text-base col-span-full">
            Loading holidays...
          </div>
        )}

        {!isLoading && holidays.length === 0 && (
          <div className="bg-white p-4 sm:p-5 rounded-xl shadow text-gray-500 text-sm sm:text-base col-span-full">
            No upcoming holidays.
          </div>
        )}

        {!isLoading &&
          holidays.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 sm:p-5 rounded-xl shadow flex flex-col md:flex-row justify-between items-start md:items-center"
            >
              <div>
                <h3 className="font-semibold text-base sm:text-lg text-gray-800">
                  {item.name}
                </h3>
              </div>

              <div className="mt-2 md:mt-0 text-gray-500 text-sm sm:text-base">
                {new Date(item.date).toLocaleDateString()}
              </div>
            </div>
          ))}
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