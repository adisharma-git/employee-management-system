import { useState } from "react";
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
  });

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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
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
      };

      const res = await api.post("/admin/employees", payload);

      const successMessage =
        res?.data?.message ||
        res?.data?.data?.message ||
        "Registration successful!";
      addToast("success", successMessage);

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
      });
    } catch (error) {
      const backendMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Registration failed. Please try again.";
      addToast("error", backendMessage);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Loader Screen
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <div className="min-h-[calc(100vh-80px)] bg-slate-50 px-6 py-10">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md border border-gray-200 p-10">
          
          <div className="mb-8 border-b pb-4">
            <h1 className="text-2xl font-bold text-[#021f54]">
              Add New Employee
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Create a new employee account in the system.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-6">

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Salary Fields */}
            <div className="grid grid-cols-3 gap-4">
              <input
                type="number"
                name="baseSalary"
                placeholder="Base Salary"
                value={formData.baseSalary}
                onChange={handleChange}
                className="border p-3 rounded-lg"
              />
              <input
                type="number"
                name="allowances"
                placeholder="Allowances"
                value={formData.allowances}
                onChange={handleChange}
                className="border p-3 rounded-lg"
              />
              <input
                type="number"
                name="taxRate"
                placeholder="Tax %"
                value={formData.taxRate}
                onChange={handleChange}
                className="border p-3 rounded-lg"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4">
              <Link to="/employees" className="border px-4 py-2 rounded-lg">
                Cancel
              </Link>
              <button
                type="submit"
                className="bg-blue-900 text-white px-4 py-2 rounded-lg"
              >
                Add Employee
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
  );
}