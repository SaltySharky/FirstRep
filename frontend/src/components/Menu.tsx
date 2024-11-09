import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { doSignOut } from "../firebase/auth";

const Menu = () => {
    const navigate = useNavigate()
    const { userLoggedIn } = useAuth()
    return (
        <nav>
            {
                userLoggedIn
                    ?
                    <>
                        <button onClick={() => { doSignOut().then(() => { navigate('/login') }) }}>Logout</button>
                    </>
                    :
                    <>
                        <Link to={'/login'}>Login</Link>
                        <Link to={'/signup'}>Register New Account</Link>
                    </>
            }

        </nav>
    )
}

export default Menu