import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faSignOutAlt, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import api from "../api/axios";

const AttendenceHeader = ({ refreshData }) => {
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    checkPunchStatus();
  }, []);

  const checkPunchStatus = async () => {
    try {
      const response = await api.get("/attendance/punch-status");
      if (response.data?.data) {
        setIsPunchedIn(response.data.data.isPunchedIn);
      }
    } catch (error) {
      console.log("Status check error:", error);
    }
  };

  const handleCheckIn = async () => {
    if (loading) return;
    setLoading(true);

    try {
      await api.post("/attendance/mark", {});
      setSuccessMessage("Checked In Successfully!");
      setShowSuccessPopup(true);

      await checkPunchStatus();
      if (refreshData) refreshData();

    } catch (error) {
      alert(error.response?.data?.message || "Check-in failed");
    } finally {
      setLoading(false);
      setTimeout(() => setShowSuccessPopup(false), 3000);
    }
  };

  const handleCheckOut = async () => {
    if (loading) return;
    setLoading(true);

    const now = new Date();
    const checkOutTime = now.toLocaleTimeString("en-GB", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    try {
      await api.patch("/attendance/checkout", { checkOutTime });
      setSuccessMessage("Checked Out Successfully!");
      setShowSuccessPopup(true);

      await checkPunchStatus();
      if (refreshData) refreshData();

    } catch (error) {
      alert(error.response?.data?.message || "Check-out failed");
    } finally {
      setLoading(false);
      setTimeout(() => setShowSuccessPopup(false), 3000);
    }
  };

  return (
    <div className="sticky top-0 bg-gray-50 pb-4 z-20">

      {showSuccessPopup && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-green-50 border border-green-200 shadow-xl rounded-lg px-6 py-4 flex items-center gap-3 z-50">
          <div className="bg-green-100 p-2 rounded-full">
            <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 text-xl" />
          </div>
          <div>
            <h4 className="text-green-800 font-bold text-sm">Success</h4>
            <p className="text-green-600 text-xs">{successMessage}</p>
          </div>
        </div>
      )}

      <header className="bg-white border-b shadow-sm px-8 py-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">People</h1>
          <p className="text-gray-500 mt-2 text-sm">
            Manage and track employee attendance within your organization
          </p>
        </div>

        <div className="flex gap-4">

          <button
            onClick={handleCheckIn}
            disabled={loading || isPunchedIn}
            className="flex items-center gap-2 px-6 py-3 text-white rounded-md font-medium bg-green-600 hover:bg-green-700 disabled:opacity-50"
          >
            <FontAwesomeIcon icon={faSignInAlt} />
            {loading ? "Processing..." : "Check-In"}
          </button>

          <button
            onClick={handleCheckOut}
            disabled={loading || !isPunchedIn}
            className="flex items-center gap-2 px-6 py-3 text-white rounded-md font-medium bg-red-600 hover:bg-red-700 disabled:opacity-50"
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
            {loading ? "Processing..." : "Check-Out"}
          </button>

        </div>
      </header>
    </div>
  );
};

export default AttendenceHeader;
