import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { doSignOut } from "../firebase/auth";

const Menu = () => {
    const navigate = useNavigate();
    const { userLoggedIn } = useAuth();

    return (
        <nav className="flex space-x-4">
            {userLoggedIn ? (
                <button
                    onClick={() => {
                        doSignOut().then(() => {
                            navigate("/login");
                        });
                    }}
                    className="px-4 py-2 bg-[#EB853D] text-white rounded-md hover:bg-[#d67432] transition-all"
                >
                    Logout
                </button>
            ) : (
                <>
                    <Link
                        to="/login"
                        className="px-4 py-2 bg-[#EB853D] text-white rounded-md hover:bg-[#d67432] transition-all"
                    >
                        Login
                    </Link>
                    <Link
                        to="/signup"
                        className="px-4 py-2 bg-[#EB853D] text-white rounded-md hover:bg-[#d67432] transition-all"
                    >
                        Register New Account
                    </Link>
                </>
            )}
        </nav>
    );
};

export default Menu;