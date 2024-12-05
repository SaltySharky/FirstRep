import express from "express";
import { getExercises, addExercise } from "../controllers/exerciseController";
import Exercise from "../models/exerciseModel";

import mongoose from "mongoose";
const router = express.Router();

// GET /api/exercises
router.get("/api/exercises", async (req, res) => {
  try {
    // Fetch all collections in the database

    const collections = await mongoose.connection.db.listCollections().toArray();
    const collectionNames = collections.map((collection) => collection.name);
    const exercises = await Exercise.find();

    if (exercises.length === 0) {
      return res.status(404).json({ 
        collectionNames,
       });
    }
    
    res.status(200).json({
     // collections: collectionNames,
      exercises,
    });
  } catch (error) {
    console.error("Error fetching collections or exercises:", error);
    res.status(500).json({ message: "Server error", error });
  }
});
router.post('/api/exercises/add_exercise', addExercise);

export default router;

