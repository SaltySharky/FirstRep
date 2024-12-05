import express from "express";
import asyncHandler from "express-async-handler";
import User from "../models/userModel";

// @desc    Register a user
// @route   POST /api/users/
// @access  Private
export const registerUser = asyncHandler(async (req: express.Request, res: express.Response) => {
  if (!req.user) {
    res.status(401).json({ error: "Unauthorized" });
  }

  // Use the request's body to create new user in MongoDB
  const user = new User(req.body);
  const savedUser = await user.save();
  console.log("User authenticated");

  // Respond with the user data
  res.status(201).json(savedUser);
});

// @desc    Login a user
// @route   GET /api/users/:uid
// @access  Private
export const loginUser = asyncHandler(async (req: express.Request, res: express.Response) => {
  if (!req.user) {
    res.status(401).json({ error: "Unauthorized" });
  }

  const user = await User.findOne({ user_id: req.params.uid })

  if (!user) {
    res.status(401).json({ error: "User not found." });
  }

  // Respond with the user data
  res.status(201).json(user);
});

// @desc    Update a user
// @route   PATCH /api/users/:uid
// @access  Private
export const updateUser = asyncHandler(async (req: express.Request, res: express.Response) => {
  if (!req.user) {
    res.status(401).json({ error: "Unauthorized" });
  }

  const updatedUser = await User.findOneAndUpdate(
    { user_id: req.body.user_id }, // filter by user_id
    {
      level: req.body.level,
      frequency: req.body.frequency,
      intensity: req.body.intensity,
    },
    { new: true },  // return the updated document (instead of the original document)
  );

  console.log("User info updated.");

  // Respond with the updated user
  res.status(201).json(updatedUser);
});