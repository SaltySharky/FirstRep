import Navbar from "./navbar";
import React, {useState} from "react";

const WorkoutLog = () => {
    const [workoutName, setWorkoutName] = useState('');
    const [workoutType, setWorkoutType] = useState('');
    const [workoutDuration, setWorkoutDuration] = useState('');
    
    return (
        <>
            <Navbar />
            <form>
                <div>
                    <input 
                        placeholder="Workout Name"
                        value={workoutName}
                        onChange={(e) => setWorkoutName(e.target.value)}
                        className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <input 
                        placeholder="Workout Type"
                        value={workoutType}
                        onChange={(e) => setWorkoutType(e.target.value)}
                        className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <input 
                        placeholder="Workout Duration" 
                        value={workoutDuration}
                        onChange={(e) => setWorkoutDuration(e.target.value)}
                        className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <button
                    >
                        Submit
                    </button>
                </div>
                
            </form>
        </>
        
    )
}

export default WorkoutLog;