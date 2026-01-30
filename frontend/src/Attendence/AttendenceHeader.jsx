import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faSignOutAlt, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import api from "../api/axios";

const AttendenceHeader = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  
  useEffect(() => {
    checkAttendanceStatus();
  }, []);

  const checkAttendanceStatus = async () => {
    try {
      const response = await api.get("/attendance/status");
      setIsCheckedIn(response.data.isCheckedIn || false);
    } catch (error) {
      console.log("Error checking status:", error);
    }
  };

  const handleCheckIn = async (e) => {
    e.preventDefault();
    if (loading) return;
    
    setLoading(true);
    
    try {
      const response = await api.post("/attendance/mark", {});
      
     
      setIsCheckedIn(response.data.isCheckedIn);
      
     
      setSuccessMessage(
        response.data.isCheckedIn 
          ? "You have successfully checked in!" 
          : "You have successfully checked out!"
      );
      setShowSuccessPopup(true);
      
      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 3000);
      
    } catch (error) {
      console.log("Error:", error);
      const errorMessage = error.response?.data?.message || "An error occurred. Please try again.";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sticky top-0 z-10 bg-gray-50 pb-4">      
      {showSuccessPopup && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-green-50 border border-green-200 shadow-xl rounded-lg px-6 py-4 flex items-center gap-3 z-50 transition-all duration-500 ease-in-out">        
          <div className="bg-green-100 p-2 rounded-full">
            <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 text-xl" />
          </div>          
          <div>
            <h4 className="text-green-800 font-bold text-sm">Success</h4>
            <p className="text-green-600 text-xs">{successMessage}</p>
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
            onClick={handleCheckIn}
            disabled={loading}
            className={`flex items-center gap-2 px-6 py-3 text-white rounded-md font-medium transition-all duration-300 shadow-md hover:shadow-lg
              ${loading ? 'opacity-50 cursor-not-allowed' : ''}
              ${isCheckedIn 
                 ? 'bg-[#d63725] hover:bg-red-600' 
                 : 'bg-[#4dc95c] hover:bg-green-600'   
              }`}
          >
            <FontAwesomeIcon icon={isCheckedIn ? faSignOutAlt : faSignInAlt} />
            <span>
              {loading ? "Processing..." : (isCheckedIn ? "Check-Out" : "Check-In")}
            </span>
          </button>
          
        </div>
      </header>
    </div>
  );
};

export default AttendenceHeader;