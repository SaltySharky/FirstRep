import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { differenceInDays } from "date-fns";

const AuthContext = React.createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

interface Workout {
  id: string; // Unique identifier for each workout
  name: string;
  type: string;
  duration: string;
  date: string;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");
  const [workoutDates, setWorkoutDates] = useState<string[]>([]);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [streak, setStreak] = useState(0);

  // Function to log out the user
  const logout = async () => {
    try {
      await auth.signOut(); // Sign out using Firebase
      setCurrentUser(null); // Reset the current user
    } catch (error) {
      console.error("Error during logout:", error);
      throw error;
    }
  };

  // Function to calculate the workout streak
  const updateStreak = (workoutDates: string[]) => {
    const today = new Date();
    const sortedDates = workoutDates
      .map((date) => new Date(date))
      .sort((a, b) => b.getTime() - a.getTime()); // Sort dates in descending order

    let streakCount = 0;
    for (let i = 0; i < sortedDates.length; i++) {
      const dayDifference = differenceInDays(today, sortedDates[i]);
      if (dayDifference === streakCount) {
        streakCount++;
      } else if (dayDifference > streakCount) {
        break;
      }
    }
    return streakCount;
  };

  // Effect to calculate and update the streak when workoutDates changes
  useEffect(() => {
    if (workoutDates.length > 0) {
      const newStreak = updateStreak(workoutDates);
      setStreak(newStreak);
    } else {
      setStreak(0); // Reset streak if no workout dates are available
    }
  }, [workoutDates]);

  // Initialize user on authentication state change
  const initializeUser = async (user) => {
    if (user) {
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
      setCurrentUser(null);
      setUserLoggedIn(false);
      setToken(null); // Clear token when user logs out
    }
    setLoading(false);
  };

  // Listener for Firebase authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    userLoggedIn,
    token,
    loading,
    workoutDates,
    setWorkoutDates,
    workouts,
    setWorkouts,
    streak,
    setStreak,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
