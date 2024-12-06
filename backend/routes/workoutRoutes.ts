import express from "express";
import Workout from "../models/workoutModel";
import { addWorkout, getWorkouts } from "../controllers/workoutController";

const router = express.Router();

router.get("/", getWorkouts); // fetch all workouts for the current user
router.post("/log", addWorkout); // log a new workout

export default router;

