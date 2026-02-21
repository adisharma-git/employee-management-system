import React, { useEffect } from 'react';

const AttendanceModule = () => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-[#021f54]">
      <section id="attendance-top" className="relative overflow-hidden bg-gradient-to-br from-[#021f54] to-[#0a368c] pb-20 pt-24 text-white">
        <div className="absolute -left-10 -top-10 h-64 w-64 rounded-full bg-white/5" />
        <div className="absolute -right-10 top-20 h-96 w-96 rounded-full bg-[#f97316]/10" />

        <div className="container mx-auto px-6 text-center">
          <h1 className="mb-6 text-5xl font-extrabold md:text-6xl">
            Attendance <span className="text-[#f97316]">Management</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg opacity-90">
            Our Attendance Management module is designed to simplify workforce time tracking while giving organizations full control.
          </p>
          <div className="mx-auto flex max-w-4xl justify-around border-t border-white/20 pt-8">
            {[
              { label: 'Accuracy Rate', val: '98%' },
              { label: 'Time Saved', val: '40%' },
              { label: 'Compliance', val: '100%' },
              { label: 'Access', val: '24/7' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl font-bold">{stat.val}</p>
                <p className="text-xs opacity-70 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-20">
        <div className="mb-12 text-center">
          <span className="rounded-full bg-[#f97316]/10 px-4 py-1 text-sm font-semibold text-[#f97316]">
            Employee Experience
          </span>
          <h2 className="mt-4 text-4xl font-bold">Designed for Your People</h2>
          <p className="text-gray-500">Intuitive tools that make attendance tracking effortless and transparent.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
         
          <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#021f54] text-white">
                <i className="fas fa-sign-in-alt"></i>
              </div>
              <h3 className="text-xl font-bold">Smart Check-In/Check-Out</h3>
            </div>
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1 text-sm text-[#021f54]">
                <i className="fas fa-check text-[#f97316]"></i> Auto-captured timestamps
              </span>
              <span className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1 text-sm text-[#021f54]">
                <i className="fas fa-map-marker-alt text-[#f97316]"></i> Location verification
              </span>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f97316] text-white">
                <i className="fas fa-coffee"></i>
              </div>
              <h3 className="text-xl font-bold">Break Management</h3>
            </div>
            <div className="flex gap-3">
              <button className="rounded-lg border border-[#f97316] px-4 py-2 text-sm font-medium text-[#f97316] hover:bg-[#f97316] hover:text-white transition-colors">
                Start Break
              </button>
              <button className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600">
                End Break
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-2xl bg-[#021f54] p-8 text-white shadow-xl">
          <h3 className="mb-6 text-xl font-semibold">Real-Time Dashboard</h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { time: '09:30 AM', label: 'Check-in' },
              { time: '06:45 PM', label: 'Check-out' },
              { time: '2', label: 'Breaks Taken' },
              { time: 'Active', label: 'Status', dot: true },
            ].map((item, i) => (
              <div key={i} className="rounded-xl bg-white/10 p-4 text-center backdrop-blur-sm">
                <p className="text-lg font-bold">
                  {item.dot && <span className="mr-2 inline-block h-2 w-2 rounded-full bg-green-400"></span>}
                  {item.time}
                </p>
                <p className="text-xs opacity-60 uppercase">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <span className="rounded-full bg-slate-100 px-4 py-1 text-sm font-semibold text-[#021f54]">
              HR & Admin Control
            </span>
            <h2 className="mt-4 text-4xl font-bold">Complete Command Center</h2>
            <p className="text-gray-500">Powerful tools to manage attendance across your organization.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
           
            <div className="group rounded-2xl border border-gray-50 p-8 transition-all hover:shadow-lg">
              <div className="mb-6 h-12 w-12 rounded-xl bg-[#021f54] p-3 text-white">
                <i className="fas fa-chart-line text-xl"></i>
              </div>
              <h4 className="mb-4 text-xl font-bold">Live Monitoring</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-center gap-2"><i className="fas fa-check text-[#f97316]"></i> Present/Absent overview</li>
                <li className="flex items-center gap-2"><i className="fas fa-check text-[#f97316]"></i> Late arrivals tracking</li>
              </ul>
            </div>

            <div className="group rounded-2xl border border-gray-50 p-8 transition-all hover:shadow-lg">
              <div className="mb-6 h-12 w-12 rounded-xl bg-[#021f54] p-3 text-white">
                <i className="fas fa-layer-group text-xl"></i>
              </div>
              <h4 className="mb-4 text-xl font-bold">Bulk Operations</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-center gap-2"><i className="fas fa-check text-[#f97316]"></i> CSV/Excel import</li>
                <li className="flex items-center gap-2"><i className="fas fa-check text-[#f97316]"></i> Mass updates</li>
              </ul>
            </div>

            <div className="group rounded-2xl border border-gray-50 p-8 transition-all hover:shadow-lg">
              <div className="mb-6 h-12 w-12 rounded-xl bg-[#f97316] p-3 text-white">
                <i className="fas fa-pie-chart text-xl"></i>
              </div>
              <h4 className="mb-4 text-xl font-bold">Deep Analytics</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-center gap-2"><i className="fas fa-check text-[#021f54]"></i> Attendance trends</li>
                <li className="flex items-center gap-2"><i className="fas fa-check text-[#021f54]"></i> Exportable summaries</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AttendanceModule;