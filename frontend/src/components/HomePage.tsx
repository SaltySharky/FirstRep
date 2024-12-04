import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const HomePage: React.FC = () => {
  const [showProgressPopup, setShowProgressPopup] = useState(false);
  const [showExercisePopup, setShowExercisePopup] = useState(false);
  const [progressInput, setProgressInput] = useState("");
  const [currentStreak, setCurrentStreak] = useState(10); // Example value
  const navigate = useNavigate();

  // Handle progress submission
  const handleProgressSubmit = () => {
    if (progressInput) {
      setCurrentStreak(currentStreak + parseInt(progressInput));
      setShowProgressPopup(false);
      setProgressInput(""); // Reset input field
    }
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-orange-600 mb-4">Exercise plans for today</h1>

      {/* User Progress Section */}
      <div
        className="bg-white rounded-lg shadow-md p-4 mb-6 cursor-pointer"
        onClick={() => setShowProgressPopup(true)}
      >
        <h2 className="text-lg font-semibold">John’s Progress</h2>
        <p className="text-gray-600">New {currentStreak} day streak!</p>
      </div>

      {/* Exercise Suggestions Section */}
      <div
        className="bg-white rounded-lg shadow-md p-4 cursor-pointer"
        onClick={() => setShowExercisePopup(true)}
      >
        <h2 className="text-lg font-semibold">Exercises for You</h2>
        <p className="text-gray-600">Helpful Tips</p>
        <img
          src="https://via.placeholder.com/300x150" // Replace with an actual image URL
          alt="Exercise suggestion"
          className="rounded-lg mt-2"
        />
        <h3 className="font-semibold mt-2">Beginning Stretching Exercises</h3>
        <p className="text-sm text-gray-600">
          Learn how to engage your core muscles.
        </p>
        <button className="mt-2 text-orange-500 font-medium">Learn More</button>
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

      {/* Exercise Popup */}
      {showExercisePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Exercise Details</h2>
            <img
              src="https://via.placeholder.com/300x150" // Replace with an actual image URL
              alt="Exercise detail"
              className="rounded-lg mb-4"
            />
            <p className="text-gray-600 mb-4">
              Your core is one of the most important areas of your body. Learn
              how to engage your core muscles effectively with this stretching
              routine designed to improve flexibility and strength.
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
