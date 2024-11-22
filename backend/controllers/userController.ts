import express from "express";
import asyncHandler from "express-async-handler"
import admin from "../config/firebaseAdmin"
import User from "../models/userModel";

// @desc    Register new user
// @route   POST /api/users/signup
// @access  Public
export const registerUser = asyncHandler(async (req: express.Request, res: express.Response) => {
  const { name, email, password } = req.body; // destruct the request
  if (!name || !email || !password) { // validate request
    res.status(400)
    throw new Error("Please enter all info.");
  }

  // Check if user already exists
  const userExists = await User.findOne({email}) // find user email in the database

  if (userExists) { // if email is found in the database
    res.status(400)
    throw new Error("User already exists");
  }

  // Create new user
  const user = await User.create({
    name,
    email,
    password,
  })

  // Check that user is created
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
    })
  } else {
    res.status(400)
    throw new Error("Invalid user data");
  }
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
export const loginUser = asyncHandler(async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body;

  if (!email || !password) { // validate request
    res.status(400)
    throw new Error("Please enter all info.");
  }

  const user = await User.findOne({email}); // check user email
})