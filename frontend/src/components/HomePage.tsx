import React, { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { auth } from "../firebase/firebase";

const HomePage = () => {
    const { currentUser } = useAuth();

    return (
        <div>Hello {/*currentUser.displayName ? currentUser.displayName : */currentUser.email}, you are now logged in.</div>
    )
}

export default HomePage