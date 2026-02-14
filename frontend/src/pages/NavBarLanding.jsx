import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket, faUserPlus } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const [hoveredMenu, setHoveredMenu] = useState(null);

  return (
    <>
      <div
        className={`fixed inset-0 bg-[#021f54]/40 backdrop-blur-md z-40 pointer-events-none transition-opacity duration-300 ${
          hoveredMenu ? "opacity-100" : "opacity-0"
        }`}
      />

      <nav className="bg-[#021f54] text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-10">
          <div className="grid grid-cols-3 items-center h-20">

            {/* LEFT */}
            <div className="flex items-center">
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => (window.location.href = "/")}
              >
                <img
                  src="/imageee.png"
                  alt="WorkAlignr Logo"
                  className="w-10 h-10 object-contain rounded-lg"
                />
                <span className="text-xl font-extrabold tracking-wide">
                  <span className="text-white">Work</span>
                  <span className="text-orange-400">Alignr</span>
                </span>
              </div>
            </div>

            {/* CENTER */}
            <div className="hidden md:flex items-center justify-center gap-16 relative">

              <div
                className="relative"
                onMouseEnter={() => setHoveredMenu("product")}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <button className="hover:text-orange-400 transition">
                  Product
                </button>
                <Dropdown active={hoveredMenu === "product"}>
                  <MegaDropdown>
                    <DropdownItem title="Payments" desc="Accept payments globally with ease" />
                    <DropdownItem title="Subscriptions" desc="Recurring billing made simple" />
                    <DropdownItem title="Invoices" desc="Automated invoicing system" />
                    <DropdownItem title="Analytics" desc="Track revenue & performance" />
                  </MegaDropdown>
                </Dropdown>
              </div>

              <div
                className="relative"
                onMouseEnter={() => setHoveredMenu("company")}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <button className="hover:text-orange-400 transition">
                  Company
                </button>
                <Dropdown active={hoveredMenu === "company"}>
                  <MegaDropdown width="420px">
                    <DropdownItem title="About Us" desc="Who we are & what we do" />
                    <DropdownItem title="Careers" desc="Join our growing team" />
                    <DropdownItem title="Blog" desc="Latest news & updates" />
                    <DropdownItem title="Press" desc="Media & announcements" />
                  </MegaDropdown>
                </Dropdown>
              </div>

              <div
                className="relative"
                onMouseEnter={() => setHoveredMenu("support")}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <button className="hover:text-orange-400 transition">
                  Support
                </button>
                <Dropdown active={hoveredMenu === "support"}>
                  <MegaDropdown width="420px">
                    <DropdownItem title="Help Center" desc="Find quick answers" />
                    <DropdownItem title="Contact" desc="Talk to our support team" />
                    <DropdownItem title="System Status" desc="Live service status" />
                    <DropdownItem title="Community" desc="Join the discussion" />
                  </MegaDropdown>
                </Dropdown>
              </div>

            </div>

            {/* RIGHT */}
            <div className="flex items-center justify-end gap-6">

              <div
                className="relative group cursor-pointer"
                onClick={() => (window.location.href = "/login")}
              >
                <FontAwesomeIcon
                  icon={faRightToBracket}
                  className="text-lg hover:text-orange-400 transition"
                />
                <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition text-xs bg-white text-[#021f54] px-2 py-1 rounded-md shadow">
                  Log In
                </span>
              </div>

              <div
                className="relative group cursor-pointer"
                onClick={() => (window.location.href = "/register")}
              >
                <FontAwesomeIcon
                  icon={faUserPlus}
                  className="text-lg hover:text-orange-400 transition"
                />
                <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition text-xs bg-white text-[#021f54] px-2 py-1 rounded-md shadow">
                  Sign Up
                </span>
              </div>

            </div>

          </div>
        </div>
      </nav>
    </>
  );
}

function Dropdown({ children, active }) {
  return (
    <div
      className={`absolute left-1/2 top-10 -translate-x-1/2 transition-all duration-300 ${
        active
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-2 pointer-events-none"
      }`}
    >
      {children}
    </div>
  );
}

function MegaDropdown({ children, width = "520px" }) {
  return (
    <div
      className="bg-white/95 border border-gray-200 text-black rounded-2xl shadow-2xl p-6 grid grid-cols-2 gap-6"
      style={{ width }}
    >
      {children}
    </div>
  );
}

function DropdownItem({ title, desc }) {
  return (
    <div className="p-4 rounded-xl hover:bg-black/5 cursor-pointer transition">
      <h4 className="font-semibold">{title}</h4>
      <p className="text-sm text-gray-600 mt-1">{desc}</p>
    </div>
  );
}
