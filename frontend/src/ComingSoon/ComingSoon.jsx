export default function ComingSoon() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      
     
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 text-center px-6">
        

        <span className="inline-block mb-6 px-4 py-1 text-sm tracking-wider uppercase rounded-full bg-white/10 backdrop-blur">
          🚀 Launching Soon
        </span>

      
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Coming <span className="text-blue-400">Soon</span>
        </h1>

       
        <p className="text-gray-300 max-w-xl mx-auto mb-8">
          We're working hard to bring you something amazing.  
          Stay tuned for updates and early access.
        </p>

        {/* Countdown UI (Visual Only) */}
        {/* <div className="flex justify-center gap-4 mb-10">
          {["Days", "Hours", "Minutes", "Seconds"].map((item) => (
            <div
              key={item}
              className="w-20 py-4 rounded-xl bg-white/10 backdrop-blur border border-white/10"
            >
              <p className="text-2xl font-semibold">00</p>
              <p className="text-xs text-gray-400 mt-1">{item}</p>
            </div>
          ))}
        </div> */}

        {/* Notify Form */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-72 px-4 py-3 rounded-lg bg-white/10 border border-white/10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 transition font-medium">
            Notify Me
          </button>
        </div>

       
        <p className="mt-10 text-sm text-gray-500">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </div>
    </div>
  );
}
