import { useEffect, useState } from "react";

export default function MainPageLanding() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="min-h-screen bg-white pt-36 pb-24 px-6 flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center">
        <div
          className={`transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#021f54] leading-tight mb-7">
            All-in-One Employee
            <span className="block mt-2 text-orange-500">
              Management <span className="text-[#021f54]">Platform</span>
            </span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12 text-base sm:text-lg leading-relaxed">
            Manage attendance, payroll, leaves, and performance with ease using
            our secure and scalable employee management system.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your work email"
              className="
                w-full
                px-5 py-4
                text-sm sm:text-base
                border
                rounded-xl
                focus:outline-none
                focus:ring-2
                focus:#021f54
              "
            />

            <button className="w-full bg-[#021f54] text-white py-3 rounded-lg font-semibold hover:opacity-90">
              Start Free Trial
              <span className="text-lg leading-none">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
