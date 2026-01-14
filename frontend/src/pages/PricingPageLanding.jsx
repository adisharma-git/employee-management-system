const PricingPageLanding = () => {
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
                        Choose a plan that fits your workflow. All plans include unlimited bug reports.
                    </p>
                </div>


                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">


                    <div className="border border-gray-200 rounded-2xl p-9 min-h-[440px] flex flex-col justify-between hover:shadow-md transition">
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Basic plan</h3>

                            <div className="text-4xl font-bold mb-7">
                                $5<span className="text-lg font-normal">/mo</span>
                            </div>

                            <ul className="space-y-3 text-sm">
                                <li className="flex items-center gap-2">
                                    <span className="text-orange-500 font-bold">✓</span>
                                    1 workspace, 2 environments
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-orange-500 font-bold">✓</span>
                                    Basic analytics
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-orange-500 font-bold">✓</span>
                                    Email support
                                </li>
                            </ul>
                        </div>

                        <button className="w-full py-3 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition mt-8">
                            Get started
                        </button>
                    </div>


                    <div className="bg-[#021f54] text-white rounded-2xl p-10 min-h-[480px] flex flex-col justify-between scale-105 shadow-xl">
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Business plan</h3>

                            <div className="text-4xl font-bold mb-7">
                                $29<span className="text-lg font-normal">/mo</span>
                            </div>

                            <ul className="space-y-3 text-sm">
                                <li>✓ 3 workspaces, 5 environments</li>
                                <li>✓ Slack / Jira integration</li>
                                <li>✓ Priority support</li>
                                <li>✓ Role Access Control</li>
                            </ul>
                        </div>


                        <button className="w-full py-3 rounded-xl bg-orange-500 text-white font-semibold hover:bg-[#032a75] transition mt-8">
                            Get started
                        </button>
                    </div>


                    <div className="border border-gray-200 rounded-2xl p-9 min-h-[460px] flex flex-col justify-between hover:shadow-md transition">
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Enterprise plan</h3>

                            <div className="text-4xl font-bold mb-7">
                                $49<span className="text-lg font-normal">/mo</span>
                            </div>

                            <ul className="space-y-3 text-sm">
                                <li className="flex items-center gap-2">
                                    <span className="text-orange-500 font-bold">✓</span>
                                    Unlimited everything
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-orange-500 font-bold">✓</span>
                                    Advanced permissions
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-orange-500 font-bold">✓</span>
                                    Full Role Access Control
                                </li>
                            </ul>
                        </div>

                        <button className="w-full py-3 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition mt-8">
                            Get started
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default PricingPageLanding
