import React from "react";

const TotalLeaves = ({ leaves }) => {
  return (
    <div className="p-4">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
        {leaves?.map((leave) => (
          <div
            key={leave.id}
            className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 p-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-gray-700 font-medium text-sm">
                {leave.name}
              </h3>

              <div className="w-8 h-8 flex items-center justify-center rounded-md bg-orange-100 text-orange-500 text-sm font-bold">
                {leave.name?.charAt(0)}
              </div>
            </div>

            {/* Stats */}
            <div className="border-t pt-3 space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Available</span>
                <span className="text-green-600 font-semibold">
                  {leave.defaultDays}
                </span>
              </div>

              {/* Description Tooltip */}
              <div className="flex justify-between items-center relative group">
                <span className="text-gray-500 cursor-pointer flex items-center gap-1">
                  Description
                  <span className="text-xs bg-gray-200 rounded-full w-4 h-4 flex items-center justify-center">
                    i
                  </span>
                </span>

                <span className="text-gray-800 font-semibold">0</span>

                {/* Tooltip */}
                <div className="absolute bottom-8 left-0 hidden group-hover:block bg-gray-800 text-white text-xs px-3 py-2 rounded-md shadow-lg w-48 z-10">
                  {leave.description || "No description available"}
                </div>
              </div>
            </div>


            <div className="mt-3">
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-orange-500 h-1.5 rounded-full"
                  style={{ width: "30%" }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TotalLeaves;