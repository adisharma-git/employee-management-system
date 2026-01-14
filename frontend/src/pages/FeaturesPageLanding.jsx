export default function FeaturePageLanding() {
  const features = [
    {
      icon: "fa-clock",
      title: "Attendance",
      description:
        "Track employee attendance with real-time clock-in/out capabilities and automated attendance reports.",
    },
    {
      icon: "fa-money-bill-wave",
      title: "Payroll",
      description: "Streamlined payroll processing with automatic calculations, tax compliance, and secure payments.",
    },
    {
      icon: "fa-shield",
      title: "Role Settings",
      description: "Define and manage user roles and permissions with granular access control for your team.",
    },
    {
      icon: "fa-receipt",
      title: "Billings",
      description: "Complete billing management system with invoicing, payment tracking, and financial reports.",
    },
  ]
  const handleLogin = () => {
    window.location.href = '/login';
  }

  return (
    <section className="w-full py-20 px-6" style={{ backgroundColor: "#021f54" }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          <div className="space-y-8 pt-6">
            <div>
              <p className="text-orange-500 text-sm font-semibold tracking-wide mb-4">
                A SIMPLE YET ROBUST, USER-FRIENDLY SYSTEM.
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                <span className="text-orange-500">All of the features</span>
                <span className="text-white"> that your practice needs</span>
              </h2>
            </div>

            <p className="text-gray-300 text-lg leading-relaxed">
              The complete solution for managing employees, documentation, billing and reconciliation all in one unified
              platform.
            </p>

            <button className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 group" onClick={handleLogin}>
              See all features
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </button>
          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 rounded-xl bg-opacity-10 backdrop-blur-sm transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:bg-opacity-20"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
              >

                <div
                  className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-lg transition-all duration-500"
                  style={{ backgroundColor: "rgba(255, 140, 0, 0.2)" }}
                >
                  <i
                    className={`fas ${feature.icon} text-2xl text-orange-500 group-hover:scale-110 transition-transform duration-300`}
                  ></i>
                </div>


                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-500 transition-colors duration-300">
                  {feature.title}
                </h3>


                <p className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  {feature.description}
                </p>


                <div className="mt-4 h-1 w-0 bg-orange-500 group-hover:w-full transition-all duration-500 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
