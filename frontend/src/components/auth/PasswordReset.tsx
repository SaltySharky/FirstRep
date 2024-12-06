// src/components/PasswordReset.js
import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { Navigate, Link, useNavigate } from 'react-router-dom';

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Check your inbox.");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
        {/* Back Arrow */}
        <button onClick={() => navigate('/login')} className="absolute top-4 left-4 text-xl">
            ←
        </button>
        <main className="w-full max-w-xs px-6">
            <div className="text-center mb-8">
                <h3 className="text-lg font-semibold text-gray-800">Reset Password</h3>
            </div>
            <form onSubmit={handleReset} className="space-y-4">
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                    />
                </div>
                <button 
                    type="submit"
                    className="w-full py-3 rounded-lg text-sm font-medium bg-[#EB853D] text-white rounded-md hover:bg-[#d67432] transition-all"
                >
                    Reset Password
                </button>
            </form>
            {message && <p style={{ textAlign: "center", marginTop: "20px", color: "black", }}>{message}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </main>
      
    </div>
  );
};

export default PasswordReset;