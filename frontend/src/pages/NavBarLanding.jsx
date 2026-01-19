export default function Navbar() {
    const handleLogin = () => {
        window.location.href = "/login";
    };

    const handleSignup = () => {
        window.location.href = "/register";
    };

    return (
        <nav className="bg-[#021f54] text-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6">

                <div className="flex items-center h-16 relative">

                    {/* LEFT : LOGO */}
                    <div className="flex items-center gap-3 cursor-pointer absolute left-0">
                        <div className="w-9 h-9 bg-orange-500 rounded-lg flex items-center justify-center shadow-md">
                            <span className="text-white font-bold text-lg">✦</span>
                        </div>
                        <span className="text-xl font-semibold tracking-wide">
                            Aaah
                        </span>
                    </div>


                    <div
                        className="hidden md:flex items-center gap-10 font-medium
                       absolute left-1/2 -translate-x-1/2"
                    >

                        <div className="relative group">
                            <button className="flex items-center gap-2 hover:text-orange-400 transition-colors">
                                Product
                                <i className="fa-solid fa-chevron-down text-xs"></i>
                            </button>

                            <div
                                className="absolute left-0 top-9 w-52 bg-white text-gray-800 rounded-xl shadow-xl
                           opacity-0 invisible group-hover:opacity-100 group-hover:visible
                           transform scale-95 group-hover:scale-100
                           transition-all duration-200 ease-out"
                            >
                                <a className="block px-4 py-3 hover:bg-gray-100 rounded-t-xl">
                                    Payments
                                </a>
                                <a className="block px-4 py-3 hover:bg-gray-100">
                                    Subscriptions
                                </a>
                                <a className="block px-4 py-3 hover:bg-gray-100 rounded-b-xl">
                                    Invoices
                                </a>
                            </div>
                        </div>

                        {/* Company */}
                        <div className="relative group">
                            <button className="flex items-center gap-2 hover:text-orange-400 transition-colors">
                                Company
                                <i className="fa-solid fa-chevron-down text-xs"></i>
                            </button>

                            <div
                                className="absolute left-0 top-9 w-48 bg-white text-gray-800 rounded-xl shadow-xl
                           opacity-0 invisible group-hover:opacity-100 group-hover:visible
                           transform scale-95 group-hover:scale-100
                           transition-all duration-200 ease-out"
                            >
                                <a className="block px-4 py-3 hover:bg-gray-100 rounded-t-xl">
                                    About Us
                                </a>
                                <a className="block px-4 py-3 hover:bg-gray-100">
                                    Careers
                                </a>
                                <a className="block px-4 py-3 hover:bg-gray-100 rounded-b-xl">
                                    Blog
                                </a>
                            </div>
                        </div>


                        <div className="relative group">
                            <button className="flex items-center gap-2 hover:text-orange-400 transition-colors">
                                Support
                                <i className="fa-solid fa-chevron-down text-xs"></i>
                            </button>

                            <div
                                className="absolute left-0 top-9 w-48 bg-white text-gray-800 rounded-xl shadow-xl
                           opacity-0 invisible group-hover:opacity-100 group-hover:visible
                           transform scale-95 group-hover:scale-100
                           transition-all duration-200 ease-out"
                            >
                                <a className="block px-4 py-3 hover:bg-gray-100 rounded-t-xl">
                                    Help Center
                                </a>
                                <a className="block px-4 py-3 hover:bg-gray-100">
                                    Contact
                                </a>
                                <a className="block px-4 py-3 hover:bg-gray-100 rounded-b-xl">
                                    System Status
                                </a>
                            </div>
                        </div>
                    </div>


                    <div className="flex items-center gap-4 text-sm font-medium absolute right-0">
                        <button
                            className="px-4 py-2 border border-white/70 rounded-lg
                         hover:bg-white hover:text-[#021f54]
                         transition-colors"
                            onClick={handleLogin}
                        >
                            Log In
                        </button>

                        <button
                            className="px-6 py-2 bg-orange-500 rounded-lg
                         hover:bg-orange-400 transition-colors
                         font-semibold shadow-md"
                            onClick={handleSignup}
                        >
                            Sign Up
                        </button>
                    </div>

                </div>
            </div>
        </nav>
    );
}
