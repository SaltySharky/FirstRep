import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "./Navbar";
import CustomCalendar from "./Calendar";
import { calculateStreak } from "./calStreaksUtils";

const ProfilePage = () => {
  const { currentUser } = useAuth();
  const { workouts, setWorkouts, streak, setStreak } = useAuth();
  const [profilePic, setProfilePic] = useState<string | null>(null);

  useEffect(() => {
    const storedWorkouts = localStorage.getItem("workouts");
    if (storedWorkouts) {
      const parsedWorkouts = JSON.parse(storedWorkouts);
      setWorkouts(parsedWorkouts);
      const newStreak = calculateStreak(parsedWorkouts);
      setStreak(newStreak);
    }

    const storedProfilePic = localStorage.getItem("profilePic");
    if (storedProfilePic) {
      setProfilePic(storedProfilePic);
    }
  }, [setWorkouts, setStreak]);

  const handleProfilePicUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result as string;
        setProfilePic(base64Image);
        localStorage.setItem("profilePic", base64Image);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Navbar />
      <div className="pt-20 container mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-6 relative overflow-hidden top-[-75px]">
          {/* Profile Image */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <label htmlFor="profile-pic-upload" className="cursor-pointer">
                <img
                  src={profilePic || "../assets/Unknown.png"}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-gray-300"
                />
                {!profilePic && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-8 h-8 text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-7V6a1 1 0 1 1 2 0v5h5a1 1 0 1 1 0 2H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </label>
            </div>
            <input
              id="profile-pic-upload"
              type="file"
              accept="image/*"
              onChange={handleProfilePicUpload}
              className="hidden"
            />
          </div>

          {/* Email */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2">{currentUser.email}</h1>
          </div>

          {/* Total Workouts and Current Streak */}
          <div className="flex justify-center space-x-6">
            <div className="flex items-center justify-center px-6 py-2 bg-[#EB853D] rounded-full w-50 h-10">
              <span className="text-white text-sm">
                Total Workouts: {workouts.length}
              </span>
            </div>
            <div className="flex items-center justify-center px-6 py-2 bg-[#EB853D] rounded-full w-50 h-10">
              <span className="text-white text-sm">
                Current Streak: {streak} days
              </span>
            </div>
          </div>
        </div>
        {/* Calendar */}
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-lg p-4">
          <div className="w-full h-full max-w-full">
            <CustomCalendar
              workoutDates={workouts.map((workout) => workout.date)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
