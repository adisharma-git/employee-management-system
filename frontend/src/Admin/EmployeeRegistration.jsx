import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import Loader from "../Loader/Loader";
import AccessRestricted from "../Components/AccessRestricted";
import ToastContainer from "../Toaster/Toast";

export default function EmployeeRegistration({permission}) {
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
// if (!formData.baseSalary) {
    //   newErrors.baseSalary = "Base salary is required";
    // } else if (Number(formData.baseSalary) <= 0) {
    //   newErrors.baseSalary = "Base salary must be greater than 0";
    // }

    // if (formData.allowances && Number(formData.allowances) < 0) {
    //   newErrors.allowances = "Allowances cannot be negative";
    // }

    // if (formData.taxRate && (Number(formData.taxRate) < 0 || Number(formData.taxRate) > 100)) {
    //   newErrors.taxRate = "Tax rate must be between 0 and 100";
    // }
    // 

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
        {permission ? (
          <>
            <div className="mb-8 border-b pb-4">
              <h1 className="text-2xl font-bold text-[#021f54]">
                Add New Employee
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Create a new employee account in the system.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-200 focus:outline-none ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-200 focus:outline-none ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-200 focus:outline-none ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Designation
                  </label>
                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Base Salary
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    name="baseSalary"
                    value={formData.baseSalary}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-200 focus:outline-none ${
                      errors.baseSalary ? "border-red-500" : "border-gray-300"
                    }`}
                  />
          
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Allowances
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    name="allowances"
                    value={formData.allowances}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-200 focus:outline-none ${
                      errors.allowances ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tax Rate (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    name="taxRate"
                    value={formData.taxRate}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-200 focus:outline-none ${
                      errors.taxRate ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-200 focus:outline-none ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-4 pt-4 border-t">
                <Link
                  to="/employees"
                  className="px-6 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-[#021f54] text-white hover:bg-[#043a8f]"
                >
                  Add Employee
                </button>
              </div>
            </form>
          </>
        ) : (
          <AccessRestricted />
        )}
        </div>
      </div>
    </>
  );


}
