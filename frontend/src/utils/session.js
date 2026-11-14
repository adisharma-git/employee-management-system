// Everything the app keeps in localStorage for a logged-in user.
// dashboardSelectedTab is included so the next person to log in on this
// browser starts on the dashboard, not on a tab they may not have access to.
const SESSION_KEYS = ["token", "user", "permissions", "isSuperAdmin", "dashboardSelectedTab"];

export function clearSession() {
  SESSION_KEYS.forEach((key) => localStorage.removeItem(key));
}

// Where to send someone whose session just ended. Navigation is a React
// transition, so a protected page can re-render (with no token) before it
// unmounts; ProtectedRoute then redirects here instead of always to /login.
const EXIT_PATH_TTL_MS = 30000;
let exitPath = null;

export function endSession(nextPath) {
  exitPath = { path: nextPath, at: Date.now() };
  clearSession();
}

export function getRecentExitPath() {
  return exitPath && Date.now() - exitPath.at < EXIT_PATH_TTL_MS ? exitPath.path : null;
}

// Stores the response of /auth/login or /auth/demo:
// { token, user: { role: { permissions }, isSuperAdmin, isDemo?, expiresAt? } }
export function saveSession({ token, user }, setUserPermissions) {
  clearSession();
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
  setUserPermissions(user?.role?.permissions || [], Boolean(user?.isSuperAdmin));
}

export function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
}

// When the current demo session ends, or null if this isn't a demo session.
export function getDemoExpiry() {
  const user = getStoredUser();
  if (!user?.isDemo || !user.expiresAt || !localStorage.getItem("token")) return null;

  const expiresAt = new Date(user.expiresAt);
  return Number.isNaN(expiresAt.getTime()) ? null : expiresAt;
}
