import React, { useState } from "react";

const CalendarWithLeave = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
    const startingDayIndex = firstDayOfMonth.getDay();

    const days = [];

    // Previous month blanks
    for (let i = 0; i < startingDayIndex; i++) {
        days.push(null);
    }

    // Current month days
    for (let i = 1; i <= lastDateOfMonth; i++) {
        days.push(i);
    }

    const handlePrev = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const handleNext = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const handleAddClick = (day) => {
        const fullDate = new Date(year, month, day);
        setSelectedDate(fullDate);
        setShowForm(true);
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow">


            <div className="flex justify-between items-center mb-4">
                <button onClick={handlePrev} className="text-lg font-bold">
                    ◀
                </button>

                <h2 className="text-lg font-semibold">
                    {currentDate.toLocaleString("default", { month: "long" })} {year}
                </h2>

                <button onClick={handleNext} className="text-lg font-bold">
                    ▶
                </button>
            </div>


            <div className="grid grid-cols-7 text-center text-sm font-semibold text-gray-600 border-b pb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day}>{day}</div>
                ))}
            </div>


            <div className="grid grid-cols-7 gap-px bg-gray-200 mt-2">
                {days.map((day, index) => (
                    <div
                        key={index}
                        className="bg-white min-h-[90px] p-2 relative group hover:bg-blue-50 transition"
                    >
                        {day && (
                            <>
                                <div className="text-sm font-medium text-gray-700">
                                    {day}
                                </div>


                                <button
                                    onClick={() => handleAddClick(day)}
                                    className="absolute bottom-2 right-2 text-blue-500 opacity-0 group-hover:opacity-100 transition"
                                >
                                    +
                                </button>
                            </>
                        )}
                    </div>
                ))}
            </div>


            {showForm && (
                <LeaveModal
                    date={selectedDate}
                    onClose={() => setShowForm(false)}
                />
            )}
        </div>
    );
};

export default CalendarWithLeave;