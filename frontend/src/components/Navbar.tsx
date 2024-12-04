import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { doSignOut } from "../firebase/auth";

const Navbar = () => {
    const navigate = useNavigate();
    const { userLoggedIn } = useAuth();

    return (
        <nav className="flex space-x-4">
                <>
                    <Link
                        to="/home"
                        className="px-4 py-2 bg-[#EB853D] text-white rounded-md hover:bg-[#d67432] transition-all"
                    >
                        Home
                    </Link>
                    <Link
                        to="/log"
                        className="px-4 py-2 bg-[#EB853D] text-white rounded-md hover:bg-[#d67432] transition-all"
                    >
                        Log Workout
                    </Link>
                    <Link
                        to="/profile"
                        className="px-4 py-2 bg-[#EB853D] text-white rounded-md hover:bg-[#d67432] transition-all"
                    >
                        Profile
                    </Link>
                </>
        </nav>
    );
};

export default Navbar;