import express from "express";
import asyncHandler from "express-async-handler"
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
})

// @desc    Login a user
// @route   POST /api/users/:uid
// @access  Private
export const loginUser = asyncHandler(async (req: express.Request, res: express.Response) => {
})