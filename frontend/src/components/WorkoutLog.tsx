import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useAuth } from "../contexts/AuthContext";
import { getWorkouts, logWorkout } from "../services/workoutServices";

interface Workout {
  _id: string;
  name: string;
  type: string;
  duration: string;
  date: string;
}

const WorkoutLog = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]); // Store workouts
  const [showPopup, setShowPopup] = useState(false); // Popup visibility
  const [currentWorkoutId, setCurrentWorkoutId] = useState<string | null>(null); // Track ID of editing workout
  const [formData, setFormData] = useState<Workout>({
    _id: "",
    name: "",
    type: "",
    duration: "",
    date: "",
  });
  const { workoutDates, addWorkoutDate, removeWorkoutDate } = useAuth();

  // Load workouts for the user on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getWorkouts(); // calls the API
        setWorkouts(data); // Update state with the fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Open popup for adding or editing a workout
  const openPopup = (workout: Workout | null = null) => {
    if (workout) {
      setFormData(workout); // Populate form with existing workout data
    } else {
      setFormData({
        _id: "",
        name: "",
        type: "",
        duration: "",
        date: "",
      });
    }
    setShowPopup(true);
  };

  // Close popup
  const closePopup = () => {
    setShowPopup(false);
    setFormData({
      _id: "",
      name: "",
      type: "",
      duration: "",
      date: "",
    });
  };

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save workout (add new or update existing)
  const saveWorkout = async () => {
    if (formData) {
      const data = await logWorkout(formData);
    } else {
      console.log("Form data is null.");
    }
    closePopup();
  };

  // Delete a workout
  const deleteWorkout = (id: string) => {
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold text-center mb-6">Workout Log</h1>

        {/* Add Exercise Button */}
        <button
          className="bg-orange-500 text-white px-4 py-2 rounded shadow hover:bg-orange-600"
          onClick={() => openPopup()}
        >
          Add Exercise
        </button>

        {/* Workout List */}
        <div className="mt-6">
          {workouts.length === 0 ? (
            <p className="text-center text-gray-500">No workouts logged yet.</p>
          ) : (
            <ul className="space-y-4">
              {workouts.map((workout) => (
                <li
                  key={workout._id}
                  className="bg-gray-100 p-4 rounded shadow flex justify-between items-center"
                >
                  <div>
                    <p className="font-bold">{workout.name}</p>
                    <p className="text-gray-600">
                      {workout.type} - {workout.duration} min
                    </p>
                    <p className="text-sm text-gray-500">
                      Date: {workout.date}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => openPopup(workout)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 hover:underline"
                      // onClick={() => deleteWorkout(workout.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">
              {currentWorkoutId ? "Edit Workout" : "Add Workout"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveWorkout();
              }}
              className="space-y-4"
            >
              {/* Exercise Name */}
              <div>
                <label className="block font-bold mb-1">Exercise Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>

              {/* Exercise Type */}
              <div>
                <label className="block font-bold mb-1">Exercise Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                >
                  <option value="" disabled>
                    Select Type
                  </option>
                  <option value="Cardio">Cardio</option>
                  <option value="Strength">Strength</option>
                  <option value="Flexibility">Flexibility</option>
                  <option value="Balance">Balance</option>
                </select>
              </div>

              {/* Duration */}
              <div>
                <label className="block font-bold mb-1">Duration (min)</label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>

              {/* Date */}
              <div>
                <label className="block font-bold mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-between items-center mt-4">
                <button
                  type="button"
                  onClick={closePopup}
                  className="text-gray-500 hover:underline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-orange-500 text-white px-4 py-2 rounded shadow hover:bg-orange-600"
                >
                  Save Workout
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default WorkoutLog;
