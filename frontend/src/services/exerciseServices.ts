import axios from "axios";
import { auth } from "../firebase/firebase";
import { createHeader } from "./userServices";

export const getExercises = async () => {
  const header = await createHeader();
  const currentUser = auth.currentUser;

  try {
    const res = await axios.get("/api/exercises", header);
    return res.data; // return scrape data
  } catch (error) {
    console.error("Error fetching exercises from MongoDB: ", error);
  }
}