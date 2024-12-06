import express from "express";
import asyncHandler from "express-async-handler";
import Workout from "../models/workoutModel";

// @desc    Get all workouts for current user
// @route   GET /api/workouts
// @access  Private
export const getWorkouts = asyncHandler(async (req: express.Request, res: express.Response) => {
  if (!req.user) {
    res.status(401).json({ error: "Unauthorized" });
  }
  const uid = await req.user.user_id;
  const workouts = await Workout.find({user_id: uid}); // filter by user_id
  res.status(200).json(workouts);
});

// @desc    Log a new workout for current user
// @route   POST /api/workouts/log
// @access  Private
export const addWorkout = asyncHandler(async (req: express.Request, res: express.Response) => {
  if (!req.user) {
    res.status(401).json({ error: "Unauthorized" });
  }

  // Use the request's body to create new workout entry in MongoDB
  const workout = new Workout(req.body);
  const savedWorkout = await workout.save();
  console.log("New workout logged.");

  // Respond with the user data
  res.status(201).json(savedWorkout);
});
