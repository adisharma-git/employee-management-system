const HelpPage = () => {
  return (
    <div className="min-h-screen bg-blue-950 text-gray-200 flex justify-center items-center px-4">
      <div className="max-w-4xl w-full bg-blue-900 rounded-2xl shadow-lg p-8 md:p-12">


        <h1 className="text-3xl md:text-4xl font-bold text-orange-400 mb-4">
          Help & Support
        </h1>
        <p className="text-gray-300 mb-8">
          Find answers to common questions and learn how to use our platform effectively.
        </p>


        <div className="space-y-6">


          <div className="bg-blue-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-orange-400 mb-2">
              🔹 Getting Started
            </h2>
            <p className="text-gray-300">
              Create an account, log in, and explore the dashboard to access all features.
            </p>
          </div>


          <div className="bg-blue-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-orange-400 mb-2">
              🔹 Account Issues
            </h2>
            <p className="text-gray-300">
              If you forgot your password or face login issues, use the “Forgot Password”
              option or contact support.
            </p>
          </div>


          <div className="bg-blue-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-orange-400 mb-2">
              🔹 Need More Help?
            </h2>
            <p className="text-gray-300 mb-4">
              Our support team is always here to help you.
            </p>
            <button
              className="bg-orange-500 hover:bg-orange-600 text-blue-950 font-semibold px-6 py-2 rounded-lg transition"
              onClick={() => window.open("mailto:support@example.com", "_blank")}
            >
              Contact Support
            </button>
          </div>
        </div>


        <div className="text-center text-gray-400 text-sm mt-10">
          © 2026 Your Company. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
