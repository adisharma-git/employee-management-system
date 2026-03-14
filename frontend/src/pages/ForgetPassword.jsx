import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const[mail,setMail]=useState(false);
    const handleForgetPassword=()=>{
        alert("Only Admins Can Resest Your Password")
    } 

    const handleChange = (e) => {
        setEmail(e.target.value);
        if (error) setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email) {
            setError("Email is required");
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Please enter a valid email");
            return;
        }

        alert("Password reset link sent to your email!");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">


                <div className="flex justify-center mb-6">
                    <div className="bg-[#021f54] p-3 rounded-full">
                        <i className="fas fa-lock text-white text-xl"></i>
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-center mb-2">
                    Forgot Password?
                </h1>
                <p className="text-center text-gray-500 text-sm mb-6">
                    Enter your email and we’ll send you a reset link.
                </p>

                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    <div>
                        <input
                            type="email"
                            placeholder="mail@website.com"
                            value={email}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-full border ${error ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {error && (
                            <p className="text-red-500 text-xs mt-1">{error}</p>
                        )}
                    </div>


                    <button
                        type="submit"
                        className="w-full bg-[#021f54] text-white py-3 rounded-full font-semibold hover:opacity-90"
                        // disabled={!mail}
                        onClick={handleForgetPassword}
                    >
                        Send Reset Link
                    </button>
                </form>


                <p className="text-center text-sm mt-6">
                    Remember your password?{" "}
                    <Link to="/login" className="text-[#021f54] font-semibold">
                        Back to Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ForgetPassword;
