import React, { useEffect, useState } from "react";
import MeetingModal from "./MeetingModal";
import api from "../src/api/axios";
import { usePermission } from "../src/hooks/usePermission";


const UpcomingMeetings = () => {
  const { can } = usePermission(); 

  const [meetings, setMeetings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchUpcomingMeetings();
  }, []);

  const fetchUpcomingMeetings = async () => {
    try {
      setIsLoading(true);
      const res = await api.get("/meetings/upcoming-meetings");

      if (res.data.success) {
        setMeetings(res.data.data);
      }
    } catch (error) {
      console.error("Fetch upcoming meetings error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccess = () => {
    fetchUpcomingMeetings();
    setShowModal(false);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-3 sm:gap-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
            Meetings
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Upcoming company meetings
          </p>
        </div>

        {/* 🔥 ONLY THIS PART CONTROLLED */}
        {can("create_meeting") && (
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#021f54] text-white hover:bg-orange-400 hover:text-black text-sm font-medium px-3 py-1.5 rounded-md transition-colors duration-200 flex items-center gap-1"
          >
            <span className="text-base">+</span> Meeting
          </button>
        )}

      </div>

      {/* Meetings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {isLoading && (
          <div className="bg-white p-4 rounded-xl shadow text-gray-500 col-span-full">
            Loading upcoming meetings...
          </div>
        )}

        {!isLoading && meetings.length === 0 && (
          <div className="bg-white p-4 rounded-xl shadow text-gray-500 col-span-full">
            No upcoming meetings scheduled.
          </div>
        )}

        {!isLoading &&
          meetings.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 sm:p-5 rounded-xl shadow hover:shadow-md transition flex flex-col md:flex-row justify-between items-start md:items-center"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 text-base sm:text-lg">
                  {item.title}
                </h3>

                {item.description && (
                  <p className="text-gray-500 mt-1 text-sm break-words">
                    {item.description}
                  </p>
                )}

                {item.meetLink && (
                  <a
                    href={item.meetLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-blue-600 hover:underline mt-2 inline-block"
                  >
                    Join Meeting →
                  </a>
                )}
              </div>

              <div className="mt-3 md:mt-0 text-right flex-shrink-0 md:ml-4">
                <span className="text-xs text-gray-400 block">
                  {new Date(item.date).toLocaleString()}
                </span>

                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full mt-2 inline-block">
                  Upcoming
                </span>
              </div>
            </div>
          ))}

      </div>

      {/* Modal */}
      {showModal && (
        <MeetingModal
          onClose={() => setShowModal(false)}
          onSuccess={handleSuccess}
        />
      )}

    </div>
  );
};

export default UpcomingMeetings;