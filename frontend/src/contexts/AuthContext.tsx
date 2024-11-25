import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { dummyAuth } from "../constants";
//import API from './api';
const AuthContext = React.createContext(dummyAuth);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');

  useEffect(()=>{
    return onAuthStateChanged(auth, initializeUser);
  }, [])

  async function initializeUser(user) {
    if(user) {
      setCurrentUser({ ...user });
      setUserLoggedIn(true);
    }
    else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }
    setLoading(false);
  }

  useEffect(() => {
    const fetchIdToken = async () => {
      try {
        const token = await auth.currentUser.getIdToken();
        setToken(token);
      } catch {
        setToken(null);
      }
    };

    fetchIdToken();

  }, []);
  
  const value = {
    currentUser,
    userLoggedIn,
    token,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

