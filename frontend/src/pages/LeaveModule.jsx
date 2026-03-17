import React, { useEffect } from 'react';

const LeaveModule = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">

      <header id="top" className="relative overflow-hidden bg-gradient-to-br from-[#021f54] via-[#082f7a] to-[#021f54] py-24 text-center text-white">
        <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-white/5" />
        <div className="absolute right-10 top-1/2 h-32 w-32 rounded-full border border-white/10" />
        <div className="relative z-10 mx-auto max-w-4xl px-4">
          <h1 className="mb-6 text-5xl font-extrabold tracking-tight md:text-6xl">
            Leave <span className="text-orange-500">Management</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-blue-100/80">
            Streamline time-off requests with automated workflows and smart policies. 
            From request to approval, everything in one place.
          </p>
        </div>
      </header>

      <div className="bg-white py-10 shadow-sm border-b border-blue-100">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 text-center md:grid-cols-4">
          {[
            { title: 'Unlimited', desc: 'Employee Records' },
            { title: 'Flexible', desc: 'Leave Configurations' },
            { title: 'Centralized', desc: 'Leave Dashboard' },
            { title: 'Custom', desc: 'Leave Policies' },
          ].map((item, idx) => (
            <div key={idx}>
              <h3 className="text-xl font-bold text-[#021f54]">{item.title}</h3>
              <p className="text-sm text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-[#021f54]">Request Leave in Seconds</h2>
          <p className="mt-3 text-slate-500 italic">Intuitive tools that make time-off requests hassle-free</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-[2rem] bg-white p-10 shadow-xl border border-blue-50">
            <div className="mb-8 flex items-center gap-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-lg shadow-orange-200">
                <i className="fas fa-sign-out-alt fa-lg"></i>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#021f54]">Quick Request</h3>
                <p className="text-slate-500 text-sm">Submit leave requests in 3 simple steps:</p>
              </div>
            </div>
            <div className="space-y-4">
              {['Select leave type & dates', 'Add reason & attachments', 'Submit for approval'].map((text, i) => (
                <div key={i} className="flex items-center gap-4 rounded-2xl bg-[#021f54]/10 p-4 text-[#021f54] font-medium">
                  <i className="fas fa-check-circle text-orange-500"></i>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-10 shadow-xl border border-blue-50">
            <div className="mb-8 flex items-center gap-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#021f54] text-white shadow-lg shadow-[#021f54]/20">
                <i className="fas fa-coffee fa-lg text-orange-400"></i>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#021f54]">Live Balance Tracking</h3>
                <p className="text-slate-500 text-sm">Real-time visibility into your leave balances:</p>
              </div>
            </div>
            <div className="space-y-4">
              {['Annual Leave (12 days left)', 'Sick Leave (8 days left)', 'Unpaid Leave (5 days left)'].map((leave, i) => (
                <div key={i} className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4 text-slate-700 font-medium border-l-4 border-orange-500">
                  <i className="fas fa-comment-dots text-blue-400"></i>
                  <span>{leave}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-[2rem] bg-[#021f54] p-10 text-white shadow-2xl">
          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
            <div>
              <h3 className="text-3xl font-bold text-orange-400">Team Leave Calendar</h3>
              <p className="text-blue-100 opacity-90">See who's out and plan ahead:</p>
            </div>
            <div className="grid grid-cols-5 gap-3 w-full lg:w-auto text-center">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, i) => (
                <div key={day}>
                  <span className="text-xs font-bold uppercase tracking-widest text-blue-300">{day}</span>
                  <div className={`mt-2 rounded-xl px-4 py-3 text-sm font-bold shadow-inner ${i === 1 ? 'bg-orange-500' : 'bg-blue-800'}`}>
                    {i === 1 ? '1 out' : i < 3 ? '2 out' : '0 out'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <span className="rounded-full bg-orange-100 px-6 py-1.5 text-sm font-semibold text-orange-600">Manager Tools</span>
          <h2 className="mt-6 text-4xl font-bold text-[#021f54]">Approve with Confidence</h2>
          <p className="mt-3 text-slate-500">Smart workflows that help you make better decisions</p>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="rounded-3xl border border-blue-50 bg-white p-8 shadow-lg">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#021f54] text-white">
                <i className="fas fa-hourglass-half"></i>
              </div>
              <h3 className="mb-6 text-left text-xl font-bold text-[#021f54]">Pending Requests</h3>
              <div className="space-y-3">
                <div className="rounded-xl bg-orange-50 p-4 text-left border border-orange-100">
                  <div className="flex justify-between font-bold text-[#021f54]"><span>Sarah Chen</span><span className="text-orange-600">New</span></div>
                  <div className="text-sm text-slate-500">Annual Leave • 3 days</div>
                </div>
              </div>
              <button className="mt-6 w-full rounded-xl bg-[#021f54] py-3 font-semibold text-white hover:bg-blue-800">View All (12)</button>
            </div>

            <div className="rounded-3xl border border-blue-50 bg-white p-8 shadow-lg">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#021f54] text-white">
                <i className="fas fa-project-diagram"></i>
              </div>
              <h3 className="mb-6 text-left text-xl font-bold bg-[#ffffff]">Smart Workflows</h3>
              <ul className="space-y-4 text-left text-sm text-slate-600">
                <li><i className="fas fa-bolt text-orange-500 mr-2"></i> Auto-approval for eligible requests</li>
                <li><i className="fas fa-users text-orange-500 mr-2"></i> Team workload balancing</li>
                <li><i className="fas fa-bell text-orange-500 mr-2"></i> Conflict detection alerts</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-blue-50 bg-white p-8 shadow-lg">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#021f54] text-white">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3 className="mb-6 text-left text-xl font-bold text-[#021f54]">Team Overview</h3>
              <div className="mb-4 flex justify-between text-xs font-bold uppercase text-slate-400"><span>Availability</span><span>8/12 available</span></div>
              <div className="h-2 w-full rounded-full bg-slate-100"><div className="h-2 w-3/4 rounded-full bg-orange-500" /></div>
              <div className="mt-10 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-[#021f54]/10 p-4 text-center">
                  <div className="text-2xl font-bold text-[#021f54]">4</div>
                  <div className="text-[10px] font-bold text-blue-400 uppercase">On Leave</div>
                </div>
                <div className="rounded-xl bg-orange-50 p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">12%</div>
                  <div className="text-[10px] font-bold text-orange-400 uppercase">Usage Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-24 border-t border-blue-100">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <span className="rounded-full bg-[#021f54]px-6 py-1.5 text-sm font-semibold text-orange-400">HR Administration</span>
          <h2 className="mt-6 text-4xl font-bold text-[#021f54]">Full Policy Control</h2>
          <p className="mt-3 text-slate-500">Configure, monitor, and optimize leave policies effortlessly</p>

          <div className="mt-16 grid gap-6 lg:grid-cols-4 text-left">
            {['Policy Engine', 'Auto Accrual', 'Reports', 'Audit Trail'].map((title, i) => (
              <div key={i} className="rounded-3xl bg-white p-8 shadow-md border-b-4 border-[#021f54]">
                <div className="mb-4 text-orange-500"><i className="fas fa-cog fa-2x"></i></div>
                <h4 className="font-bold text-[#021f54]">{title}</h4>
                <p className="mt-2 text-xs text-slate-500">Managing rules and automated calculations for the entire team.</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-[2.5rem] bg-[#021f54] p-12 text-white shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full -mr-20 -mt-20 blur-3xl" />
             <div className="text-left relative z-10">
                <h3 className="text-3xl font-bold">Flexible <span className="text-orange-400">Policy Builder</span></h3>
                <div className="mt-10 grid gap-4 lg:grid-cols-4">
                  {['Annual Leave', 'Sick Leave', 'Parental', 'WFH Policy'].map((p, i) => (
                    <div key={i} className="rounded-2xl bg-white/5 p-6 border border-white/10 hover:border-orange-500 transition-colors">
                      <h4 className="font-bold">{p}</h4>
                      <p className="mt-1 text-xs text-blue-200">20 days/year • Active</p>
                    </div>
                  ))}
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LeaveModule;