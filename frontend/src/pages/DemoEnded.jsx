import { useEffect } from "react";
import { Link } from "react-router-dom";
import { clearSession, getStoredUser } from "../utils/session";
import { IS_DEMO_SITE, DEMO_SESSION_MINUTES } from "../demo/demoConfig";

export default function DemoEnded() {
  // Someone can land here without going through the timer or logout
  // (e.g. typing the URL); make sure no demo session is left behind.
  useEffect(() => {
    if (getStoredUser()?.isDemo) clearSession();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8 sm:p-12 text-center">
        <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center text-2xl">
          <i className="fas fa-hourglass-end" aria-hidden="true"></i>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-[#021f54] mb-3">
          Your demo has ended
        </h1>
        <p className="text-gray-600 text-sm sm:text-base mb-8">
          Thanks for trying WorkAlignr. Demo sessions last {DEMO_SESSION_MINUTES} minutes,
          and the demo account and everything you created in it are deleted
          automatically.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {IS_DEMO_SITE && (
            <Link
              to="/demo"
              className="bg-[#021f54] text-white px-6 py-3 rounded-full font-medium hover:bg-[#032a70] transition-colors"
            >
              Start a new demo
            </Link>
          )}
          <Link
            to="/landingPage"
            className="border border-[#021f54] text-[#021f54] px-6 py-3 rounded-full font-medium hover:bg-slate-50 transition-colors"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
