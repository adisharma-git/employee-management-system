const PricingPageLanding = () => {
    const handleContact=()=>{
        window.location.href = 'mailto:hp4758646@gmail.com?subject=WorkAlignr%20Pricing%20Enquiry';
    }
    return (
        <div className="bg-white px-6 py-14 font-sans">
            <div className="max-w-6xl mx-auto">


                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-5 py-2 border-2 border-orange-500 rounded-full text-orange-500 text-sm font-semibold mb-4">
                        <span>✦</span>
                        Pricing
                        <span>✦</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                        Pricing plan
                    </h1>

                    <p className="text-gray-600 text-sm sm:text-base">
                        Start with a free month, then pay ₹50 per employee for the core platform. For larger setups, contact us for a custom quote.
                    </p>
                </div>


                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">


                    <div className="border border-gray-200 rounded-2xl p-9 min-h-[440px] flex flex-col justify-between hover:shadow-md transition">
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Starter Trial</h3>

                            <div className="text-4xl font-bold mb-7">
                                FREE<span className="text-lg font-normal">/30 days</span>
                            </div>

                            <ul className="space-y-3 text-sm">
                                <li className="flex items-center gap-2">
                                    <span className="text-orange-500 font-bold">✓</span>
                                    Employee profiles and onboarding
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-orange-500 font-bold">✓</span>
                                    Attendance and leave workflows
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-orange-500 font-bold">✓</span>
                                    Product walkthrough and setup support
                                </li>
                            </ul>
                        </div>

                        <button className="w-full py-3 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition mt-8" onClick={handleContact}>
                            Contact Us
                        </button>
                    </div>


                    <div className="bg-[#021f54] text-white rounded-2xl p-10 min-h-[480px] flex flex-col justify-between scale-105 shadow-xl">
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Core HR Plan</h3>

                            <div className="text-4xl font-bold mb-7">
                                ₹50<span className="text-lg font-normal">/employee/mo</span>
                            </div>

                            <ul className="space-y-3 text-sm">
                                <li>✓ Attendance and break tracking</li>
                                <li>✓ Leave management and approvals</li>
                                <li>✓ Payroll and salary records</li>
                                <li>✓ Roles, notifications, meetings, and tasks</li>
                            </ul>
                        </div>


                        <button className="w-full py-3 rounded-xl bg-orange-500 text-white font-semibold hover:bg-[#032a75] transition mt-8" onClick={handleContact}>
                            Contact Us
                        </button>
                    </div>


                    <div className="border border-gray-200 rounded-2xl p-9 min-h-[460px] flex flex-col justify-between hover:shadow-md transition">
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Enterprise</h3>

                            <div className="text-4xl font-bold mb-7">
                                Custom
                            </div>

                            <ul className="space-y-3 text-sm">
                                <li className="flex items-center gap-2">
                                    <span className="text-orange-500 font-bold">✓</span>
                                    Advanced RBAC and approval workflows
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-orange-500 font-bold">✓</span>
                                    Reporting and analytics setup
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-orange-500 font-bold">✓</span>
                                    Dedicated onboarding and support
                                </li>
                            </ul>
                        </div>

                        <button className="w-full py-3 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition mt-8" onClick={handleContact}>
                            Contact Us
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default PricingPageLanding
