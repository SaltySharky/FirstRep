import express from "express";
import { getExercises, addExercise} from "../controllers/exerciseController";
import Workout from "../models/workoutModel";

const router = express.Router();

export default router;

