import { useAuth } from "../../Context/AuthContext";

export const usePermission = () => {
  const { permissions, isSuperAdmin } = useAuth();

  // 🔥 SINGLE PERMISSION
  const can = (perm) => {
    if (isSuperAdmin) return true; // 🔥 SUPER ADMIN BYPASS
    return permissions.includes(perm);
  };

  // 🔥 ANY PERMISSION
  const canAny = (permList) => {
    if (isSuperAdmin) return true;
    return permList.some((perm) => permissions.includes(perm));
  };

  // 🔥 ALL PERMISSIONS
  const canAll = (permList) => {
    if (isSuperAdmin) return true;
    return permList.every((perm) => permissions.includes(perm));
  };

  return { can, canAny, canAll };
};