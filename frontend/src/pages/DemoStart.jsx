import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { startDemo } from "../services/authService";
import { getDemoExpiry, saveSession } from "../utils/session";
import { DEMO_SESSION_MINUTES } from "../demo/demoConfig";

const MAX_NAME_LENGTH = 50;

const HIGHLIGHTS = [
  { icon: "fas fa-building", text: "A sample company with employees, attendance, leaves and payroll" },
  { icon: "fas fa-user-shield", text: "Admin features are open: approve leaves, run payroll, assign tasks" },
  { icon: "fas fa-hourglass-half", text: `Lasts ${DEMO_SESSION_MINUTES} minutes, then your demo account and its data are deleted` },
  { icon: "fas fa-envelope-open", text: "Nothing you do sends a real email" },
];

export default function DemoStart() {
  const navigate = useNavigate();
  const { setUserPermissions } = useAuth();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // Minutes left in a demo this browser already started, or 0.
  const [minutesLeft] = useState(() => {
    const expiry = getDemoExpiry();
    return expiry ? Math.ceil((expiry.getTime() - Date.now()) / 60000) : 0;
  });
  const hasActiveDemo = minutesLeft > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await startDemo(name.trim());
      saveSession(response.data, setUserPermissions);
      navigate("/dashboardNew");
    } catch (err) {
      setError(
        err.response?.data?.message || "Couldn't start the demo. Please try again."
      );
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4 py-10">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="p-8 sm:p-14 flex flex-col justify-center">
          <span className="self-start text-xs font-semibold uppercase tracking-wide text-orange-500 bg-orange-50 px-3 py-1 rounded-full mb-4">
            Live demo
          </span>
          <h1 className="text-3xl font-bold text-[#021f54] mb-2">Try WorkAlignr</h1>
          <p className="text-gray-500 text-sm mb-8">
            Look around the full dashboard. No sign-up needed.
          </p>

          {hasActiveDemo ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-700">
                You already have a demo running, with about{" "}
                <span className="font-semibold">
                  {minutesLeft} minute{minutesLeft === 1 ? "" : "s"}
                </span>{" "}
                left.
              </p>
              <button
                type="button"
                onClick={() => navigate("/dashboardNew")}
                className="w-full bg-[#021f54] text-white py-3 rounded-full font-medium hover:bg-[#032a70] transition-colors"
              >
                Continue your demo
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <label htmlFor="demo-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your name <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  id="demo-name"
                  type="text"
                  value={name}
                  maxLength={MAX_NAME_LENGTH}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Priya"
                  className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#021f54]"
                />
              </div>

              {error && (
                <p role="alert" className="text-sm text-red-600">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#021f54] text-white py-3 rounded-full font-medium hover:bg-[#032a70] transition-colors disabled:opacity-60"
              >
                {loading ? "Starting your demo..." : `Start ${DEMO_SESSION_MINUTES}-minute demo`}
              </button>
            </form>
          )}

          <p className="text-sm text-center mt-6">
            <Link to="/landingPage" className="text-orange-500">
              Back to home
            </Link>
          </p>
        </div>

        <div className="bg-gradient-to-br from-[#021f54] to-[#043a8f] text-white p-8 sm:p-14 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6">
            What you can <span className="text-orange-500">try</span>
          </h2>
          <ul className="space-y-5">
            {HIGHLIGHTS.map((item) => (
              <li key={item.text} className="flex gap-3 text-sm text-blue-100">
                <i className={`${item.icon} text-orange-500 mt-0.5 w-5 text-center`} aria-hidden="true"></i>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
