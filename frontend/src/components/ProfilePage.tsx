import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
//import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Navbar from "./Navbar";
import CustomCalendar from "./Calendar";

/*
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
*/

interface Workout {
    id: string; // Unique identifier for each workout
    name: string;
    type: string;
    duration: string;
    date: string;
  }

export function calculateStreak(workouts: Workout[]): number {
    if (!Array.isArray(workouts)) {
      console.error("Invalid input: workouts must be an array");
      return 0;
    }
  
    const sortedDates = [...new Set(workouts.map(w => w.date))].sort();
    console.log(sortedDates);
    let streak = 0;
    const today = new Date();
    today.setTime(today.getTime() - 24*60*60*1000);
    const yesterday = new Date(today.getTime() - 480*60*1000);

    const today_string = today.toISOString().substring(0,10);
    const yesterday_string = yesterday.toISOString().substring(0,10);

    if (!sortedDates.includes(yesterday_string) && !sortedDates.includes(today_string)) {
        return 0;
    }
    else {
        streak = 1;
        for (let i = sortedDates.indexOf(yesterday_string); i>0; i--) {
            if (parseInt(sortedDates[i-1].split("-")[2]) === parseInt(sortedDates[i].split("-")[2]) - 1) {
                streak ++;
            }
            else {
                break;
            }
        }
    }

    if (sortedDates.includes(today_string)) {
        streak++;
    }
    return streak;
}

const ProfilePage = () => {
    const { currentUser } = useAuth();
    const { workoutDates, workouts, setWorkouts, streak, setStreak } = useAuth();
    //const [value, onChange] = useState<Value>(new Date());

    /*
    const workoutDates = [
        "2024-12-10",
        "2024-12-15",
        "2024-12-25"
      ];
    */
    useEffect(() => {
        const storedWorkouts = localStorage.getItem("workouts");
        if (storedWorkouts) {
            setWorkouts(JSON.parse(storedWorkouts));
        }
    }, []);

    setStreak(calculateStreak(workouts));

    return (
        <>
            <Navbar />
            <div className="pt-16 container mx-auto px-4">
                <h1 className="text-2xl font-bold">{currentUser.email}</h1>
                <p>Workouts: {workouts.map(Workout => Workout.date).length}</p>
                <p>Streak: {streak}</p>
                {/*<Calendar onChange={onChange} value={value} />*/}
                <CustomCalendar workoutDates={workouts.map(Workout => Workout.date)} />
            </div>
        </>
    );
};

export default ProfilePage;
