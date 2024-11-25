import express from "express";
import asyncHandler from "express-async-handler"
import admin from "../config/firebaseAdmin"
import User from "../models/userModel";
import mongoose from "mongoose";
// @desc    Register new user
// @route   POST /api/users/signup
// @access  Public
export const registerUser = asyncHandler(async (req: express.Request, res: express.Response) => {
  const { user_id, email, password } = req.body; // destruct the request
  console.log(user_id, email, password);
  if (!user_id || !email || !password) { // validate request
    res.status(400)
    throw new Error("Please enter all info.");
  }

  // Check if user already exists
  const userEmailExists = await User.findOne({email}) // find user email in the database
  const userIdExists = await User.findOne({user_id}) // find user email in the database

  if (userEmailExists || userIdExists) { // if email is found in the database
    res.status(400)
    throw new Error("User already exists");
  }

  // Create new user
  const user = await User.create({
    user_id,
    email,
    password,
  })

  // Check that user is created
  if (user) {
    res.status(201).json({
      user_id: user.user_id,
      email: user.email,
      password: user.password,

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
  const {email, password } = req.body;

  if (!email) { // validate request
    res.status(400)
    throw new Error("EMAIL issue enter all info.");
  }

  const user = await User.findOne({email}); // check user email
})