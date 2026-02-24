import React, { useEffect } from 'react';

const SaleryModule = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">     
 
      <section className="relative bg-gradient-to-r from-[#021f54] via-[#082f7a] to-[#021f54] text-white py-16 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-5xl font-bold mb-4">
            Salary <span className="text-[#f97316]">Optimized</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-10">
            Take control of payroll with flexible salary components and templates. 
            Create custom earning & deduction structures in minutes.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-slate-700">
            <StatItem value="100%" label="Accuracy Guaranteed" />
            <StatItem value="60%" label="Time Saved" />
            <StatItem value="50+" label="Salary Components" />
            <StatItem value="24h" label="Processing Time" />
          </div>
        </div>
    
        <div className="absolute top-10 left-10 w-20 h-20 border border-[#f97316]/20 rounded-full"></div>
        <div className="absolute bottom-10 right-20 w-32 h-32 bg-[#f97316]/10 rounded-full blur-3xl"></div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-12">

        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#021f54] mb-2">End-to-End Salary Management</h2>
          <p className="text-slate-500 font-medium">From component setup to final payslip generation</p>      
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">
            {[
              { step: "1. Configure", desc: "Set up earning & deduction components", icon: "fa-sliders-h text-[#f97316]" },
              { step: "2. Create Templates", desc: "Build reusable salary structures", icon: "fa-layer-group text-blue-400" },
              { step: "3. Calculate", desc: "Auto-compute salaries with attendance", icon: "fa-calculator text-[#f97316]" },
              { step: "4. Generate", desc: "Create payslips & export reports", icon: "fa-file-pdf text-blue-400" }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-4">
                  <i className={`fas ${item.icon} text-2xl`}></i>
                </div>
                <h3 className="font-bold text-[#021f54]">{item.step}</h3>
                <p className="text-xs text-slate-400 mt-2 text-center">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">        
        
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="bg-[#021f54] w-10 h-10 flex items-center justify-center rounded-lg text-white">
                  <i className="fas fa-arrow-circle-up text-lg text-[#f97316]"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#021f54]">Earning Components</h3>
                  <p className="text-sm text-slate-500 font-medium">Configure what employees earn:</p>
                </div>
              </div>
              <button className="text-[#f97316] bg-orange-50 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 hover:bg-orange-100 transition-colors">
                <i className="fas fa-plus mr-1"></i> Add New
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold mb-3 flex items-center gap-2 uppercase tracking-widest text-slate-400">
                   <i className="fas fa-lock text-[10px]"></i> Fixed Components
                </h4>
                <div className="space-y-2">
                  <ComponentRow label="Basic Salary" value="Fixed amount" active />
                  <ComponentRow label="House Rent Allowance (HRA)" value="40% of Basic" active />
                  <ComponentRow label="Conveyance Allowance" value="₹1,600/month" active />
                </div>
              </div>
              <button className="w-full mt-4 py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 font-semibold text-sm hover:border-orange-300 hover:text-[#f97316] transition-all">
                <i className="fas fa-plus-circle mr-2"></i> Add Earning Component
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="bg-[#021f54] w-10 h-10 flex items-center justify-center rounded-lg text-white">
                  <i className="fas fa-arrow-circle-down text-lg text-[#f97316]"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#021f54]">Deduction Components</h3>
                  <p className="text-sm text-slate-500 font-medium">Configure statutory deductions:</p>
                </div>
              </div>
              <button className="text-[#f97316] bg-orange-50 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 hover:bg-orange-100 transition-colors">
                <i className="fas fa-plus mr-1"></i> Add New
              </button>
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold mb-3 flex items-center gap-2 uppercase tracking-widest text-slate-400">
                   <i className="fas fa-shield-alt text-[10px]"></i> Statutory Deductions
                </h4>
                <div className="space-y-2">
                  <ComponentRow label="Provident Fund (PF)" value="12% of Basic" color="orange" active />
                  <ComponentRow label="Employee State Insurance (ESI)" value="1.75% of Gross" color="orange" active />
                </div>
              </div>
              <button className="w-full mt-4 py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 font-semibold text-sm hover:border-orange-300 hover:text-[#f97316] transition-all">
                <i className="fas fa-plus-circle mr-2"></i> Add Deduction Component
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden max-w-5xl mx-auto">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="text-lg font-bold text-[#021f54]">
               <i className="fas fa-file-invoice-dollar mr-2 text-[#f97316]"></i> Sample Payslip
            </h3>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 flex items-center gap-2 hover:bg-slate-50">
                <i className="fas fa-download"></i> PDF
              </button>
              <button className="px-5 py-2 bg-[#021f54] text-white rounded-xl text-sm font-bold hover:bg-[#0a368c] shadow-lg shadow-blue-900/20 flex items-center gap-2 transition-all">
                <i className="fas fa-print text-[#f97316]"></i> Print
              </button>
            </div>
          </div>

          <div className="p-12">
             <div className="flex justify-between items-start mb-12">
                <div>
                   <h2 className="text-3xl font-black text-[#021f54] tracking-tight">ACME Corp</h2>
                   <p className="text-slate-400 font-semibold text-sm mt-1">Salary Slip • March 2024</p>
                </div>
                <div className="text-right">
                   <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-1">Employee Detail</p>
                   <p className="font-extrabold text-[#021f54] text-lg leading-tight">John Doe</p>
                   <p className="text-[#f97316] font-bold text-sm">EMP001</p>
                </div>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div>
                   <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-2">
                      <h4 className="font-bold text-[#021f54] uppercase tracking-wider text-xs">Earnings</h4>
                   </div>
                   <div className="space-y-4">
                      <PayRow label="Basic Salary" value="25,000" />
                      <PayRow label="House Rent Allowance" value="10,000" />
                      <PayRow label="Conveyance Allowance" value="1,600" />
                      <PayRow label="Special Allowance" value="3,400" highlight />
                   </div>
                </div>

                <div>
                   <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-2">
                      <h4 className="font-bold text-[#021f54] uppercase tracking-wider text-xs">Deductions</h4>
                   </div>
                   <div className="space-y-4">
                      <PayRow label="Provident Fund" value="3,000" />
                      <PayRow label="ESI" value="450" />
                      <PayRow label="Professional Tax" value="150" />
                   </div>
                </div>
             </div>

             <div className="mt-12 pt-8 border-t-2 border-dashed border-slate-100">
                <div className="flex flex-col gap-3 max-w-sm ml-auto">
                   <div className="flex justify-between items-center text-slate-600 font-semibold px-2">
                      <span>Total Earnings</span>
                      <span className="text-[#021f54]">₹40,000</span>
                   </div>
                   <div className="flex justify-between items-center p-5 bg-[#021f54] rounded-2xl shadow-inner border border-white/5">
                      <span className="font-bold text-slate-300">Net Payable</span>
                      <span className="text-2xl font-black text-[#f97316]">₹36,400</span>
                   </div>
                </div>
             </div>
          </div>
          
          <div className="bg-[#021f54] py-3 text-center">
             <p className="text-[9px] text-slate-500 uppercase tracking-[0.3em] font-bold">Confidential Document • EMS Project</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatItem = ({ value, label }) => (
  <div>
    <div className="text-2xl font-bold text-[#f97316]">{value}</div>
    <div className="text-xs text-slate-400 uppercase tracking-wider">{label}</div>
  </div>
);

const PayRow = ({ label, value, highlight }) => (
  <div className="flex justify-between items-center text-sm">
    <span className={`font-medium ${highlight ? 'text-[#f97316]' : 'text-slate-500'}`}>{label}</span>
    <span className={`font-bold ${highlight ? 'text-[#021f54]' : 'text-slate-700'}`}>₹{value}</span>
  </div>
);

const ComponentRow = ({ label, value, active, color = "navy" }) => {
  const colorMap = {
    navy: "bg-[#021f54] border-[#021f54]",
    orange: "bg-[#f97316] border-[#f97316]"
  };

  return (
    <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all cursor-pointer group border border-transparent hover:border-slate-200">
      <div className="flex items-center gap-3">
        <div className={`w-5 h-5 rounded-md flex items-center justify-center border-2 transition-all ${active ? colorMap[color] : 'border-slate-300 bg-white group-hover:border-orange-400'}`}>
          {active && <i className="fas fa-check text-[10px] text-white"></i>}
        </div>
        <span className="text-sm font-bold text-slate-700">{label}</span>
      </div>
      <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-tighter">{value}</span>
    </div>
  );
};

export default SaleryModule;