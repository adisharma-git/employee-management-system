import api from "../api/axios";
import { endSession, getDemoExpiry } from "../utils/session";

export const registerUser = (data) => {
  return api.post("/auth/register", data);
};

export const loginUser = (data) => {
  return api.post("/auth/login", data);
};

export const startDemo = (name) => {
  return api.post("/auth/demo", { name });
};

// Clears the session and returns the page to go to next: the "demo ended"
// page for demo visitors, /login for everyone else. Call navigate() with the
// result right away, in the same tick: if the app re-renders while still on a
// protected page with no token, ProtectedRoute sends the user to /login.
// The token is revoked on the server in the background.
export const logout = () => {
  const token = localStorage.getItem("token");
  const nextPath = getDemoExpiry() ? "/demo-ended" : "/login";

  endSession(nextPath);

  if (token) {
    api
      // No body: `null` would be sent as JSON "null", which Express rejects.
      .post("/auth/logout", undefined, { headers: { Authorization: `Bearer ${token}` } })
      .catch((error) => console.error("Logout API error:", error));
  }

  return nextPath;
};

export const userName = () => {
  return api.get("/employee/me");
};

export const userData=(data)=>{
  return api.put("/employee/update",data);
}
export const punchIn=(data)=>{
  return api.post("/attendance/mark",data);
}
export const punchOut=(data)=>{
  return api.post("/attendance/checkout",data);
}
export const punchInData=()=>{
  return api.get("/attendance/punch-status");
}
export const timeLog=(data)=>{
  return api.post("/logs/add",data);
}
export const deleteTimeLog=(data)=>{
  return api.delete("/logs/delete",{
    data:data
  });
} 

export const getPunchStatus = () => {
  return api.get("/attendance/punch-status");
}