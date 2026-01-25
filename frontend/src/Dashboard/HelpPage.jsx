import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRocket,
  faShield,
  faUser,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons';

export default function HelpPage() {
  // const navigate = useNavigate();
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const faqItems = [
    {
      id: 1,
      question: 'What is the purpose of this Employee Management System?',
      answer:
        'This Employee Management System is designed to streamline HR operations by centralizing employee data, attendance, leave management, and performance tracking in a single platform.'
    },
    {
      id: 2,
      question: 'Who can use this system?',
      answer:
        'The system can be used by HR teams, managers, and administrators to manage employees efficiently, while employees can access their own records based on assigned roles and permissions.'
    },
    {
      id: 3,
      question: 'How does the system help in attendance and leave management?',
      answer:
        'The platform provides automated attendance tracking and structured leave management, reducing manual work and improving accuracy and transparency.'
    },
    {
      id: 4,
      question: 'Is employee data secure and confidential?',
      answer:
        'Yes, the system follows industry-standard security practices, including role-based access control and secure data storage, to protect sensitive employee information.'
    },
    {
      id: 5,
      question: 'Can the system be customized for organizational needs?',
      answer:
        'Yes, the system is flexible and can be configured to match organizational policies, workflows, and reporting requirements.'
    }
  ];

  const cards = [
    {
      id: 1,
      icon: faRocket,
      title: 'Getting Started',
      description:
        'Learn how to set up your account, explore key features, and get started quickly.',
      link: 'Learn More'
    },
    {
      id: 2,
      icon: faShield,
      title: 'Security & Protection',
      description:
        'Understand how we protect your data with enterprise-level security.',
      link: 'Learn More'
    },
    {
      id: 3,
      icon: faUser,
      title: 'Account & Subscription',
      description:
        'Manage account settings, roles, and subscription details easily.',
      link: 'Learn More'
    }
  ];

  const toggleFAQ = (id) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <div className="w-full bg-gradient-to-b from-gray-50 to-white py-12 px-4">
        <div className="max-w-4xl mx-auto">

          {/* Back Button */}
          {/* <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-6 py-2 bg-[#021f54]  text-white text-sm hover:bg-blue-500 rounded-lg"
          >
            ← Back
          </button> */}

          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Need Assistance?
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              We provide 24×7 customer support <br />
              Reach out and get the help you need
            </p>

            {/* Search */}
            <div className="flex gap-3 max-w-md mx-auto mb-8">
              <input
                type="text"
                placeholder="Ask a question..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                style={{ backgroundColor: '#021f54' }}
                className="px-6 py-3 text-white rounded-lg font-medium hover:opacity-90 transition"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {cards.map((card) => (
            <div
              key={card.id}
              className="border border-gray-200 rounded-lg p-8 bg-white hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <FontAwesomeIcon
                  icon={card.icon}
                  className="text-2xl"
                  style={{ color: '#021f54' }}
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {card.title}
              </h3>
              <p className="text-gray-600 mb-6">{card.description}</p>
              <span className="text-gray-900 font-semibold hover:underline cursor-pointer">
                {card.link}
              </span>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* FAQ Info */}
          <div className="border border-gray-200 rounded-lg p-8 bg-white h-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">FAQs</h2>
            <p className="text-gray-600 text-sm mb-6">
              Everything you need to know about the platform.
            </p>
            <a
              href="mailto:hp4758646@gmail.com"
              className="text-blue-600 hover:underline font-medium"
            >
              Contact Support
            </a>
          </div>

          {/* FAQ Items */}
          <div className="lg:col-span-2 space-y-4">
            {faqItems.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-lg bg-white"
              >
                <button
                  onClick={() => toggleFAQ(item.id)}
                  className="w-full flex justify-between items-center px-6 py-4 hover:bg-gray-50"
                >
                  <h3 className="font-semibold text-gray-900 text-left">
                    {item.question}
                  </h3>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`transition-transform ${expandedFAQ === item.id ? 'rotate-180' : ''
                      }`}
                    style={{ color: '#021f54' }}
                  />
                </button>

                {expandedFAQ === item.id && (
                  <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
