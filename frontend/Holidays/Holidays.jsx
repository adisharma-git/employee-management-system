import React, { useEffect, useState } from "react";

import api from "../src/api/axios";
import HolidayModal from "./HolidaysModal";

const Holidays = ({ permission = false }) => {

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
        <div className="p-8 bg-gray-50 min-h-screen">

            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Holidays
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Upcoming company holidays
                    </p>
                </div>

                {permission && (
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-[#021f54] text-white hover:bg-orange-400 hover:text-black px-4 py-1.5 rounded-md"
                    >
                        + Add Holiday
                    </button>
                )}
            </div>

            <div className="grid gap-4">

                {isLoading && (
                    <div className="bg-white p-5 rounded-xl shadow">
                        Loading holidays...
                    </div>
                )}

                {!isLoading && holidays.length === 0 && (
                    <div className="bg-white p-5 rounded-xl shadow">
                        No upcoming holidays.
                    </div>
                )}

                {!isLoading && holidays.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white p-5 rounded-xl shadow flex justify-between"
                    >
                        <div>
                            <h3 className="font-semibold text-lg">
                                {item.name}
                            </h3>
                        </div>

                        <div className="text-right">
                            <span className="text-sm text-gray-500">
                                {new Date(item.date).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                ))}

            </div>

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