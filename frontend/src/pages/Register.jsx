import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

export default function Register() {
  const [loading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-5xl h-[600px] bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
       
        <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-[#021f54] to-[#043a8f] text-white">
          <div className="text-center px-8">
            <h2 className="text-3xl font-bold mb-4">
              Start your journey <br />
              <span className="text-orange-500"> with us</span>
            </h2>
            <p className="text-blue-200 text-sm">
              Build skills, track growth and
              <span className="text-orange-500"> achieve more.</span>
            </p>
          </div>
        </div>

      
        <div className="p-10 flex flex-col justify-center relative group">

         
          <div className="absolute top-[140px] left-0 w-full h-[330px] bg-white/70 backdrop-blur-[2px] hidden group-hover:flex items-center justify-center rounded-lg z-10">
            <p className="bg-[#021f54] text-white px-6 py-3 rounded-lg shadow-lg text-sm">
              Request access from your admin.
            </p>
          </div>

          <h1 className="text-3xl font-bold mb-2">Create Account</h1>
          <p className="text-gray-500 text-sm mb-6">
            Welcome to the Employee Management System
          </p>

          <form className="space-y-4">

            <input
              type="text"
              placeholder="Full Name"
              disabled
              className="w-full px-4 py-3 rounded-full border border-gray-300 bg-gray-100 cursor-not-allowed"
            />

            <input
              type="email"
              placeholder="mail@website.com"
              disabled
              className="w-full px-4 py-3 rounded-full border border-gray-300 bg-gray-100 cursor-not-allowed"
            />

            <input
              type="password"
              placeholder="Min. 6 characters"
              disabled
              className="w-full px-4 py-3 rounded-full border border-gray-300 bg-gray-100 cursor-not-allowed"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              disabled
              className="w-full px-4 py-3 rounded-full border border-gray-300 bg-gray-100 cursor-not-allowed"
            />

            <button
              type="button"
              disabled
              className="w-full bg-gray-400 text-white py-3 rounded-full font-semibold cursor-not-allowed"
            >
              Create Account
            </button>
          </form>

          
          <p className="text-sm text-center mt-6 relative z-20">
            Already have an account?{" "}
            <Link to="/login" className="text-orange-500 hover:underline">
              Login here
            </Link>
          </p>

          
          <p className="text-xs text-gray-400 text-center mt-2">
            Redirecting to login in 3 seconds...
          </p>

        </div>
      </div>
    </div>
  );
}
