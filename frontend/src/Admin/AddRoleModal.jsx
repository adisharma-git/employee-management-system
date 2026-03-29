import React, { useEffect, useState } from "react";
import api from "../api/axios";

const AddRoleModal = ({ onClose, onSuccess, role }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    permissions: []
  });

  const [allPermissions, setAllPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch permissions
  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = async () => {
    try {
      setLoading(true);
      const res = await api.get("/roles/catalog/permissions");

      if (res.data.success) {
        setAllPermissions(res.data.data);
      }
    } catch (err) {
      console.error("Permissions fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  // Prefill (EDIT)
  useEffect(() => {
    if (role) {
      setForm({
        name: role.name || "",
        description: role.description || "",
        permissions: Array.isArray(role.permissions)
          ? [...role.permissions]
          : []
      });
    } else {
      setForm({
        name: "",
        description: "",
        permissions: []
      });
    }
  }, [role]);

  // Checkbox toggle
  const handleCheckbox = (perm) => {
    if (form.permissions.includes(perm)) {
      setForm({
        ...form,
        permissions: form.permissions.filter((p) => p !== perm)
      });
    } else {
      setForm({
        ...form,
        permissions: [...form.permissions, perm]
      });
    }
  };

  // Submit
  const handleSubmit = async () => {
    try {
      setSaving(true);

      let res;
      if (role) {
        res = await api.put(`/roles/${role.id}`, form);
      } else {
        res = await api.post("/roles", form);
      }

      if (res.data.success) {
        onSuccess();
      }
    } catch (err) {
      console.error("Role save error", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl w-[500px] p-6 shadow-lg">

        <h2 className="text-xl font-semibold mb-4">
          {role ? "Edit Role" : "Create Role"}
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {/* Name */}
            <input
              type="text"
              placeholder="Role Name"
              className="w-full border p-2 rounded mb-3"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            {/* Description */}
            <input
              type="text"
              placeholder="Description"
              className="w-full border p-2 rounded mb-4"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            {/* Permissions */}
            <div className="max-h-48 overflow-y-auto border rounded p-2 mb-4">
              {allPermissions.map((perm) => (
                <label key={perm} className="block text-sm mb-1">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={form.permissions.includes(perm)}
                    onChange={() => handleCheckbox(perm)}
                  />
                  {perm}
                </label>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-1.5 border rounded"
                disabled={saving}
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                disabled={saving}
                className="bg-[#021f54] text-white px-4 py-1.5 rounded flex items-center gap-2"
              >
                {saving && (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                )}
                {role ? "Update" : "Save"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AddRoleModal;