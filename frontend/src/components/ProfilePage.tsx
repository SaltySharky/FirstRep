import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Navbar from "./Navbar";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const ProfilePage = () => {
    const { currentUser } = useAuth();
    const [value, onChange] = useState<Value>(new Date());

    return (
        <>
            <Navbar />
            <div className="pt-16 container mx-auto px-4">
                <h1 className="text-2xl font-bold">{currentUser.email}</h1>
                <p>Workouts: 26</p>
                <p>Streak: 5</p>
                <Calendar onChange={onChange} value={value} />
            </div>
        </>
    );
};

export default ProfilePage;
