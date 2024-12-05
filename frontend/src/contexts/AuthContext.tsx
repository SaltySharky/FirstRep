import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { dummyAuth } from "../constants";

const AuthContext = React.createContext(dummyAuth);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');
  const [workoutDates, setWorkoutDates] = useState([]);


  const logout = async () => {
    try {
      await auth.signOut(); // Sign out using Firebase
      setCurrentUser(null); // Reset the current user
    } catch (error) {
      console.error("Error during logout:", error);
      throw error;
    }
  };

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
    // Setup onAuthStateChanged listener to handle login/logout
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(user);
        // User is logged in
        setCurrentUser({ ...user });
        setUserLoggedIn(true);

        // Fetch the user's ID token
        try {
          const fetchedToken = await user.getIdToken();
          setToken(fetchedToken);
        } catch (error) {
          console.error("Error fetching token", error);
          setToken(null); // In case token fetch fails
        }
      } else {
        // User is logged out
        setCurrentUser(null);
        setUserLoggedIn(false);
        setToken(null); // Clear token when user logs out
      }
      setLoading(false); // Once we know the user's state, set loading to false
    });

    return () => unsubscribe();
  }, [token]);

  const addWorkoutDate = (date) => {
    if (!workoutDates.includes(date)) {
      setWorkoutDates([...workoutDates, date]);
    }
  };

  // Remove a date from the list
  const removeWorkoutDate = (date) => {
    setWorkoutDates(workoutDates.filter((d) => d !== date));
  };

  // Clear all dates
  const clearWorkoutDates = () => {
    setWorkoutDates([]);
  };

  const value = {
    currentUser,
    userLoggedIn,
    token,
    loading,
    workoutDates,
    addWorkoutDate,
    removeWorkoutDate,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
