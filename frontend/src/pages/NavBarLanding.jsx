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

            <nav className="bg-[#021f54] text-white sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center h-16 relative">

                        <div className="flex items-center gap-3 absolute left-0 z-50 cursor-pointer">
                            <div className="w-9 h-9 bg-orange-500 rounded-lg flex items-center justify-center font-bold">
                                ✦
                            </div>
                            <span className="text-xl font-semibold">
                                Aaah
                            </span>
                        </div>

                        <div className="hidden md:flex gap-12 absolute left-1/2 -translate-x-1/2 z-50">
                            <div
                                className="relative"
                                onMouseEnter={() => setHoveredMenu("product")}
                                onMouseLeave={() => setHoveredMenu(null)}
                            >
                                <button className="hover:text-orange-400 transition-colors duration-200">
                                    Product
                                </button>
                                {hoveredMenu === "product" && (
                                    <div className="absolute left-1/2 -translate-x-1/2 top-0 w-full h-12" />
                                )}
                                <div
                                    className={`absolute left-1/2 top-10 -translate-x-1/2 transition-all duration-300 ${
                                        hoveredMenu === "product"
                                            ? "opacity-100 translate-y-0 pointer-events-auto"
                                            : "opacity-0 -translate-y-2 pointer-events-none"
                                    }`}
                                >
                                    <MegaDropdown>
                                        <DropdownItem title="Payments" desc="Accept payments globally with ease" />
                                        <DropdownItem title="Subscriptions" desc="Recurring billing made simple" />
                                        <DropdownItem title="Invoices" desc="Automated invoicing system" />
                                        <DropdownItem title="Analytics" desc="Track revenue & performance" />
                                    </MegaDropdown>
                                </div>
                            </div>

                            <div
                                className="relative"
                                onMouseEnter={() => setHoveredMenu("company")}
                                onMouseLeave={() => setHoveredMenu(null)}
                            >
                                <button className="hover:text-orange-400 transition-colors duration-200">
                                    Company
                                </button>
                                {hoveredMenu === "company" && (
                                    <div className="absolute left-1/2 -translate-x-1/2 top-0 w-full h-12" />
                                )}
                                <div
                                    className={`absolute left-1/2 top-10 -translate-x-1/2 transition-all duration-300 ${
                                        hoveredMenu === "company"
                                            ? "opacity-100 translate-y-0 pointer-events-auto"
                                            : "opacity-0 -translate-y-2 pointer-events-none"
                                    }`}
                                >
                                    <MegaDropdown width="420px">
                                        <DropdownItem title="About Us" desc="Who we are & what we do" />
                                        <DropdownItem title="Careers" desc="Join our growing team" />
                                        <DropdownItem title="Blog" desc="Latest news & updates" />
                                        <DropdownItem title="Press" desc="Media & announcements" />
                                    </MegaDropdown>
                                </div>
                            </div>

                            <div
                                className="relative"
                                onMouseEnter={() => setHoveredMenu("support")}
                                onMouseLeave={() => setHoveredMenu(null)}
                            >
                                <button className="hover:text-orange-400 transition-colors duration-200">
                                    Support
                                </button>
                                {hoveredMenu === "support" && (
                                    <div className="absolute left-1/2 -translate-x-1/2 top-0 w-full h-12" />
                                )}
                                <div
                                    className={`absolute left-1/2 top-10 -translate-x-1/2 transition-all duration-300 ${
                                        hoveredMenu === "support"
                                            ? "opacity-100 translate-y-0 pointer-events-auto"
                                            : "opacity-0 -translate-y-2 pointer-events-none"
                                    }`}
                                >
                                    <MegaDropdown width="420px">
                                        <DropdownItem title="Help Center" desc="Find quick answers" />
                                        <DropdownItem title="Contact" desc="Talk to our support team" />
                                        <DropdownItem title="System Status" desc="Live service status" />
                                        <DropdownItem title="Community" desc="Join the discussion" />
                                    </MegaDropdown>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 absolute right-0 z-50">
                            <button
                                className="border border-white/70 px-4 py-2 rounded-lg hover:bg-white hover:text-[#021f54] transition-all duration-200"
                                onClick={handleLogin}
                            >
                                Log In
                            </button>
                            <button
                                className="bg-orange-500 px-6 py-2 rounded-lg font-semibold hover:bg-orange-400 transition-all duration-200"
                                onClick={handleSignup}
                            >
                                Sign Up
                            </button>
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

function DropdownItem({ title, desc }) {
    return (
        <div className="p-4 rounded-xl hover:bg-black/5 cursor-pointer transition-colors duration-200">
            <h4 className="font-semibold text-black">
                {title}
            </h4>
            <p className="text-sm text-gray-700 mt-1">
                {desc}
            </p>
        </div>
    );
}