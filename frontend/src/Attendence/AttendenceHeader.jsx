import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faSignOutAlt, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const AttendenceHeader = () => {

  const [isCheckedIn, setIsCheckedIn] = useState(false);
  

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleCheckInToggle = () => {
  
    const newStatus = !isCheckedIn;
    
    setIsCheckedIn(newStatus);

    if (newStatus === true) {
    
      setShowSuccessPopup(true);
      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 3000);
    }
  };

  return (
    <div className="relative"> 
      
      {showSuccessPopup && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-green-50 border border-green-200 shadow-xl rounded-lg px-6 py-4 flex items-center gap-3 z-50 transition-all duration-500 ease-in-out">
        
          <div className="bg-green-100 p-2 rounded-full">
            <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 text-xl" />
          </div>
          
          <div>
            <h4 className="text-green-800 font-bold text-sm">Success</h4>
            <p className="text-green-600 text-xs">Your attendance has been marked!</p>
          </div>
        </div>
      )}
      
      <header className="bg-white border-b border-gray-100 shadow-sm px-8 py-6 flex justify-between items-center">
        
        <div>
          <h1 className="text-3xl font-bold text-gray-800">People</h1>
          <p className="text-gray-500 mt-2 text-sm">
            Manage and track employee attendance within your organization
          </p>
        </div>
        <div>
          <button
            onClick={handleCheckInToggle}
            className={`flex items-center gap-2 px-6 py-3 text-white rounded-md font-medium transition-all duration-300 shadow-md hover:shadow-lg
              ${isCheckedIn 
                 ? 'bg-[#d63725] hover:bg-red-400' 
                 : 'bg-[#4dc95c] hover:bg-green-300'   
              }`}
          >
            <FontAwesomeIcon icon={isCheckedIn ? faSignOutAlt : faSignInAlt} />
            <span>
              {isCheckedIn ? "Check-Out" : "Check-In"}
            </span>
          </button>
        </div>
      </header>
    </div>
  );
};

export default AttendenceHeader;