import asyncHandler from "express-async-handler"
import admin from "../config/firebaseAdmin";
import express, { NextFunction } from "express";
import User from "../models/userModel";

const verifyToken = asyncHandler(async (req: express.Request, res: express.Response, next: NextFunction) => {
  console.log(req.headers);
  const idToken = req.headers.authorization?.split(" ")[1];

  // Error if token does not exist
  if (!idToken) {
    res.status(401).json({ error: "No token provided" });
    return;
  }

  // decode idToken
  let user = await admin.auth().verifyIdToken(idToken);

  // Unauthorized
  if (!user) {
    res.status(401).json({ error: "Unauthorized" });
  }

  //req.user = user;
})

export default verifyToken;