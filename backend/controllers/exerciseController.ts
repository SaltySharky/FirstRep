import express from "express";
import asyncHandler from "express-async-handler";
import Exercise from "../models/exerciseModel";
import mongoose from "mongoose";
// @desc    Get all exercises
// @route   GET /api/exercises
// @access  Public
export const getExercises = asyncHandler(async (req: express.Request, res: express.Response) => {
  try {
    const exercises = await Exercise.find(); // Fetch all exercise documents

    if (exercises.length === 0) {
      res.status(404).json({ message: "No exercises found" });
    } else {
      res.status(200).json(exercises); // Respond with exercises
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch exercises", error });
  }
});

// @desc    Add a new exercise
// @route   POST /api/exercises
// @access  Public
export const addExercise = asyncHandler(async (req: express.Request, res: express.Response) => {
  const { name, type, duration, user_id } = req.body;

  // Validate request body
  if (!name || !duration || !type || !user_id) {
    res.status(400);
    throw new Error("Please provide a name, type, duration and user id for the exercise.");
  }
  try {
    const exercise = new Exercise({
      name,
      type,
      duration,
      user_id,
    });

    const savedExercise = await exercise.save(); // Save the new exercise to the database
    res.status(201).json(savedExercise);
  } catch (error) {
    res.status(500).json({ message: "Failed to add exercise", error });
  }
});

const printCollections = async () => {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("Collections in the database:");
    collections.forEach((collection) => console.log(collection.name));
  } catch (error) {
    console.error("Error listing collections:", error);
  }
};
