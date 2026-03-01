import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";


const LeavesHeader = () => {
  const [isEnabled] = useState(false);

  const [showSuccessPopup] = useState(false);
  const [successMessage] = useState("");

  return (
    <div className="sticky top-0 bg-gray-50 pb-4 z-20">
      {showSuccessPopup && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-green-50 border border-green-200 shadow-xl rounded-lg px-6 py-4 flex items-center gap-3 z-50">
          <div className="bg-green-100 p-2 rounded-full">
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="text-green-600 text-xl"
            />
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

        <div className="flex items-center gap-6">
          

          {/* Break Section */}
          <div className="flex flex-col items-end gap-2">
            {/* Toggle */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-600">
                {isEnabled ? "On Break" : "Working"}
              </span>
            </div>

            
          </div>
        </div>
      </header>
    </div>
  );
};

export default LeavesHeader;