import Navbar from "./navbar";

const WorkoutLog = () => {
    return (
        <>
            <Navbar />
            <form>
                <input placeholder="Workout Name" />
                <input placeholder="Workout Type" />
                <input placeholder="Workout Duration" />
                <button>Submit</button>
            </form>
        </>
        
    )
}

export default WorkoutLog;