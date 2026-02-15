import React, { useState } from "react";

const AccordionSection = ({ number, title, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <section className="border rounded-lg shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-6 py-4 text-left font-semibold text-[#0B2C5F] bg-[#e6f0ff] rounded-t-lg focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className="text-lg">{number}. {title}</span>
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

const SecurityPolicy = () => {
  return (
    <div className="h-screen flex flex-col bg-gray-50">

      {/* Fixed Header */}
      <div className="bg-[#0B2C5F] py-12 px-6 text-center flex-shrink-0">
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          Security <span className="text-orange-500">Policy</span>
        </h1>
        <p className="text-gray-200 mt-4 max-w-2xl mx-auto">
          Learn about the security measures and practices we employ to protect your data.
        </p>
        <p className="text-sm text-gray-300 mt-2">
          Effective Date: {new Date().toLocaleDateString()}
        </p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 py-10">
        <div className="max-w-5xl mx-auto space-y-6">

          <AccordionSection number="1" title="Data Encryption">
            <p>
              We use industry-standard encryption protocols such as TLS to protect data in transit and AES-256 for data at rest.
            </p>
          </AccordionSection>

          <AccordionSection number="2" title="Access Controls">
            <p>
              Strict access control policies ensure that only authorized personnel can access sensitive information.
            </p>
          </AccordionSection>

          <AccordionSection number="3" title="Network Security">
            <p>
              Our network infrastructure is protected by firewalls, intrusion detection systems, and regular vulnerability assessments.
            </p>
          </AccordionSection>

          <AccordionSection number="4" title="Regular Security Audits">
            <p>
              We conduct periodic security audits and penetration testing to identify and mitigate potential vulnerabilities.
            </p>
          </AccordionSection>

          <AccordionSection number="5" title="Employee Training">
            <p>
              All employees receive ongoing security awareness training to ensure compliance with best practices.
            </p>
          </AccordionSection>

          <AccordionSection number="6" title="Incident Response">
            <p>
              We maintain an incident response plan to quickly address and resolve security breaches or incidents.
            </p>
          </AccordionSection>

          <AccordionSection number="7" title="Data Backup and Recovery">
            <p>
              Regular backups are performed to protect data integrity and support disaster recovery.
            </p>
          </AccordionSection>

          <AccordionSection number="8" title="User Responsibilities">
            <p>
              Users are encouraged to use strong passwords and report any suspicious activities immediately.
            </p>
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

export default SecurityPolicy;
