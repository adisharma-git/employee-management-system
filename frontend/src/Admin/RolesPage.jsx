import React, { useEffect, useState } from "react";
import api from "../api/axios";
import AddRoleModal from "./AddRoleModal";

const RolesPage = () => {
  const [roles, setRoles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const res = await api.get("/roles");

      if (res.data.success) {
        setRoles(res.data.data);
      }
    } catch (err) {
      console.error("Fetch roles error", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = () => {
    fetchRoles();
    setShowModal(false);
    setSelectedRole(null);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Roles Management
          </h1>
          <p className="text-gray-500 text-sm">
            Manage roles and permissions
          </p>
        </div>

       
          <button
            onClick={() => {
              setSelectedRole(null);
              setShowModal(true);
            }}
            className="bg-[#021f54] text-white hover:bg-orange-400 hover:text-black text-sm font-medium px-4 py-1.5 rounded-md"
          >
            + Add Role
          </button>
      
      </div>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center mt-20">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid gap-4">
          {roles.length === 0 ? (
            <p className="text-gray-400 text-center">No roles found</p>
          ) : (
            roles.map((role) => (
              <div
                key={role.id}
                className="bg-white p-5 rounded-xl shadow flex justify-between items-start"
              >
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    {role.name}
                  </h3>

                  <p className="text-gray-500 text-sm mt-1">
                    {role.description}
                  </p>

                  {/* Permissions Preview */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {role.permissions?.slice(0, 4).map((perm) => (
                      <span
                        key={perm}
                        className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded"
                      >
                        {perm}
                      </span>
                    ))}

                    {role.permissions?.length > 4 && (
                      <span className="text-xs text-gray-400">
                        +{role.permissions.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span className="text-xs text-gray-400">
                    {new Date(role.createdAt).toLocaleDateString()}
                  </span>

                  <button
                    onClick={() => {
                      setSelectedRole(role);
                      setShowModal(true);
                    }}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <AddRoleModal
          role={selectedRole}
          onClose={() => {
            setShowModal(false);
            setSelectedRole(null);
          }}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
};

export default RolesPage;