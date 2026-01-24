import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faFilter,  
  faCalendarAlt, 
  faChevronDown,
  faTimes,
  faCheck,
  faChevronLeft, // Added for Calendar
  faChevronRight // Added for Calendar
} from '@fortawesome/free-solid-svg-icons';

const Tabs = ({ currentFilter = 'All', onFilterChange }) => {
  const [activeTab, setActiveTab] = useState('Active');
  
  // --- STATE FOR FILTER ---
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // --- STATE FOR DATE PICKER ---
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date()); 
  const [viewDate, setViewDate] = useState(new Date()); 

  const tabs = ['Active', 'Onboarding', 'Off-boarding', 'Dismissed'];

  const filterOptions = [
    { label: 'Present', value: 'Present', color: 'bg-green-500' },
    { label: 'Absent', value: 'Absent', color: 'bg-red-500' },
    { label: 'Leave', value: 'On Leave', color: 'bg-blue-500' },
    { label: 'Late', value: 'Late', color: 'bg-orange-500' },
  ];

  // --- CALENDAR LOGIC ---
  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // Get days in current month
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // Get which day of the week the month starts on (0 = Sunday)
  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const handleDateClick = (day) => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    setSelectedDate(newDate);
    setIsCalendarOpen(false); // Close calendar after selection
  };

  // Format date for the button (e.g., "Jan 24, 2026")
  const formatDateButton = (date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Generate the calendar grid
  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(viewDate);
    const firstDay = getFirstDayOfMonth(viewDate);
    const days = [];

    // Empty cells for days before the 1st
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 w-8"></div>);
    }

    // Actual days
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = 
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === viewDate.getMonth() &&
        selectedDate.getFullYear() === viewDate.getFullYear();

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          className={`h-8 w-8 text-sm rounded-lg flex items-center justify-center transition-all
            ${isSelected 
              ? 'bg-[#021f54] text-white font-bold shadow-md' // Selected Style (Navy Blue)
              : 'text-gray-700 hover:bg-gray-100' // Default Style
            }`}
        >
          {day}
        </button>
      );
    }
    return days;
  };

  return (
    <div className="bg-white px-8 pb-4 pt-4 shadow-sm border-b border-gray-100">
      
      {/* --- TABS --- */}
      <div className="flex space-x-8 border-b border-gray-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-semibold transition-all duration-300 relative
              ${activeTab === tab ? 'text-[#021f54]' : 'text-gray-400 hover:text-gray-600'}`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#021f54] rounded-t-md"></span>
            )}
          </button>
        ))}
      </div>

      {/* --- CONTROLS --- */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Search */}
        <div className="relative w-full md:w-1/3">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
          </span>
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 outline-none focus:ring-2 focus:ring-[#021f54]"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto relative z-20">
          
          {/* --- FILTER BUTTON --- */}
          <div className="relative">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center gap-2 px-4 py-2.5 border rounded-lg text-sm font-medium transition-colors whitespace-nowrap
                ${currentFilter !== 'All' 
                  ? 'bg-blue-50 border-[#021f54] text-[#021f54]'
                  : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}
            >
              <FontAwesomeIcon icon={faFilter} />
              <span>Filters</span>
              {currentFilter !== 'All' && (
                <span className="bg-[#021f54] text-white text-[10px] px-1.5 py-0.5 rounded-full ml-1">1</span>
              )}
              <FontAwesomeIcon icon={faChevronDown} className={`text-xs ml-1 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Filter Popover */}
            {isFilterOpen && (
              <div className="absolute top-full mt-2 left-0 w-64 bg-white rounded-xl shadow-xl border border-gray-100 p-5 z-50 animate-in fade-in zoom-in duration-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-gray-900 font-bold text-sm">Filter by Status</h3>
                  <button onClick={() => setIsFilterOpen(false)} className="text-gray-400 hover:text-gray-600">
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
                <ul className="space-y-3">
                  {filterOptions.map((option) => (
                    <li key={option.value}>
                      <button
                        onClick={() => { onFilterChange(option.value); setIsFilterOpen(false); }}
                        className="w-full flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-2.5 h-2.5 rounded-full ${option.color}`}></span>
                          <span className={`text-sm transition-colors ${currentFilter === option.value ? 'font-semibold text-gray-900' : 'text-gray-600 group-hover:text-gray-800'}`}>
                            {option.label}
                          </span>
                        </div>
                        {currentFilter === option.value && <FontAwesomeIcon icon={faCheck} className="text-[#021f54] text-xs" />}
                      </button>
                    </li>
                  ))}
                </ul>
                {currentFilter !== 'All' && (
                  <button 
                    onClick={() => { onFilterChange('All'); setIsFilterOpen(false); }}
                    className="w-full text-center text-xs text-red-500 font-medium mt-4 pt-3 border-t border-gray-100 hover:text-red-700"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            )}
          </div>

          {/* --- DATE PICKER BUTTON & POPUP --- */}
          <div className="relative">
            <button 
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors whitespace-nowrap"
            >
              <FontAwesomeIcon icon={faCalendarAlt} className="text-[#f97316]" />
              <span>{formatDateButton(selectedDate)}</span>
            </button>

            {/* Calendar Popover */}
            {isCalendarOpen && (
              <div className="absolute top-full mt-2 right-0 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 p-5 z-50 animate-in fade-in zoom-in duration-200">
                
                {/* Header (Month Year + Nav) */}
                <div className="flex justify-between items-center mb-4">
                  <button onClick={handlePrevMonth} className="h-8 w-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50">
                    <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
                  </button>
                  <span className="font-bold text-gray-800 text-sm">
                    {months[viewDate.getMonth()]} {viewDate.getFullYear()}
                  </span>
                  <button onClick={handleNextMonth} className="h-8 w-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50">
                    <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
                  </button>
                </div>
                <div className="grid grid-cols-7 mb-2">
                  {daysOfWeek.map(day => (
                    <div key={day} className="text-center text-xs font-medium text-gray-400 py-1">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {renderCalendarDays()}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tabs;