import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <nav className="bg-[#EB853D] p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/" className="hover:text-white">
            FirstRep
          </Link>
        </div>

        {/* Links */}
        <div className="space-x-4">
          {currentUser && (
            <>
              <Link
                to="/home"
                className="px-4 py-2 bg-white text-[#EB853D] rounded-md hover:bg-[#d67432] hover:text-white transition-all"
              >
                Home
              </Link>
              <Link
                to="/log"
                className="px-4 py-2 bg-white text-[#EB853D] rounded-md hover:bg-[#d67432] hover:text-white transition-all"
              >
                Workout Log
              </Link>
              <Link
                to="/profile"
                className="px-4 py-2 bg-white text-[#EB853D] rounded-md hover:bg-[#d67432] hover:text-white transition-all"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 rounded-md hover:bg-red-600 transition-all"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
