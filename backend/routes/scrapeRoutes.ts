import express from "express";
import { getScrape } from "../controllers/scrapeController";
const router = express.Router();

router.get("/", getScrape);

export default router;

