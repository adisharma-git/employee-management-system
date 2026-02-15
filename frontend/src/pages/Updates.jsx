import React, { useState } from "react";

const AccordionSection = ({ version, title, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <section className="border rounded-lg shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-6 py-4 text-left font-semibold text-[#0B2C5F] bg-[#e6f0ff] rounded-t-lg focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className="text-lg">{version}: {title}</span>
        <svg
          className={`w-6 h-6 transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="px-6 py-4 text-gray-700 leading-relaxed bg-white rounded-b-lg border-t border-[#0B2C5F]/20">
          {children}
        </div>
      )}
    </section>
  );
};

const Updates = () => {
  return (
    <div className="h-screen flex flex-col bg-gray-50">

      {/* Fixed Header */}
      <div className="bg-[#0B2C5F] py-12 px-6 text-center flex-shrink-0">
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          Updates <span className="text-orange-500">& Releases</span>
        </h1>
        <p className="text-gray-200 mt-4 max-w-2xl mx-auto">
          Here you can see the latest updates and features added to our platform, organized by sprint or release.
        </p>
        <p className="text-sm text-gray-300 mt-2">
          Last Updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 py-10">
        <div className="max-w-5xl mx-auto space-y-6">

          <AccordionSection version="Sprint 5.2" title="New Features & Improvements">
            <ul className="list-disc list-inside space-y-2">
              <li>Added advanced employee search with filters by department and role.</li>
              <li>Integrated automated email reminders for pending tasks.</li>
              <li>Enhanced dashboard performance with faster loading graphs.</li>
              <li>Added export to CSV and PDF functionality for reports.</li>
            </ul>
          </AccordionSection>

          <AccordionSection version="Sprint 5.1" title="Enhancements & Fixes">
            <ul className="list-disc list-inside space-y-2">
              <li>Fixed login issue on mobile devices for certain browsers.</li>
              <li>Improved attendance tracking accuracy with timezone support.</li>
              <li>Updated UI for task management module for better usability.</li>
            </ul>
          </AccordionSection>

          <AccordionSection version="Sprint 5.0" title="Major Release">
            <ul className="list-disc list-inside space-y-2">
              <li>Introduced new Employee Management Dashboard with real-time stats.</li>
              <li>Implemented role-based access control for security compliance.</li>
              <li>Added notifications center for announcements and alerts.</li>
            </ul>
          </AccordionSection>

          {/* Footer */}
          <div className="pt-6 border-t text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Your Company Name. All rights reserved.
          </div>

        </div>
      </div>

    </div>
  );
};

export default Updates;
