import Navbar from "./navbar";
import React, {useState} from "react";


const WorkoutLog = () => {
    const [workoutName, setWorkoutName] = useState('');
    const [workoutType, setWorkoutType] = useState('');
    const [workoutHours, setWorkoutHours] = useState('');
    const [workoutMinutes, setWorkoutMinutes] = useState('');
    const [month, setMonth] = useState('');
    const [date, setDate] = useState('');
    const [year, setYear] = useState('');
    
    return (
        <>
            <Navbar />
            <form>
                <div>
                    <label>Workout Name</label>
                    <input 
                        placeholder="Workout Name"
                        value={workoutName}
                        onChange={(e) => setWorkoutName(e.target.value)}
                        className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <label>Workout Type</label>
                    <input 
                        placeholder="Workout Type"
                        value={workoutType}
                        onChange={(e) => setWorkoutType(e.target.value)}
                        className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </div>
                
                <div>
                    <label>Workout Duration:</label>
                    <select 
                        value={workoutHours}
                        onChange={(e) => setWorkoutHours(e.target.value)}
                    >
                        <option value="" disabled>
                            -- Hours --
                        </option>
                        {Array.from({ length: 25 }, (_, i) => i).map((number) => (
                            <option key={number} value={number}>
                                {number}
                            </option>
                        ))}
                    </select>
                    <select 
                        value={workoutMinutes}
                        onChange={(e) => setWorkoutMinutes(e.target.value)}
                    >
                        <option value="" disabled>
                            -- Minutes --
                        </option>
                        {Array.from({ length: 60 }, (_, i) => i).map((number) => (
                            <option key={number} value={number}>
                                {number}
                            </option>
                        ))}
                    </select>
                </div>
                
                <div>
                    <label>Workout Date:</label>
                    <select
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                    >
                        <option value="" disabled>
                            -- Month --
                        </option>
                        <option value="January">January</option>
                        <option value="February">February</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                    </select>

                    <select
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    >
                        <option value="" disabled>
                            -- Date --
                        </option>
                        {Array.from({ length: 31 }, (_, i) => i + 1).map((number) => (
                            <option key={number} value={number}>
                                {number}
                            </option>
                        ))}
                    </select>

                    <select
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                    >
                        <option value="" disabled>
                            -- Year --
                        </option>
                        {Array.from({ length: 2024 - 2000 + 1 }, (_, i) => 2024 - i).map((number) => (
                            <option key={number} value={number}>
                                {number}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <button
                    >
                        Log Workout
                    </button>
                </div>
                
            </form>
        </>
        
    )
}

export default WorkoutLog;