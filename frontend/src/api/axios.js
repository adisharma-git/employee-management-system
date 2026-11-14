import axios from "axios";
import { endSession, getStoredUser } from "../utils/session";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true, // Important for cookies/sessions
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// A 401 on a logged-in request means the session is over (token expired or
// revoked, or the demo ended), so clear it and leave the page.
// Skipped: /auth/* calls (a wrong password on the login page is also a 401),
// and requests made with a token that's no longer the stored one — e.g.
// requests still in flight during logout, which fail once it's revoked.
let redirecting = false;

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const currentToken = localStorage.getItem("token");
    const sentCurrentToken =
      Boolean(currentToken) && error.config?.headers?.Authorization === `Bearer ${currentToken}`;
    const isAuthCall = (error.config?.url || "").startsWith("/auth/");

    if (error.response?.status === 401 && sentCurrentToken && !isAuthCall && !redirecting) {
      redirecting = true;
      // Demo visitors never go to /login: they have no password. Covers
      // DEMO_EXPIRED and a demo account that no longer exists.
      const wasDemo = error.response.data?.code === "DEMO_EXPIRED" || getStoredUser()?.isDemo;
      const nextPath = wasDemo ? "/demo-ended" : "/login";
      endSession(nextPath);
      window.location.assign(nextPath);
    }

    return Promise.reject(error);
  }
);

export default api;
