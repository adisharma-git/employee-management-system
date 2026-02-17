import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faUserCircle,
  faShieldAlt,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";

const EmployeeInfoPage = () => {
  const [openSection, setOpenSection] = useState("profiles");

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <header className="bg-[#002147] text-white py-16 px-4 text-center">
        <h1 className="text-5xl font-bold mb-4">
          Employee <span className="text-[#F97316]">Management</span>
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Manage employee profiles, roles, and records in one unified system.
        </p>
      </header>

      <main className="max-w-4xl mx-auto py-12 px-6">
        <div className="mb-4 border border-blue-100 rounded-lg shadow-sm overflow-hidden">
          <button
            onClick={() => toggleSection("profiles")}
            className="w-full flex items-center justify-between p-5 bg-blue-50 hover:bg-blue-100 transition-colors"
          >
            <div className="flex items-center gap-4">
              <FontAwesomeIcon
                icon={faUserCircle}
                className="text-[#002147] text-xl"
              />
              <span className="text-xl font-semibold text-[#002147]">
                Employee Profiles
              </span>
            </div>
            <FontAwesomeIcon
              icon={openSection === "profiles" ? faChevronUp : faChevronDown}
              className="text-gray-500"
            />
          </button>

          {openSection === "profiles" && (
            <div className="p-6 bg-white border-t border-blue-100">
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Add and manage employee personal details
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  View employee ID, department, and designation
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Update or deactivate employee accounts
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="mb-4 border border-blue-100 rounded-lg shadow-sm overflow-hidden">
          <button
            onClick={() => toggleSection("roles")}
            className="w-full flex items-center justify-between p-5 bg-blue-50 hover:bg-blue-100 transition-colors"
          >
            <div className="flex items-center gap-4">
              <FontAwesomeIcon
                icon={faShieldAlt}
                className="text-[#002147] text-xl"
              />
              <span className="text-xl font-semibold text-[#002147]">
                Roles & Permissions
              </span>
            </div>
            <FontAwesomeIcon
              icon={openSection === "roles" ? faChevronUp : faChevronDown}
              className="text-gray-500"
            />
          </button>

          {openSection === "roles" && (
            <div className="p-6 bg-white border-t border-blue-100 text-gray-700">
              Define access levels and ensure data security across your
              organization.
            </div>
          )}
        </div>

        <div className="mb-4 border border-blue-100 rounded-lg shadow-sm overflow-hidden">
          <button
            onClick={() => toggleSection("records")}
            className="w-full flex items-center justify-between p-5 bg-blue-50 hover:bg-blue-100 transition-colors"
          >
            <div className="flex items-center gap-4">
              <FontAwesomeIcon
                icon={faFileAlt}
                className="text-[#002147] text-xl"
              />
              <span className="text-xl font-semibold text-[#002147]">
                Employee Records
              </span>
            </div>
            <FontAwesomeIcon
              icon={openSection === "records" ? faChevronUp : faChevronDown}
              className="text-gray-500"
            />
          </button>

          {openSection === "records" && (
            <div className="p-6 bg-white border-t border-blue-100">
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Track active and inactive employees
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Maintain employee history and managers
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Search and filter employee data
                </li>
              </ul>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default EmployeeInfoPage;
