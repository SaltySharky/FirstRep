import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

const HomePage = () => {
  const { token } = useAuth();

  const { currentUser } = useAuth(); // Auth context for current user
  const [exercises, setExercises] = useState([]); // State to hold exercise data
  const [loading, setLoading] = useState(true);   
  const [error, setError] = useState("");        
  const [userId, setUserId] = useState("");        

  return (
    <div>
      <h1>Welcome, {currentUser.email}!</h1>
      <h1>Token:{token}</h1>

      <h1>userID:{userId}</h1>

      <h2>Your Exercises</h2>

      {/* Loading State */}
      {loading && <p>Loading exercises...</p>}

      {/* Error State */}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {/* Exercise Data */}
      {!loading && !error && exercises.length > 0 ? (
        <ul>
          {exercises.map((exercise) => (
            <li key={exercise._id}>
              <strong>{exercise.name}</strong> {exercise.type} {exercise.user_id} ({exercise.duration} mins)
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p>No exercises found.</p>
      )}
    </div>
  );
};

export default HomePage;
