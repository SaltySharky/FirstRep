import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'
import Navbar from "./navbar";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const ProfilePage = () => {
    const { currentUser } = useAuth();
    const [value, onChange] = useState<Value>(new Date());
    return (
        <>
            <Navbar />
            <text>John Doe</text>
            <text>Workouts: 26</text>
            <text>Streak: 5</text>
            <Calendar onChange={onChange} value={value} />
        </>
    );
};

export default ProfilePage;