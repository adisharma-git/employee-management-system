const FooterPageLanding = () => {
    return (
        <footer className="bg-[#021f54] text-gray-300 pt-16 pb-8 px-6">
            <div className="max-w-6xl mx-auto">


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">


                    <div>
                        <h2 className="text-2xl font-bold text-white mb-4">
                            Workalignr
                        </h2>
                        <p className="text-sm leading-relaxed text-gray-400">
                            A modern employee & payment management platform built to help
                            businesses grow faster, smarter, and more securely.
                        </p>
                    </div>


                    <div>
                        <h3 className="text-white font-semibold mb-4">Product</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="hover:text-orange-400 cursor-pointer">Features</li>
                            <li className="hover:text-orange-400 cursor-pointer">Pricing</li>
                            <li className="hover:text-orange-400 cursor-pointer">Integrations</li>
                            <li className="hover:text-orange-400 cursor-pointer">Updates</li>
                        </ul>
                    </div>


                    <div>
                        <h3 className="text-white font-semibold mb-4">Company</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="hover:text-orange-400 cursor-pointer">About Us</li>
                            <li className="hover:text-orange-400 cursor-pointer">Careers</li>
                            <li className="hover:text-orange-400 cursor-pointer">Blog</li>
                            <li className="hover:text-orange-400 cursor-pointer">Contact</li>
                        </ul>
                    </div>


                    <div>
                        <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
                        <p className="text-sm text-gray-400 mb-4">
                            Subscribe to get the latest updates and product news.
                        </p>

                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="flex-1 px-4 py-2 rounded-lg text-sm text-gray-900 focus:outline-none"
                            />
                            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-400 transition">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>


                <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">


                    <p className="text-xs text-gray-400">
                        © {new Date().getFullYear()} Workalignr. All rights reserved.
                    </p>


                    <div className="flex gap-6 text-xs">
                        <span className="hover:text-orange-400 cursor-pointer">Privacy Policy</span>
                        <span className="hover:text-orange-400 cursor-pointer">Terms of Service</span>
                        <span className="hover:text-orange-400 cursor-pointer">Security</span>
                    </div>
                </div>

            </div>
        </footer>
    )
}

export default FooterPageLanding
