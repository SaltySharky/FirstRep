import React, { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { auth } from "../firebase/firebase";
import Navbar from "./navbar";

const HomePage = () => {
    const { currentUser } = useAuth();

    return (
      <>
        <Navbar />
        <div>Hello {/*currentUser.displayName ? currentUser.displayName : */currentUser.email}, you are now logged in.</div>
      </>
        
    )
}

export default HomePage