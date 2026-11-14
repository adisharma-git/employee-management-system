import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { clearSession, endSession, getDemoExpiry } from "../utils/session";
import { logout } from "../services/authService";
import { DEMO_SESSION_MINUTES } from "./demoConfig";

const HIDDEN_ON = ["/demo", "/demo-ended"];
const WARNING_SECONDS = 120;

const formatTime = (seconds) =>
  `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

// Countdown shown on every page during a demo session. When it reaches zero
// the session is cleared and the visitor is sent to /demo-ended.
export default function DemoBanner() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [now, setNow] = useState(() => Date.now());
  const sawActiveSession = useRef(false);

  // Read on every render: a demo can start or end on any navigation.
  const expiresAt = getDemoExpiry();
  const expiryTime = expiresAt?.getTime() ?? null;

  const secondsLeft =
    expiryTime === null
      ? null
      : Math.min(
          DEMO_SESSION_MINUTES * 60,
          Math.max(0, Math.ceil((expiryTime - now) / 1000))
        );

  useEffect(() => {
    if (expiryTime === null) return undefined;
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [expiryTime]);

  useEffect(() => {
    if (secondsLeft === null) return;

    if (secondsLeft > 0) {
      sawActiveSession.current = true;
      return;
    }

    // Only interrupt a visitor who was using the demo when it ran out, not
    // someone coming back to the site long after an old demo expired.
    if (sawActiveSession.current) {
      endSession("/demo-ended");
      navigate("/demo-ended");
    } else {
      clearSession();
    }
  }, [secondsLeft, navigate]);

  if (!secondsLeft || HIDDEN_ON.includes(pathname)) return null;

  const endingSoon = secondsLeft <= WARNING_SECONDS;

  const handleEndDemo = () => {
    navigate(logout());
  };

  return (
    <div
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-[1000] flex items-center gap-3 rounded-full px-4 py-2 text-sm text-white shadow-xl ${
        endingSoon ? "bg-red-600" : "bg-[#021f54]"
      }`}
    >
      <i className="fas fa-clock" aria-hidden="true"></i>
      <span className="whitespace-nowrap">
        {endingSoon ? "Demo ends in " : "Live demo · "}
        <span className="font-semibold tabular-nums">{formatTime(secondsLeft)}</span>
        {endingSoon ? "" : " left"}
      </span>
      <button
        type="button"
        onClick={handleEndDemo}
        className="whitespace-nowrap rounded-full bg-white/15 px-3 py-0.5 text-xs font-medium hover:bg-white/25"
      >
        End demo
      </button>
    </div>
  );
}
