import React, { useEffect, useState } from "react";
import api from "../api/axios";

const PermissionsPage = () => {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allPermissions, setAllPermissions] = useState([]);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const res = await api.get("/roles");

      if (res.data.success) {
        const rolesData = res.data.data;
        setRoles(rolesData);

        // 🔥 GLOBAL PERMISSIONS EXTRACT
        const perms = [
          ...new Set(rolesData.flatMap((r) => r.permissions || [])),
        ];
        setAllPermissions(perms);

        // default select
        if (rolesData.length > 0) {
          setSelectedRole(rolesData[0]);
        }
      }
    } catch (err) {
      console.error("Error fetching roles", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-8 bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">
          Permissions Overview
        </h1>
        <p className="text-gray-500 text-sm">
          Role-based permissions (read-only)
        </p>
      </div>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center mt-20">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-[#021f54] rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* 🔥 Role Dropdown */}
          <div className="bg-white p-4 rounded-xl shadow mb-6 flex items-center gap-4">
            <label className="text-gray-600 font-medium">
              Select Role:
            </label>

            <select
              value={selectedRole?.id || ""}
              onChange={(e) =>
                setSelectedRole(
                  roles.find((r) => r.id === e.target.value)
                )
              }
              className="border rounded-lg px-3 py-2"
            >
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>

          {/* Permissions */}
          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Permissions
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

              {allPermissions.map((perm) => {
                const isEnabled =
                  selectedRole?.permissions?.includes(perm);

                return (
                  <div
                    key={perm}
                    className="flex items-center justify-between border rounded-lg px-4 py-3 hover:shadow-sm transition"
                  >
                    <span className="text-gray-700 text-sm capitalize">
                      {perm.replaceAll("_", " ")}
                    </span>

                    {/* Toggle */}
                    <div
                      className={`w-10 h-5 flex items-center rounded-full p-1 transition ${
                        isEnabled ? "bg-green-500" : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
                          isEnabled ? "translate-x-5" : ""
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PermissionsPage;