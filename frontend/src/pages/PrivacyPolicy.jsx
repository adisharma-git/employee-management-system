import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <div className="bg-[#0B2C5F] py-12 px-6 text-center flex-shrink-0">
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          Privacy <span className="text-orange-500">Policy</span>
        </h1>
        <p className="text-gray-200 mt-4 max-w-2xl mx-auto">
          Your privacy is important to us. This Privacy Policy explains how we
          collect, use, and safeguard your information when you use our Employee
          Management Platform.
        </p>
        <p className="text-sm text-gray-300 mt-2">
          Effective Date: {new Date().toLocaleDateString()}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-10">
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8 space-y-10">
          <section>
            <h2 className="text-2xl font-semibold text-[#0B2C5F] mb-3">
              1. Information We Collect
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We collect business and employee-related information necessary to
              operate our platform effectively. This may include employee names,
              email addresses, contact details, job titles, attendance records,
              payroll information, and other HR-related data provided by your
              organization.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#0B2C5F] mb-3">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-600 leading-relaxed">
              The information collected is used to manage employee records,
              automate payroll processing, track attendance, generate
              performance reports, and improve system functionality. We may also
              use data to enhance platform security and provide customer
              support.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#0B2C5F] mb-3">
              3. Data Security
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We implement industry-standard technical and organizational
              measures to protect your data from unauthorized access, misuse,
              alteration, or disclosure. Access to sensitive information is
              strictly limited to authorized personnel.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#0B2C5F] mb-3">
              4. Data Sharing and Disclosure
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We do not sell, rent, or trade your personal or business
              information. Data may only be shared with trusted third-party
              service providers who assist in operating our platform and only
              under strict confidentiality agreements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#0B2C5F] mb-3">
              5. Data Retention
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We retain your data only for as long as necessary to fulfill the
              purposes outlined in this policy or as required by applicable laws
              and regulations. Upon request, data may be securely deleted in
              accordance with legal requirements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#0B2C5F] mb-3">
              6. User Rights
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Authorized users have the right to access, update, or request
              deletion of their stored information. If you have any privacy
              concerns, you may contact our support team for assistance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#0B2C5F] mb-3">
              7. Cookies and Tracking Technologies
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Our platform may use cookies and similar technologies to enhance
              user experience, analyze usage patterns, and improve system
              functionality. These technologies help us deliver a secure and
              personalized service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#0B2C5F] mb-3">
              8. Changes to This Privacy Policy
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We may update this Privacy Policy periodically to reflect changes
              in legal requirements or improvements to our services. Any updates
              will be posted on this page with a revised effective date.
            </p>
          </section>

          <div className="pt-6 border-t text-center">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Your Company Name. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
