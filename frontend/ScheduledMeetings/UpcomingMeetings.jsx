import React, { useEffect, useState } from "react";
import MeetingModal from "./MeetingModal";
import api from "../src/api/axios";

const UpcomingMeetings = ({ permission = false }) => {

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
        <div className="p-8 bg-gray-50 min-h-screen">

            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Meetings
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Upcoming company meetings
                    </p>
                </div>
                {permission && (
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-[#021f54] text-white hover:bg-orange-400 hover:text-black text-sm font-medium px-4 py-1.5 rounded-md transition-colors duration-200"
                    >
                        + Schedule Meeting
                    </button>
                )}
            </div>

            <div className="grid gap-4">

                {isLoading && (
                    <div className="bg-white p-5 rounded-xl shadow text-gray-500 text-sm">
                        Loading upcoming meetings...
                    </div>
                )}

                {!isLoading && meetings.length === 0 && (
                    <div className="bg-white p-5 rounded-xl shadow text-gray-500 text-sm">
                        No upcoming meetings scheduled.
                    </div>
                )}

                {!isLoading && meetings.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white p-5 rounded-xl shadow hover:shadow-md transition flex justify-between items-start"
                    >
                        <div>
                            <h3 className="font-semibold text-lg text-gray-800">
                                {item.title}
                            </h3>
                            {item.description && (
                                <p className="text-gray-500 mt-1 text-sm max-w-xl">
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

                        <div className="text-right shrink-0 ml-4">
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