import { createContext, useCallback, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [permissions, setPermissions] = useState([]);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false); // 🔥 ADD

  useEffect(() => {
    const storedPerms = localStorage.getItem("permissions");
    const storedAdmin = localStorage.getItem("isSuperAdmin");

    if (storedPerms) setPermissions(JSON.parse(storedPerms));
    if (storedAdmin) setIsSuperAdmin(JSON.parse(storedAdmin));
  }, []);

  // useCallback keeps this the same function across renders, so effects that
  // list it as a dependency (Dashboard's profile fetch) run once, not forever.
  const setUserPermissions = useCallback((perms, isAdmin = false) => {
    setPermissions(perms);
    setIsSuperAdmin(isAdmin);

    localStorage.setItem("permissions", JSON.stringify(perms));
    localStorage.setItem("isSuperAdmin", JSON.stringify(isAdmin));
  }, []);

  return (
    <AuthContext.Provider value={{ permissions, isSuperAdmin, setUserPermissions }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);