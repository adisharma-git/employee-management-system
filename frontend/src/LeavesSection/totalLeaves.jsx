import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import LeaveFormModal from "./LeaveFormModal";

const TotalLeaves = ({ leaves }) => {
    const [showForm, setShowForm] = useState(false);
    const handleAdd=()=>{
        setShowForm(true);
    }
  return (
    <div className="p-4">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
        {leaves?.map((leave) => (
          <div
            key={leave.id}
            className="relative bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 p-4"
          >
            <button
              className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center 
              rounded-full bg-[#021f54] text-white hover:text-black hover:bg-orange-400 shadow-sm transition"
              onClick={handleAdd}

            >
              <FontAwesomeIcon icon={faPlus} className="text-[10px]" />
            </button>

            <div className="flex items-center justify-between mb-3 pr-8">
              <h3 className="text-gray-700 font-medium text-sm">
                {leave.name} Leave
              </h3>

              <div className="w-8 h-8 flex items-center justify-center rounded-md bg-orange-100 text-orange-500 text-sm font-bold">
                {leave.name?.charAt(0)}
              </div>
            </div>

            <div className="border-t pt-3 space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Remaining</span>
                <span className="text-green-600 font-semibold">
                  {leave.remaining}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-500">Allocated</span>
                <span className="text-gray-800 font-semibold">
                  {leave.allocated}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-500">Used</span>
                <span className="text-gray-800 font-semibold">
                  {leave.used}
                </span>
              </div>

              <div className="flex justify-between items-center relative group">
                <span className="text-gray-500 cursor-pointer flex items-center gap-1">
                  Description
                  <span className="text-xs bg-gray-200 rounded-full w-4 h-4 flex items-center justify-center">
                    i
                  </span>
                </span>

                <span className="text-gray-800 font-semibold">{leave.remaining}</span>

                <div
                  className="absolute bottom-8 left-0 hidden group-hover:block 
                  bg-gray-800 text-white text-xs px-3 py-2 rounded-md shadow-lg 
                  w-48 z-10"
                >
                  {leave.description || "No description available"}
                </div>
              </div>
            </div>

            <div className="mt-3">
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-orange-500 h-1.5 rounded-full"
                  style={{
                    width: `${leave.allocated > 0 ? Math.min(100, (leave.used / leave.allocated) * 100) : 0}%`
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showForm && (
        <LeaveFormModal
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default TotalLeaves;