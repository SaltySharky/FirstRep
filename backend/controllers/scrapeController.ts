import express from "express";
import asyncHandler from "express-async-handler";
import Scrape from "../models/scrapeModel";

// @desc    Get all exercises
// @route   GET /api/exercises
// @access  Private
export const getScrape = asyncHandler(async (req: express.Request, res: express.Response) => {
  const scrape = await Scrape.find(); // Fetch all exercise documents

  if (scrape.length === 0) {
    res.status(404).json({ message: "No exercises found" });
  } else {
    res.status(200).json(scrape); // Respond with exercises
  }
});