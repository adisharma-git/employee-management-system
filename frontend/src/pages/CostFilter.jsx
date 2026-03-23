import { useMemo, useState } from "react";

const MIN_EMPLOYEES = 1;
const MAX_EMPLOYEES = 500;
const PRICE_PER_EMPLOYEE = 50;

const formatInr = (value) =>
  new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(value);

export default function CostFilter() {
  const [employees, setEmployees] = useState(50);

  const monthlyCost = useMemo(
    () => employees * PRICE_PER_EMPLOYEE,
    [employees]
  );

  const annualCost = useMemo(
    () => Math.round(monthlyCost * 12 * 0.9),
    [monthlyCost]
  );

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#01163e] via-[#082f7a] to-[#01163e] px-4 sm:px-6 py-14 sm:py-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-16 left-0 h-56 w-56 rounded-full bg-blue-300/10 blur-3xl" />
        <div className="absolute -bottom-16 right-0 h-64 w-64 rounded-full bg-orange-400/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl rounded-3xl border border-white/15 bg-white/10 backdrop-blur-lg px-4 py-7 sm:px-7 sm:py-8 lg:px-10 shadow-2xl">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-orange-400/60 rounded-full text-orange-300 text-xs font-semibold mb-3">
            <span>✦</span>
            Pricing Calculator
            <span>✦</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Calculate Your Monthly Cost
          </h2>
          <p className="mt-2 text-slate-200 text-sm">
            See how much you&apos;ll pay after your free month
          </p>
        </div>

        <div className="mt-7 grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
          <div className="text-center rounded-2xl border border-white/15 bg-[#021f54]/60 p-4 sm:p-5">
            <p className="text-3xl sm:text-4xl font-extrabold text-white">
              {employees}
            </p>
            <p className="mt-2 text-sm sm:text-base text-slate-200">Number of Employees</p>

            <div className="mt-6 max-w-xs mx-auto">
              <input
                type="range"
                min={MIN_EMPLOYEES}
                max={MAX_EMPLOYEES}
                value={employees}
                onChange={(e) => setEmployees(Number(e.target.value))}
                className="w-full cursor-pointer accent-orange-500"
                aria-label="Number of employees"
              />
              <div className="mt-2 flex items-center justify-between text-xs text-slate-300">
                <span>1</span>
                <span>150</span>
                <span>300</span>
                <span>500+</span>
              </div>
            </div>
          </div>

          <div className="text-center rounded-2xl border border-white/15 bg-[#021f54]/60 p-4 sm:p-5">
            <p className="text-3xl sm:text-4xl font-extrabold text-white">
              ₹{formatInr(monthlyCost)}
            </p>
            <p className="mt-2 text-sm sm:text-base text-slate-200">Monthly Cost (After Trial)</p>

            
          </div>

          <div className="text-center rounded-2xl border border-white/15 bg-[#021f54]/60 p-4 sm:p-5">
            <p className="text-3xl sm:text-4xl font-extrabold text-white">
              ₹{formatInr(annualCost)}
            </p>
            <p className="mt-2 text-sm sm:text-base text-slate-200">Annual Cost (After Trial)</p>

            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-blue-500/20 border border-blue-300/30 px-3 py-1.5 text-xs font-semibold text-blue-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path d="M4 7a3 3 0 0 1 3-3h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 0 1.414l-6.586 6.586a3 3 0 0 1-4.242 0l-4.879-4.879A3 3 0 0 1 4 10.707V7Zm4 1a1.5 1.5 0 1 0 0 .001V8Z" />
              </svg>
              Save 10% with annual plan
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
