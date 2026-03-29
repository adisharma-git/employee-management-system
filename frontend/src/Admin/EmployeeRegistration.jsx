import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import Loader from "../Loader/Loader";
import ToastContainer from "../Toaster/Toast";

export default function EmployeeRegistration() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    department: "",
    designation: "",
    baseSalary: "",
    allowances: "",
    taxRate: "",
    roleId: "" // 🔥 NEW FIELD
  });

  const [roles, setRoles] = useState([]); // 🔥 roles state
  const [loadingRoles, setLoadingRoles] = useState(true);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toasts, setToasts] = useState([]);

  const addToast = (type, message) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // 🔥 FETCH ROLES
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await api.get("/roles");

        if (res.data.success) {
          setRoles(res.data.data);
        }
      } catch (err) {
        console.error("Roles fetch error", err);
      } finally {
        setLoadingRoles(false);
      }
    };

    fetchRoles();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        department: formData.department || null,
        designation: formData.designation || null,
        baseSalary: Number(formData.baseSalary),
        allowances: formData.allowances ? Number(formData.allowances) : 0,
        taxRate: formData.taxRate ? Number(formData.taxRate) : 0,
        roleId: formData.roleId || undefined // 🔥 IMPORTANT
      };

      const res = await api.post("/admin/employees", payload);

      addToast("success", res?.data?.message || "Employee Created!");

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        department: "",
        designation: "",
        baseSalary: "",
        allowances: "",
        taxRate: "",
        roleId: ""
      });

    } catch (error) {
      addToast("error", error?.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <div className="min-h-[calc(100vh-80px)] bg-slate-50 px-6 py-10">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-10">

          <h1 className="text-2xl font-bold text-[#021f54] mb-6">
            Add New Employee
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Name */}
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />

            {/* Password */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />

            {/* Confirm Password */}
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />

            {/* 🔥 ROLE DROPDOWN */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Assign Role (Optional)
              </label>

              {loadingRoles ? (
                <p className="text-sm text-gray-400">Loading roles...</p>
              ) : (
                <select
                  name="roleId"
                  value={formData.roleId}
                  onChange={handleChange}
                  className="w-full border p-3 rounded mt-1"
                >
                  <option value="">Default (Employee)</option>

                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Department + Designation */}
            <input
              type="text"
              name="department"
              placeholder="Department"
              value={formData.department}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />

            <input
              type="text"
              name="designation"
              placeholder="Designation"
              value={formData.designation}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />

            {/* Salary */}
            <div className="grid grid-cols-3 gap-4">
              <input
                type="number"
                name="baseSalary"
                placeholder="Base Salary"
                value={formData.baseSalary}
                onChange={handleChange}
                className="border p-3 rounded"
              />
              <input
                type="number"
                name="allowances"
                placeholder="Allowances"
                value={formData.allowances}
                onChange={handleChange}
                className="border p-3 rounded"
              />
              <input
                type="number"
                name="taxRate"
                placeholder="Tax %"
                value={formData.taxRate}
                onChange={handleChange}
                className="border p-3 rounded"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4">
              <Link to="/employees" className="border px-4 py-2 rounded">
                Cancel
              </Link>

              <button className="bg-[#021f54] text-white px-4 py-2 rounded">
                Add Employee
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
  );
}