import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import jwtDecode from 'jwt-decode';

import axios from 'axios';

const HomePage = () => {
  const { token } = useAuth();

  const { currentUser } = useAuth(); // Auth context for current user
  const [exercises, setExercises] = useState([]); // State to hold exercise data
  const [loading, setLoading] = useState(true);   
  const [error, setError] = useState("");        
  const [userId, setUserId] = useState("");        

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        
        
        console.log(currentUser.email);
        console.log(currentUser.reloadUserInfo.localId);
        console.log(currentUser.reloadUserInfo.passwordHash);
        
         //how to add user
        axios.post('http://localhost:5002/api/users/signup', {
          user_id: currentUser.reloadUserInfo.localId,
          email: currentUser.email,
          password: currentUser.reloadUserInfo.passwordHash,
        })
        .then(response => {
          console.log('User created:', response.data);
        })
        .catch(error => {
          console.error('Error creating user:', error);
        });
        console.log("Starting fetch...");
        
        
        console.log("Starting fetch...");


        const response = await fetch("http://localhost:5002/api/exercises"); //hardcoded the server port, need to figure out how to pull it automatically
        console.log("Response received:", response);

        if (!response.ok) {
          throw new Error(`Failed to fetch exercises: ${response.status}`);
        }
        

        const decodeJWT = (token: string) => {
          const base64Url = token.split('.')[1]; 
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); 
          const decoded = JSON.parse(atob(base64));
        
          return decoded;  // Return the decoded object, which contains your user data
        };
        
        const decodedToken = decodeJWT(token);
        // Extract the user_id from the decoded payload
        console.log(decodedToken.user_id); 

        setUserId(decodedToken.user_id);

        const data = await response.json();
        console.log("Parsed data:", data);

        const filtered = data.exercises.filter((exercise: any) => exercise.user_id === decodedToken.user_id);

        //how to add exercise
        axios.post('http://localhost:5002/api/exercises/add_exercise', { 
          name: 'Insert Exercise Name',
          type: 'Insert Exercise Type',
          duration: 10,
          user_id: decodedToken.user_id, 
        })
        .then(response => {
          console.log('User created:', response.data);
        })
        .catch(error => {
          console.error('Error creating user:', error);
        });

        setExercises(filtered);
      } catch (err) {
        console.error("Error during fetch:", err);
        setError("Error fetching stuff!");
      } finally {
        setLoading(false);
        console.log("Fetch complete");
      }
    };
    

    fetchExercises();
  }, []);

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
