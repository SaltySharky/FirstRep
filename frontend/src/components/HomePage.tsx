import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Notification from "./Notification";
import { useAuth } from "../contexts/AuthContext";
import { calculateStreak } from "./ProfilePage";
const HomePage: React.FC = () => {
  const [showProgressPopup, setShowProgressPopup] = useState(false);
  const [showExercisePopup, setShowExercisePopup] = useState(false);
  const [progressInput, setProgressInput] = useState("");
  const [currentStreak, setCurrentStreak] = useState(10); // Example value
  const navigate = useNavigate();
  const [exercises, setExercises] = useState([]); // State to hold exercise data
  const [scrapes, setScrapes] = useState([]); // State to hold scrape data
  const [selectedScrape, setSelectedScrape] = useState(null);
  const { currentUser, streak, setStreak, workouts, setWorkouts } = useAuth();

  //pull user's workouts from local storage
  useEffect(() => {
    const storedWorkouts = localStorage.getItem("workouts");
    if (storedWorkouts) {
      setWorkouts(JSON.parse(storedWorkouts));
    }
  }, []);
  //calculate user's workout streak
  setStreak(calculateStreak(workouts));

  // Handle progress submission
  const handleProgressSubmit = () => {
    if (progressInput) {
      setCurrentStreak(currentStreak + parseInt(progressInput));
      setShowProgressPopup(false);
      setProgressInput(""); // Reset input field
    }
  };
  
  const handleClick = (scrape) => {
    setSelectedScrape(scrape); // Set the selected scrape
    setShowExercisePopup(true); // Show the popup
  };

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch("http://localhost:5002/api/exercises");

        if (!response.ok) {
          throw new Error(`Failed to fetch exercises: ${response.status}`);
        }
        const response_scrape = await fetch("http://localhost:5002/api/scrape");

        if (!response_scrape.ok) {
          throw new Error(`Failed to fetch scrape: ${response_scrape.status}`);
        }

        const data = await response.json();
        setExercises(data.exercises);
        const scrape_data = await response_scrape.json();
        setScrapes(scrape_data.scrapes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchExercises();
  }, []); 
  console.log(exercises); 
  console.log(scrapes);
  return (
    <>
    <Navbar />
    <Notification />
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-orange-600 mb-4">Exercise plans for today</h1>

      {/* User Progress Section */}
      <div
        className="bg-white rounded-lg shadow-md p-4 mb-6 cursor-pointer"
        //onClick={() => setShowProgressPopup(true)}
      >
        <h2 className="text-lg font-semibold"> {currentUser.email}'s Progress</h2>
        <p className="text-gray-600">{streak} day workout streak!</p>
      </div>

       {/* Display Exercise List */}
       <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <h2 className="text-lg font-semibold mb-4">Today's Exercises</h2>
          {exercises.length > 0 ? (
            exercises.map((exercise, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-bold">{exercise.name}</h3>
                <p className="text-gray-600">{exercise.description}</p>
                <p className="text-sm text-orange-600">Duration: {exercise.duration} mins</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No exercises available for today.</p>
          )}
        </div>
        {/* Scrape  Section */}
        <div className="flex items-center min-h-screen p-4">
        {scrapes.map((scrape) => (
          <div
            key={scrape._id}
            className="bg-white rounded-lg shadow-md p-4 mb-4 cursor-pointer max-w-md w-full"
            onClick={() => handleClick(scrape)} // Pass scrape data on click
          >
            <img
              src={scrape.image_url}
              alt={scrape.exercise_name}
              className="rounded-lg mt-2 w-72 h-36 object-cover"
            />
            {scrape.image_url_2 && (
              <img
                src={scrape.image_url_2}
                alt={`${scrape.exercise_name} alternate view`}
                className="rounded-lg mt-2 w-72 h-36 object-cover"
              />
            )}
            <h3 className="font-semibold mt-2 text-lg truncate">{scrape.exercise_name}</h3>
            <p className="text-sm text-gray-600 mt-2 line-clamp-3">{scrape.description}</p>
          </div>
        ))}
      </div>
        
 

      {/* Progress Popup */}
      {showProgressPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80">
            <h2 className="text-xl font-bold mb-4">Update Your Progress</h2>
            <input
              type="number"
              value={progressInput}
              onChange={(e) => setProgressInput(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full mb-4"
              placeholder="Enter weeks to add to streak"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setShowProgressPopup(false)}
                className="text-gray-600 mr-4"
              >
                Cancel
              </button>
              <button
                onClick={handleProgressSubmit}
                className="bg-orange-500 text-white rounded-lg px-4 py-2"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup for selected scrape */}
      {showExercisePopup && selectedScrape && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">{selectedScrape.exercise_name}</h2>
            <img
              src={selectedScrape.image_url}
              alt={selectedScrape.exercise_name}
              className="rounded-lg mb-4"
            />
            <p className="text-gray-600 mb-4">
              {selectedScrape.description}
            </p>
            <button
              onClick={() => setShowExercisePopup(false)}
              className="bg-orange-500 text-white rounded-lg px-4 py-2 w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
    </>
  );
};

export default HomePage;
