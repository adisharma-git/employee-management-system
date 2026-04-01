import React, { useEffect, useState } from "react";
import MeetingModal from "./MeetingModal";
import api from "../src/api/axios";
import { usePermission } from "../src/hooks/usePermission";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faClock } from "@fortawesome/free-solid-svg-icons";

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
    <div className="p-6 md:p-8 bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
            <FontAwesomeIcon icon={faVideo} className="text-[#021f54]" />
            Meetings
          </h1>
          <p className="text-gray-500 text-sm">
            Upcoming company meetings
          </p>
        </div>

        {can("create_meeting") && (
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#021f54] text-white hover:bg-orange-400 hover:text-black px-4 py-2 rounded-lg transition flex items-center gap-2 shadow"
          >
            <span className="text-lg">+</span> Add Meeting
          </button>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {/* 🔥 Skeleton Loader */}
        {isLoading &&
          [1, 2, 3, 4, 5, 6].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow p-5 animate-pulse space-y-4"
            >
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>

              <div className="flex justify-between items-center mt-4">
                <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
                <div className="h-8 w-24 bg-gray-300 rounded"></div>
              </div>
            </div>
          ))}

        {/* Empty */}
        {!isLoading && meetings.length === 0 && (
          <div className="col-span-full text-center text-gray-400">
            No upcoming meetings scheduled.
          </div>
        )}

        {/* Cards */}
        {!isLoading &&
          meetings.map((item) => {
            const date = new Date(item.date);

            return (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition p-5 flex flex-col justify-between"
              >
                {/* Top */}
                <div>
                  <h3 className="text-gray-800 font-semibold text-lg">
                    {item.title}
                  </h3>

                  {item.description && (
                    <p className="text-gray-500 mt-2 text-sm line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>

                {/* Bottom */}
                <div className="mt-5 flex items-center justify-between">

                  {/* Time */}
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FontAwesomeIcon icon={faClock} />
                    {date.toLocaleString()}
                  </div>

                  {/* Join Button */}
                  {item.meetLink && (
                    <a
                      href={item.meetLink}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-[#021f54] text-white text-sm px-3 py-1.5 rounded-md hover:bg-orange-400 hover:text-black transition"
                    >
                      Join
                    </a>
                  )}
                </div>

                {/* Status */}
                <div className="mt-3">
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                    Upcoming
                  </span>
                </div>
              </div>
            );
          })}
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