import axios from "axios";
import { auth } from "../firebase/firebase";
import { createHeader } from "./userServices";

export const getWorkouts = async () => {
  const header = await createHeader();
  const currentUser = auth.currentUser;

  try {
    const res = await axios.get("/api/workouts", header);
    return res.data; // return scrape data
  } catch (error) {
    console.error("Error fetching workouts from MongoDB: ", error);
  }
}

export const logWorkout = async (formData) => {
  const header = await createHeader();
  const currentUser = auth.currentUser;

  // the request body
  const payload = {
    user_id: currentUser?.uid,
    name: formData.name,
    type: formData.type,
    duration: formData.duration,
    date: formData.date,
  }

  try {
    const res = await axios.post("/api/workouts/log", payload, header);
    return res.data; // return scrape data
  } catch (error) {
    console.error("Error creating workout in MongoDB: ", error);
  }
}