import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Notification from "./Notification";
import { useAuth } from "../contexts/AuthContext";
import { calculateStreak } from "./calStreaksUtils";

const HomePage: React.FC = () => {
  const [showExercisePopup, setShowExercisePopup] = useState(false);
  const navigate = useNavigate();
  const [exercises, setExercises] = useState([]); // State to hold exercise data
  const [scrapes, setScrapes] = useState([]); // State to hold scrape data
  const [selectedScrape, setSelectedScrape] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0); // State to manage carousel index
  const { currentUser, streak, setStreak, workouts, setWorkouts } = useAuth();

  // Pull user's workouts from local storage
  useEffect(() => {
    const storedWorkouts = localStorage.getItem("workouts");
    if (storedWorkouts) {
      setWorkouts(JSON.parse(storedWorkouts));
    }
  }, []);
  // Calculate user's workout streak
  setStreak(calculateStreak(workouts));

  // Function to handle clicking "Learn More"
  const handleClick = (scrape: any) => {
    setSelectedScrape(scrape); // Set the selected scrape data
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

  // Handle carousel navigation
  const goToNextWorkout = () => {
    setCarouselIndex((prevIndex) => (prevIndex + 1) % scrapes.length);
  };

  const goToPrevWorkout = () => {
    setCarouselIndex(
      (prevIndex) => (prevIndex - 1 + scrapes.length) % scrapes.length
    );
  };

  return (
    <>
      <Navbar />
      <Notification />
      <div className="min-h-screen bg-gray-100 p-6 flex gap-6">
        {/* Left Section: Today's Exercises */}
        <div className="w-1/2">
          <h1 className="text-2xl font-bold text-orange-600 mb-4">
            Exercise plans for today
          </h1>
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <h2 className="text-lg font-semibold">
              {currentUser.email}'s Progress
            </h2>
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
                  <p className="text-sm text-orange-600">
                    Duration: {exercise.duration} mins
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No exercises available for today.</p>
            )}
          </div>
        </div>

        {/* Right Section: Workouts Carousel */}
        <div className="w-1/2 flex flex-col items-center justify-center">
          {/* Carousel Container */}
          <div className="relative w-full max-w-md bottom-1/4">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Exercise Lookup
            </h2>
            {/* Carousel Content */}
            {scrapes.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-4 relative z-10">
                <div className="cursor-pointer">
                  <img
                    src={scrapes[carouselIndex].image_url}
                    alt={scrapes[carouselIndex].exercise_name}
                    className="rounded-lg mb-4 w-full h-40 object-cover"
                  />
                  <h3 className="font-semibold text-lg truncate">
                    {scrapes[carouselIndex].exercise_name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                    {scrapes[carouselIndex].description}
                  </p>
                </div>
              </div>
            )}

            {/* Carousel Navigation */}
            <div className="absolute inset-0 flex justify-between items-center px-4 z-30">
              <button
                onClick={goToPrevWorkout}
                className="bg-black bg-opacity-50 text-white rounded-full p-2"
              >
                &#8592;
              </button>
              <button
                onClick={goToNextWorkout}
                className="bg-black bg-opacity-50 text-white rounded-full p-2"
              >
                &#8594;
              </button>
            </div>
          </div>

          {/* Learn More Button */}
          {scrapes.length > 0 && (
            <button
              onClick={() => handleClick(scrapes[carouselIndex])}
              style={{ position: "relative", top: "-150px" }}
              className=" bg-orange-500 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-orange-600"
            >
              Learn More
            </button>
          )}
        </div>
      </div>

      {/* Popup */}
      {/* Popup */}
      {showExercisePopup && selectedScrape && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-5 rounded-sm">
          <div className="bg-white rounded-lg p-10 w-80 md:w-96">
            <h2 className="text-xl font-bold mb-4">
              {selectedScrape.exercise_name}
            </h2>

            {/* Full workout images */}
            <div className="flex flex-col gap-4">
              <img
                src={selectedScrape.image_url}
                alt={selectedScrape.exercise_name}
                className="rounded-lg mb-4 w-full object-cover"
              />
              {selectedScrape.image_url_2 && (
                <img
                  src={selectedScrape.image_url_2}
                  alt={`${selectedScrape.exercise_name} alternate view`}
                  className="rounded-lg mb-4 w-full object-cover"
                />
              )}
              {selectedScrape.image_url_3 && (
                <img
                  src={selectedScrape.image_url_3}
                  alt={`${selectedScrape.exercise_name} alternate view`}
                  className="rounded-lg mb-4 w-full object-cover"
                />
              )}
            </div>

            {/* Full description */}
            <p className="text-gray-600 mb-4 text-sm">
              {selectedScrape.description}
            </p>

            {/* Close button */}
            <button
              onClick={() => setShowExercisePopup(false)}
              className="bg-orange-500 text-white rounded-lg px-4 py-2 w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
