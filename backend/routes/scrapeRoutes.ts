import express from "express";
import Scrape from "../models/scrapeModel";

import mongoose from "mongoose";
const router = express.Router();

router.get("/api/scrape", async (req, res) => {
  try {
    // Fetch all collections in the database
    const scrapes = await Scrape.find();
    console.log(scrapes);
    
    res.status(200).json({
      scrapes,
    });
  } catch (error) {
    console.error("Error fetching scrapes:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;

