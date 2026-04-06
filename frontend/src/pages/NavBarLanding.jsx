import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleContact = (subject) => {
    window.location.href = `mailto:hp4758646@gmail.com?subject=${encodeURIComponent(subject)}`;
  };

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center h-16 justify-between gap-3">
            <div className="flex items-center gap-3 sm:gap-10 min-w-0">
              <div
                className="flex items-center gap-2 sm:gap-3 cursor-pointer min-w-0"
                onClick={() => (window.location.href = "/")}
              >
                <img
                  src="/logo.png"
                  alt="WorkAlignr logo"
                  className="w-8 h-8 sm:w-10 sm:h-10 object-contain rounded-lg shadow-inner"
                />
                <span className="text-sm sm:text-base font-semibold tracking-wide px-0 truncate">
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
                        title="Employee Profiles"
                        desc="Manage employee records, departments, and reporting structure"
                        onClick={() =>
                          (window.location.href = "/employeeInfoPage")
                        }
                      />
                      <DropdownItem
                        title="Attendance & Leave"
                        desc="Track attendance, leave requests, approvals, and break history"
                      />
                      <DropdownItem
                        title="Payroll & Reports"
                        desc="Review payroll, notifications, tasks, and operational reports"
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
                        desc="Who we are and how WorkAlignr fits your team"
                        onClick={() => (window.location.href = "/landingPage")}
                      />
                      <DropdownItem
                        title="Team"
                        desc="Developers & contributors"
                      />
                      <DropdownItem
                        title="Documentation"
                        desc="How the system works"
                      />
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
                        desc="Frequently asked questions and support email"
                        onClick={() => handleContact("WorkAlignr Help Center")}
                      />
                      <DropdownItem
                        title="Contact"
                        desc="Reach out for onboarding or product questions"
                        onClick={() => handleContact("WorkAlignr Contact Request")}
                      />
                      <DropdownItem
                        title="System Status"
                        desc="Public product updates"
                        onClick={() => (window.location.href = "/updates")}
                      />
                    </MegaDropdown>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-6">
              {/* <div className="flex items-center gap-5 text-white/80 mr-2">
                <i className="fa-regular fa-bell cursor-pointer hover:text-white transition-all text-lg hover:scale-110"></i>
                <i className="fa-solid fa-gear cursor-pointer hover:text-white transition-all text-lg hover:scale-110"></i>
              </div> */}

              <div className="hidden sm:flex gap-3 lg:gap-4 z-50">
              <button
  className="border border-white/40 px-4 py-2 rounded-lg hover:bg-white hover:text-[#021f54] transition-all duration-200 flex items-center justify-center"
  onClick={handleLogin}
  title="Login"
>
<FontAwesomeIcon icon={faRightToBracket} size="lg" />
</button>
                {/* <button
                  className="bg-orange-500 px-6 py-2 rounded-lg font-semibold hover:bg-orange-400 transition-all duration-200 shadow-lg shadow-orange-500/20"
                  onClick={handleSignup}
                >
                  Sign Up
                </button> */}
              </div>

              <div className="flex sm:hidden items-center gap-2 z-50">
                <button
                  className="border border-white/40 w-10 h-10 rounded-lg flex items-center justify-center hover:bg-white hover:text-[#021f54]"
                  onClick={handleLogin}
                  aria-label="Log In"
                >
                  <i className="fa-solid fa-right-to-bracket"></i>
                </button>

                <button
                  className="bg-orange-500 w-10 h-10 rounded-lg flex items-center justify-center hover:bg-orange-400"
                  onClick={handleSignup}
                  aria-label="Sign Up"
                >
                  <i className="fa-solid fa-user-plus"></i>
                </button>

                <button
                  className="border border-white/40 w-10 h-10 rounded-lg flex items-center justify-center hover:bg-white hover:text-[#021f54] transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                  aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                >
                  <i className={`fa-solid ${isMobileMenuOpen ? "fa-xmark" : "fa-bars"}`}></i>
                </button>

              </div>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="md:hidden pb-4">
              <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-2 space-y-1">
                <button
                  onClick={() => {
                    window.location.href = "/employeeInfoPage";
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10"
                >
                  Product
                </button>
                <button
                  onClick={() => {
                    window.location.href = "/landingPage";
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10"
                >
                  Company
                </button>
                <button
                  onClick={() => {
                    handleContact("WorkAlignr Support");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10"
                >
                  Support
                </button>
              </div>
            </div>
          )}
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