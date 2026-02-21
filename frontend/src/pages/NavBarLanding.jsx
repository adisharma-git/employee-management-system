import { useState } from "react";

export default function Navbar() {
  const [hoveredMenu, setHoveredMenu] = useState(null);

  const handleLogin = () => {
    window.location.href = "/login";
  };

  const handleSignup = () => {
    window.location.href = "/register";
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-[#021f54] bg-opacity-40 backdrop-blur-md z-40 pointer-events-none transition-opacity duration-300 ${
          hoveredMenu ? "opacity-100" : "opacity-0"
        }`}
      />

      <nav className="bg-gradient-to-r from-[#01163e] via-[#082f7a] to-[#01163e] text-white sticky top-0 z-50 border-b border-white/5 shadow-xl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center h-16 relative justify-between">
            
            <div className="flex items-center gap-10">
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => (window.location.href = "/")}
              >
                <img
                  src="/logo.png"
                  alt="Worlaligner Logo"
                  className="w-10 h-10 object-contain rounded-lg shadow-inner"
                />
                <span className="text-base font-semibold tracking-wide px-0">
                  <span className="text-white">Work</span>
                  <span className="text-orange-500">Alignr</span>
                </span>
              </div>

              <div className="hidden md:flex gap-8 items-center">
                <div
                  className="relative"
                  onMouseEnter={() => setHoveredMenu("product")}
                  onMouseLeave={() => setHoveredMenu(null)}
                >
                  <button className="hover:text-orange-400 transition-colors duration-200 py-5 flex items-center gap-1">
                    Product
                    
                  </button>
                  <div
                    className={`absolute left-0 top-12 transition-all duration-300 ${
                      hoveredMenu === "product"
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-2 pointer-events-none"
                    }`}
                  >
                    <MegaDropdown>
                    <DropdownItem
                      title="Employee"
                      desc="Manage employee profiles & roles"
                       onClick={() => window.open('/EmployeeInfoPage', '_blank')}
                    />
                    <DropdownItem
                      title="Attendance & Leave"
                      desc="Track daily attendance, leave requests & approvals"
                    />
                    <DropdownItem
                      title="Performance & Reports"
                      desc="Attendance & performance summaries"
                    />
                  </MegaDropdown>
                  </div>
                </div>

                <div
                  className="relative"
                  onMouseEnter={() => setHoveredMenu("company")}
                  onMouseLeave={() => setHoveredMenu(null)}
                >
                  <button className="hover:text-orange-400 transition-colors duration-200 py-5">
                    Company
                  </button>
                  <div
                    className={`absolute left-0 top-12 transition-all duration-300 ${
                      hoveredMenu === "company"
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-2 pointer-events-none"
                    }`}
                  >
                     <MegaDropdown width="420px">
                    <DropdownItem
                      title="About Us"
                      desc="Who we are & what we do"                      
                      onClick={() => window.open('/landingPage', '_blank')}
                    />
                    <DropdownItem
                      title="Team"
                      desc="Developers & contributors"
                    />
                    <DropdownItem title="Documentation" desc="How the system works" />
                  </MegaDropdown>
                  </div>
                </div>
                <div
                  className="relative"
                  onMouseEnter={() => setHoveredMenu("support")}
                  onMouseLeave={() => setHoveredMenu(null)}
                >
                  <button className="hover:text-orange-400 transition-colors duration-200 py-5">
                    Support
                  </button>
                  <div
                    className={`absolute left-0 top-12 transition-all duration-300 ${
                      hoveredMenu === "support"
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-2 pointer-events-none"
                    }`}
                  >
                     <MegaDropdown width="420px">
                    <DropdownItem
                      title="Help Center"
                      desc="FAQs & common issues"
                      onClick={() => window.open('/dashboardNew/help', '_blank')}
                    />
                    <DropdownItem
                      title="Contact"
                      desc="Reach out for support"
                       onClick={() => window.open('/dashboardNew/help', '_blank')}
                    />
                    <DropdownItem
                      title="System Status"
                      desc="Live service status"
                    />
                  </MegaDropdown>
                  </div>
                </div>
              </div>
            </div>

            
            <div className="flex items-center gap-6">
              
              {/* <div className="flex items-center gap-5 text-white/80 mr-2">
                <i className="fa-regular fa-bell cursor-pointer hover:text-white transition-all text-lg hover:scale-110"></i>
                <i className="fa-solid fa-gear cursor-pointer hover:text-white transition-all text-lg hover:scale-110"></i>
              </div> */}

              <div className="flex gap-4 absolute right-0 z-50">
                <button
                  className="border border-white/40 px-6 py-1.5 rounded-lg font-semibold hover:bg-white hover:text-[#021f54] transition-all duration-200"
                  onClick={handleLogin}
                >
                  Log In
                </button>
                <button
                  className="bg-orange-500 px-6 py-2 rounded-lg font-semibold hover:bg-orange-400 transition-all duration-200 shadow-lg shadow-orange-500/20"
                  onClick={handleSignup}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

function MegaDropdown({ children, width = "520px" }) {
  return (
    <div
      className="bg-white/70 backdrop-blur-lg border border-white/30 text-black rounded-2xl shadow-2xl p-6 grid grid-cols-2 gap-6"
      style={{ width }}
    >
      {children}
    </div>
  );
}

function DropdownItem({ title, desc, onClick }) {
  return (
    <div 
      className="p-4 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors duration-200 text-left"
      onClick={onClick}
    >
      <h4 className="font-semibold text-[#021f54]">{title}</h4>
      <p className="text-sm text-gray-700 mt-1">{desc}</p>
    </div>
  );
}