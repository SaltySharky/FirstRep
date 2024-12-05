import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
//import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Navbar from "./Navbar";
import CustomCalendar from "./Calendar";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const ProfilePage = () => {
    const { currentUser } = useAuth();
    const { workoutDates } = useAuth();
    //const [value, onChange] = useState<Value>(new Date());

    /*
    const workoutDates = [
        "2024-12-10",
        "2024-12-15",
        "2024-12-25"
      ];
    */

    return (
        <>
            <Navbar />
            <div className="pt-16 container mx-auto px-4">
                <h1 className="text-2xl font-bold">{currentUser.email}</h1>
                <p>Workouts: {workoutDates.length}</p>
                <p>Streak: {workoutDates.length}</p>
                {/*<Calendar onChange={onChange} value={value} />*/}
                <CustomCalendar workoutDates={workoutDates} />
            </div>
        </>
    );
};

export default ProfilePage;
