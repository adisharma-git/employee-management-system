import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import ToastContainer from "../Toaster/Toast";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  /* ── toast helpers ── */
  const addToast = (type, message) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, message }]);
  };
  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  /* ── validation (unchanged) ── */
  const validateForm = () => {
    const newErrors = {};

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ── input change (unchanged) ── */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  /* ── submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    setLoading(true);
    try {
      const payload = {
        email: formData.email,
        password: formData.password,
      };
      const response = await api.post("/auth/login", payload);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        addToast("success", "Login successful! Welcome back");
        setTimeout(() => {
          navigate("/dashboardNew", { replace: true });
        }, 1200);
      }
      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Login error:", error);
      const msg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Login failed. Please try again.";
      addToast("error", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
        <div className="w-full max-w-5xl h-[600px] bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
          <div className="p-10 flex flex-col justify-center">
            <h1 className="text-3xl font-bold mb-2">Login</h1>
            <p className="text-gray-500 text-sm mb-6">
              Welcome to the Employee Management System
            </p>
            <button className="w-full border rounded-full py-3 flex items-center justify-center gap-2 mb-6">
              <i className="fab fa-google text-red-500"></i>
              Sign in with Google
            </button>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 border-t"></div>
              <span className="text-xs text-gray-400">or Sign in with Email</span>
              <div className="flex-1 border-t"></div>
            </div>
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="mail@website.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-full border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Min. 6 characters"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-full border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  <i className={`fas fa-${showPassword ? "eye-slash" : "eye"}`}></i>
                </button>
              </div>
              <div className="flex justify-between items-center text-sm">
                <label className="flex items-center">
                </label>
                <Link to="/forgetPassword" className="text-orange-500">
                  Forgot password?
                </Link>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#021f54] text-white py-3 rounded-full font-semibold hover:opacity-90 disabled:opacity-60"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
            <p className="text-sm text-center mt-6">
              Not registered yet?{" "}
              <Link to="/register" className="text-orange-500">
                Create an Account
              </Link>
            </p>
          </div>
          <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-[#021f54] to-[#043a8f] text-white relative">
            <div className="text-center px-8">
              <h2 className="text-3xl font-bold mb-4">
                Turn your ideas <br />{" "}
                <span className="text-orange-500"> into reality</span>
              </h2>
              <p className="text-blue-200 text-sm">
                Consistent quality and experience across{" "}
                <span className="text-orange-500"> all platforms.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}