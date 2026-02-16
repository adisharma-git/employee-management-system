import React from "react";

const AccessRestricted = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-6 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full bg-white rounded-2xl shadow-2xl p-12 text-center border border-gray-100 transition-all duration-300 hover:shadow-red-100">
        <div className="flex justify-center mb-8">
          <div className="bg-red-100 text-red-600 p-6 rounded-full animate-pulse">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 11c1.104 0 2-.896 2-2V7a2 2 0 10-4 0v2c0 1.104.896 2 2 2zm6 4v5a2 2 0 01-2 2H8a2 2 0 01-2-2v-5a2 2 0 012-2h8a2 2 0 012 2z"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-gray-800 mb-4 tracking-wide">
          Access Restricted
        </h1>

        <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
          You do not have permission to access this section of the system. If
          you believe this is an error, please contact your administrator for
          further assistance.
        </p>

        <div className="mt-10 h-1 w-32 bg-red-500 mx-auto rounded-full opacity-70"></div>
      </div>
    </div>
  );
};

export default AccessRestricted;
