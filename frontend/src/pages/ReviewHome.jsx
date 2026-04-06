export default function ReviewSection() {
  const highlights = [
    {
      title: "Attendance accuracy",
      description: "Daily attendance records, break history, and date-safe calculations built for HR workflows.",
    },
    {
      title: "Leave management",
      description: "Leave balances, approvals, holidays, and half-day handling stay aligned with policy rules.",
    },
    {
      title: "Payroll readiness",
      description: "Salary structure and payroll records are designed to support monthly payouts and audits.",
    },
    {
      title: "Role-based access",
      description: "Admin, manager, and employee permissions stay separated through the existing RBAC model.",
    },
  ];

  return (
    <section className="w-full bg-white py-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#e9efff] px-5 py-2 text-[#021f54] text-sm font-semibold mb-4">
            <span className="text-pink-500">❤</span>
            BUILT FOR REAL WORKFLOWS
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-[#0f172a] mb-4">
            Why teams use WorkAlignr
          </h2>

          <p className="text-base md:text-lg text-slate-600 font-medium max-w-4xl mx-auto leading-relaxed">
            The landing page should reflect the product that actually exists: attendance, leave, payroll, permissions, and notifications in one place.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-[#dbe8ff] bg-[#f8fbff] p-6 shadow-[0_10px_28px_0_rgba(2,31,84,0.12)] hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#021f54] text-white text-xl font-bold">
                ✓
              </div>
              <h3 className="text-lg font-bold text-[#021f54] mb-2">{item.title}</h3>
              <p className="text-sm leading-relaxed text-slate-700">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}